/**
 * Página de Produtos - Lista todos os produtos disponíveis
 * Usa: getProducts(), useCart() para adicionar ao carrinho
 */

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts, searchProducts } from "../lib/mockProducts";
import type { Product } from "../types/product";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Produtos() {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");

  // 📌 Buscar produtos baseado no termo de busca
  const produtos: Product[] = searchTerm
    ? searchProducts(searchTerm)
    : getProducts();

  return (
    <div>
      {/* Header Section */}
      <div style={{ ...styles.header, marginBottom: isMobile ? 28 : styles.header.marginBottom, paddingBottom: isMobile ? 20 : styles.header.paddingBottom }}>
        <div>
          <h1 style={{ ...styles.title, fontSize: isMobile ? 30 : styles.title.fontSize }}>Nossa Coleção</h1>
          <p style={{ ...styles.subtitle, fontSize: isMobile ? 15 : styles.subtitle.fontSize }}>
            Descubra nossos {produtos.length} produtos de qualidade premium para o seu movimento escoteiro
          </p>
        </div>
      </div>

      {/* Barra de Busca */}
      <div style={{ ...styles.searchContainer, marginBottom: isMobile ? 30 : styles.searchContainer.marginBottom }}>
        <input
          type="text"
          placeholder="Buscar equipamentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput as CSSProperties}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            style={styles.clearButton as CSSProperties}
          >
            ✕
          </button>
        )}
      </div>

      {/* Grid de Produtos */}
      {produtos.length > 0 ? (
        <div>
          <div style={styles.resultInfo}>
            <p>
              {searchTerm
                ? `Mostrando ${produtos.length} resultado(s) para "${searchTerm}"`
                : `Exibindo ${produtos.length} produtos`}
            </p>
          </div>

          <div style={{ ...styles.productsGrid, gridTemplateColumns: isMobile ? "1fr" : styles.productsGrid.gridTemplateColumns, gap: isMobile ? 16 : styles.productsGrid.gap }}>
            {produtos.map((produto, idx) => (
              <div
                key={produto.id}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${idx * 50}ms backwards`,
                }}
              >
                <ProductCard product={produto} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ ...styles.emptyState, padding: isMobile ? "40px 16px" : styles.emptyState.padding }}>
          <div style={styles.emptyIcon}>○</div>
          <h2 style={styles.emptyTitle}>Nenhum produto encontrado</h2>
          <p style={styles.emptyText}>
            Não encontramos produtos para "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm("")}
            style={styles.emptyButton as CSSProperties}
          >
            Limpar Filtro
          </button>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    marginBottom: 48,
    paddingBottom: 32,
    borderBottom: "2px solid #e2e8f0",
  },
  title: {
    fontSize: 40,
    fontWeight: 900,
    color: "#0d0d0d",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    margin: 0,
  },
  searchContainer: {
    position: "relative",
    maxWidth: 500,
    marginBottom: 48,
  },
  searchInput: {
    width: "100%",
    padding: "14px 20px",
    border: "2px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 16,
    transition: "all 0.3s ease",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  clearButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    color: "#6b7280",
    padding: 0,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s ease",
  },
  resultInfo: {
    marginBottom: 24,
    color: "#6b7280",
    fontSize: 14,
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 32,
    marginBottom: 60,
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    marginBottom: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0d0d0d",
    marginBottom: 12,
  },
  emptyText: {
    color: "#6b7280",
    marginBottom: 24,
  },
  emptyButton: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 16,
  },
};
