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
    backgroundColor: "#ece7de",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#242424",
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    backgroundColor: "#f8f4ec",
    border: "1px solid #d7d0c4",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 12px 32px rgba(15,15,15,0.08)",
  },
  content: {
    padding: "30px 28px 34px",
    fontSize: "16px",
    lineHeight: "1.75",
    color: "#2f2f2f",
    backgroundColor: "#f8f4ec",
  },
};
