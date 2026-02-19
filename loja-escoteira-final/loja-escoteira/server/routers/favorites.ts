import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getFavorites, addFavorite, removeFavorite, getProductById } from "../db";

export const favoritesRouter = router({
  // Listar favoritos do usuário autenticado
  list: protectedProcedure.query(async ({ ctx }) => {
    const favorites = await getFavorites(ctx.user.id);

    // Enriquecer com informações do produto
    const enrichedFavorites = await Promise.all(
      favorites.map(async (fav) => {
        const product = await getProductById(fav.productId);
        return {
          ...fav,
          product,
        };
      })
    );

    return enrichedFavorites;
  }),

  // Adicionar favorito
  add: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      await addFavorite(ctx.user.id, input);
      return { success: true };
    }),

  // Remover favorito
  remove: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      await removeFavorite(ctx.user.id, input);
      return { success: true };
    }),

  // Verificar se um produto é favorito
  isFavorite: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const favorites = await getFavorites(ctx.user.id);
      const isFav = favorites.some((fav) => fav.productId === input);
      return isFav;
    }),
});
