import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailOrderSummary } from "../components/EmailOrderSummary.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function OrderShipped({ customerName, orderNumber, trackingCode, trackingUrl }) {
  return (
    <EmailLayout preview={`Pedido #${orderNumber} enviado`} title="Pedido enviado" subtitle={`Pedido #${orderNumber}`}>
      <EmailStatusBadge tone="info">EM TRANSITO</EmailStatusBadge>
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>Seu pedido saiu da operacao e agora esta a caminho do endereco informado.</Text>
      <EmailOrderSummary orderNumber={orderNumber} statusLabel={`Rastreio ${trackingCode || "-"}`} />
      {trackingUrl ? <EmailButton href={trackingUrl}>Rastrear pedido</EmailButton> : null}
    </EmailLayout>
  );
}
