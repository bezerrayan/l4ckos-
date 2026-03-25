import { Column, Row, Text } from "@react-email/components";
import { EmailPanel } from "./EmailPanel.jsx";
import { EmailSectionTitle } from "./EmailSectionTitle.jsx";

export function EmailOrderSummary({ orderNumber, total, statusLabel, shippingLabel, items = [] }) {
  return (
    <>
      <EmailSectionTitle>Resumo do pedido</EmailSectionTitle>
      <EmailPanel>
        <Row>
          <Column>
            <Text style={styles.label}>Pedido</Text>
            <Text style={styles.value}>#{orderNumber || "-"}</Text>
          </Column>
          <Column>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>{total || "-"}</Text>
          </Column>
        </Row>
        {statusLabel || shippingLabel ? (
          <Row>
            <Column>
              {statusLabel ? (
                <>
                  <Text style={styles.label}>Status</Text>
                  <Text style={styles.secondary}>{statusLabel}</Text>
                </>
              ) : null}
            </Column>
            <Column>
              {shippingLabel ? (
                <>
                  <Text style={styles.label}>Entrega</Text>
                  <Text style={styles.secondary}>{shippingLabel}</Text>
                </>
              ) : null}
            </Column>
          </Row>
        ) : null}
        {items.length
          ? items.slice(0, 4).map((item, index) => (
              <Row key={`${item.name}-${index}`}>
                <Column>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>Quantidade: {item.quantity}</Text>
                </Column>
                <Column align="right">
                  <Text style={styles.secondary}>{item.price || ""}</Text>
                </Column>
              </Row>
            ))
          : null}
      </EmailPanel>
    </>
  );
}

const styles = {
  label: {
    margin: "0 0 4px",
    color: "#8b949e",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  value: {
    margin: "0 0 10px",
    color: "#f5f1e8",
    fontSize: "18px",
    fontWeight: "800",
  },
  secondary: {
    margin: "0 0 10px",
    color: "#d1d5db",
    fontSize: "13px",
    lineHeight: "1.6",
  },
  itemName: {
    margin: "0 0 2px",
    color: "#f5f1e8",
    fontSize: "14px",
    fontWeight: "700",
  },
  itemMeta: {
    margin: "0 0 10px",
    color: "#8b949e",
    fontSize: "12px",
  },
};
