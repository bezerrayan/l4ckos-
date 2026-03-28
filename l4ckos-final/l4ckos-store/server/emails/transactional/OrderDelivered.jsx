import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function OrderDelivered({ customerName, orderNumber, orderUrl }) {
  return (
    <EmailLayout preview={`Pedido #${orderNumber} entregue`} title="Pedido entregue" subtitle={`Pedido #${orderNumber}`}>
      <EmailStatusBadge tone="success">ENTREGA CONCLUIDA</EmailStatusBadge>
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>Seu pedido foi marcado como entregue. Se estiver tudo certo, voce ja pode conferir os detalhes e seguir com a experiencia L4CKOS.</Text>
      {orderUrl ? <EmailButton href={orderUrl}>Ver pedido</EmailButton> : null}
    </EmailLayout>
  );
}
