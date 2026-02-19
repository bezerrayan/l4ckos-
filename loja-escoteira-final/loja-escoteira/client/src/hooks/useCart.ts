import { trpc } from "../lib/trpc";

/**
 * Hook para listar itens do carrinho
 */
export function useCart() {
  return trpc.cart.list.useQuery();
}

/**
 * Hook para adicionar item ao carrinho
 */
export function useAddToCart() {
  return trpc.cart.add.useMutation();
}

/**
 * Hook para remover item do carrinho
 */
export function useRemoveFromCart() {
  return trpc.cart.remove.useMutation();
}

/**
 * Hook para limpar carrinho
 */
export function useClearCart() {
  return trpc.cart.clear.useMutation();
}
