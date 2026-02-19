import { trpc } from "../lib/trpc";
import type { Product } from "../types/product";

/**
 * Hook para listar produtos com filtros
 */
export function useProducts(filters?: {
  category?: string;
  search?: string;
}) {
  return trpc.products.list.useQuery({
    category: filters?.category,
    search: filters?.search,
  });
}

/**
 * Hook para obter um produto específico
 */
export function useProduct(id: number) {
  return trpc.products.getById.useQuery(id, {
    enabled: !!id,
  });
}

/**
 * Hook para criar produto (admin)
 */
export function useCreateProduct() {
  return trpc.products.create.useMutation();
}

/**
 * Hook para atualizar produto (admin)
 */
export function useUpdateProduct() {
  return trpc.products.update.useMutation();
}

/**
 * Hook para deletar produto (admin)
 */
export function useDeleteProduct() {
  return trpc.products.delete.useMutation();
}
