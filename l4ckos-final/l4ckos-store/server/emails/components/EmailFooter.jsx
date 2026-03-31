import { Img, Link, Section, Text } from "@react-email/components";

export function EmailFooter({ note, unsubscribeUrl, isMarketing = false }) {
  const logoUrl = String(process.env.EMAIL_SIGNATURE_LOGO_URL || "").trim();
  const contactEmail = String(process.env.EMAIL_SIGNATURE_CONTACT_EMAIL || "contato@l4ckos.com.br").trim();
  const websiteUrl = String(process.env.EMAIL_SIGNATURE_WEBSITE || "https://l4ckos.com.br").trim();
  const instagramUrl = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_URL || "https://instagram.com/l4ckosstore").trim();
  const instagramLabel = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_LABEL || "@l4ckosstore").trim();
  const websiteLabel = websiteUrl.replace("https://", "").replace("http://", "");

  return (
    <Section style={styles.wrap}>
      <Text style={styles.note}>{note || "L4CKOS. Comunicação automatizada da operação."}</Text>
      <table role="presentation" cellPadding="0" cellSpacing="0" width="100%" style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.logoCol}>
              {logoUrl ? (
                <Img src={logoUrl} alt="L4CKOS" width="88" style={styles.logo} />
              ) : (
                <Text style={styles.brand}>L4CKOS</Text>
              )}
            </td>
            <td style={styles.infoCol}>
              <Text style={styles.brand}>L4CKOS</Text>
              <Text style={styles.links}>
                <Link href={websiteUrl} style={styles.link}>
                  {websiteLabel}
                </Link>
                {" • "}
                <Link href={instagramUrl} style={styles.link}>
                  {instagramLabel}
                </Link>
                {" • "}
                <Link href={`mailto:${contactEmail}`} style={styles.link}>
                  {contactEmail}
                </Link>
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
      {isMarketing ? (
        <Text style={styles.unsubscribe}>
          Este email faz parte da comunicação de marketing da L4CKOS.{" "}
          {unsubscribeUrl ? (
            <Link href={unsubscribeUrl} style={styles.unsubscribeLink}>
              Descadastrar
            </Link>
          ) : (
            "Atualize seu descadastro quando aplicável."
          )}
        </Text>
      ) : (
        <Text style={styles.unsubscribe}>
          Emails transacionais mantêm você atualizado sobre conta, pedido e operação da L4CKOS.
        </Text>
      )}
    </Section>
  );
}

const styles = {
  wrap: {
    borderTop: "1px solid #c5b8ae",
    backgroundColor: "#322d27",
    padding: "20px 28px 24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  note: {
    margin: "0 0 10px",
    color: "#8b827d",
    fontSize: "12px",
    lineHeight: "1.6",
  },
  logoCol: {
    width: "104px",
    verticalAlign: "top",
    paddingRight: "14px",
  },
  logo: {
    display: "block",
    width: "88px",
    height: "88px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  infoCol: {
    verticalAlign: "middle",
  },
  brand: {
    margin: "0 0 6px",
    color: "#f3efe9",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "0.04em",
  },
  links: {
    margin: "0",
    color: "#a9a19b",
    fontSize: "13px",
    lineHeight: "1.8",
  },
  link: {
    color: "#a9a19b",
    textDecoration: "none",
  },
  unsubscribe: {
    margin: "12px 0 0",
    color: "#8b827d",
    fontSize: "11px",
    lineHeight: "1.6",
  },
  unsubscribeLink: {
    color: "#ff6a7b",
    textDecoration: "underline",
  },
};
