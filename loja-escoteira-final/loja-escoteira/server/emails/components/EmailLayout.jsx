import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import { EmailFooter } from "./EmailFooter.jsx";
import { EmailHeader } from "./EmailHeader.jsx";

export function EmailLayout({ preview, title, subtitle, footerNote, unsubscribeUrl, isMarketing = false, children }) {
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
          <EmailFooter note={footerNote} unsubscribeUrl={unsubscribeUrl} isMarketing={isMarketing} />
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: "18px 10px",
    backgroundColor: "#f1efe9",
    backgroundImage: "radial-gradient(circle at top, rgba(231,0,49,0.08), transparent 30%)",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#242424",
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    backgroundColor: "#faf8f4",
    border: "1px solid #d8d3cb",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 18px 48px rgba(15,15,15,0.12)",
  },
  content: {
    padding: "30px 28px 34px",
    fontSize: "16px",
    lineHeight: "1.75",
    color: "#393939",
    backgroundColor: "#faf8f4",
  },
  kicker: {
    margin: "0 0 16px",
    color: "#e11d48",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    WebkitTextFillColor: "#e11d48",
  },
};
