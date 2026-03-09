import type { CSSProperties } from "react";

const sections = [
  {
    title: "Prazo para troca ou devolucao",
    text: "Voce pode solicitar troca ou devolucao em ate 7 dias corridos apos o recebimento do pedido.",
  },
  {
    title: "Condicoes do produto",
    text: "O item deve estar sem sinais de uso, com etiquetas e na embalagem original para aprovacao da solicitacao.",
  },
  {
    title: "Como solicitar",
    text: "Entre em contato pela pagina de Contato informando numero do pedido, motivo da solicitacao e fotos do produto.",
  },
  {
    title: "Reembolso",
    text: "Depois da aprovacao e recebimento do item, o reembolso e processado no mesmo meio de pagamento em ate 10 dias uteis.",
  },
];

export default function TrocasDevolucoes() {
  return (
    <section style={styles.wrapper}>
      <h1 style={styles.title}>Trocas e Devolucoes</h1>
      <p style={styles.subtitle}>Regras claras para pos-compra, com mais seguranca na sua experiencia de compra.</p>

      <div style={styles.list}>
        {sections.map((section) => (
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
  wrapper: { maxWidth: 900, margin: "0 auto", display: "grid", gap: 16 },
  title: { margin: 0, fontSize: 32, color: "#f0ede8", fontWeight: 800 },
  subtitle: { margin: 0, color: "#a6a6a6", fontSize: 15 },
  list: { display: "grid", gap: 12 },
  card: {
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    background: "#121212",
    padding: 16,
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
  cardTitle: { margin: 0, color: "#f0ede8", fontSize: 20 },
  cardText: { margin: "8px 0 0", color: "#a6a6a6", lineHeight: 1.6, fontSize: 14 },
};
