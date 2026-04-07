import { Img, Link, Text } from "@react-email/components";

export function EmailFooter({ note, unsubscribeUrl, isMarketing = false }) {
  const logoUrl = String(process.env.EMAIL_SIGNATURE_LOGO_URL || "").trim();
  const contactEmail = String(process.env.EMAIL_SIGNATURE_CONTACT_EMAIL || "contato@l4ckos.com.br").trim();
  const websiteUrl = String(process.env.EMAIL_SIGNATURE_WEBSITE || "https://l4ckos.com.br").trim();
  const instagramUrl = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_URL || "https://instagram.com/l4ckosstore").trim();
  const instagramLabel = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_LABEL || "@l4ckosstore").trim();
  const websiteLabel = websiteUrl.replace("https://", "").replace("http://", "");

  return (
    <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#090909" style={styles.table}>
      <tbody>
        <tr>
          <td bgcolor="#090909" style={styles.cell}>
            <Text style={styles.note}>{note || "L4CKOS. Comunicação automatizada da operação."}</Text>
            <table role="presentation" cellPadding="0" cellSpacing="0" width="100%" bgcolor="#101010" style={styles.infoTable}>
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
    backgroundColor: "#090909",
  },
  cell: {
    padding: "0 28px 28px",
    backgroundColor: "#090909",
    borderTop: "1px solid #1f1f1f",
  },
  note: {
    margin: "20px 0 16px",
    color: "#8d8d8d",
    fontSize: "10px",
    lineHeight: "16px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  infoTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#101010",
    border: "1px solid #1f1f1f",
  },
  logoCol: {
    width: "96px",
    verticalAlign: "top",
    padding: "18px 0 18px 18px",
  },
  logo: {
    display: "block",
    width: "76px",
    height: "76px",
    objectFit: "cover",
    border: "1px solid #2a2a2a",
    backgroundColor: "#111113",
  },
  fallback: {
    width: "76px",
    height: "76px",
    lineHeight: "76px",
    textAlign: "center",
    border: "1px solid #2a2a2a",
    backgroundColor: "#111113",
    color: "#ff314d",
    fontSize: "22px",
    fontWeight: "700",
  },
  infoCol: {
    padding: "18px 18px 18px 8px",
    verticalAlign: "top",
  },
  brand: {
    margin: "0",
    color: "#f0ede8",
    fontSize: "34px",
    lineHeight: "36px",
    fontWeight: "700",
    letterSpacing: "-0.6px",
  },
  links: {
    margin: "10px 0 0",
    color: "#c6c6c6",
    fontSize: "14px",
    lineHeight: "27px",
  },
  link: {
    color: "#c6c6c6",
    textDecoration: "none",
  },
  unsubscribe: {
    margin: "10px 0 0",
    color: "#8d8d8d",
    fontSize: "11px",
    lineHeight: "20px",
  },
  unsubscribeLink: {
    color: "#d5152f",
    textDecoration: "underline",
  },
};
