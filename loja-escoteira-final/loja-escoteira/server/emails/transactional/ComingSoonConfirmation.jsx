import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function ComingSoonConfirmation({ name, launchUrl }) {
  return (
    <EmailLayout preview="Lista de espera confirmada" title="Voce esta dentro" subtitle="Lista de espera L4CKOS">
      <EmailStatusBadge tone="info">PRE-LANCAMENTO</EmailStatusBadge>
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Seu cadastro na lista de espera da L4CKOS foi confirmado. Quando o drop abrir, voce vai receber o aviso antes do publico geral.</Text>
      {launchUrl ? <EmailButton href={launchUrl}>Acompanhar lancamento</EmailButton> : null}
    </EmailLayout>
  );
}
