import { COOKIE_NAME } from "@shared/const";
import { ONE_YEAR_MS } from "@shared/const";
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
import { ENV } from "./_core/env";
import {
  getLocalAuthCredentialByEmail,
  getUserByOpenId,
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
          password: z.string().min(6).max(120),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ENV.isProduction && !ENV.allowLocalAuthInProduction) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local login disabled in production" });
        }

        const normalizedEmail = input.email.trim().toLowerCase();
        const requestIp = ctx.req.ip || "unknown";
        const emailIpKey = `local-login:email-ip:${normalizedEmail}:${requestIp}`;
        const ipKey = `local-login:ip:${requestIp}`;
        assertLoginAttemptLimit(emailIpKey);
        assertLoginAttemptLimit(ipKey);

        const credential = await getLocalAuthCredentialByEmail(normalizedEmail);
        if (!credential) {
          registerLoginAttemptFailure(emailIpKey);
          registerLoginAttemptFailure(ipKey);
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais invalidas" });
        }

        const passwordOk = await bcrypt.compare(input.password, credential.passwordHash);
        if (!passwordOk) {
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
          throw new TRPCError({ code: "FORBIDDEN", message: "Usuario bloqueado" });
        }

        const sessionToken = await sdk.createSessionToken(localOpenId, {
          name: inferredName,
          expiresInMs: ONE_YEAR_MS,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        clearLoginAttemptLimit(emailIpKey, ipKey);
        return { success: true, user: user ?? null } as const;
      }),
    localSignup: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          email: z.string().email(),
          password: z.string().min(6).max(120),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ENV.isProduction && !ENV.allowLocalAuthInProduction) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local signup disabled in production" });
        }

        const normalizedEmail = input.email.trim().toLowerCase();
        const requestIp = ctx.req.ip || "unknown";
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

        const passwordHash = await bcrypt.hash(input.password, 10);
        await upsertLocalAuthCredential({
          userId: user.id,
          email: normalizedEmail,
          passwordHash,
        });

        const sessionToken = await sdk.createSessionToken(localOpenId, {
          name: normalizedName,
          expiresInMs: ONE_YEAR_MS,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        return { success: true, user: user ?? null } as const;
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
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
