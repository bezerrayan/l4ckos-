import type { CSSProperties } from "react";

const sections = [
  {
    title: "Prazo para troca ou devolução",
    text: "Você pode solicitar troca ou devolução em até 7 dias corridos após o recebimento do pedido.",
  },
  {
    title: "Condições do produto",
    text: "O item deve estar sem sinais de uso, com etiquetas e na embalagem original para aprovação da solicitação.",
  },
  {
    title: "Como solicitar",
    text: "Entre em contato pela página de Contato informando número do pedido, motivo da solicitação e fotos do produto.",
  },
  {
    title: "Reembolso",
    text: "Depois da aprovação e recebimento do item, o reembolso é processado no mesmo meio de pagamento em até 10 dias úteis.",
  },
];

export default function TrocasDevolucoes() {
  return (
    <section style={styles.wrapper}>
      <h1 style={styles.title}>Trocas e Devoluções</h1>
      <p style={styles.subtitle}>
        Regras claras para pós-compra, com mais segurança na sua experiência de compra.
      </p>

      <div style={styles.list}>
        {sections.map(section => (
          <article key={section.title} style={styles.card}>
            <h2 style={styles.cardTitle}>{section.title}</h2>
            <p style={styles.cardText}>{section.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gap: 16,
  },
  title: {
    margin: 0,
    fontSize: 32,
    color: "#111827",
    fontWeight: 800,
  },
  subtitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: 15,
  },
  list: {
    display: "grid",
    gap: 12,
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "white",
    padding: 16,
    boxShadow: "0 6px 16px rgba(15, 23, 42, 0.05)",
  },
  cardTitle: {
    margin: 0,
    color: "#111827",
    fontSize: 20,
  },
  cardText: {
    margin: "8px 0 0",
    color: "#4b5563",
    lineHeight: 1.6,
    fontSize: 14,
  },
};
