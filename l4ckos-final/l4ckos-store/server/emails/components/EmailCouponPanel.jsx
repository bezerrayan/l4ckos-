import { Text } from "@react-email/components";
import { EmailPanel } from "./EmailPanel.jsx";
import { EmailSectionTitle } from "./EmailSectionTitle.jsx";

export function EmailCouponPanel({ code, description }) {
  if (!code) return null;

  return (
    <>
      <EmailSectionTitle>Seu incentivo L4CKOS</EmailSectionTitle>
      <EmailPanel>
        <Text style={styles.code}>{code}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </EmailPanel>
    </>
  );
}

const styles = {
  code: {
    margin: "0 0 6px",
    color: "#f5f1e8",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  description: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "13px",
    lineHeight: "1.6",
  },
};
