import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailProductGrid } from "../components/EmailProductGrid.jsx";

export function AbandonedCartReminder2({ name, cartUrl, products = [], unsubscribeUrl }) {
  return (
    <EmailLayout
      preview="Seu carrinho segue separado para voce"
      title="Os itens ainda estao aqui"
      subtitle="Antes de virar disponibilidade e preco"
      unsubscribeUrl={unsubscribeUrl}
      isMarketing
    >
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>
        Sua selecao continua registrada. Se a compra ainda estiver no radar, este e o melhor momento para concluir sem
        correr o risco de perder disponibilidade.
      </Text>
      <EmailProductGrid title="O que ficou no carrinho" products={products} />
      {cartUrl ? <EmailButton href={cartUrl}>Retomar checkout</EmailButton> : null}
    </EmailLayout>
  );
}
