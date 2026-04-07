import { Section } from "@react-email/components";

export function EmailPanel({ children }) {
  return <Section style={styles.panel}>{children}</Section>;
}

const styles = {
  panel: {
    border: "1px solid #212121",
    backgroundColor: "#101010",
    padding: "20px 20px",
    margin: "14px 0 18px",
  },
};
