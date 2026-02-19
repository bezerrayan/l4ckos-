/**
 * Página Not Found (404) - Exibida quando rota não existe
 * Oferece link para voltar à home
 */

import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  const containerStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
    padding: "40px 20px",
  };

  const iconStyles: CSSProperties = {
    fontSize: 80,
    marginBottom: 20,
  };

  const titleStyles: CSSProperties = {
    fontSize: 48,
    fontWeight: 700,
    color: "#1a3a2a",
    marginBottom: 10,
  };

  const subtitleStyles: CSSProperties = {
    fontSize: 20,
    color: "#666",
    marginBottom: 10,
  };

  const descriptionStyles: CSSProperties = {
    fontSize: 16,
    color: "#999",
    marginBottom: 30,
    maxWidth: 400,
  };

  const buttonStyles: CSSProperties = {
    padding: "12px 24px",
    backgroundColor: "#1a3a2a",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  return (
    <div style={containerStyles}>
      <div style={iconStyles}>❌</div>
      <h1 style={titleStyles}>404</h1>
      <h2 style={subtitleStyles}>Página Não Encontrada</h2>
      <p style={descriptionStyles}>
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <button
        style={buttonStyles}
        onClick={() => navigate("/")}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#0f2c1e")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#1a3a2a")
        }
      >
        ← Voltar para Home
      </button>
    </div>
  );
}
