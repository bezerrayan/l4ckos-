import { Text } from "@react-email/components";

const toneMap = {
  neutral: { bg: "#130809", border: "#5a1820", color: "#ff6074" },
  success: { bg: "#130809", border: "#5a1820", color: "#ff6074" },
  warning: { bg: "#130809", border: "#5a1820", color: "#ff6074" },
  danger: { bg: "#130809", border: "#5a1820", color: "#ff6074" },
  info: { bg: "#130809", border: "#5a1820", color: "#ff6074" },
};

export function EmailStatusBadge({ children, tone = "neutral" }) {
  const palette = toneMap[tone] ?? toneMap.neutral;
  return <Text style={{ ...styles.badge, backgroundColor: palette.bg, borderColor: palette.border, color: palette.color }}>{children}</Text>;
}

const styles = {
  badge: {
    display: "inline-block",
    margin: "0 0 14px",
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid #2a2a2a",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
};
