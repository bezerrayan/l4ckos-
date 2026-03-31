import { Text } from "@react-email/components";

export function EmailSectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = {
  title: {
    margin: "24px 0 10px",
    color: "#f3efe9",
    fontSize: "18px",
    fontWeight: "800",
    lineHeight: "1.3",
    letterSpacing: "-0.01em",
  },
};
