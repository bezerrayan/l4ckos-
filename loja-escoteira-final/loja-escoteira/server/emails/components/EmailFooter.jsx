import { Img, Link, Section, Text } from "@react-email/components";

export function EmailFooter({ note }) {
  const logoUrl = String(process.env.EMAIL_SIGNATURE_LOGO_URL || "").trim();
  const contactEmail = String(process.env.EMAIL_SIGNATURE_CONTACT_EMAIL || "yandev@l4ckos.com.br").trim();
  const websiteUrl = String(process.env.EMAIL_SIGNATURE_WEBSITE || "https://l4ckos.com.br").trim();
  const instagramUrl = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_URL || "https://instagram.com/l4ckosstore").trim();
  const instagramLabel = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_LABEL || "@l4ckosstore").trim();
  const websiteLabel = websiteUrl.replace("https://", "").replace("http://", "");

  return (
    <Section style={styles.wrap}>
      <Text style={styles.note}>{note || "L4CKOS - Loja Escoteira. Mensagem automatica."}</Text>
      <Section style={styles.card}>
        <table role="presentation" cellPadding="0" cellSpacing="0" width="100%" style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.logoCol}>
                {logoUrl ? (
                  <Img src={logoUrl} alt="L4CKOS" width="160" style={styles.logo} />
                ) : (
                  <Text style={styles.logoFallback}>L4CKOS</Text>
                )}
              </td>
              <td style={styles.dividerCol}>
                <table role="presentation" cellPadding="0" cellSpacing="0" style={styles.dividerTable}>
                  <tbody>
                    <tr>
                      <td style={styles.divider}>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={styles.infoCol}>
                <Text style={styles.name}>Yan Bezerra</Text>
                <Text style={styles.role}>FOUNDER | L4CKOS</Text>

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

        <table role="presentation" cellPadding="0" cellSpacing="0" width="100%" style={styles.bottomLineTable}>
          <tbody>
            <tr>
              <td style={styles.bottomLineAccent}>&nbsp;</td>
              <td style={styles.bottomLine}>&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <Text style={styles.tagline}>STREETWEAR | OUTDOOR | LIFESTYLE</Text>
      </Section>
    </Section>
  );
}

const styles = {
  wrap: {
    borderTop: "1px solid #ece6dd",
    backgroundColor: "#faf8f4",
    padding: "14px 24px 18px",
  },
  note: {
    margin: "0 0 8px",
    color: "#666666",
    fontSize: "12px",
  },
  card: {
    border: "1px solid #dddddd",
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  logoCol: {
    width: "170px",
    verticalAlign: "middle",
    paddingRight: "0",
  },
  logo: {
    display: "block",
    width: "160px",
    height: "auto",
    border: "0",
    outline: "none",
    textDecoration: "none",
  },
  logoFallback: {
    margin: 0,
    fontFamily: "Arial,Helvetica,sans-serif",
    fontSize: "38px",
    fontWeight: "700",
    color: "#101010",
    letterSpacing: "2px",
  },
  dividerCol: {
    width: "1px",
    padding: "0 18px",
    verticalAlign: "middle",
  },
  dividerTable: {
    borderCollapse: "collapse",
  },
  divider: {
    width: "1px",
    height: "88px",
    backgroundColor: "#e8002a",
    fontSize: "0",
    lineHeight: "0",
  },
  infoCol: {
    verticalAlign: "middle",
    paddingLeft: "2px",
  },
  name: {
    margin: "0 0 4px",
    fontFamily: "Arial,Helvetica,sans-serif",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0d0d0d",
    letterSpacing: "0.3px",
    lineHeight: "1.2",
  },
  role: {
    margin: "0 0 14px",
    fontFamily: "Arial,Helvetica,sans-serif",
    fontSize: "10px",
    fontWeight: "400",
    color: "#e8002a",
    letterSpacing: "2.4px",
    textTransform: "uppercase",
    lineHeight: "1",
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
    fontFamily: "Arial,Helvetica,sans-serif",
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
    fontFamily: "Arial,Helvetica,sans-serif",
    fontSize: "12px",
    color: "#555555",
    textDecoration: "none",
    letterSpacing: "0.1px",
  },
  bottomLineTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  bottomLineAccent: {
    width: "28px",
    height: "1px",
    backgroundColor: "#e8002a",
    fontSize: "0",
    lineHeight: "0",
  },
  bottomLine: {
    height: "1px",
    backgroundColor: "#dddddd",
    fontSize: "0",
    lineHeight: "0",
  },
  tagline: {
    margin: "10px 0 0",
    fontFamily: "Arial,Helvetica,sans-serif",
    fontSize: "8px",
    color: "#aaaaaa",
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: "1",
    padding: 0,
  },
};
