import { Link, Section, Text } from "@react-email/components";

export function EmailFooter({ note, unsubscribeUrl, isMarketing = false }) {
  const contactEmail = String(process.env.EMAIL_SIGNATURE_CONTACT_EMAIL || "contato@l4ckos.com.br").trim();
  const websiteUrl = String(process.env.EMAIL_SIGNATURE_WEBSITE || "https://l4ckos.com.br").trim();
  const instagramUrl = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_URL || "https://instagram.com/l4ckosstore").trim();
  const instagramLabel = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_LABEL || "@l4ckosstore").trim();
  const websiteLabel = websiteUrl.replace("https://", "").replace("http://", "");

  return (
    <Section style={styles.wrap}>
      <Text style={styles.note}>{note || "L4CKOS. Comunicacao automatizada da operacao."}</Text>
      <Text style={styles.brand}>L4CKOS</Text>
      <Text style={styles.links}>
        <Link href={websiteUrl} style={styles.link}>
          {websiteLabel}
        </Link>
        {"  •  "}
        <Link href={instagramUrl} style={styles.link}>
          {instagramLabel}
        </Link>
        {"  •  "}
        <Link href={`mailto:${contactEmail}`} style={styles.link}>
          {contactEmail}
        </Link>
      </Text>
      {isMarketing ? (
        <Text style={styles.unsubscribe}>
          Este email faz parte da comunicacao de marketing da L4CKOS.{" "}
          {unsubscribeUrl ? (
            <Link href={unsubscribeUrl} style={styles.unsubscribeLink}>
              Descadastrar
            </Link>
          ) : (
            "Atualize seu descadastro quando aplicavel."
          )}
        </Text>
      ) : (
        <Text style={styles.unsubscribe}>
          Emails transacionais mantem voce atualizado sobre conta, pedido e operacao da L4CKOS.
        </Text>
      )}
    </Section>
  );
}

const styles = {
  wrap: {
    borderTop: "1px solid #ded8cd",
    backgroundColor: "#f3eee6",
    padding: "20px 28px 24px",
  },
  note: {
    margin: "0 0 10px",
    color: "#7a7f88",
    fontSize: "12px",
    lineHeight: "1.6",
  },
  brand: {
    margin: "0 0 8px",
    color: "#181818",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "0.04em",
  },
  links: {
    margin: "0",
    color: "#5a6068",
    fontSize: "13px",
    lineHeight: "1.8",
  },
  link: {
    color: "#5a6068",
    textDecoration: "none",
  },
  unsubscribe: {
    margin: "12px 0 0",
    color: "#7a7f88",
    fontSize: "11px",
    lineHeight: "1.6",
  },
  unsubscribeLink: {
    color: "#181818",
    textDecoration: "underline",
  },
};
