import { useNavigate, useLocation } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Product } from "../types/product";
import { getCategoryLabel } from "../lib/productCategories";
import camisaFallback from "../images/camisa.png";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  const getBadgeInfo = () => {
    if ((product.stock ?? 0) <= 0) return { text: "INDISPONIVEL", color: "#5b1d1d" };
    if ((product.stock ?? 0) <= 3) return { text: "ESTOQUE REDUZIDO", color: "#6b3e0b" };
    if (product.category?.trim()) return { text: getCategoryLabel(product.category).toUpperCase(), color: "#4a5568" };
    return { text: "DESTAQUE", color: "#555555" };
  };

  const badge = getBadgeInfo();

  return (
    <div
      style={styles.card as CSSProperties}
      onClick={() => navigate(`/produto/${product.id}`, { state: { from: location.pathname } })}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        const img = card.querySelector("img") as HTMLImageElement;
        const overlay = card.querySelector("[class*='designOverlay']") as HTMLElement;
        if (img) img.style.transform = "scale(1.08)";
        if (overlay) overlay.style.opacity = "1";
        (card as HTMLElement).style.boxShadow = "0 20px 40px rgba(26,26,26,0.15)";
        (card as HTMLElement).style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        const img = card.querySelector("img") as HTMLImageElement;
        const overlay = card.querySelector("[class*='designOverlay']") as HTMLElement;
        if (img) img.style.transform = "scale(1)";
        if (overlay) overlay.style.opacity = "0";
        (card as HTMLElement).style.boxShadow = "0 4px 6px rgba(0,0,0,0.07)";
        (card as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={styles.imageContainer as CSSProperties}>
        <img
          src={product.image}
          style={styles.image as CSSProperties}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src = camisaFallback;
          }}
        />
        <div style={{ ...styles.badge, background: badge.color } as CSSProperties}>{badge.text}</div>
        <div style={styles.designOverlay as CSSProperties}>
          <div style={styles.overlayContent as CSSProperties}>
            {(product.stock ?? 0) > 0 ? "Clique para ver detalhes" : "Indisponivel no momento"}
          </div>
        </div>
      </div>

      <div style={styles.content as CSSProperties}>
        <h3 style={styles.name as CSSProperties}>{product.name}</h3>
        <p style={styles.price as CSSProperties}>{formattedPrice}</p>
        <p style={styles.helper as CSSProperties}>
          {(product.stock ?? 0) > 0
            ? "Consulte variacoes, disponibilidade e prazo na pagina do produto."
            : "Este item esta temporariamente indisponivel."}
        </p>
        <button
          style={styles.button as CSSProperties}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/produto/${product.id}`, { state: { from: location.pathname } });
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.boxShadow = "0 8px 16px rgba(26,26,26,0.3)";
            btn.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.boxShadow = "none";
            btn.style.transform = "scale(1)";
          }}
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#111111",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.28)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    border: "1px solid #2b2b2b",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    background: "#161616",
  },
  image: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    color: "white",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.5px",
  },
  designOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "linear-gradient(to top, rgba(26, 26, 26, 0.85), transparent)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "12px",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  overlayContent: {
    color: "white",
    fontSize: 12,
    fontWeight: 600,
    textAlign: "center",
    letterSpacing: "0.5px",
  },
  content: {
    padding: "20px",
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: "#f0ede8",
    margin: "0 0 8px 0",
    lineHeight: 1.3,
  },
  price: {
    fontSize: 20,
    fontWeight: 800,
    color: "#f0ede8",
    margin: "0 0 8px 0",
  },
  helper: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#9ca3af",
    margin: "0 0 16px 0",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #343434 100%)",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 14,
    letterSpacing: "0.3px",
  },
};
