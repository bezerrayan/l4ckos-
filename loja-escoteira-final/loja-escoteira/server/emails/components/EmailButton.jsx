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
    backgroundColor: "#f3efe7",
    color: "#0b0b0b",
    textDecoration: "none",
    borderRadius: "999px",
    padding: "13px 20px",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "0.06em",
  },
};
