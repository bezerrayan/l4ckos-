import { Section } from "@react-email/components";

export function EmailPanel({ children }) {
  return <Section style={styles.panel}>{children}</Section>;
}

const styles = {
  panel: {
    border: "1px solid #4b1a21",
    borderRadius: "18px",
    backgroundColor: "#101012",
    padding: "20px 20px",
    margin: "14px 0 18px",
  },
};
