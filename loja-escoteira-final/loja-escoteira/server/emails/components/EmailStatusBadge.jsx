import { Text } from "@react-email/components";

const toneMap = {
  neutral: { bg: "rgba(255,255,255,0.08)", border: "#2a2a2a", color: "#f5f1e8" },
  success: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.28)", color: "#86efac" },
  warning: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.28)", color: "#fbbf24" },
  danger: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.28)", color: "#fca5a5" },
  info: { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.28)", color: "#93c5fd" },
};

export function EmailStatusBadge({ children, tone = "neutral" }) {
  const palette = toneMap[tone] ?? toneMap.neutral;
  return <Text style={{ ...styles.badge, backgroundColor: palette.bg, borderColor: palette.border, color: palette.color }}>{children}</Text>;
}

const styles = {
  badge: {
    display: "inline-block",
    margin: "0 0 14px",
    padding: "7px 12px",
    borderRadius: "999px",
    border: "1px solid #2a2a2a",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.02em",
  },
};
