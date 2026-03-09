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
    background: "linear-gradient(90deg,#111,#2a2a2a)",
    padding: "20px 24px",
  },
  brand: {
    margin: "0 0 8px",
    color: "#f4f1ec",
    fontWeight: "800",
    letterSpacing: "0.12em",
    fontSize: "13px",
    textTransform: "uppercase",
  },
  title: {
    margin: "0",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
    lineHeight: "1.3",
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#cfcfcf",
    fontSize: "13px",
  },
};
