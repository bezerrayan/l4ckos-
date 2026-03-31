import { Section } from "@react-email/components";

export function EmailPanel({ children }) {
  return <Section style={styles.panel}>{children}</Section>;
}

const styles = {
  panel: {
    border: "1px solid #4b1a21",
    borderRadius: "14px",
    backgroundColor: "#1a1415",
    padding: "16px 18px",
    margin: "14px 0",
  },
};
