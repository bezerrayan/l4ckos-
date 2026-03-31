import { Section, Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailStatusBadge } from "../components/EmailStatusBadge.jsx";

export function ComingSoonConfirmation({ name, launchUrl }) {
  return (
    <EmailLayout preview="Lista de espera confirmada" title="Você está dentro" subtitle="Lista de espera L4CKOS">
      <EmailStatusBadge tone="neutral">Acesso antecipado</EmailStatusBadge>
      <Section style={styles.hero}>
        <Text style={styles.lead}>Olá, {name || "cliente"}.</Text>
        <Text style={styles.copy}>
          Seu cadastro foi confirmado. Quando o primeiro drop abrir, você recebe o aviso antes do público geral.
        </Text>
      </Section>
      <Section style={styles.panel}>
        <Text style={styles.panelTitle}>O que acontece agora</Text>
        <Text style={styles.panelCopy}>Você entra na frente na janela de aviso e recebe a comunicação oficial de abertura.</Text>
      </Section>
      {launchUrl ? <EmailButton href={launchUrl}>Acompanhar lançamento</EmailButton> : null}
    </EmailLayout>
  );
}

const styles = {
  hero: {
    padding: "4px 0 2px",
  },
  lead: {
    margin: "0 0 12px",
    color: "#ffffff",
    fontSize: "28px",
    lineHeight: "1.15",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },
  copy: {
    margin: 0,
    color: "#d0c8c5",
    fontSize: "18px",
    lineHeight: "1.7",
  },
  panel: {
    margin: "24px 0 0",
    padding: "18px 18px 16px",
    backgroundColor: "#101013",
    border: "1px solid #4b1a21",
    borderRadius: "18px",
  },
  panelTitle: {
    margin: "0 0 8px",
    color: "#ff6477",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  panelCopy: {
    margin: 0,
    color: "#d0c8c5",
    fontSize: "14px",
    lineHeight: "1.7",
  },
};
