import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  createOrder,
  createOrderWithId,
  getOrderByIdAndUser,
  getOrderReservationItems,
  getOrderByTrackingCodeAndUser,
  getOrdersByUserId,
  reserveStockForOrder,
} from "../db";
import { createAsaasChargeForOrder } from "../services/asaas";

export const ordersRouter = router({
  // List user orders
  list: protectedProcedure.query(async ({ ctx }) => {
    const orders = await getOrdersByUserId(ctx.user.id);
    return orders;
  }),

  // Track order by order number or tracking code
  track: protectedProcedure
    .input(
      z
        .object({
          orderId: z.number().int().positive().optional(),
          trackingCode: z.string().trim().min(3).max(120).optional(),
        })
        .refine(data => data.orderId || data.trackingCode, {
          message: "Informe o numero do pedido ou codigo de rastreio",
        }),
    )
    .query(async ({ input, ctx }) => {
      const order = input.orderId
        ? await getOrderByIdAndUser(input.orderId, ctx.user.id)
        : await getOrderByTrackingCodeAndUser(input.trackingCode ?? "", ctx.user.id);

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pedido nao encontrado para este usuario",
        });
      }

      return order;
    }),

  detail: protectedProcedure.input(z.number().int().positive()).query(async ({ input, ctx }) => {
    const order = await getOrderByIdAndUser(input, ctx.user.id);
    if (!order) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Pedido nao encontrado para este usuario",
      });
    }

    const items = await getOrderReservationItems(order.id);
    return { ...order, items };
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

  // Create order + Asaas charge (PIX, boleto, card via invoice)
  createAsaasCharge: protectedProcedure
    .input(
      z.object({
        method: z.enum(["PIX", "BOLETO", "CARD"]),
        totalPrice: z.number().positive(),
        description: z.string().min(3).max(255),
        items: z
          .array(
            z.object({
              productId: z.number().int().positive(),
              quantity: z.number().int().positive().max(99),
            }),
          )
          .min(1),
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
        await reserveStockForOrder({
          userId: ctx.user.id,
          orderId,
          items: input.items,
        });

        const payment = await createAsaasChargeForOrder({
          orderId,
          method: input.method,
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
        const message = error instanceof Error ? error.message : "Failed to create Asaas charge";
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: orderId ? `${message} (order #${orderId})` : message,
        });
      }
    }),
});
