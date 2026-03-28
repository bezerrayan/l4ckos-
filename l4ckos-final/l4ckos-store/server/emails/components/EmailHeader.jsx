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
    backgroundColor: "#131313",
    padding: "32px 28px 28px",
    borderBottom: "1px solid #2a2621",
  },
  eyebrow: {
    margin: "0 0 12px",
    color: "#ddd7cd",
    fontWeight: "800",
    letterSpacing: "0.28em",
    fontSize: "11px",
    textTransform: "uppercase",
    WebkitTextFillColor: "#ddd7cd",
  },
  title: {
    margin: "0",
    color: "#ffffff",
    fontSize: "36px",
    fontWeight: "800",
    lineHeight: "1.05",
    letterSpacing: "-0.03em",
    WebkitTextFillColor: "#ffffff",
  },
  subtitle: {
    margin: "12px 0 0",
    color: "#b8b2a9",
    fontSize: "15px",
    lineHeight: "1.55",
    WebkitTextFillColor: "#b8b2a9",
  },
};
