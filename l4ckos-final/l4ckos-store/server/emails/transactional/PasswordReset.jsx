import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function PasswordReset({ name, resetUrl }) {
  return (
    <EmailLayout preview="Redefina sua senha L4CKOS" title="Redefinição de senha" subtitle="Proteção da sua conta">
      <EmailStatusBadge tone="warning">AÇÃO DE SEGURANÇA</EmailStatusBadge>
      <Text>Olá, {name || "cliente"}.</Text>
      <Text>
        Recebemos uma solicitação para redefinir a senha da sua conta. Se foi você, continue pelo link abaixo.
        Se não foi, ignore este e-mail.
      </Text>
      {resetUrl ? <EmailButton href={resetUrl}>Redefinir senha</EmailButton> : null}
      <Text>Por segurança, este link expira em 1 hora e só pode ser usado uma vez.</Text>
    </EmailLayout>
  );
}
