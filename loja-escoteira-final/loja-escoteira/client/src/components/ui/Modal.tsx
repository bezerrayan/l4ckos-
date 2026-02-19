












































































































/**
 * Modal - Componente para diálogos/modais
 * Aceita: isOpen, onClose, title, children
 */

import type { ReactNode } from "react";
import type { CSSProperties } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizeMap = {
    sm: 300,
    md: 500,
    lg: 800,
  };

  const overlayStyles: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyles: CSSProperties = {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: sizeMap[size],
    width: "90vw",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
  };

  const headerStyles: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottom: "1px solid #e5e5e5",
  };

  const closeButtonStyles: CSSProperties = {
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    padding: 0,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyles: CSSProperties = {
    padding: 16,
  };

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div
        style={modalStyles}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div style={headerStyles}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
              {title}
            </h2>
            <button
              style={closeButtonStyles}
              onClick={onClose}
              aria-label="Fechar modal"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div style={contentStyles}>{children}</div>
      </div>
    </div>
  );
}
