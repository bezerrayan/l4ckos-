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
    backgroundColor: "#2b2925",
    color: "#f3eee6",
    textDecoration: "none",
    borderRadius: "999px",
    padding: "14px 22px",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "0.06em",
    border: "1px solid #2b2925",
    display: "inline-block",
  },
};
