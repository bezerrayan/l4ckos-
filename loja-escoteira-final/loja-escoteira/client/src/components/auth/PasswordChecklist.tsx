import type { CSSProperties } from "react";
import { evaluatePasswordRequirements } from "../../../../shared/passwordPolicy";

type Props = {
  password: string;
};

export default function PasswordChecklist({ password }: Props) {
  const requirements = evaluatePasswordRequirements(password);

  return (
    <div style={styles.wrapper}>
      <p style={styles.title}>Sua senha precisa atender a estes requisitos:</p>
      <ul style={styles.list}>
        {requirements.map(requirement => (
          <li
            key={requirement.key}
            style={{
              ...styles.item,
              color: requirement.met ? "#8fd19e" : "#b6b0a2",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                ...styles.dot,
                background: requirement.met ? "#8fd19e" : "#39342c",
                borderColor: requirement.met ? "#8fd19e" : "#4f473b",
              }}
            />
            {requirement.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 12,
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #242424",
    background: "#111111",
  },
  title: {
    margin: "0 0 10px",
    color: "#f0ede8",
    fontSize: 13,
    fontWeight: 700,
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 8,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    lineHeight: 1.4,
  },
  dot: {
    width: 10,
    height: 10,
    minWidth: 10,
    borderRadius: 999,
    border: "1px solid transparent",
  },
};
