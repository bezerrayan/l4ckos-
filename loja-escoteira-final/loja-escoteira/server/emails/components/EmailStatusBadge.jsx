import { Text } from "@react-email/components";

const toneMap = {
  neutral: { bg: "#efebe4", border: "#d8d1c4", color: "#262626" },
  success: { bg: "#e7f4eb", border: "#b7d8c0", color: "#185c31" },
  warning: { bg: "#f8efde", border: "#e5c998", color: "#8a5600" },
  danger: { bg: "#f8e7e8", border: "#e5bdc1", color: "#8d2230" },
  info: { bg: "#ece9f8", border: "#cfc6eb", color: "#4f3a8a" },
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
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
};
