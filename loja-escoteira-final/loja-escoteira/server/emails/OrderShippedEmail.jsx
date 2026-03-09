import { Text } from "@react-email/components";
import { EmailButton } from "./components/EmailButton.jsx";
import { EmailInfoRow } from "./components/EmailInfoRow.jsx";
import { EmailLayout } from "./components/EmailLayout.jsx";

export function OrderShippedEmail({ customerName, orderNumber, trackingCode, trackingUrl }) {
  const safeName = String(customerName || "Cliente");
  const safeOrder = String(orderNumber || "-");
  const safeTrackingCode = String(trackingCode || "-");
  const safeTrackingUrl = String(trackingUrl || "");

  return (
    <EmailLayout preview={`Seu pedido foi enviado #${safeOrder}`} title="Seu pedido foi enviado" subtitle={`Pedido #${safeOrder}`}>
      <Text>Ola, {safeName}.</Text>
      <Text>Seu pedido foi despachado e ja esta em rota de entrega.</Text>
      <EmailInfoRow label="Numero do pedido" value={`#${safeOrder}`} />
      <EmailInfoRow label="Codigo de rastreio" value={safeTrackingCode} />
      {safeTrackingUrl ? <EmailButton href={safeTrackingUrl}>Rastrear pedido</EmailButton> : null}
    </EmailLayout>
  );
}
