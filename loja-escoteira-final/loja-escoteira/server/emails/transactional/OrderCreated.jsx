import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailOrderSummary } from "../components/EmailOrderSummary.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function OrderCreated({ customerName, orderNumber, total, items, orderUrl }) {
  return (
    <EmailLayout preview={`Pedido #${orderNumber} criado`} title="Pedido recebido" subtitle={`Pedido #${orderNumber}`}>
      <EmailStatusBadge tone="info">NOVO PEDIDO</EmailStatusBadge>
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>Recebemos seu pedido e ja reservamos os itens selecionados. Agora seguimos aguardando a confirmacao do pagamento para liberar a operacao.</Text>
      <EmailOrderSummary orderNumber={orderNumber} total={total} statusLabel="Pedido criado" items={items} />
      {orderUrl ? <EmailButton href={orderUrl}>Acompanhar pedido</EmailButton> : null}
    </EmailLayout>
  );
}
