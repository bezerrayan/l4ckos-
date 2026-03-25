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
    backgroundColor: "#151515",
    color: "#f7f3ec",
    textDecoration: "none",
    borderRadius: "999px",
    padding: "14px 22px",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "0.06em",
    border: "1px solid #151515",
    display: "inline-block",
  },
};
