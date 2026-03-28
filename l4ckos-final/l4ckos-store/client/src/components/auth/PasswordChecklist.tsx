import type { CSSProperties } from "react";
import { evaluatePasswordRequirements } from "../../../../shared/passwordPolicy";

type Props = {
  password: string;
};

export default function PasswordChecklist({ password }: Props) {
  const requirements = evaluatePasswordRequirements(password);
  const completedCount = requirements.filter(requirement => requirement.met).length;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <p style={styles.title}>Requisitos da senha</p>
        <span style={styles.progress}>{completedCount}/{requirements.length}</span>
      </div>
      <ul style={styles.list}>
        {requirements.map(requirement => (
          <li
            key={requirement.key}
            style={{
              ...styles.item,
              color: requirement.met ? "#dff5e4" : "#c2bbaf",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                ...styles.badge,
                background: requirement.met ? "rgba(100, 168, 120, 0.16)" : "rgba(103, 92, 75, 0.18)",
                borderColor: requirement.met ? "rgba(128, 201, 149, 0.45)" : "rgba(98, 88, 74, 0.45)",
                color: requirement.met ? "#8fd19e" : "#908577",
              }}
            >
              {requirement.met ? "✓" : "•"}
            </span>
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
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #252525",
    background: "linear-gradient(180deg, rgba(18,18,18,0.96) 0%, rgba(12,12,12,0.98) 100%)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },
  title: {
    margin: 0,
    color: "#f2ede4",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
  },
  progress: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 42,
    height: 24,
    padding: "0 8px",
    borderRadius: 999,
    border: "1px solid #2a2a2a",
    background: "#151515",
    color: "#c9c1b4",
    fontSize: 12,
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
    alignItems: "flex-start",
    gap: 10,
    fontSize: 13,
    lineHeight: 1.4,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    minWidth: 20,
    borderRadius: 999,
    border: "1px solid transparent",
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1,
  },
};
