import { Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout.jsx";

export function ContactAutoReplyEmail({ name }) {
  const safeName = String(name || "Cliente");

  return (
    <EmailLayout
      preview="Recebemos sua mensagem - L4CKOS"
      title="Recebemos sua mensagem"
      subtitle="Obrigado por entrar em contato com a L4CKOS"
      footerNote="Este e um email automatico. Nossa equipe respondera em breve."
    >
      <Text>Ola, {safeName}.</Text>
      <Text>Obrigado pelo seu contato. Sua mensagem foi recebida com sucesso e ja esta com o nosso time.</Text>
      <Text>Em breve voce recebera um retorno da equipe L4CKOS.</Text>
      <Text style={{ color: "#6d6d6d", fontSize: "12px" }}>
        Por seguranca, nao compartilhe senhas, codigos ou dados sensiveis por email.
      </Text>
    </EmailLayout>
  );
}
