import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import { EmailFooter } from "./EmailFooter.jsx";
import { EmailHeader } from "./EmailHeader.jsx";

export function EmailLayout({ preview, title, subtitle, footerNote, children }) {
  return (
    <Html>
      <Head />
      <Preview>{preview || title || "L4CKOS"}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader title={title} subtitle={subtitle} />
          <Section style={styles.content}>
            <Text style={styles.kicker}>L4CKOS</Text>
            {children}
          </Section>
          <EmailFooter note={footerNote} />
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: "24px 12px",
    backgroundColor: "#050505",
    backgroundImage: "radial-gradient(circle at top, rgba(231,0,49,0.12), transparent 34%)",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#f3efe7",
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    backgroundColor: "#0b0b0b",
    border: "1px solid #1f1f1f",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
  },
  content: {
    padding: "28px 24px 30px",
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#d7d4cd",
    backgroundColor: "#0b0b0b",
  },
  kicker: {
    margin: "0 0 16px",
    color: "#e11d48",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
  },
};
