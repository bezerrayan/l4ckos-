import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailOrderSummary } from "../components/EmailOrderSummary.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function PaymentPending({ customerName, orderNumber, total, paymentUrl, dueLabel }) {
  return (
    <EmailLayout preview={`Pagamento pendente do pedido #${orderNumber}`} title="Pagamento pendente" subtitle={`Pedido #${orderNumber}`}>
      <EmailStatusBadge tone="warning">AGUARDANDO PAGAMENTO</EmailStatusBadge>
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>Sua cobranca foi gerada e o pedido continua reservado por enquanto. Finalize o pagamento para colocar a L4CKOS em movimento.</Text>
      <EmailOrderSummary orderNumber={orderNumber} total={total} statusLabel="Pagamento pendente" shippingLabel={dueLabel} />
      {paymentUrl ? <EmailButton href={paymentUrl}>Concluir pagamento</EmailButton> : null}
    </EmailLayout>
  );
}
