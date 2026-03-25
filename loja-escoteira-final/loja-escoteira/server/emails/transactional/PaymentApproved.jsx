import { Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailOrderSummary } from "../components/EmailOrderSummary.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function PaymentApproved({ customerName, orderNumber, total }) {
  return (
    <EmailLayout preview={`Pagamento aprovado - Pedido #${orderNumber}`} title="Pagamento aprovado" subtitle={`Pedido #${orderNumber}`}>
      <EmailStatusBadge tone="success">PAGAMENTO CONFIRMADO</EmailStatusBadge>
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>Seu pagamento foi confirmado com sucesso. A equipe da L4CKOS agora libera o pedido para separacao e preparo.</Text>
      <EmailOrderSummary orderNumber={orderNumber} total={total} statusLabel="Pagamento aprovado" />
    </EmailLayout>
  );
}
