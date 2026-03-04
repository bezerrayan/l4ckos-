import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useUser } from "../contexts/UserContext";
import { useOrders } from "../hooks/useOrders";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Aguardando pagamento",
  processing: "Em separacao",
  shipped: "Em transporte",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const statusColor: Record<OrderStatus, string> = {
  pending: "#b45309",
  processing: "#0f766e",
  shipped: "#1d4ed8",
  delivered: "#166534",
  cancelled: "#b91c1c",
};

function formatMoney(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((Number(cents) || 0) / 100);
}

function formatDate(value: unknown) {
  if (!value) return "-";
  const date = new Date(value as string);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MeusPedidos() {
  const { isAuthenticated } = useUser();
  const ordersQuery = useOrders();

  if (!isAuthenticated) {
    return (
      <section style={styles.wrapper}>
        <h1 style={styles.title}>Meus Pedidos</h1>
        <p style={styles.muted}>Voce precisa entrar para ver seu historico de pedidos.</p>
        <Link to="/login" style={styles.primaryButton}>
          Entrar na conta
        </Link>
      </section>
    );
  }

  const orders = (ordersQuery.data ?? [])
    .slice()
    .sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <section style={styles.wrapper}>
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Meus Pedidos</h1>
        <Link to="/acompanhar-pedido" style={styles.secondaryButton}>
          Rastrear pedido
        </Link>
      </div>

      {ordersQuery.isLoading ? <p style={styles.muted}>Carregando pedidos...</p> : null}
      {ordersQuery.isError ? <p style={styles.error}>Nao foi possivel carregar seus pedidos.</p> : null}

      {!ordersQuery.isLoading && !ordersQuery.isError && orders.length === 0 ? (
        <p style={styles.muted}>Voce ainda nao possui pedidos.</p>
      ) : null}

      <div style={styles.list}>
        {orders.map(order => {
          const status = order.status as OrderStatus;
          return (
            <article key={order.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <strong style={styles.orderId}>Pedido #{order.id}</strong>
                  <p style={styles.meta}>Criado em {formatDate(order.createdAt)}</p>
                </div>
                <span style={{ ...styles.badge, background: `${statusColor[status]}22`, color: statusColor[status] }}>
                  {statusLabel[status]}
                </span>
              </div>

              <div style={styles.grid}>
                <div>
                  <p style={styles.metaLabel}>Total</p>
                  <p style={styles.metaStrong}>{formatMoney(Number(order.totalPrice))}</p>
                </div>
                <div>
                  <p style={styles.metaLabel}>Codigo de rastreio</p>
                  <p style={styles.metaStrong}>{order.trackingCode || "Ainda nao informado"}</p>
                </div>
              </div>

              <div style={styles.cardActions}>
                <Link to={`/acompanhar-pedido?pedido=${order.id}`} style={styles.primaryButton}>
                  Acompanhar este pedido
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    maxWidth: 980,
    margin: "0 auto",
    display: "grid",
    gap: 16,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
    color: "#111827",
  },
  muted: {
    margin: 0,
    color: "#6b7280",
    fontSize: 15,
  },
  error: {
    margin: 0,
    color: "#b91c1c",
    fontSize: 15,
    fontWeight: 600,
  },
  list: {
    display: "grid",
    gap: 12,
  },
  card: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
    display: "grid",
    gap: 14,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
  },
  orderId: {
    fontSize: 18,
    color: "#111827",
  },
  meta: {
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: 13,
  },
  grid: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  },
  metaLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  metaStrong: {
    margin: "4px 0 0",
    color: "#111827",
    fontSize: 15,
    fontWeight: 700,
  },
  badge: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    padding: "6px 10px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#111827",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 8,
    padding: "10px 14px",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #d1d5db",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 8,
    padding: "10px 14px",
    background: "white",
  },
};
