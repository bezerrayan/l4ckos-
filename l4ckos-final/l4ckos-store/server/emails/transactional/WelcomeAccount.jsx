import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function WelcomeAccount({ name, appUrl }) {
  return (
    <EmailLayout preview="Sua conta L4CKOS foi criada" title="Bem-vindo a L4CKOS" subtitle="Sua conta ja esta pronta">
      <EmailStatusBadge tone="success">CONTA ATIVA</EmailStatusBadge>
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Sua conta foi criada com sucesso. Agora voce pode acompanhar pedidos, salvar favoritos, revisar enderecos e operar tudo com mais agilidade.</Text>
      {appUrl ? <EmailButton href={appUrl}>Entrar na conta</EmailButton> : null}
    </EmailLayout>
  );
}
