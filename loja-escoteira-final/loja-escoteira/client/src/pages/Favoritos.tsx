/**
 * Página Favoritos - Exibe todos os produtos salvos como favoritos
 */

import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../contexts/FavoritesContext";
import type { CSSProperties } from "react";

export default function Favoritos() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div>
      {/* Header da Página */}
      <div style={styles.pageHeader as CSSProperties}>
        <h1 style={styles.pageTitle as CSSProperties}> 🤍 Meus Favoritos</h1>
        <p style={styles.pageSubtitle as CSSProperties}>
          {favorites.length === 0
            ? "Você ainda não tem produtos favoritos"
            : `Você tem ${favorites.length} produto${favorites.length !== 1 ? "s" : ""} salvo${favorites.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {favorites.length === 0 ? (
        // Estado vazio
        <div style={styles.emptyState as CSSProperties}>
          <div style={styles.emptyIcon as CSSProperties}>🤍</div>
          <h2 style={styles.emptyTitle as CSSProperties}>
            Nenhum favorito ainda
          </h2>
          <p style={styles.emptyText as CSSProperties}>
            Explore nossos produtos e adicione seus favoritos para acessá-los rapidamente
          </p>
          <Link to="/produtos" style={styles.emptyButton as CSSProperties}>
            Explorar Produtos →
          </Link>
        </div>
      ) : (
        // Grid de produtos favoritos
        <>
          <div style={styles.productsGrid as CSSProperties}>
            {favorites.map((produto, idx) => (
              <div
                key={produto.id}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${idx * 100}ms backwards`,
                }}
              >
                <ProductCard product={produto} />
              </div>
            ))}
          </div>

          {/* Botões de ação */}
          <div style={styles.actionSection as CSSProperties}>
            <Link to="/produtos" style={styles.continueShopping as CSSProperties}>
              ← Continuar Comprando
            </Link>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Tem certeza que deseja limpar todos os favoritos?"
                  )
                ) {
                  clearFavorites();
                }
              }}
              style={styles.clearButton as CSSProperties}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLElement;
                btn.style.background = "#991b1b";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLElement;
                btn.style.background = "#dc2626";
              }}
            >
              🗑️ Limpar Favoritos
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  pageHeader: {
    marginBottom: 48,
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 900,
    color: "#1a1a1a",
    margin: 0,
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 18,
    color: "#666666",
    margin: 0,
  },
  emptyState: {
    textAlign: "center",
    padding: 80,
    background: "#f9f9f9",
    borderRadius: 16,
    border: "2px dashed #e0e0e0",
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 24,
    animation: "pulse 2s infinite",
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 900,
    color: "#1a1a1a",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 32,
    maxWidth: 400,
    margin: "0 auto 32px",
  },
  emptyButton: {
    display: "inline-block",
    padding: "14px 48px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 16,
    transition: "all 0.3s ease",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 32,
    marginBottom: 48,
  },
  actionSection: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: 32,
    borderTop: "1px solid #e0e0e0",
  },
  continueShopping: {
    display: "inline-block",
    padding: "12px 32px",
    background: "white",
    color: "#1a1a1a",
    border: "2px solid #1a1a1a",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  clearButton: {
    padding: "12px 32px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
