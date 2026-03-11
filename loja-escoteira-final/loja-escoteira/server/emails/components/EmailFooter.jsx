import { Img, Link, Section, Text } from "@react-email/components";

export function EmailFooter({ note }) {
  const logoUrl = String(process.env.EMAIL_SIGNATURE_LOGO_URL || "").trim();
  const contactEmail = String(process.env.EMAIL_SIGNATURE_CONTACT_EMAIL || "yandev@l4ckos.com.br").trim();
  const websiteUrl = String(process.env.EMAIL_SIGNATURE_WEBSITE || "https://l4ckos.com.br").trim();
  const instagramUrl = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_URL || "https://instagram.com/l4ckosstore").trim();
  const instagramLabel = String(process.env.EMAIL_SIGNATURE_INSTAGRAM_LABEL || "@l4ckosstore").trim();

  return (
    <Section style={styles.wrap}>
      <Text style={styles.text}>{note || "L4CKOS - Loja Escoteira. Mensagem automatica."}</Text>
      <Section style={styles.card}>
        <table role="presentation" cellPadding="0" cellSpacing="0" width="100%" style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.logoCell}>
                {logoUrl ? (
                  <Img src={logoUrl} alt="L4CKOS" width="160" style={styles.logo} />
                ) : (
                  <Text style={styles.logoFallback}>L4CKOS</Text>
                )}
              </td>
              <td style={styles.infoCell}>
                <Text style={styles.name}>Yan Bezerra</Text>
                <Text style={styles.role}>FOUNDER | L4CKOS</Text>
                <Text style={styles.row}>
                  <strong style={styles.rowKey}>W:</strong>{" "}
                  <Link href={websiteUrl} style={styles.link}>
                    {websiteUrl.replace("https://", "").replace("http://", "")}
                  </Link>
                </Text>
                <Text style={styles.row}>
                  <strong style={styles.rowKey}>IG:</strong>{" "}
                  <Link href={instagramUrl} style={styles.link}>
                    {instagramLabel}
                  </Link>
                </Text>
                <Text style={styles.row}>
                  <strong style={styles.rowKey}>@:</strong>{" "}
                  <Link href={`mailto:${contactEmail}`} style={styles.link}>
                    {contactEmail}
                  </Link>
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
        <Text style={styles.separator}></Text>
        <Text style={styles.tagline}>STREETWEAR - OUTDOOR - LIFESTYLE</Text>
      </Section>
      <Text style={styles.small}>Brasilia/DF</Text>
    </Section>
  );
}

const styles = {
  wrap: {
    borderTop: "1px solid #ece6dd",
    backgroundColor: "#faf8f4",
    padding: "14px 24px 18px",
  },
  text: {
    margin: "0 0 4px",
    color: "#666",
    fontSize: "12px",
  },
  card: {
    marginTop: "8px",
    border: "1px solid #ece6dd",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    padding: "14px",
  },
  table: {
    width: "100%",
  },
  logoCell: {
    width: "180px",
    verticalAlign: "top",
    paddingRight: "10px",
  },
  infoCell: {
    verticalAlign: "top",
  },
  logo: {
    display: "block",
    width: "160px",
    height: "auto",
  },
  logoFallback: {
    margin: 0,
    color: "#101010",
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "2px",
  },
  name: {
    margin: 0,
    color: "#101010",
    fontSize: "24px",
    fontWeight: "700",
    lineHeight: "1.2",
  },
  role: {
    margin: "4px 0 12px",
    color: "#e8002a",
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "700",
  },
  row: {
    margin: "0 0 6px",
    color: "#3b4552",
    fontSize: "14px",
  },
  rowKey: {
    color: "#e8002a",
  },
  link: {
    color: "#3b4552",
    textDecoration: "none",
  },
  separator: {
    margin: "12px 0 8px",
    borderTop: "1px solid #ece6dd",
    height: "1px",
    lineHeight: "1px",
  },
  tagline: {
    margin: 0,
    color: "#8a8a8a",
    fontSize: "11px",
    textAlign: "center",
    letterSpacing: "4px",
  },
  small: {
    margin: "8px 0 0",
    color: "#8a8a8a",
    fontSize: "11px",
  },
};
