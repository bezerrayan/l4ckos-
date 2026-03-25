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
    backgroundColor: "#101010",
    background: "linear-gradient(135deg,#101010 0%, #151515 60%, #1f1316 100%)",
    padding: "30px 28px 26px",
    borderBottom: "1px solid #242424",
  },
  brand: {
    margin: "0 0 10px",
    color: "#f5f1e8",
    fontWeight: "800",
    letterSpacing: "0.32em",
    fontSize: "12px",
    textTransform: "uppercase",
    WebkitTextFillColor: "#f5f1e8",
  },
  title: {
    margin: "0",
    color: "#ffffff",
    fontSize: "34px",
    fontWeight: "800",
    lineHeight: "1.1",
    letterSpacing: "-0.03em",
    WebkitTextFillColor: "#ffffff",
  },
  subtitle: {
    margin: "12px 0 0",
    color: "#c7ccd4",
    fontSize: "14px",
    lineHeight: "1.6",
    WebkitTextFillColor: "#c7ccd4",
  },
};
