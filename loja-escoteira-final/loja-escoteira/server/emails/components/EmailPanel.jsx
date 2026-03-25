import { Section } from "@react-email/components";

export function EmailPanel({ children }) {
  return <Section style={styles.panel}>{children}</Section>;
}

const styles = {
  panel: {
    border: "1px solid #1f1f1f",
    borderRadius: "16px",
    backgroundColor: "#111111",
    padding: "16px",
    margin: "14px 0",
  },
};
