/**
 * Página ProductDetail - Detalhes completos do produto
 * Exibe informações completas, opções de customização e ações de compra
 */

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useToast } from "../contexts/ToastContext";
import { getProductById } from "../lib/mockProducts";
import type { CSSProperties } from "react";
import { useState, useEffect } from "react";

const COLORS = [
  { name: "Preto", hex: "#1a1a1a" },
  { name: "Branco", hex: "#ffffff" },
  { name: "Azul", hex: "#1e40af" },
  { name: "Vermelho", hex: "#dc2626" },
  { name: "Verde", hex: "#15803d" },
];

const SIZES = ["PP", "P", "M", "G", "GG", "XG"];

const RATINGS = [
  { stars: 5, count: 45 },
  { stars: 4, count: 12 },
  { stars: 3, count: 3 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites();
  const { showToast } = useToast();
  
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].name);
  const [selectedSize, setSelectedSize] = useState<string>(SIZES[2]);
  const [quantity, setQuantity] = useState(1);

  const productId = id ? parseInt(id) : null;
  const product = productId ? getProductById(productId) : null;
  const isFav = product ? isFavorited(product.id) : false;

  // Scroll ao topo quando a página de detalhe é carregada
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Função para voltar à página anterior ou home
  const handleGoBack = () => {
    const from = (location.state as any)?.from;
    if (from === "/" || from === "/produtos") {
      navigate(from);
    } else {
      navigate("/");
    }
  };

  if (!product) {
    return (
      <div style={styles.errorContainer as CSSProperties}>
        <h1>Produto não encontrado</h1>
        <button 
          onClick={handleGoBack}
          style={styles.backButton as CSSProperties}
        >
          ← Voltar
        </button>
      </div>
    );
  }

  const totalRatings = RATINGS.reduce((sum, r) => sum + r.count, 0);
  const averageRating =
    RATINGS.reduce((sum, r) => sum + r.stars * r.count, 0) / totalRatings;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast({
      message: `${product.name} adicionado ao carrinho! (${quantity}x)`,
      actionLabel: "Ver carrinho",
      action: () => navigate("/carrinho"),
      duration: 4500,
    });
    setQuantity(1);
  };

  const handleAddToFavorites = () => {
    if (!product) return;
    
    if (isFav) {
      removeFromFavorites(product.id);
      showToast({
        message: `${product.name} removido dos favoritos`,
        duration: 3000,
      });
    } else {
      addToFavorites(product);
      showToast({
        message: `${product.name} adicionado aos favoritos`,
        duration: 3000,
      });
    }
  };

  return (
    <div>
      {/* Botão voltar */}
      <button 
        onClick={handleGoBack}
        style={styles.backButton as CSSProperties}
      >
        ← Voltar
      </button>

      {/* Container principal */}
      <div style={styles.container as CSSProperties}>
        
        {/* Coluna esquerda - Imagem */}
        <div style={styles.leftColumn as CSSProperties}>
          <div style={styles.imageContainer as CSSProperties}>
            <img 
              src={product.image} 
              alt={product.name}
              style={styles.productImage as CSSProperties}
            />
          </div>
        </div>

        {/* Coluna direita - Informações */}
        <div style={styles.rightColumn as CSSProperties}>
          
          {/* Título e Badge */}
          <div style={styles.headerSection as CSSProperties}>
            <h1 style={styles.productTitle as CSSProperties}>{product.name}</h1>
            <span style={styles.badge as CSSProperties}>⭐ BESTSELLER</span>
          </div>

          {/* Rating */}
          <div style={styles.ratingSection as CSSProperties}>
            <div style={styles.ratingStars as CSSProperties}>
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i}
                  style={{
                    color: i < Math.floor(averageRating) ? "#fbbf24" : "#d1d5db",
                    fontSize: 20,
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <div style={styles.ratingText as CSSProperties}>
              <strong>{averageRating.toFixed(1)}</strong> ({totalRatings} avaliações)
            </div>
          </div>

          {/* Preço */}
          <div style={styles.priceSection as CSSProperties}>
            <h2 style={styles.price as CSSProperties}>R$ {product.price.toFixed(2)}</h2>
            <p style={styles.priceNote as CSSProperties}>
              Frete grátis para compras acima de R$ 200
            </p>
          </div>

          {/* Seletor de Cores */}
          <div style={styles.sectionBlock as CSSProperties}>
            <h3 style={styles.sectionTitle as CSSProperties}>Cores Disponíveis</h3>
            <div style={styles.colorGrid as CSSProperties}>
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  style={{
                    ...styles.colorOption,
                    background: color.hex,
                    border: selectedColor === color.name 
                      ? "3px solid #1a1a1a" 
                      : "2px solid #e0e0e0",
                  } as CSSProperties}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <span style={styles.colorCheckmark as CSSProperties}>✓</span>
                  )}
                </button>
              ))}
            </div>
            <p style={styles.selectedLabel as CSSProperties}>
              Selecionado: <strong>{selectedColor}</strong>
            </p>
          </div>

          {/* Seletor de Tamanho */}
          <div style={styles.sectionBlock as CSSProperties}>
            <h3 style={styles.sectionTitle as CSSProperties}>Tamanho</h3>
            <div style={styles.sizeGrid as CSSProperties}>
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    ...styles.sizeOption,
                    background: selectedSize === size ? "#1a1a1a" : "white",
                    color: selectedSize === size ? "white" : "#1a1a1a",
                  } as CSSProperties}
                >
                  {size}
                </button>
              ))}
            </div>
            <p style={styles.selectedLabel as CSSProperties}>
              Selecionado: <strong>{selectedSize}</strong>
            </p>
          </div>

          {/* Quantidade */}
          <div style={styles.sectionBlock as CSSProperties}>
            <h3 style={styles.sectionTitle as CSSProperties}>Quantidade</h3>
            <div style={styles.quantityControl as CSSProperties}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityBtn as CSSProperties}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={product.stock || 999}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={styles.quantityInput as CSSProperties}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={styles.quantityBtn as CSSProperties}
              >
                +
              </button>
            </div>
          </div>

          {/* Botões de Ação */}
          <div style={styles.actionButtons as CSSProperties}>
            <button
              onClick={handleAddToCart}
              style={styles.addToCartBtn as CSSProperties}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLElement;
                btn.style.transform = "scale(1.02)";
                btn.style.boxShadow = "0 12px 24px rgba(26,26,26,0.3)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLElement;
                btn.style.transform = "scale(1)";
                btn.style.boxShadow = "0 4px 12px rgba(26,26,26,0.2)";
              }}
            >
              🛒 Adicionar ao Carrinho
            </button>
            <button
              onClick={handleAddToFavorites}
              style={{
                ...styles.favoriteBtn,
                background: isFav ? "#dc2626" : "white",
                color: isFav ? "white" : "#dc2626",
              } as CSSProperties}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLElement;
                btn.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLElement;
                btn.style.transform = "scale(1)";
              }}
            >
              {isFav ? "★ Nos Favoritos" : "★ Adicionar aos Favoritos"}
            </button>
          </div>

          {/* Descrição */}
          <div style={styles.descriptionSection as CSSProperties}>
            <h3 style={styles.sectionTitle as CSSProperties}>Descrição do Produto</h3>
            <p style={styles.description as CSSProperties}>
              {product.description}
            </p>
          </div>

          {/* Info de Estoque */}
          {product.stock && (
            <div style={styles.stockInfo as CSSProperties}>
              <span style={{
                color: product.stock > 5 ? "#15803d" : "#dc2626"
              }}>
                {product.stock > 0 
                  ? `✓ ${product.stock} em estoque` 
                  : "⚠️ Fora de estoque"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  backButton: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#e8e8e8",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: 32,
    transition: "all 0.2s ease",
  },
  errorContainer: {
    textAlign: "center",
    padding: 60,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    marginBottom: 80,
  },
  leftColumn: {
    display: "flex",
    alignItems: "flex-start",
  },
  imageContainer: {
    width: "100%",
    background: "#f5f5f5",
    borderRadius: 12,
    overflow: "hidden",
    padding: 20,
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  rightColumn: {
    paddingTop: 12,
  },
  headerSection: {
    marginBottom: 24,
  },
  productTitle: {
    fontSize: 32,
    fontWeight: 900,
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 1.2,
  },
  badge: {
    display: "inline-block",
    background: "#15803d",
    color: "white",
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
    paddingBottom: 24,
    borderBottom: "1px solid #e0e0e0",
  },
  ratingStars: {
    display: "flex",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  priceSection: {
    marginBottom: 32,
  },
  price: {
    fontSize: 36,
    fontWeight: 900,
    color: "#1a1a1a",
    margin: 0,
    marginBottom: 8,
  },
  priceNote: {
    fontSize: 13,
    color: "#15803d",
    margin: 0,
    fontWeight: 600,
  },
  sectionBlock: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  colorGrid: {
    display: "flex",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  colorCheckmark: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textShadow: "0 0 4px rgba(0,0,0,0.5)",
  },
  sizeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 8,
    marginBottom: 12,
  },
  sizeOption: {
    padding: 12,
    border: "2px solid #e0e0e0",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
    transition: "all 0.2s ease",
  },
  selectedLabel: {
    fontSize: 13,
    color: "#666",
    margin: 0,
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    maxWidth: 140,
  },
  quantityBtn: {
    width: 40,
    height: 40,
    border: "2px solid #e0e0e0",
    background: "white",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
    transition: "all 0.2s ease",
  },
  quantityInput: {
    flex: 1,
    padding: 8,
    border: "2px solid #e0e0e0",
    borderRadius: 6,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 700,
  },
  actionButtons: {
    display: "flex",
    gap: 12,
    marginBottom: 32,
  },
  addToCartBtn: {
    flex: 1,
    padding: "14px 24px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(26,26,26,0.2)",
  },
  favoriteBtn: {
    padding: "14px 24px",
    border: "2px solid #dc2626",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: 180,
  },
  descriptionSection: {
    paddingTop: 24,
    borderTop: "1px solid #e0e0e0",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 1.6,
    margin: 0,
  },
  stockInfo: {
    marginTop: 16,
    padding: 12,
    background: "#f5f5f5",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
  },
};
