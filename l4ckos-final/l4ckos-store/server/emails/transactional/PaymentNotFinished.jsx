import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailPanel } from "../components/EmailPanel.jsx";

export function PaymentNotFinished({ customerName, orderNumber, total, paymentUrl, recoveryWindowLabel }) {
  return (
    <EmailLayout
      preview={`Seu pedido #${orderNumber} ainda pode ser concluido`}
      title="Sua compra ainda esta em aberto"
      subtitle={`Pedido #${orderNumber}`}
    >
      <Text>Ola, {customerName || "cliente"}.</Text>
      <Text>
        Identificamos que a compra nao foi concluida. Se voce ainda quiser seguir com o pedido, basta retomar o fluxo
        de pagamento.
      </Text>
      <EmailPanel title="Resumo rapido">
        <Text style={{ margin: "0 0 8px" }}>Total previsto: {total}</Text>
        <Text style={{ margin: 0 }}>Janela de retomada: {recoveryWindowLabel || "enquanto a cobranca estiver ativa"}</Text>
      </EmailPanel>
      {paymentUrl ? <EmailButton href={paymentUrl}>Retomar pagamento</EmailButton> : null}
    </EmailLayout>
  );
}
