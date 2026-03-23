import { Link, useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import { useOrderDetail } from "../hooks/useOrders";
type OrderStatus = "pending" | "processing" | "paid" | "shipped" | "delivered" | "cancelled";

const statusText: Record<OrderStatus, string> = {
  pending: "Aguardando pagamento",
  processing: "Pago e em separacao",
  paid: "Pagamento confirmado",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

function formatDate(value: unknown) {
  if (!value) return "-";
  const date = new Date(value as string);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("pt-BR");
}

function formatMoney(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((Number(cents) || 0) / 100);
}

export default function PedidoDetalhe() {
  const params = useParams<{ id: string }>();
  const orderId = Number(params.id);
  const query = useOrderDetail(Number.isFinite(orderId) ? orderId : undefined);

  return (
    <section style={styles.wrapper}>
      <div style={styles.head}>
        <h1 style={styles.title}>Detalhes do pedido</h1>
        <Link to="/meus-pedidos" style={styles.linkButton}>
          Voltar para pedidos
        </Link>
      </div>

      {query.isLoading ? <p style={styles.muted}>Carregando pedido...</p> : null}
      {query.isError ? <p style={styles.error}>Nao foi possivel carregar este pedido agora.</p> : null}

      {query.data ? (
        <article style={styles.card}>
          <div style={styles.row}>
            <div>
              <h2 style={styles.orderId}>Pedido #{query.data.id}</h2>
              <p style={styles.muted}>Criado em {formatDate(query.data.createdAt)}</p>
            </div>
            <span style={styles.badge}>{statusText[query.data.status as OrderStatus]}</span>
          </div>

          <div style={styles.metaGrid}>
            <div>
              <p style={styles.metaLabel}>Total pago</p>
              <p style={styles.metaValue}>{formatMoney(Number(query.data.totalPrice))}</p>
            </div>
            <div>
              <p style={styles.metaLabel}>Rastreio</p>
              <p style={styles.metaValue}>{query.data.trackingCode || "Nao informado"}</p>
            </div>
            <div>
              <p style={styles.metaLabel}>Ultima atualizacao</p>
              <p style={styles.metaValue}>{formatDate(query.data.updatedAt)}</p>
            </div>
          </div>

          <h3 style={styles.sectionTitle}>Itens deste pedido</h3>
          {query.data.items?.length ? (
            <div style={styles.itemsList}>
              {query.data.items.map(item => (
                <div key={item.id} style={styles.itemRow}>
                  <div>
                  <p style={styles.itemName}>{item.productName || `Produto #${item.productId}`}</p>
                  <p style={styles.itemMeta}>Quantidade: {item.quantity}</p>
                </div>
                  <p style={styles.itemPrice}>{formatMoney(Number(item.productPrice || 0) * Number(item.quantity || 0))}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.muted}>Os itens deste pedido nao estao disponiveis no momento.</p>
          )}
        </article>
      ) : null}
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: { maxWidth: 980, margin: "0 auto", display: "grid", gap: 14, color: "#f0ede8" },
  head: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" },
  title: { margin: 0, fontSize: 32, color: "#f0ede8", fontWeight: 800 },
  muted: { margin: 0, color: "#a1a1aa" },
  error: { margin: 0, color: "#b91c1c", fontWeight: 700 },
  card: { border: "1px solid #2f2f2f", borderRadius: 12, background: "#101010", padding: 16, display: "grid", gap: 14 },
  row: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" },
  orderId: { margin: 0, fontSize: 22, color: "#f0ede8" },
  badge: { borderRadius: 999, background: "#1e293b", color: "#93c5fd", fontWeight: 700, fontSize: 12, padding: "7px 11px" },
  metaGrid: { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" },
  metaLabel: { margin: 0, color: "#a1a1aa", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4 },
  metaValue: { margin: "4px 0 0", color: "#f0ede8", fontWeight: 700 },
  sectionTitle: { margin: 0, color: "#f0ede8", fontSize: 18 },
  itemsList: { display: "grid", gap: 8 },
  itemRow: { border: "1px solid #2f2f2f", borderRadius: 10, padding: 10, display: "flex", justifyContent: "space-between", gap: 10, background: "#0f0f0f" },
  itemName: { margin: 0, color: "#f0ede8", fontWeight: 700 },
  itemMeta: { margin: "4px 0 0", color: "#a1a1aa", fontSize: 13 },
  itemPrice: { margin: 0, color: "#f0ede8", fontWeight: 700, alignSelf: "center" },
  linkButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    border: "1px solid #2f2f2f",
    color: "#f0ede8",
    borderRadius: 8,
    padding: "10px 14px",
    fontWeight: 700,
    background: "#0f0f0f",
  },
};
