import { Img, Link, Text } from "@react-email/components";

export function EmailFooter({ note, unsubscribeUrl, isMarketing = false }) {
  const logoUrl = String(process.env.EMAIL_SIGNATURE_LOGO_URL || "").trim();
  const contactEmail = String(process.env.EMAIL_SIGNATURE_CONTACT_EMAIL || "contato@l4ckos.com.br").trim();
  const websiteUrl = String(process.env.EMAIL_SIGNATURE_WEBSITE || "https://l4ckos.com.br").trim();
  const instagramUrl = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_URL || "https://instagram.com/l4ckosstore").trim();
  const instagramLabel = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_LABEL || "@l4ckosstore").trim();
  const websiteLabel = websiteUrl.replace("https://", "").replace("http://", "");

  return (
    <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#f3eeea" style={styles.table}>
      <tbody>
        <tr>
          <td bgcolor="#f3eeea" style={styles.cell}>
            <Text style={styles.note}>{note || "L4CKOS. Comunicação automatizada da operação."}</Text>
            <table role="presentation" cellPadding="0" cellSpacing="0" width="100%" style={styles.infoTable}>
              <tbody>
                <tr>
                  <td style={styles.logoCol}>
                    {logoUrl ? <Img src={logoUrl} alt="L4CKOS" width="76" style={styles.logo} /> : <div style={styles.fallback}>L4K</div>}
                  </td>
                  <td style={styles.infoCol}>
                    <Text style={styles.brand}>L4CKOS</Text>
                    <Text style={styles.links}>
                      <Link href={websiteUrl} style={styles.link}>{websiteLabel}</Link>
                      {" • "}
                      <Link href={instagramUrl} style={styles.link}>{instagramLabel}</Link>
                      {" • "}
                      <Link href={`mailto:${contactEmail}`} style={styles.link}>{contactEmail}</Link>
                    </Text>
                    <Text style={styles.unsubscribe}>
                      {isMarketing
                        ? "Este email faz parte da comunicação de marketing da L4CKOS."
                        : "Emails transacionais mantêm você atualizado sobre conta, pedido e operação da L4CKOS."}
                      {isMarketing && unsubscribeUrl ? (
                        <>
                          {" "}
                          <Link href={unsubscribeUrl} style={styles.unsubscribeLink}>Descadastrar</Link>
                        </>
                      ) : null}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#f3eeea",
  },
  cell: {
    padding: "24px 28px 30px",
    backgroundColor: "#f3eeea",
    borderTop: "1px solid #3a3435",
  },
  note: {
    margin: "0 0 18px",
    color: "#8a8183",
    fontSize: "10px",
    lineHeight: "16px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  infoTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  logoCol: {
    width: "92px",
    verticalAlign: "top",
  },
  logo: {
    display: "block",
    width: "76px",
    height: "76px",
    objectFit: "cover",
    borderRadius: "14px",
    border: "1px solid #341019",
    backgroundColor: "#111113",
  },
  fallback: {
    width: "76px",
    height: "76px",
    lineHeight: "76px",
    textAlign: "center",
    borderRadius: "14px",
    border: "1px solid #341019",
    backgroundColor: "#111113",
    color: "#ff314d",
    fontSize: "22px",
    fontWeight: "700",
  },
  infoCol: {
    paddingLeft: "16px",
    verticalAlign: "top",
  },
  brand: {
    margin: "0",
    color: "#2a2628",
    fontSize: "34px",
    lineHeight: "36px",
    fontWeight: "700",
    letterSpacing: "-0.6px",
  },
  links: {
    margin: "10px 0 0",
    color: "#6d6668",
    fontSize: "14px",
    lineHeight: "27px",
  },
  link: {
    color: "#6d6668",
    textDecoration: "none",
  },
  unsubscribe: {
    margin: "10px 0 0",
    color: "#8a8183",
    fontSize: "11px",
    lineHeight: "20px",
  },
  unsubscribeLink: {
    color: "#d5152f",
    textDecoration: "underline",
  },
};
