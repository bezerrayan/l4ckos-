import { Text } from "@react-email/components";
import { EmailInfoRow } from "./components/EmailInfoRow.jsx";
import { EmailLayout } from "./components/EmailLayout.jsx";

export function PaymentApprovedEmail({ customerName, orderNumber, total }) {
  const safeName = String(customerName || "Cliente");
  const safeOrder = String(orderNumber || "-");
  const safeTotal = String(total || "-");

  return (
    <EmailLayout
      preview={`Pagamento aprovado - Pedido #${safeOrder}`}
      title="Pagamento aprovado"
      subtitle={`Pedido #${safeOrder}`}
    >
      <Text>Olá, {safeName}.</Text>
      <Text>Seu pagamento foi aprovado com sucesso. Agora vamos preparar seu pedido para envio.</Text>
      <EmailInfoRow label="Número do pedido" value={`#${safeOrder}`} />
      <EmailInfoRow label="Total pago" value={safeTotal} />
      <Text>Assim que seu pedido for despachado, voce recebera um novo email com rastreio.</Text>
    </EmailLayout>
  );
}
