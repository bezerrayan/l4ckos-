import { Text } from "@react-email/components";
import { EmailButton } from "./components/EmailButton.jsx";
import { EmailLayout } from "./components/EmailLayout.jsx";

export function ResetPasswordEmail({ name, resetUrl }) {
  const safeName = String(name || "Cliente");
  const safeResetUrl = String(resetUrl || "");

  return (
    <EmailLayout preview="Redefinir senha - L4CKOS" title="RedefiniÃ§Ã£o de senha" subtitle="SolicitaÃ§Ã£o de seguranÃ§a da conta">
      <Text>OlÃ¡, {safeName}.</Text>
      <Text>Recebemos uma solicitaÃ§Ã£o para redefinir a senha da sua conta L4CKOS.</Text>
      {safeResetUrl ? <EmailButton href={safeResetUrl}>Redefinir senha</EmailButton> : null}
      <Text style={{ color: "#6d6d6d", fontSize: "12px" }}>
        Se você não solicitou esta alteração, ignore este e-mail. Sua conta continuará segura.
      </Text>
    </EmailLayout>
  );
}
