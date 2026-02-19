import React from "react";
import type { CSSProperties } from "react";

type Props = {
  toast: { message: string; actionLabel?: string; action?: () => void } | null;
  visible: boolean;
  onClose: () => void;
};

export default function Toast({ toast, visible, onClose }: Props) {
  if (!toast) return null;

  return (
    <div style={{ ...styles.wrapper, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)" }}>
      <div style={styles.toast}>
        <div style={styles.message}>{toast.message}</div>
        <div style={styles.actions}>
          {toast.actionLabel && (
            <button
              style={styles.actionBtn}
              onClick={() => {
                try {
                  toast.action && toast.action();
                } finally {
                  onClose();
                }
              }}
            >
              {toast.actionLabel}
            </button>
          )}
          <button style={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: "fixed",
    right: 20,
    bottom: 20,
    zIndex: 9999,
    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
    willChange: "transform, opacity",
  },
  toast: {
    minWidth: 260,
    maxWidth: 420,
    background: "rgba(26,26,26,0.95)",
    color: "white",
    padding: "14px 16px",
    borderRadius: 10,
    display: "flex",
    gap: 12,
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  message: {
    flex: 1,
    fontSize: 14,
  },
  actions: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  actionBtn: {
    background: "#e6f4d8",
    color: "#15310b",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.8)",
    fontSize: 18,
    cursor: "pointer",
  },
};
