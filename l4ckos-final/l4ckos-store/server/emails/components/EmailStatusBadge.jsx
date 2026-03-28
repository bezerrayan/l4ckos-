import { Text } from "@react-email/components";

const toneMap = {
  neutral: { bg: "#efebe4", border: "#d8d1c4", color: "#262626" },
  success: { bg: "#edf2ed", border: "#cdd8cf", color: "#345241" },
  warning: { bg: "#f2ede6", border: "#ddd2c0", color: "#6e5940" },
  danger: { bg: "#f3eaea", border: "#dcc9c9", color: "#734848" },
  info: { bg: "#ece8e2", border: "#d6cec4", color: "#4b4540" },
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
