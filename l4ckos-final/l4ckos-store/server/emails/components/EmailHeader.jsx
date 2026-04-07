import { Text } from "@react-email/components";

export function EmailHeader({ title, subtitle }) {
  return (
    <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#090909" style={styles.table}>
      <tbody>
        <tr>
          <td bgcolor="#090909" style={styles.cell}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" style={styles.innerTable}>
              <tbody>
                <tr>
                  <td valign="top" width="160" style={styles.brandCol}>
                    <Text style={styles.eyebrow}>L4CKOS</Text>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border="0" style={styles.ruleTable}>
                      <tbody>
                        <tr>
                          <td bgcolor="#d5152f" style={styles.rule}>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td valign="top" style={styles.copyCol}>
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
    padding: "28px 28px 24px",
    backgroundColor: "#090909",
    borderBottom: "1px solid #1f1f1f",
  },
  innerTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  brandCol: {
    width: "160px",
    paddingRight: "22px",
    borderRight: "1px solid #1f1f1f",
  },
  copyCol: {
    paddingLeft: "22px",
  },
  eyebrow: {
    margin: "0",
    color: "#f0ede8",
    fontWeight: "700",
    letterSpacing: "5px",
    fontSize: "11px",
    lineHeight: "13px",
    textTransform: "uppercase",
  },
  ruleTable: {
    borderCollapse: "collapse",
    marginTop: "16px",
  },
  rule: {
    backgroundColor: "#d5152f",
    height: "3px",
    width: "62px",
    fontSize: "0",
    lineHeight: "0",
  },
  title: {
    margin: "0",
    color: "#f0ede8",
    fontSize: "40px",
    lineHeight: "42px",
    fontWeight: "700",
    letterSpacing: "-1px",
  },
  subtitle: {
    margin: "12px 0 0",
    color: "#b8b8b8",
    fontSize: "16px",
    lineHeight: "26px",
  },
};
