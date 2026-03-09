import { Text } from "@react-email/components";

export function EmailInfoRow({ label, value }) {
  return (
    <Text style={styles.row}>
      <strong>{label}:</strong> {value}
    </Text>
  );
}

const styles = {
  row: {
    margin: "0 0 8px",
    color: "#232323",
    fontSize: "14px",
  },
};
