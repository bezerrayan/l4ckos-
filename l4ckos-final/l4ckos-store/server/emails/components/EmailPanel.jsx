import { Section } from "@react-email/components";

export function EmailPanel({ children }) {
  return <Section style={styles.panel}>{children}</Section>;
}

const styles = {
  panel: {
    border: "1px solid #d8d0c3",
    borderRadius: "14px",
    backgroundColor: "#ede7dc",
    padding: "16px 18px",
    margin: "14px 0",
  },
};
