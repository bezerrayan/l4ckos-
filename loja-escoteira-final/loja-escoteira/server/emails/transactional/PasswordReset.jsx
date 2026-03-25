import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function PasswordReset({ name, resetUrl }) {
  return (
    <EmailLayout preview="Redefina sua senha L4CKOS" title="Redefinicao de senha" subtitle="Protecao da sua conta">
      <EmailStatusBadge tone="warning">ACAO DE SEGURANCA</EmailStatusBadge>
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Recebemos uma solicitacao para redefinir a senha da sua conta. Se foi voce, continue pelo link abaixo. Se nao foi, ignore este email.</Text>
      {resetUrl ? <EmailButton href={resetUrl}>Redefinir senha</EmailButton> : null}
    </EmailLayout>
  );
}
