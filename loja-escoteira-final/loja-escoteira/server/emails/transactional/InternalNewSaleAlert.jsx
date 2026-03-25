import { Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailOrderSummary } from "../components/EmailOrderSummary.jsx";
import { EmailProductGrid } from "../components/EmailProductGrid.jsx";

export function InternalNewSaleAlert({ customerName, customerEmail, orderNumber, total, items = [], orderUrl }) {
  return (
    <EmailLayout preview={`Nova venda confirmada #${orderNumber}`} title="Nova venda confirmada" subtitle={`Pedido #${orderNumber}`}>
      <Text>Pagamento confirmado na L4CKOS.</Text>
      <EmailOrderSummary
        orderNumber={orderNumber}
        total={total}
        items={items}
        orderUrl={orderUrl}
        statusLabel="Pagamento aprovado"
      />
      <EmailProductGrid title="Itens vendidos" products={items} />
      <Text>Cliente: {customerName || "Cliente"} ({customerEmail || "sem email"})</Text>
    </EmailLayout>
  );
}
