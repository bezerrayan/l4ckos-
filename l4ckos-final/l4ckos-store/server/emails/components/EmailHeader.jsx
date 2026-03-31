import { Section, Text } from "@react-email/components";

export function EmailHeader({ title, subtitle }) {
  return (
    <Section style={styles.wrap}>
      <Text style={styles.eyebrow}>L4CKOS</Text>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </Section>
  );
}

const styles = {
  wrap: {
    backgroundColor: "#f3f0ec",
    padding: "32px 28px 28px",
    borderBottom: "1px solid #d8d0c4",
  },
  eyebrow: {
    margin: "0 0 12px",
    color: "#2e2a28",
    fontWeight: "800",
    letterSpacing: "0.28em",
    fontSize: "11px",
    textTransform: "uppercase",
    WebkitTextFillColor: "#2e2a28",
  },
  title: {
    margin: "0",
    color: "#2a2a2a",
    fontSize: "36px",
    fontWeight: "800",
    lineHeight: "1.05",
    letterSpacing: "-0.03em",
    WebkitTextFillColor: "#2a2a2a",
  },
  subtitle: {
    margin: "12px 0 0",
    color: "#625b55",
    fontSize: "15px",
    lineHeight: "1.55",
    WebkitTextFillColor: "#625b55",
  },
};
