import { Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailPanel } from "../components/EmailPanel.jsx";

export function InternalPaymentFailedAlert({ customerName, customerEmail, orderNumber, total, failureReason }) {
  return (
    <EmailLayout
      preview={`Falha de pagamento no pedido #${orderNumber}`}
      title="Falha de pagamento"
      subtitle={`Pedido #${orderNumber}`}
    >
      <Text>O provedor retornou uma falha de pagamento que pode exigir acompanhamento.</Text>
      <EmailPanel title="Contexto do pedido">
        <Text style={{ margin: "0 0 8px" }}>Cliente: {customerName || "Cliente"} ({customerEmail || "sem email"})</Text>
        <Text style={{ margin: "0 0 8px" }}>Total previsto: {total}</Text>
        <Text style={{ margin: 0 }}>Motivo: {failureReason || "Nao informado pelo provedor"}</Text>
      </EmailPanel>
    </EmailLayout>
  );
}
