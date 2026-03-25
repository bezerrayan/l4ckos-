import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailCouponPanel } from "../components/EmailCouponPanel.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";

export function PromotionEmail({ name, promotionUrl, couponCode, couponDescription }) {
  return (
    <EmailLayout preview="Selecao especial L4CKOS" title="Promocao em andamento" subtitle="Uma janela curta para comprar melhor">
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Selecionamos uma oportunidade especial para voce voltar a comprar com a L4CKOS em condicoes mais fortes.</Text>
      <EmailCouponPanel code={couponCode} description={couponDescription} />
      {promotionUrl ? <EmailButton href={promotionUrl}>Aproveitar promocao</EmailButton> : null}
    </EmailLayout>
  );
}
