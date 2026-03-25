import { Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailOrderSummary } from "../components/EmailOrderSummary.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function OrderPreparing({ customerName, orderNumber, total }) {
  return (
    <EmailLayout preview={`Pedido #${orderNumber} em preparacao`} title="Seu pedido entrou em preparacao" subtitle={`Pedido #${orderNumber}`}>
      <EmailStatusBadge tone="info">EM SEPARACAO</EmailStatusBadge>
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>Seu pedido ja esta sendo separado pela equipe. Assim que o envio for concluido, voce recebe o rastreio automaticamente.</Text>
      <EmailOrderSummary orderNumber={orderNumber} total={total} statusLabel="Em preparacao" />
    </EmailLayout>
  );
}
