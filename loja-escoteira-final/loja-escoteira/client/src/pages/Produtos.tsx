/**
 * Página de Produtos - Lista todos os produtos disponíveis
 * Usa: getProducts(), useCart() para adicionar ao carrinho
 */

import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { trpc } from "../lib/trpc";
import { apiUrl } from "../const";
import camisaFallback from "../images/camisa.png";

function normalizePrice(value: number) {
  return value / 100;
}

function resolveProductImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return camisaFallback;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("data:")) {
    return imageUrl;
  }
  if (imageUrl.startsWith("/")) {
    return apiUrl(imageUrl);
  }
  return apiUrl(`/${imageUrl}`);
}

export default function Produtos() {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");

  const productsQuery = trpc.products.list.useQuery({
    search: searchTerm.trim() || undefined,
    limit: 200,
  });

  const produtos: Product[] = useMemo(
    () =>
      (productsQuery.data ?? []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || "",
        price: normalizePrice(Number(item.price)),
        image: resolveProductImageUrl(item.imageUrl),
        category: item.category,
        stock: Number(item.stock ?? 0),
      })),
    [productsQuery.data],
  );

  return (
    <div>
      <div style={{ ...styles.header, marginBottom: isMobile ? 28 : styles.header.marginBottom, paddingBottom: isMobile ? 20 : styles.header.paddingBottom }}>
        <div>
          <h1 style={{ ...styles.title, fontSize: isMobile ? 30 : styles.title.fontSize }}>Nossa Colecao</h1>
          <p style={{ ...styles.subtitle, fontSize: isMobile ? 15 : styles.subtitle.fontSize }}>
            Descubra nossos {produtos.length} produtos de qualidade premium para o seu movimento escoteiro
          </p>
        </div>
      </div>

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
            x
          </button>
        )}
      </div>

      {productsQuery.isLoading ? <p style={styles.resultInfo}>Carregando produtos...</p> : null}
      {productsQuery.isError ? <p style={styles.resultInfo}>Não foi possível carregar produtos do banco.</p> : null}

      {!productsQuery.isLoading && produtos.length > 0 ? (
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
      ) : !productsQuery.isLoading ? (
        <div style={{ ...styles.emptyState, padding: isMobile ? "40px 16px" : styles.emptyState.padding }}>
          <div style={styles.emptyIcon}>o</div>
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
      ) : null}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    marginBottom: 48,
    paddingBottom: 24,
    borderBottom: "1px solid #262626",
  },
  title: {
    fontSize: 40,
    fontWeight: 900,
    color: "#f0ede8",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#9ca3af",
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
    border: "1px solid #2f2f2f",
    borderRadius: 10,
    fontSize: 16,
    transition: "all 0.3s ease",
    backgroundColor: "#111111",
    color: "#f0ede8",
    boxShadow: "none",
  },
  clearButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    color: "#6b7280",
    background: "transparent",
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
    color: "#9ca3af",
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
    backgroundColor: "#111111",
    border: "1px solid #2a2a2a",
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
    color: "#f0ede8",
    marginBottom: 12,
  },
  emptyText: {
    color: "#9ca3af",
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
