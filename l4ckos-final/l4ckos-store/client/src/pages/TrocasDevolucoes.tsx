import type { CSSProperties } from "react";

const sections = [
  {
    title: "Direito de arrependimento",
    text:
      "Nas compras realizadas online, você pode desistir da compra em até 7 dias corridos após o recebimento do pedido, conforme o art. 49 do Código de Defesa do Consumidor.",
  },
  {
    title: "Condições para análise",
    text:
      "Para agilizar a avaliação, o produto deve ser devolvido com acessórios, etiquetas, manual e embalagem recebida, sempre que isso for compatível com a verificação do item.",
  },
  {
    title: "Como solicitar",
    text:
      "Entre em contato pela página de Contato informando número do pedido, motivo da solicitação e, quando possível, fotos do produto ou da embalagem.",
  },
  {
    title: "Defeito, avaria ou envio incorreto",
    text:
      "Em caso de defeito, avaria no transporte ou divergência entre o pedido e o produto recebido, a L4CKOS orientará o procedimento de atendimento e a logística reversa quando aplicável.",
  },
  {
    title: "Reembolso",
    text:
      "Quando o reembolso for devido, ele será processado conforme o meio de pagamento utilizado e os prazos operacionais da instituição financeira ou da plataforma de pagamento.",
  },
];

export default function TrocasDevolucoes() {
  return (
    <section style={styles.wrapper}>
      <h1 style={styles.title}>Trocas e Devoluções</h1>
      <p style={styles.subtitle}>
        Regras claras de pós-compra, com base no Código de Defesa do Consumidor e em
        atendimento digital para todo o Brasil.
      </p>

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
  subtitle: { margin: 0, color: "#a6a6a6", fontSize: 15, lineHeight: 1.6 },
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
