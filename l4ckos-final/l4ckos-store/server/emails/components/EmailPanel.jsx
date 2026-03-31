import { Section } from "@react-email/components";

export function EmailPanel({ children }) {
  return <Section style={styles.panel}>{children}</Section>;
}

const styles = {
  panel: {
    border: "1px solid #c5b8ae",
    borderRadius: "14px",
    backgroundColor: "#322e28",
    padding: "16px 18px",
    margin: "14px 0",
  },
};
