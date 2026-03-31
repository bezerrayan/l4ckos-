import { Link, Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailPanel } from "../components/EmailPanel.jsx";
import { EmailSectionTitle } from "../components/EmailSectionTitle.jsx";
import { EmailInfoRow } from "../components/EmailInfoRow.jsx";

export function NewContactInternal({ name, email, phone, subject, message }) {
  return (
    <EmailLayout preview="Novo contato do site" title="Novo contato" subtitle="Mensagem recebida pelo formulário da loja.">
      <EmailSectionTitle>Dados do contato</EmailSectionTitle>
      <EmailPanel>
        <EmailInfoRow label="Nome" value={name || "-"} />
        <EmailInfoRow
          label="Email"
          value={
            <Link href={`mailto:${email}`} style={styles.link}>
              {email || "-"}
            </Link>
          }
        />
        {phone ? <EmailInfoRow label="Telefone" value={phone} /> : null}
        <EmailInfoRow label="Assunto" value={subject || "Contato geral"} />
      </EmailPanel>

      <EmailSectionTitle>Mensagem</EmailSectionTitle>
      <EmailPanel>
        <Text style={styles.message}>{message || "-"}</Text>
      </EmailPanel>
    </EmailLayout>
  );
}

const styles = {
  link: {
    color: "#ffffff",
    textDecoration: "none",
  },
  message: {
    margin: 0,
    color: "#efeff1",
    fontSize: "16px",
    lineHeight: "1.9",
    whiteSpace: "pre-wrap",
  },
};
