import { Body, Head, Html, Preview } from "@react-email/components";
import { EmailFooter } from "./EmailFooter.jsx";
import { EmailHeader } from "./EmailHeader.jsx";

export function EmailLayout({ preview, title, subtitle, footerNote, unsubscribeUrl, isMarketing = false, children }) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{preview || title || "L4CKOS"}</Preview>
      <Body style={styles.body}>
        <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#050505" style={styles.outerTable}>
          <tbody>
            <tr>
              <td align="center" style={styles.outerCell}>
                <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="620" bgcolor="#090909" style={styles.shellTable}>
                  <tbody>
                    <tr>
                      <td bgcolor="#d5152f" style={styles.topBar}>&nbsp;</td>
                    </tr>
                    <tr>
                      <td bgcolor="#090909" style={styles.shellCell}>
                        <EmailHeader title={title} subtitle={subtitle} />
                        <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#090909" style={styles.contentTable}>
                          <tbody>
                            <tr>
                              <td bgcolor="#090909" style={styles.contentCell}>{children}</td>
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
    padding: "28px 12px",
  },
  shellTable: {
    width: "620px",
    maxWidth: "620px",
    borderCollapse: "collapse",
    backgroundColor: "#090909",
    border: "1px solid #1f1f1f",
  },
  topBar: {
    height: "6px",
    fontSize: "0",
    lineHeight: "0",
    backgroundColor: "#d5152f",
  },
  shellCell: {
    backgroundColor: "#090909",
  },
  contentTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#090909",
  },
  contentCell: {
    padding: "30px 28px 34px",
    backgroundColor: "#090909",
    color: "#d8d8d8",
    fontSize: "16px",
    lineHeight: "1.75",
  },
};
