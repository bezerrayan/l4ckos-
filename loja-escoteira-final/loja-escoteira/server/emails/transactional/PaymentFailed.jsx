import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailOrderSummary } from "../components/EmailOrderSummary.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function PaymentFailed({ customerName, orderNumber, total, paymentUrl, failureReason }) {
  return (
    <EmailLayout preview={`Pagamento nao aprovado - Pedido #${orderNumber}`} title="Pagamento nao aprovado" subtitle={`Pedido #${orderNumber}`}>
      <EmailStatusBadge tone="danger">FALHA NO PAGAMENTO</EmailStatusBadge>
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>Nao conseguimos confirmar o pagamento da sua compra. Revise os dados e tente novamente para manter os itens do pedido.</Text>
      <EmailOrderSummary orderNumber={orderNumber} total={total} statusLabel={failureReason || "Pagamento recusado"} />
      {paymentUrl ? <EmailButton href={paymentUrl}>Tentar novamente</EmailButton> : null}
    </EmailLayout>
  );
}
