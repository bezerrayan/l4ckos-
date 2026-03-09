import { Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout.jsx";

export function ContactAutoReplyEmail({ name }) {
  const safeName = String(name || "Cliente");

  return (
    <EmailLayout
      preview="Recebemos sua mensagem - L4CKOS"
      title="Recebemos sua mensagem"
      subtitle="Obrigado por entrar em contato com a L4CKOS"
      footerNote="Este é um e-mail automático. Nossa equipe responderá em breve."
    >
      <Text>Olá, {safeName}.</Text>
      <Text>Obrigado pelo seu contato. Sua mensagem foi recebida com sucesso e já está com o nosso time.</Text>
      <Text>Em breve, você receberá um retorno da equipe L4CKOS.</Text>
      <Text style={{ color: "#6d6d6d", fontSize: "12px" }}>
        Por segurança, não compartilhe senhas, códigos ou dados sensíveis por e-mail.
      </Text>
    </EmailLayout>
  );
}
