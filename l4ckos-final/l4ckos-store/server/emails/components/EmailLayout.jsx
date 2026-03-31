import { Body, Head, Html, Preview } from "@react-email/components";
import { EmailFooter } from "./EmailFooter.jsx";
import { EmailHeader } from "./EmailHeader.jsx";

export function EmailLayout({ preview, title, subtitle, footerNote, unsubscribeUrl, isMarketing = false, children }) {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>{preview || title || "L4CKOS"}</Preview>
      <Body style={styles.body}>
        <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#050505" style={styles.outerTable}>
          <tbody>
            <tr>
              <td align="center" style={styles.outerCell}>
                <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="620" bgcolor="#0b0b0d" style={styles.shellTable}>
                  <tbody>
                    <tr>
                      <td bgcolor="#0b0b0d" style={styles.shellCell}>
                        <EmailHeader title={title} subtitle={subtitle} />
                        <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#0b0b0d" style={styles.contentTable}>
                          <tbody>
                            <tr>
                              <td bgcolor="#0b0b0d" style={styles.contentCell}>{children}</td>
                            </tr>
                          </tbody>
                        </table>
                        <EmailFooter note={footerNote} unsubscribeUrl={unsubscribeUrl} isMarketing={isMarketing} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "#050505",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  outerTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#050505",
  },
  outerCell: {
    padding: "24px 12px",
  },
  shellTable: {
    width: "620px",
    maxWidth: "620px",
    borderCollapse: "collapse",
    backgroundColor: "#0b0b0d",
    border: "1px solid #2a2a2f",
    borderRadius: "22px",
  },
  shellCell: {
    backgroundColor: "#0b0b0d",
    borderRadius: "22px",
    overflow: "hidden",
  },
  contentTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#0b0b0d",
  },
  contentCell: {
    padding: "30px 28px 34px",
    backgroundColor: "#0b0b0d",
    color: "#efeff1",
    fontSize: "16px",
    lineHeight: "1.75",
  },
};
