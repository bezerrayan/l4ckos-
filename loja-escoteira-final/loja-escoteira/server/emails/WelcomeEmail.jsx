import { Text } from "@react-email/components";
import { EmailButton } from "./components/EmailButton.jsx";
import { EmailLayout } from "./components/EmailLayout.jsx";

export function WelcomeEmail({ name }) {
  const safeName = String(name || "Cliente");
  const appBase = String(process.env.APP_BASE_URL || "https://l4ckos.com.br").replace(/\/$/, "");

  return (
    <EmailLayout preview="Bem-vindo a L4CKOS" title="Bem-vindo a L4CKOS" subtitle="Sua conta ja esta pronta">
      <Text>Ola, {safeName}.</Text>
      <Text>
        Seja bem-vindo a L4CKOS, a loja focada em produtos escoteiros e outdoor com curadoria real de campo.
      </Text>
      <Text>Agora voce pode acompanhar pedidos, salvar favoritos e acessar ofertas exclusivas.</Text>
      <EmailButton href={`${appBase}/login`}>Acessar minha conta</EmailButton>
    </EmailLayout>
  );
}
