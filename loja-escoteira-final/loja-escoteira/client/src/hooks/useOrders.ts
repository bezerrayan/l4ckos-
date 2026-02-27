import { trpc } from "../lib/trpc";

/**
 * Hook para listar pedidos do usuário
 */
export function useOrders() {
  return trpc.orders.list.useQuery();
}

/**
 * Hook para criar novo pedido
 */
export function useCreateOrder() {
  return trpc.orders.create.useMutation();
}

/**
 * Hook para criar pedido com cobranca Asaas (PIX, boleto, cartao via invoice)
 */
export function useCreateAsaasCharge() {
  return trpc.orders.createAsaasCharge.useMutation();
}
