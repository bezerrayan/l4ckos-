import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getProfileData, saveProfileData } from "../db";

const addressSchema = z.object({
  label: z.string().min(1).max(100),
  recipient: z.string().min(1).max(255),
  zipCode: z.string().min(1).max(20),
  street: z.string().min(1).max(255),
  number: z.string().min(1).max(30),
  complement: z.string().max(255).optional().nullable(),
  neighborhood: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  state: z.string().min(1).max(100),
  isDefault: z.boolean().default(false),
});

const paymentSchema = z.object({
  label: z.string().min(1).max(100),
  holderName: z.string().min(1).max(255),
  brand: z.string().min(1).max(80),
  last4: z.string().regex(/^\d{4}$/),
  expiry: z.string().min(3).max(8),
  isDefault: z.boolean().default(false),
});

export const profileRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const data = await getProfileData(ctx.user.id);
    return data;
  }),

  save: protectedProcedure
    .input(
      z.object({
        name: z.string().max(255).optional(),
        email: z.string().email().max(320).optional(),
        phone: z.string().max(32).optional().default(""),
        addresses: z.array(addressSchema).default([]),
        payments: z.array(paymentSchema).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await saveProfileData(ctx.user.id, {
        name: input.name,
        email: input.email,
        phone: input.phone,
        addresses: input.addresses,
        payments: input.payments,
      });

      return { success: true } as const;
    }),
});
