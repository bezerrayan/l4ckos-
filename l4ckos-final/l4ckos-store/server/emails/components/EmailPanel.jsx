import { Section } from "@react-email/components";

export function EmailPanel({ children }) {
  return <Section style={styles.panel}>{children}</Section>;
}

const styles = {
  panel: {
    border: "1px solid #7a2a35",
    borderRadius: "18px",
    backgroundColor: "#f3eeea",
    padding: "20px 20px",
    margin: "14px 0 18px",
  },
};
