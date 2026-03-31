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
    padding: "16px 8px",
    backgroundColor: "#100f0e",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#f3efe9",
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    backgroundColor: "#0f0e0d",
    border: "1px solid #3a302d",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 18px 44px rgba(0,0,0,0.45)",
  },
  content: {
    padding: "30px 28px 34px",
    fontSize: "16px",
    lineHeight: "1.75",
    color: "#d7d0ca",
    backgroundColor: "#191614",
  },
};
