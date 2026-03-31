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
    backgroundColor: "#12090a",
    padding: "32px 28px 28px",
    borderBottom: "1px solid #2a2022",
  },
  eyebrow: {
    margin: "0 0 12px",
    color: "#f2eeea",
    fontWeight: "800",
    letterSpacing: "0.28em",
    fontSize: "11px",
    textTransform: "uppercase",
    WebkitTextFillColor: "#f2eeea",
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
    color: "#b8aead",
    fontSize: "15px",
    lineHeight: "1.7",
    WebkitTextFillColor: "#b8aead",
  },
};
