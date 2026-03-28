import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailProductGrid } from "../components/EmailProductGrid.jsx";

export function AbandonedCartReminder3({ name, cartUrl, products = [], unsubscribeUrl }) {
  return (
    <EmailLayout
      preview="Ultima chamada para fechar sua selecao"
      title="Ultimo aviso sobre o seu carrinho"
      subtitle="Feche a compra antes da proxima rodada"
      unsubscribeUrl={unsubscribeUrl}
      isMarketing
    >
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>
        Este e o ultimo lembrete desta sequencia. Se voce quiser manter essa escolha na sua rota, finalize agora e
        garanta os itens antes da proxima rotacao de estoque.
      </Text>
      <EmailProductGrid title="Itens prestes a sair da sua rota" products={products} />
      {cartUrl ? <EmailButton href={cartUrl}>Finalizar meu pedido</EmailButton> : null}
    </EmailLayout>
  );
}
