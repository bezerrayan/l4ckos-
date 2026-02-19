import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { createOrder, getOrdersByUserId } from "../db";

export const ordersRouter = router({
  // Listar pedidos do usuário autenticado
  list: protectedProcedure.query(async ({ ctx }) => {
    const orders = await getOrdersByUserId(ctx.user.id);
    return orders;
  }),

  // Criar novo pedido
  create: protectedProcedure
    .input(
      z.object({
        totalPrice: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await createOrder(ctx.user.id, input.totalPrice);
      return result;
    }),
});
