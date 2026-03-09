import { Body, Container, Head, Html, Preview, Section } from "@react-email/components";
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
          <Section style={styles.content}>{children}</Section>
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
    backgroundColor: "#f4f1ec",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#101010",
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    border: "1px solid #e7e1d8",
    borderRadius: "10px",
    overflow: "hidden",
  },
  content: {
    padding: "24px",
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#202020",
  },
};
