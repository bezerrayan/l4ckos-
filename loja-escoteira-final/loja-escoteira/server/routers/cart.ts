import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getCartItems, addToCart, removeFromCart, clearCart, getProductById } from "../db";

export const cartRouter = router({
  // Listar itens do carrinho do usuário autenticado
  list: protectedProcedure.query(async ({ ctx }) => {
    const items = await getCartItems(ctx.user.id);

    // Enriquecer os itens com informações do produto
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await getProductById(item.productId);
        return {
          ...item,
          product,
        };
      })
    );

    return enrichedItems;
  }),

  // Adicionar item ao carrinho
  add: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await addToCart(ctx.user.id, input.productId, input.quantity);
      return { success: true };
    }),

  // Remover item do carrinho
  remove: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      await removeFromCart(input);
      return { success: true };
    }),

  // Limpar carrinho completamente
  clear: protectedProcedure.mutation(async ({ ctx }) => {
    await clearCart(ctx.user.id);
    return { success: true };
  }),
});
