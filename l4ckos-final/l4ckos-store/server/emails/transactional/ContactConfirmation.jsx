import { Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function ContactConfirmation({ name }) {
  return (
    <EmailLayout preview="Recebemos sua mensagem" title="Contato recebido" subtitle="Nosso time retorna em breve">
      <EmailStatusBadge tone="neutral">ATENDIMENTO</EmailStatusBadge>
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Recebemos sua mensagem e ela ja entrou na fila do atendimento da L4CKOS. Assim que houver retorno, seguimos pelo mesmo email.</Text>
    </EmailLayout>
  );
}
