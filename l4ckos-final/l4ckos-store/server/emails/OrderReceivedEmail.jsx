import { Section, Text } from "@react-email/components";
import { EmailButton } from "./components/EmailButton.jsx";
import { EmailInfoRow } from "./components/EmailInfoRow.jsx";
import { EmailLayout } from "./components/EmailLayout.jsx";
import { renderOrderItems } from "./helpers/renderOrderItems.jsx";

export function OrderReceivedEmail({ customerName, orderNumber, items, total }) {
  const safeName = String(customerName || "Cliente");
  const safeOrder = String(orderNumber || "-");
  const safeTotal = String(total || "-");
  const appBase = String(process.env.APP_BASE_URL || "https://l4ckos.com.br").replace(/\/$/, "");

  return (
    <EmailLayout
      preview={`Recebemos seu pedido #${safeOrder}`}
      title="Pedido recebido com sucesso"
      subtitle={`Pedido #${safeOrder}`}
    >
      <Text>Olá, {safeName}.</Text>
      <Text>Recebemos seu pedido e ja estamos iniciando a preparacao.</Text>

      <EmailInfoRow label="Número do pedido" value={`#${safeOrder}`} />
      <EmailInfoRow label="Total" value={safeTotal} />

      <Section style={styles.tableWrap}>
        <table style={styles.table} cellPadding="0" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th style={{ ...styles.th, textAlign: "left" }}>Item</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Qtd</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Valor</th>
            </tr>
          </thead>
          <tbody>{renderOrderItems(items)}</tbody>
        </table>
      </Section>

      <EmailButton href={`${appBase}/conta/pedidos`}>Acompanhar pedido</EmailButton>
    </EmailLayout>
  );
}

const styles = {
  tableWrap: {
    marginTop: "12px",
    border: "1px solid #ece6dd",
    borderRadius: "8px",
    padding: "12px 14px",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    fontSize: "12px",
    color: "#6b6b6b",
    borderBottom: "1px solid #ece6dd",
    paddingBottom: "8px",
    fontWeight: "700",
  },
};
