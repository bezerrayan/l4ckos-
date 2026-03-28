import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailProductGrid } from "../components/EmailProductGrid.jsx";

export function AbandonedCartReminder1({ name, cartUrl, products = [], unsubscribeUrl }) {
  return (
    <EmailLayout
      preview="Seu carrinho ainda esta te esperando"
      title="Seu carrinho ficou para tras"
      subtitle="Os itens continuam reservados por pouco tempo"
      unsubscribeUrl={unsubscribeUrl}
      isMarketing
    >
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Voce deixou uma selecao pronta no carrinho. Se ainda fizer sentido, retome a compra antes da proxima virada de estoque.</Text>
      <EmailProductGrid title="Itens lembrados" products={products} />
      {cartUrl ? <EmailButton href={cartUrl}>Voltar para o carrinho</EmailButton> : null}
    </EmailLayout>
  );
}
