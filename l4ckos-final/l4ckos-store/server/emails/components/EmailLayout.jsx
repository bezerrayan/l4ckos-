import { Body, Head, Html, Preview } from "@react-email/components";
import { EmailFooter } from "./EmailFooter.jsx";
import { EmailHeader } from "./EmailHeader.jsx";

export function EmailLayout({ preview, title, subtitle, footerNote, unsubscribeUrl, isMarketing = false, children }) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{preview || title || "L4CKOS"}</Preview>
      <Body style={styles.body}>
        <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#f3eeea" style={styles.outerTable}>
          <tbody>
            <tr>
              <td align="center" style={styles.outerCell}>
                <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="620" bgcolor="#f3eeea" style={styles.shellTable}>
                  <tbody>
                    <tr>
                      <td bgcolor="#f3eeea" style={styles.shellCell}>
                        <EmailHeader title={title} subtitle={subtitle} />
                        <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#f3eeea" style={styles.contentTable}>
                          <tbody>
                            <tr>
                              <td bgcolor="#f3eeea" style={styles.contentCell}>{children}</td>
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
    backgroundColor: "#f3eeea",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  outerTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#f3eeea",
  },
  outerCell: {
    padding: "24px 12px",
  },
  shellTable: {
    width: "620px",
    maxWidth: "620px",
    borderCollapse: "collapse",
    backgroundColor: "#f3eeea",
    border: "1px solid #3a3435",
    borderRadius: "22px",
  },
  shellCell: {
    backgroundColor: "#f3eeea",
    borderRadius: "22px",
    overflow: "hidden",
  },
  contentTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#f3eeea",
  },
  contentCell: {
    padding: "30px 28px 34px",
    backgroundColor: "#f3eeea",
    color: "#2f2b2a",
    fontSize: "16px",
    lineHeight: "1.75",
  },
};
