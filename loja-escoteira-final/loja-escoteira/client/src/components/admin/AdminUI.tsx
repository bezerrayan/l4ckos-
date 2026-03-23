import type { CSSProperties, ReactNode } from "react";

type HeaderAction = {
  label: string;
  onClick: () => void;
};

type StatCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  tone?: "neutral" | "success" | "warning" | "info";
  hint?: string;
};

const tones: Record<NonNullable<StatCardProps["tone"]>, { border: string; glow: string; iconBg: string; iconColor: string }> = {
  neutral: {
    border: "rgba(148, 163, 184, 0.16)",
    glow: "rgba(148, 163, 184, 0.10)",
    iconBg: "rgba(148, 163, 184, 0.12)",
    iconColor: "#e2e8f0",
  },
  success: {
    border: "rgba(34, 197, 94, 0.20)",
    glow: "rgba(34, 197, 94, 0.12)",
    iconBg: "rgba(34, 197, 94, 0.14)",
    iconColor: "#86efac",
  },
  warning: {
    border: "rgba(245, 158, 11, 0.22)",
    glow: "rgba(245, 158, 11, 0.14)",
    iconBg: "rgba(245, 158, 11, 0.14)",
    iconColor: "#fcd34d",
  },
  info: {
    border: "rgba(56, 189, 248, 0.22)",
    glow: "rgba(56, 189, 248, 0.14)",
    iconBg: "rgba(56, 189, 248, 0.14)",
    iconColor: "#7dd3fc",
  },
};

export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: HeaderAction[];
}) {
  return (
    <div style={styles.headerShell}>
      <div style={styles.headerContent}>
        <span style={styles.headerEyebrow}>Admin</span>
        <h1 style={styles.headerTitle}>{title}</h1>
        <p style={styles.headerSubtitle}>{subtitle}</p>
      </div>
      {actions?.length ? (
        <div style={styles.headerActions}>
          {actions.map(action => (
            <button key={action.label} type="button" style={styles.headerActionBtn} onClick={action.onClick}>
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AdminStatsGrid({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ ...styles.statsGrid, ...style }}>{children}</div>;
}

export function AdminStatCard({ label, value, icon, tone = "neutral", hint }: StatCardProps) {
  const palette = tones[tone];

  return (
    <div
      style={{
        ...styles.statCard,
        border: `1px solid ${palette.border}`,
        boxShadow: `inset 0 1px 0 ${palette.glow}`,
      }}
    >
      <div style={{ ...styles.statIconWrap, background: palette.iconBg, color: palette.iconColor }}>{icon}</div>
      <div style={styles.statBody}>
        <span style={styles.statLabel}>{label}</span>
        <strong style={styles.statValue}>{value}</strong>
        {hint ? <span style={styles.statHint}>{hint}</span> : null}
      </div>
    </div>
  );
}

export function AdminSurface({
  title,
  description,
  children,
  aside,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section style={styles.surface}>
      <div style={styles.surfaceHeader}>
        <div style={styles.surfaceHeaderText}>
          <h2 style={styles.surfaceTitle}>{title}</h2>
          {description ? <p style={styles.surfaceDescription}>{description}</p> : null}
        </div>
        {aside ? <div style={styles.surfaceAside}>{aside}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function AdminQuickActions({
  actions,
}: {
  actions: Array<{ label: string; caption: string; onClick: () => void }>;
}) {
  return (
    <div style={styles.quickActions}>
      {actions.map(action => (
        <button key={action.label} type="button" style={styles.quickActionCard} onClick={action.onClick}>
          <strong style={styles.quickActionTitle}>{action.label}</strong>
          <span style={styles.quickActionCaption}>{action.caption}</span>
        </button>
      ))}
    </div>
  );
}

export function AdminEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div style={styles.emptyState}>
      <strong style={styles.emptyTitle}>{title}</strong>
      <p style={styles.emptyDescription}>{description}</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  headerShell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
    padding: "24px 24px 22px",
    borderRadius: 22,
    border: "1px solid #202020",
    background: "radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 32%), linear-gradient(180deg, #111111 0%, #0d0d0d 100%)",
  },
  headerContent: {
    display: "grid",
    gap: 10,
    maxWidth: 760,
  },
  headerEyebrow: {
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#9ca3af",
    fontWeight: 700,
  },
  headerTitle: {
    margin: 0,
    color: "#f8f4ec",
    fontSize: 34,
    lineHeight: 1.05,
  },
  headerSubtitle: {
    margin: 0,
    color: "#9ca3af",
    fontSize: 15,
    lineHeight: 1.7,
  },
  headerActions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  headerActionBtn: {
    minHeight: 42,
    padding: "0 16px",
    borderRadius: 999,
    border: "1px solid #2a2a2a",
    background: "#151515",
    color: "#f8f4ec",
    cursor: "pointer",
    fontWeight: 700,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  statCard: {
    display: "grid",
    gridTemplateColumns: "48px 1fr",
    gap: 14,
    padding: "18px 18px 16px",
    borderRadius: 18,
    background: "#121212",
  },
  statIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
  },
  statBody: {
    display: "grid",
    gap: 6,
  },
  statLabel: {
    color: "#9ca3af",
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  statValue: {
    color: "#f8f4ec",
    fontSize: 28,
    lineHeight: 1.1,
  },
  statHint: {
    color: "#8b949e",
    fontSize: 12,
    lineHeight: 1.5,
  },
  surface: {
    display: "grid",
    gap: 16,
    padding: "22px 22px 20px",
    borderRadius: 22,
    border: "1px solid #202020",
    background: "#101010",
  },
  surfaceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
  },
  surfaceHeaderText: {
    display: "grid",
    gap: 8,
  },
  surfaceTitle: {
    margin: 0,
    color: "#f8f4ec",
    fontSize: 22,
  },
  surfaceDescription: {
    margin: 0,
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 1.65,
    maxWidth: 760,
  },
  surfaceAside: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  quickActions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  quickActionCard: {
    textAlign: "left",
    display: "grid",
    gap: 8,
    padding: "18px 16px",
    borderRadius: 16,
    border: "1px solid #242424",
    background: "linear-gradient(180deg, #151515 0%, #101010 100%)",
    color: "#f8f4ec",
    cursor: "pointer",
  },
  quickActionTitle: {
    fontSize: 15,
    lineHeight: 1.3,
  },
  quickActionCaption: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 1.6,
  },
  emptyState: {
    display: "grid",
    gap: 8,
    padding: "22px 18px",
    borderRadius: 16,
    border: "1px dashed #2f2f2f",
    background: "#0d0d0d",
    textAlign: "center",
  },
  emptyTitle: {
    color: "#f8f4ec",
    fontSize: 16,
  },
  emptyDescription: {
    margin: 0,
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 1.6,
  },
};
