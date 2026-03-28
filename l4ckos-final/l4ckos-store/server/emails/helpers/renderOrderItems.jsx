export function renderOrderItems(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <tr>
        <td colSpan="3" style={styles.empty}>
          Nenhum item disponível.
        </td>
      </tr>
    );
  }

  return items.map((item, index) => {
    const name = String(item?.name ?? item?.title ?? `Item ${index + 1}`);
    const quantity = String(item?.quantity ?? item?.qty ?? 1);
    const price = String(item?.price ?? item?.unitPrice ?? "-");

    return (
      <tr key={`${name}-${index}`}>
        <td style={styles.cell}>{name}</td>
        <td style={{ ...styles.cell, textAlign: "center", width: "80px" }}>{quantity}</td>
        <td style={{ ...styles.cell, textAlign: "right", width: "120px" }}>{price}</td>
      </tr>
    );
  });
}

const styles = {
  cell: {
    padding: "8px 0",
    borderBottom: "1px solid #ece6dd",
    fontSize: "13px",
    color: "#222",
  },
  empty: {
    padding: "10px 0",
    color: "#666",
    fontSize: "13px",
  },
};
