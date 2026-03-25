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
      <Text style={styles.note}>{note || "L4CKOS. Comunicacao automatizada da operacao."}</Text>
      <Section style={styles.card}>
        <table role="presentation" cellPadding="0" cellSpacing="0" width="100%" style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.logoCol}>
                {logoUrl ? (
                  <Img src={logoUrl} alt="L4CKOS" width="128" style={styles.logo} />
                ) : (
                  <Text style={styles.logoFallback}>L4CKOS</Text>
                )}
              </td>
              <td style={styles.infoCol}>
                <Text style={styles.name}>L4CKOS</Text>
                <Text style={styles.role}>Streetwear Outdoor Premium</Text>

                <table role="presentation" cellPadding="0" cellSpacing="0" style={styles.infoTable}>
                  <tbody>
                    <tr>
                      <td style={styles.infoRow}>
                        <table role="presentation" cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={styles.icon}>W</td>
                              <td style={styles.infoTextCol}>
                                <Link href={websiteUrl} style={styles.link}>
                                  {websiteLabel}
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.infoRow}>
                        <table role="presentation" cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={styles.icon}>IG</td>
                              <td style={styles.infoTextCol}>
                                <Link href={instagramUrl} style={styles.link}>
                                  {instagramLabel}
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table role="presentation" cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={styles.icon}>@</td>
                              <td style={styles.infoTextCol}>
                                <Link href={`mailto:${contactEmail}`} style={styles.link}>
                                  {contactEmail}
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <Text style={styles.tagline}>STREETWEAR • OUTDOOR • LIFESTYLE</Text>
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
    </Section>
  );
}

const styles = {
  wrap: {
    borderTop: "1px solid #e1ddd5",
    backgroundColor: "#f6f2eb",
    padding: "16px 28px 24px",
  },
  note: {
    margin: "0 0 8px",
    color: "#7a7f88",
    fontSize: "12px",
  },
  card: {
    border: "0",
    borderRadius: "0",
    backgroundColor: "#f6f2eb",
    padding: "16px 0 8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    maxWidth: "520px",
    margin: "0 auto",
  },
  logoCol: {
    width: "160px",
    verticalAlign: "top",
    paddingRight: "16px",
  },
  logo: {
    display: "block",
    width: "128px",
    height: "auto",
    border: "0",
    outline: "none",
    textDecoration: "none",
    borderRadius: "14px",
  },
  logoFallback: {
    margin: 0,
    fontSize: "38px",
    fontWeight: "700",
    color: "#f0ede8",
    letterSpacing: "2px",
  },
  infoCol: {
    verticalAlign: "top",
    paddingLeft: "0",
    paddingTop: "2px",
  },
  name: {
    margin: "0 0 4px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#181818",
    letterSpacing: "0.3px",
    lineHeight: "1.2",
  },
  role: {
    margin: "0 0 12px",
    fontSize: "10px",
    fontWeight: "700",
    color: "#e8002a",
    letterSpacing: "2px",
    textTransform: "uppercase",
    lineHeight: "1.3",
  },
  infoTable: {
    borderCollapse: "collapse",
  },
  infoRow: {
    paddingBottom: "5px",
  },
  icon: {
    width: "18px",
    height: "18px",
    minWidth: "18px",
    backgroundColor: "#e8002a",
    fontSize: "8px",
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "18px",
  },
  infoTextCol: {
    paddingLeft: "9px",
    verticalAlign: "middle",
  },
  link: {
    fontSize: "13px",
    color: "#4a4f57",
    textDecoration: "none",
    letterSpacing: "0.1px",
  },
  tagline: {
    margin: "16px 0 0",
    fontSize: "8px",
    color: "#b3aba0",
    letterSpacing: "3px",
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: "1",
    maxWidth: "520px",
  },
  unsubscribe: {
    margin: "12px 0 0",
    color: "#7a7f88",
    fontSize: "11px",
    lineHeight: "1.6",
    maxWidth: "520px",
  },
  unsubscribeLink: {
    color: "#181818",
    textDecoration: "underline",
  },
};
