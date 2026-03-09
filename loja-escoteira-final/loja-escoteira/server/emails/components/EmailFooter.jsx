import { Section, Text } from "@react-email/components";

export function EmailFooter({ note }) {
  return (
    <Section style={styles.wrap}>
      <Text style={styles.text}>{note || "L4CKOS - Loja Escoteira. Mensagem automatica."}</Text>
      <Text style={styles.small}>Brasilia/DF - contato@l4ckos.com.br</Text>
    </Section>
  );
}

const styles = {
  wrap: {
    borderTop: "1px solid #ece6dd",
    backgroundColor: "#faf8f4",
    padding: "14px 24px 18px",
  },
  text: {
    margin: "0 0 4px",
    color: "#666",
    fontSize: "12px",
  },
  small: {
    margin: 0,
    color: "#8a8a8a",
    fontSize: "11px",
  },
};
