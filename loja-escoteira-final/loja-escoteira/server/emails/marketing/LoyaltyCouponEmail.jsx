import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailCouponPanel } from "../components/EmailCouponPanel.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";

export function LoyaltyCouponEmail({ name, couponCode, couponDescription, shopUrl }) {
  return (
    <EmailLayout preview="Seu proximo passo na L4CKOS" title="Incentivo para a proxima compra" subtitle="Beneficio de fidelizacao">
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Obrigado por seguir construindo a jornada com a L4CKOS. Liberamos um incentivo para a sua proxima compra.</Text>
      <EmailCouponPanel code={couponCode} description={couponDescription} />
      {shopUrl ? <EmailButton href={shopUrl}>Usar beneficio</EmailButton> : null}
    </EmailLayout>
  );
}
