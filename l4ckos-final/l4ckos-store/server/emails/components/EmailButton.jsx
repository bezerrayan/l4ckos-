import { Button, Section } from "@react-email/components";

export function EmailButton({ href, children }) {
  return (
    <Section style={{ margin: "18px 0" }}>
      <Button href={href} style={styles.btn}>
        {children}
      </Button>
    </Section>
  );
}

const styles = {
  btn: {
    backgroundColor: "#d7142e",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "999px",
    padding: "16px 28px",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "0.02em",
    border: "1px solid #ff3e57",
    display: "inline-block",
  },
};
