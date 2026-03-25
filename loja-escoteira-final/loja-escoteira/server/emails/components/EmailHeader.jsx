import { Section, Text } from "@react-email/components";

export function EmailHeader({ title, subtitle }) {
  return (
    <Section style={styles.wrap}>
      <Text style={styles.brand}>L4CKOS</Text>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </Section>
  );
}

const styles = {
  wrap: {
    background: "linear-gradient(135deg,#0a0a0a 0%, #131313 60%, #1b1014 100%)",
    padding: "28px 24px 24px",
    borderBottom: "1px solid #1f1f1f",
  },
  brand: {
    margin: "0 0 8px",
    color: "#f5f1e8",
    fontWeight: "800",
    letterSpacing: "0.32em",
    fontSize: "12px",
    textTransform: "uppercase",
  },
  title: {
    margin: "0",
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "800",
    lineHeight: "1.2",
  },
  subtitle: {
    margin: "10px 0 0",
    color: "#9ca3af",
    fontSize: "13px",
    lineHeight: "1.6",
  },
};
