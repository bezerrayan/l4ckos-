import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { createOrder, createOrderWithId, getOrdersByUserId } from "../db";
import { createPixChargeForOrder } from "../services/asaas";

export const ordersRouter = router({
  // List user orders
  list: protectedProcedure.query(async ({ ctx }) => {
    const orders = await getOrdersByUserId(ctx.user.id);
    return orders;
  }),

  // Create order only
  create: protectedProcedure
    .input(
      z.object({
        totalPrice: z.number().positive(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const result = await createOrder(ctx.user.id, input.totalPrice);
      return result;
    }),

  // Create order + PIX charge in Asaas
  createPixCharge: protectedProcedure
    .input(
      z.object({
        totalPrice: z.number().positive(),
        description: z.string().min(3).max(255),
        dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        customer: z.object({
          name: z.string().min(3).max(255),
          cpfCnpj: z
            .string()
            .min(11)
            .max(18)
            .transform(value => value.replace(/\D/g, ""))
            .refine(value => value.length === 11 || value.length === 14, "Invalid CPF/CNPJ"),
          email: z.string().email().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let orderId = 0;

      try {
        orderId = await createOrderWithId(ctx.user.id, input.totalPrice);

        const payment = await createPixChargeForOrder({
          orderId,
          value: input.totalPrice,
          description: input.description,
          dueDate: input.dueDate,
          customer: {
            name: input.customer.name,
            cpfCnpj: input.customer.cpfCnpj,
            email: input.customer.email || ctx.user.email || undefined,
          },
        });

        return {
          orderId,
          ...payment,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create PIX charge";
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: orderId ? `${message} (order #${orderId})` : message,
        });
      }
    }),
});
