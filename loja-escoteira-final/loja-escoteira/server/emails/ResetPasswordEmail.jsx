import { Text } from "@react-email/components";
import { EmailButton } from "./components/EmailButton.jsx";
import { EmailLayout } from "./components/EmailLayout.jsx";

export function ResetPasswordEmail({ name, resetUrl }) {
  const safeName = String(name || "Cliente");
  const safeResetUrl = String(resetUrl || "");

  return (
    <EmailLayout preview="Redefinir senha - L4CKOS" title="Redefinicao de senha" subtitle="Solicitacao de seguranca da conta">
      <Text>Ola, {safeName}.</Text>
      <Text>Recebemos uma solicitacao para redefinir a senha da sua conta L4CKOS.</Text>
      {safeResetUrl ? <EmailButton href={safeResetUrl}>Redefinir senha</EmailButton> : null}
      <Text style={{ color: "#6d6d6d", fontSize: "12px" }}>
        Se voce nao solicitou essa alteracao, ignore este email. Sua conta continuara segura.
      </Text>
    </EmailLayout>
  );
}
