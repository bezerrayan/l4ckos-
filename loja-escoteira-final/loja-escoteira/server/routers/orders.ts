import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  createOrder,
  createOrderWithId,
  getProductsByIds,
  getOrderByIdAndUser,
  getOrderReservationItems,
  getOrderByTrackingCodeAndUser,
  getOrdersByUserId,
  getApplicableCouponByCode,
  incrementCouponUsage,
  markOrderPaid,
  reserveStockForOrder,
} from "../db";
import { createAsaasChargeForOrder } from "../services/asaas";
import { quoteShippingDetailed } from "../services/shippingService";
import { listAsaasPaymentsByExternalReference } from "../services/asaasService";

const checkoutItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive().max(99),
});

const shippingSelectionSchema = z.object({
  cep: z.string().trim().regex(/^\d{8}$/),
  optionId: z.string().trim().min(1).max(120),
});

async function resolveOrderPricing(input: {
  items: Array<{ productId: number; quantity: number }>;
  shipping: { cep: string; optionId: string };
  couponCode?: string;
}) {
  const productIds = input.items.map(item => item.productId);
  const products = await getProductsByIds(productIds);
  const productsById = new Map(products.map(product => [product.id, product]));

  let itemsSubtotalCents = 0;
  for (const item of input.items) {
    const product = productsById.get(item.productId);
    if (!product) {
      throw new TRPCError({ code: "BAD_REQUEST", message: `Produto ${item.productId} nao encontrado` });
    }

    if (Number(product.stock ?? 0) < item.quantity) {
      throw new TRPCError({ code: "BAD_REQUEST", message: `Estoque insuficiente para ${product.name}` });
    }

    itemsSubtotalCents += Number(product.price) * item.quantity;
  }

  const shippingQuote = await quoteShippingDetailed({
    cep: input.shipping.cep,
    itemCount: input.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: Number((itemsSubtotalCents / 100).toFixed(2)),
  });

  const shippingOption = shippingQuote.options.find(option => option.id === input.shipping.optionId);
  if (!shippingOption) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Opcao de frete invalida" });
  }

  const shippingCents = Math.round(Number(shippingOption.price) * 100);
  const grossTotalCents = itemsSubtotalCents + shippingCents;

  let appliedCouponId: number | null = null;
  let discountCents = 0;
  if (input.couponCode) {
    const coupon = await getApplicableCouponByCode(input.couponCode);
    if (!coupon) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Cupom invalido ou expirado" });
    }

    const grossTotal = grossTotalCents / 100;
    const rawDiscount =
      coupon.type === "percent"
        ? Number(((grossTotal * coupon.value) / 100).toFixed(2))
        : Number(coupon.value.toFixed(2));

    discountCents = Math.min(grossTotalCents, Math.round(rawDiscount * 100));
    appliedCouponId = coupon.id;
  }

  const description = input.items
    .slice(0, 2)
    .map(item => productsById.get(item.productId)?.name)
    .filter(Boolean)
    .join(" + ");

  return {
    itemsSubtotalCents,
    shippingCents,
    grossTotalCents,
    discountCents,
    finalTotalCents: Math.max(0, grossTotalCents - discountCents),
    appliedCouponId,
    shippingOption,
    description: `${description || "Pedido Loja Escoteira"} | Frete: ${shippingOption.label}`,
  };
}

const ASAAS_PAID_STATUSES = new Set([
  "RECEIVED",
  "CONFIRMED",
  "RECEIVED_IN_CASH",
  "REFUNDED_PARTIALLY",
]);

async function syncOrderPaymentIfNeeded(order: Awaited<ReturnType<typeof getOrderByIdAndUser>>) {
  if (!order) return order;
  if (!["pending", "processing"].includes(String(order.status))) {
    return order;
  }

  try {
    const payments = await listAsaasPaymentsByExternalReference(String(order.id));
    const hasPaidPayment = payments.some(payment => ASAAS_PAID_STATUSES.has(String(payment.status ?? "").toUpperCase()));

    if (!hasPaidPayment) {
      return order;
    }

    await markOrderPaid(order.id);
    const refreshed = await getOrderByIdAndUser(order.id, order.userId);
    return refreshed ?? order;
  } catch {
    return order;
  }
}

export const ordersRouter = router({
  // List user orders
  list: protectedProcedure.query(async ({ ctx }) => {
    const orders = await getOrdersByUserId(ctx.user.id);
    const syncedOrders = await Promise.all(orders.map(order => syncOrderPaymentIfNeeded(order)));
    return syncedOrders;
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

      const syncedOrder = await syncOrderPaymentIfNeeded(order);

      if (!syncedOrder) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pedido nao encontrado para este usuario",
        });
      }

      const items = await getOrderReservationItems(syncedOrder.id);
      return { ...syncedOrder, items };
    }),

  detail: protectedProcedure.input(z.number().int().positive()).query(async ({ input, ctx }) => {
    const order = await getOrderByIdAndUser(input, ctx.user.id);
    const syncedOrder = await syncOrderPaymentIfNeeded(order);
    if (!syncedOrder) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Pedido nao encontrado para este usuario",
      });
    }

    const items = await getOrderReservationItems(syncedOrder.id);
    return { ...syncedOrder, items };
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
  validateCoupon: protectedProcedure
    .input(
      z.object({
        code: z.string().trim().min(2).max(64),
        items: z.array(checkoutItemSchema).min(1),
        shipping: shippingSelectionSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const pricing = await resolveOrderPricing({
        items: input.items,
        shipping: input.shipping,
        couponCode: input.code,
      });

      const coupon = await getApplicableCouponByCode(input.code);
      if (!coupon) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Cupom invalido ou expirado" });
      }

      return {
        couponId: coupon.id,
        code: coupon.code,
        type: coupon.type,
        discountAmount: Number((pricing.discountCents / 100).toFixed(2)),
        finalTotal: Number((pricing.finalTotalCents / 100).toFixed(2)),
      } as const;
    }),

  createAsaasCharge: protectedProcedure
    .input(
      z.object({
        method: z.enum(["PIX", "BOLETO", "CARD"]),
        items: z.array(checkoutItemSchema).min(1),
        shipping: shippingSelectionSchema,
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
        couponCode: z.string().trim().min(2).max(64).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let orderId = 0;

      try {
        const pricing = await resolveOrderPricing({
          items: input.items,
          shipping: input.shipping,
          couponCode: input.couponCode,
        });

        orderId = await createOrderWithId(ctx.user.id, pricing.finalTotalCents);
        await reserveStockForOrder({
          userId: ctx.user.id,
          orderId,
          items: input.items,
        });

        const payment = await createAsaasChargeForOrder({
          orderId,
          method: input.method,
          value: Number((pricing.finalTotalCents / 100).toFixed(2)),
          description: pricing.description,
          dueDate: input.dueDate,
          customer: {
            name: input.customer.name,
            cpfCnpj: input.customer.cpfCnpj,
            email: input.customer.email || ctx.user.email || undefined,
          },
        });

        if (pricing.appliedCouponId) {
          await incrementCouponUsage(pricing.appliedCouponId);
        }

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
