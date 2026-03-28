import { Text } from "@react-email/components";

export function EmailInfoRow({ label, value }) {
  return (
    <Text style={styles.row}>
      <strong style={styles.label}>{label}</strong> {value}
    </Text>
  );
}

const styles = {
  row: {
    margin: "0 0 10px",
    color: "#2f2f2f",
    fontSize: "14px",
    lineHeight: "1.7",
  },
  label: {
    color: "#6f746f",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: "11px",
  },
};
