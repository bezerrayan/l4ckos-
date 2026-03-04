import { FormEvent, useMemo, useState, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTrackOrder } from "../hooks/useOrders";
import { useUser } from "../contexts/UserContext";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Aguardando pagamento",
  processing: "Pedido confirmado e em separacao",
  shipped: "Pedido enviado para transporte",
  delivered: "Entrega concluida",
  cancelled: "Pedido cancelado",
};

const timelineSteps: Array<{ key: Exclude<OrderStatus, "cancelled">; label: string }> = [
  { key: "pending", label: "Pagamento" },
  { key: "processing", label: "Separacao" },
  { key: "shipped", label: "Transporte" },
  { key: "delivered", label: "Entrega" },
];

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

export default function AcompanharPedido() {
  const { isAuthenticated } = useUser();
  const [params] = useSearchParams();

  const presetOrder = params.get("pedido") ?? "";
  const [searchMode, setSearchMode] = useState<"pedido" | "codigo">("pedido");
  const [searchValue, setSearchValue] = useState(presetOrder);
  const [payload, setPayload] = useState<{ orderId?: number; trackingCode?: string } | undefined>(
    presetOrder && Number.isFinite(Number(presetOrder)) ? { orderId: Number(presetOrder) } : undefined,
  );

  const query = useTrackOrder(payload);

  const currentStatus = (query.data?.status as OrderStatus | undefined) ?? "pending";
  const timelineIndex = timelineSteps.findIndex(step => step.key === currentStatus);

  const searchPlaceholder = useMemo(
    () => (searchMode === "pedido" ? "Ex: 1024" : "Ex: BR123456789"),
    [searchMode],
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;

    if (searchMode === "pedido") {
      const orderId = Number(trimmed);
      if (!Number.isInteger(orderId) || orderId <= 0) return;
      setPayload({ orderId });
      return;
    }

    setPayload({ trackingCode: trimmed });
  };

  if (!isAuthenticated) {
    return (
      <section style={styles.wrapper}>
        <h1 style={styles.title}>Acompanhar Pedido</h1>
        <p style={styles.muted}>Para acompanhar pedidos, entre com sua conta.</p>
        <Link to="/login" style={styles.primaryButton}>
          Entrar
        </Link>
      </section>
    );
  }

  return (
    <section style={styles.wrapper}>
      <h1 style={styles.title}>Acompanhar Pedido</h1>
      <p style={styles.muted}>
        Consulte o status do seu pedido usando o numero do pedido ou codigo de rastreio.
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.modeRow}>
          <button
            type="button"
            onClick={() => setSearchMode("pedido")}
            style={{ ...styles.modeButton, ...(searchMode === "pedido" ? styles.modeButtonActive : {}) }}
          >
            Numero do pedido
          </button>
          <button
            type="button"
            onClick={() => setSearchMode("codigo")}
            style={{ ...styles.modeButton, ...(searchMode === "codigo" ? styles.modeButtonActive : {}) }}
          >
            Codigo de rastreio
          </button>
        </div>

        <div style={styles.inputRow}>
          <input
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            placeholder={searchPlaceholder}
            style={styles.input}
          />
          <button type="submit" style={styles.primaryButton}>
            Consultar
          </button>
        </div>
      </form>

      {query.isLoading ? <p style={styles.muted}>Buscando pedido...</p> : null}
      {query.isError ? <p style={styles.error}>Nao foi possivel localizar este pedido na sua conta.</p> : null}

      {query.data ? (
        <article style={styles.card}>
          <div style={styles.cardHead}>
            <div>
              <h2 style={styles.cardTitle}>Pedido #{query.data.id}</h2>
              <p style={styles.meta}>Criado em {formatDate(query.data.createdAt)}</p>
            </div>
            <span style={styles.badge}>{statusLabel[currentStatus]}</span>
          </div>

          <div style={styles.grid}>
            <div>
              <p style={styles.metaLabel}>Total</p>
              <p style={styles.metaStrong}>{formatMoney(Number(query.data.totalPrice))}</p>
            </div>
            <div>
              <p style={styles.metaLabel}>Codigo de rastreio</p>
              <p style={styles.metaStrong}>{query.data.trackingCode || "Ainda nao informado"}</p>
            </div>
            <div>
              <p style={styles.metaLabel}>Atualizado em</p>
              <p style={styles.metaStrong}>{formatDate(query.data.updatedAt)}</p>
            </div>
          </div>

          {currentStatus !== "cancelled" ? (
            <div style={styles.timeline}>
              {timelineSteps.map((step, index) => {
                const active = timelineIndex >= index;
                return (
                  <div key={step.key} style={styles.step}>
                    <div style={{ ...styles.dot, ...(active ? styles.dotActive : {}) }} />
                    <p style={{ ...styles.stepLabel, ...(active ? styles.stepLabelActive : {}) }}>{step.label}</p>
                    {index < timelineSteps.length - 1 ? (
                      <div style={{ ...styles.line, ...(timelineIndex > index ? styles.lineActive : {}) }} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={styles.cancelled}>Este pedido foi cancelado. Se precisar, fale com o suporte.</p>
          )}

          <div style={styles.actions}>
            <Link to="/meus-pedidos" style={styles.secondaryButton}>
              Ver meus pedidos
            </Link>
          </div>
        </article>
      ) : null}
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    maxWidth: 980,
    margin: "0 auto",
    display: "grid",
    gap: 14,
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
    fontWeight: 600,
    fontSize: 14,
  },
  form: {
    display: "grid",
    gap: 10,
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    padding: 14,
  },
  modeRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  modeButton: {
    border: "1px solid #d1d5db",
    borderRadius: 999,
    background: "white",
    color: "#374151",
    fontWeight: 700,
    padding: "8px 12px",
    cursor: "pointer",
  },
  modeButtonActive: {
    background: "#111827",
    color: "white",
    borderColor: "#111827",
  },
  inputRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 8,
  },
  input: {
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    fontSize: 15,
    padding: "10px 12px",
    outline: "none",
  },
  card: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    display: "grid",
    gap: 14,
  },
  cardHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
  },
  cardTitle: {
    margin: 0,
    fontSize: 21,
    color: "#111827",
  },
  meta: {
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: 13,
  },
  badge: {
    borderRadius: 999,
    background: "#e0e7ff",
    color: "#4338ca",
    fontWeight: 700,
    fontSize: 12,
    padding: "7px 11px",
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
    fontWeight: 700,
    fontSize: 15,
  },
  timeline: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(90px, 1fr))",
    gap: 10,
  },
  step: {
    position: "relative",
    display: "grid",
    gap: 8,
    justifyItems: "center",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: "#cbd5e1",
    zIndex: 1,
  },
  dotActive: {
    background: "#2563eb",
  },
  line: {
    position: "absolute",
    top: 6,
    right: "-52%",
    width: "100%",
    height: 2,
    background: "#e2e8f0",
  },
  lineActive: {
    background: "#2563eb",
  },
  stepLabel: {
    margin: 0,
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 600,
  },
  stepLabelActive: {
    color: "#1d4ed8",
  },
  cancelled: {
    margin: 0,
    borderRadius: 8,
    padding: "10px 12px",
    background: "#fee2e2",
    color: "#b91c1c",
    fontWeight: 700,
    fontSize: 13,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    padding: "10px 14px",
    textDecoration: "none",
    cursor: "pointer",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #d1d5db",
    color: "#111827",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    padding: "10px 14px",
    textDecoration: "none",
    background: "white",
  },
};
