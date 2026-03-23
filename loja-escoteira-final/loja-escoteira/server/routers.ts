import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { productsRouter } from "./routers/products";
import { cartRouter } from "./routers/cart";
import { favoritesRouter } from "./routers/favorites";
import { ordersRouter } from "./routers/orders";
import { profileRouter } from "./routers/profile";
import { adminRouter } from "./routers/admin";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { sdk } from "./_core/sdk";
import { ENV, isEmailAllowedForProductionLocalAuth } from "./_core/env";
import { securityLog } from "./_core/security";
import {
  getLocalAuthCredentialByEmail,
  getUserByOpenId,
  rotateUserSessionVersion,
  upsertLocalAuthCredential,
  upsertUser,
} from "./db";

type LoginAttemptState = {
  failCount: number;
  windowStartAt: number;
  blockedUntil: number;
};

const loginAttemptStore = new Map<string, LoginAttemptState>();
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_BLOCK_MS = 15 * 60 * 1000;
const PASSWORD_MIN_LENGTH = 10;
const PASSWORD_MAX_LENGTH = 120;
const PASSWORD_HASH_ROUNDS = 12;

function isAdminEmail(email: string) {
  return ENV.adminEmails.includes(email.trim().toLowerCase());
}

function getNormalizedAttemptState(key: string, now: number): LoginAttemptState {
  const current = loginAttemptStore.get(key);
  if (!current) {
    return { failCount: 0, windowStartAt: now, blockedUntil: 0 };
  }

  if (current.blockedUntil > now) {
    return current;
  }

  if (now - current.windowStartAt > LOGIN_WINDOW_MS) {
    return { failCount: 0, windowStartAt: now, blockedUntil: 0 };
  }

  return current;
}

function assertLoginAttemptLimit(key: string) {
  const now = Date.now();
  const current = getNormalizedAttemptState(key, now);
  loginAttemptStore.set(key, current);

  if (current.blockedUntil > now) {
    const remainingMs = current.blockedUntil - now;
    const remainingMin = Math.max(1, Math.ceil(remainingMs / 60000));
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Muitas tentativas de login. Tente novamente em ${remainingMin} minuto(s).`,
    });
  }
}

function registerLoginAttemptFailure(key: string) {
  const now = Date.now();
  const current = getNormalizedAttemptState(key, now);

  if (current.blockedUntil > now) {
    loginAttemptStore.set(key, current);
    return;
  }

  const nextFailCount = current.failCount + 1;
  const shouldBlock = nextFailCount >= LOGIN_MAX_ATTEMPTS;

  loginAttemptStore.set(key, {
    failCount: shouldBlock ? 0 : nextFailCount,
    windowStartAt: shouldBlock ? now : current.windowStartAt,
    blockedUntil: shouldBlock ? now + LOGIN_BLOCK_MS : 0,
  });
}

function clearLoginAttemptLimit(...keys: string[]) {
  keys.forEach(key => loginAttemptStore.delete(key));
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    localLogin: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(1).max(PASSWORD_MAX_LENGTH),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ENV.isProduction && !ENV.allowLocalAuthInProduction) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local login disabled in production" });
        }

        const normalizedEmail = input.email.trim().toLowerCase();
        if (ENV.isProduction && !isEmailAllowedForProductionLocalAuth(normalizedEmail)) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local login disabled for this account" });
        }

        const requestIp = ctx.req.ip || "unknown";
        const emailIpKey = `local-login:email-ip:${normalizedEmail}:${requestIp}`;
        const ipKey = `local-login:ip:${requestIp}`;
        assertLoginAttemptLimit(emailIpKey);
        assertLoginAttemptLimit(ipKey);

        const credential = await getLocalAuthCredentialByEmail(normalizedEmail);
        if (!credential) {
          securityLog("warn", "auth.local_login_failed", { email: normalizedEmail, requestIp, reason: "missing_user" });
          registerLoginAttemptFailure(emailIpKey);
          registerLoginAttemptFailure(ipKey);
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais invalidas" });
        }

        const passwordOk = await bcrypt.compare(input.password, credential.passwordHash);
        if (!passwordOk) {
          securityLog("warn", "auth.local_login_failed", { email: normalizedEmail, requestIp, reason: "invalid_password" });
          registerLoginAttemptFailure(emailIpKey);
          registerLoginAttemptFailure(ipKey);
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais invalidas" });
        }

        if (isAdminEmail(normalizedEmail)) {
          await upsertUser({
            openId: `local:${normalizedEmail}`,
            name: normalizedEmail.split("@")[0] || "Admin",
            email: normalizedEmail,
            loginMethod: "local-dev",
            role: "admin",
            lastSignedIn: new Date(),
          });
        }

        const localOpenId = `local:${normalizedEmail}`;
        const inferredName = normalizedEmail.split("@")[0] || "Usuario Local";
        await upsertUser({
          openId: localOpenId,
          name: inferredName,
          email: normalizedEmail,
          loginMethod: "local-dev",
          lastSignedIn: new Date(),
        });

        const user = await getUserByOpenId(localOpenId);
        if (user?.isBlocked === 1 && user.role !== "admin") {
          securityLog("warn", "auth.local_login_blocked_user", { email: normalizedEmail, requestIp, userId: user?.id });
          throw new TRPCError({ code: "FORBIDDEN", message: "Usuario bloqueado" });
        }

        if (!user) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Falha ao carregar usuario" });
        }

        const nextSessionVersion = await rotateUserSessionVersion(user.id);

        const sessionToken = await sdk.createSessionToken(localOpenId, {
          name: inferredName,
          expiresInMs: ENV.sessionTtlMs,
          sessionVersion: nextSessionVersion,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ENV.sessionTtlMs });

        clearLoginAttemptLimit(emailIpKey, ipKey);
        securityLog("info", "auth.local_login_succeeded", { email: normalizedEmail, requestIp, userId: user.id });
        return { success: true, user: user ?? null } as const;
      }),
    localSignup: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          email: z.string().email(),
          password: z.string()
            .min(PASSWORD_MIN_LENGTH)
            .max(PASSWORD_MAX_LENGTH)
            .regex(/[a-z]/, "A senha deve conter letra minuscula")
            .regex(/[A-Z]/, "A senha deve conter letra maiuscula")
            .regex(/\d/, "A senha deve conter numero")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter caractere especial"),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ENV.isProduction && (!ENV.allowLocalAuthInProduction || !ENV.allowPublicLocalSignupInProduction)) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local signup disabled in production" });
        }

        const normalizedEmail = input.email.trim().toLowerCase();
        const requestIp = ctx.req.ip || "unknown";
        if (ENV.isProduction && !isEmailAllowedForProductionLocalAuth(normalizedEmail)) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local signup disabled for this account" });
        }

        assertLoginAttemptLimit(`local-signup:${normalizedEmail}:${requestIp}`);
        const localOpenId = `local:${normalizedEmail}`;
        const normalizedName = input.name.trim();
        const localRole = isAdminEmail(normalizedEmail) ? "admin" : "user";

        await upsertUser({
          openId: localOpenId,
          name: normalizedName,
          email: normalizedEmail,
          loginMethod: "local-dev",
          role: localRole,
          lastSignedIn: new Date(),
        });

        const user = await getUserByOpenId(localOpenId);
        if (!user) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Falha ao criar usuario" });
        }

        const passwordHash = await bcrypt.hash(input.password, PASSWORD_HASH_ROUNDS);
        await upsertLocalAuthCredential({
          userId: user.id,
          email: normalizedEmail,
          passwordHash,
        });

        const nextSessionVersion = await rotateUserSessionVersion(user.id);

        const sessionToken = await sdk.createSessionToken(localOpenId, {
          name: normalizedName,
          expiresInMs: ENV.sessionTtlMs,
          sessionVersion: nextSessionVersion,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ENV.sessionTtlMs });
        securityLog("info", "auth.local_signup_succeeded", { email: normalizedEmail, requestIp, userId: user.id });

        return { success: true, user: user ?? null } as const;
      }),
    logout: publicProcedure.mutation(async ({ ctx }) => {
      if (ctx.user) {
        try {
          await rotateUserSessionVersion(ctx.user.id);
        } catch (error) {
          securityLog("warn", "auth.logout_session_rotation_failed", {
            userId: ctx.user.id,
            reason: error instanceof Error ? error.message : "unknown",
          });
        }
        securityLog("info", "auth.logout", { userId: ctx.user.id, requestIp: ctx.req.ip || "unknown" });
      }
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Feature routers
  products: productsRouter,
  cart: cartRouter,
  favorites: favoritesRouter,
  orders: ordersRouter,
  profile: profileRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
