import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getFavorites, addFavorite, removeFavorite, getProductById } from "../db";

export const favoritesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const favorites = await getFavorites(ctx.user.id);

    const enrichedFavorites = await Promise.all(
      favorites.map(async fav => {
        const product = await getProductById(fav.productId);
        return {
          ...fav,
          product,
        };
      }),
    );

    return enrichedFavorites;
  }),

  add: protectedProcedure
    .input(z.number().int().positive())
    .mutation(async ({ input, ctx }) => {
      await addFavorite(ctx.user.id, input);
      return { success: true };
    }),

  remove: protectedProcedure
    .input(z.number().int().positive())
    .mutation(async ({ input, ctx }) => {
      await removeFavorite(ctx.user.id, input);
      return { success: true };
    }),

  isFavorite: protectedProcedure
    .input(z.number().int().positive())
    .query(async ({ input, ctx }) => {
      const favorites = await getFavorites(ctx.user.id);
      const isFav = favorites.some(fav => fav.productId === input);
      return isFav;
    }),
});
