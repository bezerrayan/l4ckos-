import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailProductGrid } from "../components/EmailProductGrid.jsx";

export function CrossSellEmail({ name, collectionUrl, products = [], unsubscribeUrl }) {
  return (
    <EmailLayout
      preview="Complete seu setup L4CKOS"
      title="Itens que combinam com sua compra"
      subtitle="Curadoria complementar"
      unsubscribeUrl={unsubscribeUrl}
      isMarketing
    >
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Selecionamos algumas pecas e itens de apoio que combinam com o seu ultimo pedido.</Text>
      <EmailProductGrid title="Sugestoes para complementar" products={products} />
      {collectionUrl ? <EmailButton href={collectionUrl}>Ver selecao</EmailButton> : null}
    </EmailLayout>
  );
}
