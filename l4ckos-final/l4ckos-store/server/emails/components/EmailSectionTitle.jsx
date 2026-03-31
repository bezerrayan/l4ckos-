import { Text } from "@react-email/components";

export function EmailSectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = {
  title: {
    display: "inline-block",
    margin: "24px 0 10px",
    padding: "10px 16px",
    color: "#ff5b6f",
    fontSize: "11px",
    fontWeight: "800",
    lineHeight: "1",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    border: "1px solid #5a1820",
    borderRadius: "999px",
    backgroundColor: "#130809",
  },
};
