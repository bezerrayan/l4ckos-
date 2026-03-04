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
 * Hook para criar pedido com cobrança Asaas (PIX, boleto, cartão via invoice)
 */
export function useCreateAsaasCharge() {
  return trpc.orders.createAsaasCharge.useMutation();
}

/**
 * Hook para rastrear pedido por número ou código de rastreio
 */
export function useTrackOrder(input?: { orderId?: number; trackingCode?: string }) {
  return trpc.orders.track.useQuery(input ?? { orderId: 1 }, {
    enabled: Boolean(input?.orderId || input?.trackingCode),
    retry: false,
  });
}

/**
 * Hook para obter detalhes do pedido (inclui itens)
 */
export function useOrderDetail(orderId?: number) {
  return trpc.orders.detail.useQuery(orderId ?? 0, {
    enabled: Boolean(orderId),
    retry: false,
  });
}
