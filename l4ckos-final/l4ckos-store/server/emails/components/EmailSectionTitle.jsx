import { Text } from "@react-email/components";

export function EmailSectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = {
  title: {
    display: "inline-block",
    margin: "24px 0 10px",
    padding: "10px 16px",
    color: "#ff5b73",
    fontSize: "11px",
    fontWeight: "800",
    lineHeight: "1",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    border: "1px solid #4b1820",
    backgroundColor: "#13090b",
  },
};
