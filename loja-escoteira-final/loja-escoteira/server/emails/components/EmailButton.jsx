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
    backgroundColor: "#111",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    padding: "12px 18px",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.04em",
  },
};
