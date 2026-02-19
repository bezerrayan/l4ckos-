import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import type { CSSProperties } from "react";
import type { Product } from "../types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Determinar tipo de badge baseado no nome
  const getBadgeInfo = () => {
    if (product.name.includes("Aventura")) return { text: "🗺️ AVENTURA", color: "#8b6f47" };
    if (product.name.includes("Liderança")) return { text: "⭐ LIDERANÇA", color: "#4a5568" };
    if (product.name.includes("Natureza")) return { text: "🌿 NATUREZA", color: "#2d5a2d" };
    return { text: "NOVO", color: "#555555" };
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
        if (img) (img.style.transform = "scale(1.08)");
        if (overlay) overlay.style.opacity = "1";
        (card as HTMLElement).style.boxShadow = "0 20px 40px rgba(26,26,26,0.15)";
        (card as HTMLElement).style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        const img = card.querySelector("img") as HTMLImageElement;
        const overlay = card.querySelector("[class*='designOverlay']") as HTMLElement;
        if (img) (img.style.transform = "scale(1)");
        if (overlay) overlay.style.opacity = "0";
        (card as HTMLElement).style.boxShadow = "0 4px 6px rgba(0,0,0,0.07)";
        (card as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={styles.imageContainer as CSSProperties}>
        <img src={product.image} style={styles.image as CSSProperties} alt={product.name} />
        <div style={{...styles.badge, background: badge.color} as CSSProperties}>{badge.text}</div>
        <div style={styles.designOverlay as CSSProperties}>
          {product.name.includes("Aventura") && (
            <div style={styles.overlayContent as CSSProperties}>📍 Mapa Topográfico</div>
          )}
          {product.name.includes("Liderança") && (
            <div style={styles.overlayContent as CSSProperties}>🔷 Brasão Customizado</div>
          )}
          {product.name.includes("Natureza") && (
            <div style={styles.overlayContent as CSSProperties}>🍃 Botânica Exclusiva</div>
          )}
        </div>
      </div>
      
      <div style={styles.content as CSSProperties}>
        <h3 style={styles.name as CSSProperties}>{product.name}</h3>
        <p style={styles.price as CSSProperties}>R$ {product.price.toFixed(2)}</p>
        <button 
          style={styles.button as CSSProperties}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, 1);
            showToast({
              message: `${product.name} adicionado ao carrinho`,
              actionLabel: "Ver carrinho",
              action: () => navigate("/carrinho"),
              duration: 4500,
            });
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.boxShadow = "0 8px 16px rgba(45,80,22,0.3)";
            btn.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.boxShadow = "none";
            btn.style.transform = "scale(1)";
          }}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    border: "1px solid #e2e8f0",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    background: "#f5f5f5",
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
    background: "#555555",
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
    color: "#1a1a1a",
    margin: "0 0 8px 0",
    lineHeight: 1.3,
  },
  price: {
    fontSize: 20,
    fontWeight: 800,
    color: "#1a1a1a",
    margin: "0 0 16px 0",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
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
