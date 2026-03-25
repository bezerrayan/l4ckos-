import { Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailPanel } from "../components/EmailPanel.jsx";
import { EmailSectionTitle } from "../components/EmailSectionTitle.jsx";

export function NewContactInternal({ name, email, phone, subject, message }) {
  return (
    <EmailLayout preview="Novo contato do site" title="Novo contato" subtitle="Mensagem recebida pelo formulario da loja">
      <EmailSectionTitle>Dados do contato</EmailSectionTitle>
      <EmailPanel>
        <Text>Nome: {name}</Text>
        <Text>Email: {email}</Text>
        {phone ? <Text>Telefone: {phone}</Text> : null}
        <Text>Assunto: {subject || "Contato geral"}</Text>
      </EmailPanel>
      <EmailSectionTitle>Mensagem</EmailSectionTitle>
      <EmailPanel>
        <Text>{message}</Text>
      </EmailPanel>
    </EmailLayout>
  );
}
