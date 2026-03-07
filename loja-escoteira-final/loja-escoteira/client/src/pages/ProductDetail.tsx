/**
 * Pagina ProductDetail - Detalhes completos do produto
 * Exibe informações completas, opções de customização e ações de compra
 */

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useToast } from "../contexts/ToastContext";
import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { trpc } from "../lib/trpc";
import logoPrincipalPreta from "../images/logo-principal-preta.jpeg";
import logoPreta from "../images/logo_preta.jpeg";

const DEFAULT_COLORS = ["Preto", "Branco", "Azul", "Vermelho", "Verde"];
const DEFAULT_SIZES = ["PP", "P", "M", "G", "GG", "XG"];
const COLOR_HEX_BY_NAME: Record<string, string> = {
  preto: "#1a1a1a",
  branco: "#ffffff",
  azul: "#1e40af",
  vermelho: "#dc2626",
  verde: "#15803d",
  cinza: "#6b7280",
  amarelo: "#f59e0b",
  bege: "#d6c6a5",
  marrom: "#7c4a2d",
  rosa: "#ec4899",
  roxo: "#7c3aed",
  laranja: "#ea580c",
};

const RATINGS = [
  { stars: 5, count: 45 },
  { stars: 4, count: 12 },
  { stars: 3, count: 3 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const EXTRA_IMAGES = [
  "/images/camisa.png",
  logoPrincipalPreta,
  logoPreta,
];

function normalizePrice(value: number) {
  return value / 100;
}

function parseJsonList(raw: unknown): string[] {
  if (!raw || typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(item => String(item).trim()).filter(Boolean);
  } catch {
    return [];
  }
}

export default function ProductDetail() {
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites();
  const { showToast } = useToast();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSelectionWarning, setShowSelectionWarning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const productId = id ? parseInt(id) : null;
  const productQuery = trpc.products.getById.useQuery(productId ?? 0, {
    enabled: Boolean(productId),
  });
  const product = productQuery.data
    ? {
        id: productQuery.data.id,
        name: productQuery.data.name,
        description: productQuery.data.description || "",
        price: normalizePrice(Number(productQuery.data.price)),
        image: productQuery.data.imageUrl || "/images/camisa.png",
        category: productQuery.data.category,
        stock: Number(productQuery.data.stock ?? 0),
        optionColors: parseJsonList((productQuery.data as any).optionColors),
        optionSizes: parseJsonList((productQuery.data as any).optionSizes),
        sizeType: String((productQuery.data as any).sizeType ?? "alpha"),
        images:
          Array.isArray((productQuery.data as any).images) &&
          (productQuery.data as any).images.length > 0
            ? ((productQuery.data as any).images as string[])
            : [],
      }
    : null;
  const isFav = product ? isFavorited(product.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      setShowSelectionWarning(false);
    }
  }, [selectedColor, selectedSize]);

  useEffect(() => {
    if (!product) return;
    setSelectedImage(product.image);
  }, [product?.id, product?.image]);

  const handleGoBack = () => {
    const from = (location.state as any)?.from;
    if (from === "/" || from === "/produtos") {
      navigate(from);
    } else {
      navigate("/");
    }
  };

  if (!product) {
    if (productQuery.isLoading) {
      return <p style={styles.loadingText}>Carregando produto...</p>;
    }
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

  const galleryImages = Array.from(new Set([product.image, ...(product.images || []), ...EXTRA_IMAGES].filter(Boolean)));
  const totalRatings = RATINGS.reduce((sum, r) => sum + r.count, 0);
  const averageRating =
    RATINGS.reduce((sum, r) => sum + r.stars * r.count, 0) / totalRatings;
  const colorOptions = (product.optionColors?.length ? product.optionColors : DEFAULT_COLORS).map(name => ({
    name,
    hex: COLOR_HEX_BY_NAME[name.toLowerCase()] ?? "#d1d5db",
  }));
  const sizeOptions = product.optionSizes?.length ? product.optionSizes : DEFAULT_SIZES;
  const canAddToCart = Boolean(selectedColor && selectedSize);
  const missingSelections: string[] = [];
  if (!selectedColor) missingSelections.push("cor");
  if (!selectedSize) missingSelections.push("tamanho");

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setShowSelectionWarning(true);
      showToast({
        message: "Selecione cor e tamanho antes de adicionar ao carrinho",
        duration: 3500,
      });
      return;
    }

    addToCart(product, quantity, {
      cor: selectedColor,
      tamanho: selectedSize,
    });
    showToast({
      message: `${product.name} adicionado ao carrinho! (${quantity}x)`,
      actionLabel: "Ver carrinho",
      action: () => navigate("/carrinho"),
      duration: 4500,
    });
    setShowSelectionWarning(false);
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
      <button
        onClick={handleGoBack}
        style={{ ...styles.backButton, marginBottom: isMobile ? 18 : styles.backButton.marginBottom } as CSSProperties}
      >
        ← Voltar
      </button>

      <div
        style={{
          ...styles.container,
          gridTemplateColumns: isMobile ? "1fr" : styles.container.gridTemplateColumns,
          gap: isMobile ? 24 : styles.container.gap,
          marginBottom: isMobile ? 40 : styles.container.marginBottom,
        } as CSSProperties}
      >
        <div style={styles.leftColumn as CSSProperties}>
          <div style={styles.imageContainer as CSSProperties}>
            <img
              src={selectedImage || product.image}
              alt={product.name}
              style={styles.productImage as CSSProperties}
              onError={(event) => {
                event.currentTarget.src = "/images/camisa.png";
              }}
            />
          </div>

          <div style={styles.galleryRow as CSSProperties}>
            {galleryImages.map((image, idx) => {
              const active = (selectedImage || product.image) === image;
              return (
                <button
                  key={`${image}-${idx}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  style={{
                    ...styles.thumbButton,
                    ...(active ? styles.thumbButtonActive : {}),
                  } as CSSProperties}
                >
                  <img
                    src={image}
                    alt={`Foto ${idx + 1}`}
                    style={styles.thumbImage as CSSProperties}
                    onError={(event) => {
                      event.currentTarget.src = "/images/camisa.png";
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            ...styles.rightColumn,
            paddingBottom: isMobile ? 120 : styles.rightColumn.paddingBottom,
          } as CSSProperties}
        >
          <div style={styles.headerSection as CSSProperties}>
            <h1 style={{ ...styles.productTitle, fontSize: isMobile ? 24 : styles.productTitle.fontSize } as CSSProperties}>{product.name}</h1>
            <div style={styles.headerMetaRow as CSSProperties}>
              <span style={styles.badge as CSSProperties}>⭐ BESTSELLER</span>
              <button
                onClick={handleAddToFavorites}
                style={{
                  ...styles.favoriteQuickBtn,
                  background: isFav ? "#dc2626" : "#ffffff",
                  color: isFav ? "#ffffff" : "#dc2626",
                  borderColor: "#dc2626",
                } as CSSProperties}
              >
                {isFav ? "★ Nos Favoritos" : "★ Favoritar"}
              </button>
            </div>
          </div>

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

          <div style={styles.priceSection as CSSProperties}>
            <h2 style={{ ...styles.price, fontSize: isMobile ? 30 : styles.price.fontSize } as CSSProperties}>R$ {product.price.toFixed(2)}</h2>
            <p style={styles.priceNote as CSSProperties}>
              Frete gratis para compras acima de R$ 200
            </p>
          </div>

          <div style={styles.sectionBlock as CSSProperties}>
            <h3 style={styles.sectionTitle as CSSProperties}>Cores Disponíveis</h3>
            <div style={styles.colorGrid as CSSProperties}>
              {colorOptions.map((color) => (
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
              Selecionado: <strong>{selectedColor || "Nenhuma cor"}</strong>
            </p>
          </div>

          <div style={styles.sectionBlock as CSSProperties}>
            <h3 style={styles.sectionTitle as CSSProperties}>{product.sizeType === "numeric" ? "Tamanho (numerico)" : "Tamanho"}</h3>
            <div
              style={{
                ...styles.sizeGrid,
                gridTemplateColumns: isMobile ? (product.sizeType === "numeric" ? "repeat(4, 1fr)" : "repeat(3, 1fr)") : styles.sizeGrid.gridTemplateColumns,
              } as CSSProperties}
            >
              {sizeOptions.map((size) => (
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
              Selecionado: <strong>{selectedSize || "Nenhum tamanho"}</strong>
            </p>
          </div>

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

          <div
            style={{
              ...styles.actionButtons,
              flexDirection: isMobile ? "row" : "row",
              position: isMobile ? "fixed" : styles.actionButtons.position,
              left: isMobile ? 0 : styles.actionButtons.left,
              right: isMobile ? 0 : styles.actionButtons.right,
              bottom: isMobile ? 0 : styles.actionButtons.bottom,
              zIndex: isMobile ? 95 : styles.actionButtons.zIndex,
              marginBottom: isMobile ? 0 : styles.actionButtons.marginBottom,
              padding: isMobile ? "10px 14px calc(10px + env(safe-area-inset-bottom, 0px))" : styles.actionButtons.padding,
              background: isMobile ? "#ffffff" : styles.actionButtons.background,
              borderTop: isMobile ? "1px solid #e5e7eb" : styles.actionButtons.borderTop,
              boxShadow: isMobile ? "0 -6px 16px rgba(0,0,0,0.08)" : styles.actionButtons.boxShadow,
            } as CSSProperties}
          >
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
          </div>

          {showSelectionWarning && !canAddToCart && (
            <p style={styles.selectionWarning as CSSProperties}>
              Selecione {missingSelections.join(" e ")} antes de adicionar ao carrinho.
            </p>
          )}

          <div style={styles.descriptionSection as CSSProperties}>
            <h3 style={styles.sectionTitle as CSSProperties}>Descricao do Produto</h3>
            <p style={styles.description as CSSProperties}>
              {product.description}
            </p>
          </div>

          {product.stock && (
            <div style={styles.stockInfo as CSSProperties}>
              <span style={{
                color: product.stock > 5 ? "#1a1a1a" : "#dc2626"
              }}>
                {product.stock > 0
                  ? `✓ ${product.stock} em estoque`
                  : "Fora de estoque"}
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
    flexDirection: "column",
    gap: 12,
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
  galleryRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  thumbButton: {
    width: 70,
    height: 70,
    borderRadius: 8,
    border: "2px solid #d1d5db",
    overflow: "hidden",
    padding: 0,
    cursor: "pointer",
    background: "#ffffff",
  },
  thumbButtonActive: {
    border: "2px solid #1a1a1a",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  rightColumn: {
    paddingTop: 12,
    paddingBottom: 0,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerMetaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
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
    background: "#1a1a1a",
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
    color: "#555555",
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
    position: "static",
    left: "auto",
    right: "auto",
    bottom: "auto",
    zIndex: 0,
    padding: 0,
    background: "transparent",
    borderTop: "none",
    boxShadow: "none",
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
  favoriteQuickBtn: {
    padding: "8px 12px",
    border: "1px solid #dc2626",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  selectionWarning: {
    margin: "-18px 0 24px 0",
    fontSize: 13,
    fontWeight: 600,
    color: "#dc2626",
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
  loadingText: {
    color: "#6b7280",
    fontSize: 16,
    margin: 0,
  },
};
