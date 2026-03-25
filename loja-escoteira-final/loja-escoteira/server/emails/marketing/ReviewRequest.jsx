import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";

export function ReviewRequest({ name, orderNumber, reviewUrl }) {
  return (
    <EmailLayout preview={`Como foi o pedido #${orderNumber}?`} title="Queremos ouvir voce" subtitle={`Pedido #${orderNumber}`}>
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Seu feedback ajuda a L4CKOS a ajustar curadoria, operacao e experiencia. Se puder, avalie seu pedido.</Text>
      {reviewUrl ? <EmailButton href={reviewUrl}>Enviar avaliacao</EmailButton> : null}
    </EmailLayout>
  );
}
