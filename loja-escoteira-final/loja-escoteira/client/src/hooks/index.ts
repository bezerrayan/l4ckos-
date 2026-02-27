/**
 * Exporter central para hooks customizados
 * Facilita imports: import { useMobile, usePersistFn, useComposition } from './hooks'
 */

export { usePersistFn } from "./usePersistFn";
export { useComposition } from "./useComposition";
export { useIsMobile as useMobile } from "./useMobile";
export { useSomething } from "./useSomething";

// Hooks TRPC
export {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "./useProducts";
export {
  useCart,
  useAddToCart,
  useRemoveFromCart,
  useClearCart,
} from "./useCart";
export {
  useFavoritesSync,
  useAddFavorite,
  useRemoveFavorite,
  useIsFavorite,
} from "./useFavoritesSync";
export { useOrders, useCreateOrder, useCreateAsaasCharge } from "./useOrders";

