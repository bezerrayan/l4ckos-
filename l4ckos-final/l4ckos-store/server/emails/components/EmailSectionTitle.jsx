import { Text } from "@react-email/components";

export function EmailSectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = {
  title: {
    display: "inline-block",
    margin: "24px 0 10px",
    padding: "10px 16px",
    color: "#d5152f",
    fontSize: "11px",
    fontWeight: "800",
    lineHeight: "1",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    border: "1px solid #7a2a35",
    borderRadius: "999px",
    backgroundColor: "#f3eeea",
  },
};
