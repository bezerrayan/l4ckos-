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
import { getLocalAuthCredentialByEmail, getUserByOpenId, upsertLocalAuthCredential, upsertUser } from "./db";

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
        if (ENV.isProduction) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local login disabled in production" });
        }

        const normalizedEmail = input.email.trim().toLowerCase();
        const credential = await getLocalAuthCredentialByEmail(normalizedEmail);
        if (!credential) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais inválidas" });
        }

        const passwordOk = await bcrypt.compare(input.password, credential.passwordHash);
        if (!passwordOk) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais inválidas" });
        }

        const localOpenId = `local:${normalizedEmail}`;
        const inferredName = normalizedEmail.split("@")[0] || "Usuário Local";
        await upsertUser({
          openId: localOpenId,
          name: inferredName,
          email: normalizedEmail,
          loginMethod: "local-dev",
          lastSignedIn: new Date(),
        });

        const sessionToken = await sdk.createSessionToken(localOpenId, {
          name: inferredName,
          expiresInMs: ONE_YEAR_MS,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        const user = await getUserByOpenId(localOpenId);
        if (user?.isBlocked === 1) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Usuário bloqueado" });
        }
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
        if (ENV.isProduction) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Local signup disabled in production" });
        }

        const normalizedEmail = input.email.trim().toLowerCase();
        const localOpenId = `local:${normalizedEmail}`;
        const normalizedName = input.name.trim();
        const localRole = normalizedEmail === "admin@local.dev" ? "admin" : "user";

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
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Falha ao criar usuário" });
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
