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
    color: "#353032",
    fontSize: "14px",
    lineHeight: "1.7",
  },
  label: {
    color: "#d5152f",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: "11px",
  },
};
