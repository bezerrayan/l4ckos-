import { Text } from "@react-email/components";

export function EmailHeader({ title, subtitle }) {
  return (
    <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" bgcolor="#0f0a0b" style={styles.table}>
      <tbody>
        <tr>
          <td bgcolor="#0f0a0b" style={styles.cell}>
            <Text style={styles.eyebrow}>L4CKOS</Text>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" style={styles.ruleTable}>
              <tbody>
                <tr>
                  <td bgcolor="#d5152f" style={styles.rule}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
    backgroundColor: "#0f0a0b",
  },
  cell: {
    padding: "34px 34px 30px",
    backgroundColor: "#0f0a0b",
    borderBottom: "1px solid #221719",
  },
  eyebrow: {
    margin: "0",
    color: "#ffffff",
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
    height: "2px",
    width: "62px",
    fontSize: "0",
    lineHeight: "0",
  },
  title: {
    margin: "22px 0 0",
    color: "#ffffff",
    fontSize: "42px",
    lineHeight: "44px",
    fontWeight: "700",
    letterSpacing: "-1px",
  },
  subtitle: {
    margin: "12px 0 0",
    color: "#b8b8be",
    fontSize: "16px",
    lineHeight: "27px",
  },
};
