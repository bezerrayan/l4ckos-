import { trpc } from "../lib/trpc";

/**
 * Hook para listar favoritos do usuário
 */
export function useFavoritesSync() {
  return trpc.favorites.list.useQuery();
}

/**
 * Hook para adicionar favorito
 */
export function useAddFavorite() {
  return trpc.favorites.add.useMutation();
}

/**
 * Hook para remover favorito
 */
export function useRemoveFavorite() {
  return trpc.favorites.remove.useMutation();
}

/**
 * Hook para verificar se um produto é favorito
 */
export function useIsFavorite(productId: number) {
  return trpc.favorites.isFavorite.useQuery(productId, {
    enabled: !!productId,
  });
}
