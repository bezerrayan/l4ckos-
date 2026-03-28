import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailProductGrid } from "../components/EmailProductGrid.jsx";

export function NewProductsAnnouncement({ name, products = [], productsUrl, unsubscribeUrl }) {
  return (
    <EmailLayout
      preview="Novidades recem-liberadas na L4CKOS"
      title="Novos produtos ja disponiveis"
      subtitle="Curadoria recem-publicada"
      unsubscribeUrl={unsubscribeUrl}
      isMarketing
    >
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>
        Entraram novas pecas e equipamentos no catalogo da L4CKOS. Se voce acompanha a nossa curadoria de perto, esta
        e a janela mais limpa para ver o que acabou de sair.
      </Text>
      <EmailProductGrid title="Novidades em destaque" products={products} />
      {productsUrl ? <EmailButton href={productsUrl}>Ver novidades</EmailButton> : null}
    </EmailLayout>
  );
}
