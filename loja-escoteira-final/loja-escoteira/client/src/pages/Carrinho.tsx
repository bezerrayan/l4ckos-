/**
 * Página do Carrinho - Exibe itens do carrinho e permite editar quantidades
 * Usa: useCart() para gerenciar carrinho
 */

import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/utils";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Carrinho() {
  const isMobile = useIsMobile();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const getItemKey = (productId: number, selectedOptions?: Record<string, string>) => {
    if (!selectedOptions) return `${productId}`;
    const optionString = Object.entries(selectedOptions)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}:${value}`)
      .join("|");
    return `${productId}-${optionString}`;
  };

  const formatSelectedOptions = (selectedOptions?: Record<string, string>) => {
    if (!selectedOptions) return "";

    const labelMap: Record<string, string> = {
      cor: "Cor",
      tamanho: "Tamanho",
      size: "Tamanho",
      color: "Cor",
    };

    return Object.entries(selectedOptions)
      .map(([key, value]) => `${labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join(" • ");
  };

  return (
    <div>
      {/* Header */}
      <div style={{ ...styles.header, marginBottom: isMobile ? 28 : styles.header.marginBottom, paddingBottom: isMobile ? 20 : styles.header.paddingBottom }}>
        <h1 style={{ ...styles.title, fontSize: isMobile ? 30 : styles.title.fontSize }}>
          <span style={{display: "inline-flex", alignItems: "center", gap: 10}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "#1a1a1a"}}>
              <path d="M6 6h15l-1.5 9h-13z"></path>
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="19" cy="20" r="1"></circle>
            </svg>
            Seu Carrinho
          </span>
        </h1>
        <p style={styles.subtitle}>
          {cart.items.length === 0
            ? "Comece a adicionar produtos!"
            : `${cart.items.length} item${cart.items.length !== 1 ? "ns" : ""} no carrinho`}
        </p>
      </div>

      {cart.items.length > 0 ? (
        <div
          style={{
            ...styles.container,
            gridTemplateColumns: isMobile ? "1fr" : styles.container.gridTemplateColumns,
            gap: isMobile ? 20 : styles.container.gap,
          }}
        >
          {/* Tabela de Itens - Mobile responsivo */}
          <div style={styles.itemsSection}>
            <h2 style={styles.sectionTitle}>Seu Pedido</h2>

            <div style={styles.itemsList}>
              {cart.items.map((item) =>
                isMobile ? (
                  <div key={getItemKey(item.product.id, item.selectedOptions)} style={styles.mobileCard}>
                    <div style={styles.mobileTopRow}>
                      <div style={styles.mobileImageWrap}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={styles.mobileImage}
                          onError={(event) => {
                            event.currentTarget.src = "/images/camisa.png";
                          }}
                        />
                      </div>

                      <div style={styles.mobileInfoCol}>
                        <h3 style={styles.mobileItemName}>{item.product.name}</h3>
                        <p style={styles.mobileItemSub}>Materiais Escoteiros</p>
                        {item.selectedOptions && (
                          <p style={styles.mobileItemSub}>{formatSelectedOptions(item.selectedOptions)}</p>
                        )}
                      </div>

                      <div style={styles.mobilePriceCol}>
                        <p style={styles.mobilePriceLabel}>Subtotal</p>
                        <p style={styles.mobilePriceValue}>{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>

                    <div style={styles.mobileBottomRow}>
                      <div style={styles.mobileQtyWrap}>
                        <button
                          style={styles.mobileQtyBtn}
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                              item.selectedOptions
                            )
                          }
                        >
                          −
                        </button>
                        <span style={styles.mobileQtyValue}>{item.quantity}</span>
                        <button
                          style={styles.mobileQtyBtn}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.selectedOptions)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        style={styles.mobileRemoveBtn}
                        onClick={() => removeFromCart(item.product.id, item.selectedOptions)}
                        title="Remover item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "#9b9b9b"}}>
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={getItemKey(item.product.id, item.selectedOptions)} style={styles.cartItemScroller}>
                    <div
                      style={{
                        ...styles.cartItem,
                        gridTemplateColumns: styles.cartItem.gridTemplateColumns,
                        gap: styles.cartItem.gap,
                      }}
                    >
                      <div style={styles.itemImageContainer}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={styles.itemImage}
                          onError={(event) => {
                            event.currentTarget.src = "/images/camisa.png";
                          }}
                        />
                      </div>

                      <div style={styles.itemDetails}>
                        <h3 style={styles.itemName}>{item.product.name}</h3>
                        <p style={styles.itemCategory}>Materiais Escoteiros</p>
                        {item.selectedOptions && (
                          <p style={styles.itemOptions}>{formatSelectedOptions(item.selectedOptions)}</p>
                        )}
                        <p style={styles.itemPrice}>
                          {formatPrice(item.product.price)}/unidade
                        </p>
                      </div>

                      <div style={styles.itemQuantity}>
                        <label style={styles.quantityLabel}>Qtd.</label>
                        <div style={styles.quantityControl}>
                          <button
                            style={styles.quantityBtn}
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1),
                                item.selectedOptions
                              )
                            }
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.product.id,
                                parseInt(e.target.value) || 1,
                                item.selectedOptions
                              )
                            }
                            style={styles.quantityInput}
                          />
                          <button
                            style={styles.quantityBtn}
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.selectedOptions)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div style={styles.itemTotal}>
                        <p style={styles.itemTotalLabel}>Subtotal</p>
                        <p style={styles.totalPrice}>
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      <button
                        style={styles.removeBtn}
                        onClick={() => removeFromCart(item.product.id, item.selectedOptions)}
                        title="Remover item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "#9b9b9b"}}>
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div
            style={{
              ...styles.summarySection,
              position: isMobile ? "static" : styles.summarySection.position,
              top: isMobile ? undefined : styles.summarySection.top,
            }}
          >
            <h2 style={styles.sectionTitle}>Resumo do Pedido</h2>

            <div style={styles.summaryCard}>
              {/* Detalhes */}
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal:</span>
                <span style={styles.summaryValue}>
                  {formatPrice(cart.total)}
                </span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Frete:</span>
                <span style={{ ...styles.summaryValue, color: "#555555" }}>
                  Grátis
                </span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Desconto:</span>
                <span style={{ ...styles.summaryValue, color: "#555555" }}>
                  -R$ 0,00
                </span>
              </div>

              <div style={styles.divider}></div>

              {/* Total */}
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total:</span>
                <span style={styles.totalAmount}>{formatPrice(cart.total)}</span>
              </div>

              {/* Botões */}
              <button
                style={styles.checkoutBtn}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLElement;
                  btn.style.transform = "translateY(-2px)";
                  btn.style.boxShadow =
                    "0 12px 24px rgba(26,26,26,0.3)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLElement;
                  btn.style.transform = "translateY(0)";
                  btn.style.boxShadow = "0 4px 12px rgba(26,26,26,0.2)";
                }}
              >
                Finalizar Compra
              </button>

              <Link to="/produtos" style={styles.continueShopping}>
                ← Continuar Comprando
              </Link>
            </div>

            {/* Info extra */}
            <div style={styles.infoBox}>
              <p style={styles.infoTitle}>💚 Benefícios:</p>
              <ul style={styles.infoBenefits}>
                <li>✓ Entrega em até 5 dias úteis</li>
                <li>✓ Garantia do fabricante</li>
                <li>✓ Suporte ao cliente 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ ...styles.emptyState, padding: isMobile ? "44px 16px" : styles.emptyState.padding }}>
          <div style={styles.emptyIcon}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{color: "#555555"}}>
              <path d="M6 6h15l-1.5 9h-13z"></path>
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="19" cy="20" r="1"></circle>
            </svg>
          </div>
          <h2 style={styles.emptyTitle}>Seu carrinho está vazio</h2>
          <p style={styles.emptyText}>
            Adicione alguns produtos escoteiros para começar suas compras
          </p>
          <Link to="/produtos" style={styles.emptyButton}>
            Explorar Produtos
          </Link>
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
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    margin: 0,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 40,
    marginBottom: 0,
  },
  itemsSection: {
    minWidth: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 24,
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  cartItemScroller: {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorX: "contain",
    WebkitOverflowScrolling: "touch",
  },
  mobileCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 10,
  },
  mobileTopRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  mobileImageWrap: {
    width: 78,
    height: 78,
    borderRadius: 8,
    overflow: "hidden",
    flexShrink: 0,
    background: "#f8fafc",
  },
  mobileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  mobileInfoCol: {
    flex: 1,
    minWidth: 0,
  },
  mobileItemName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1a1a1a",
    margin: 0,
    lineHeight: 1.2,
    textTransform: "uppercase",
  },
  mobileItemSub: {
    fontSize: 12,
    color: "#666666",
    margin: "2px 0 0 0",
    lineHeight: 1.25,
  },
  mobilePriceCol: {
    minWidth: 96,
    textAlign: "right",
  },
  mobilePriceLabel: {
    fontSize: 11,
    color: "#6b7280",
    margin: 0,
  },
  mobilePriceValue: {
    fontSize: 26,
    fontWeight: 800,
    color: "#1a1a1a",
    margin: "2px 0 0 0",
    lineHeight: 1,
  },
  mobileBottomRow: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobileQtyWrap: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  mobileQtyBtn: {
    width: 24,
    height: 24,
    border: "none",
    background: "transparent",
    color: "#1a1a1a",
    fontSize: 20,
    lineHeight: 1,
    cursor: "pointer",
    padding: 0,
  },
  mobileQtyValue: {
    minWidth: 16,
    textAlign: "center",
    color: "#1a1a1a",
    fontSize: 15,
    fontWeight: 600,
  },
  mobileRemoveBtn: {
    border: "none",
    background: "transparent",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
  },
  cartItem: {
    display: "grid",
    gridTemplateColumns: "100px 1fr 1fr 100px 80px 40px",
    gap: 16,
    alignItems: "center",
    padding: 16,
    background: "white",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
  },
  itemImageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    background: "#f8fafc",
  },
  itemImage: {
    width: "100%",
    height: 100,
    objectFit: "cover",
  },
  itemDetails: {
    paddingLeft: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1a1a1a",
    margin: "0 0 4px 0",
  },
  itemCategory: {
    fontSize: 12,
    color: "#6b7280",
    margin: "0 0 4px 0",
  },
  itemOptions: {
    fontSize: 12,
    color: "#374151",
    margin: "0 0 4px 0",
    fontWeight: 600,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 700,
    color: "#555555",
    margin: 0,
  },
  itemQuantity: {
    textAlign: "center",
  },
  quantityLabel: {
    fontSize: 12,
    color: "#6b7280",
    display: "block",
    marginBottom: 8,
    fontWeight: 600,
  },
  quantityControl: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  quantityBtn: {
    background: "#f8fafc",
    border: "none",
    width: 32,
    height: 32,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    transition: "background 0.2s ease",
  },
  quantityInput: {
    border: "none",
    width: 40,
    height: 32,
    boxSizing: "border-box",
    padding: 0,
    appearance: "textfield",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 700,
  },
  itemTotal: {
    textAlign: "center",
  },
  itemTotalLabel: {
    fontSize: 12,
    color: "#6b7280",
    margin: "0 0 4px 0",
    fontWeight: 600,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1a1a1a",
    margin: 0,
  },
  removeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    padding: 0,
    width: 32,
    height: 32,
    transition: "transform 0.2s ease",
  },
  summarySection: {
    position: "sticky",
    top: 100,
    height: "fit-content",
  },
  summaryCard: {
    background: "white",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    padding: 24,
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    fontSize: 14,
  },
  summaryLabel: {
    color: "#6b7280",
    fontWeight: 500,
  },
  summaryValue: {
    fontWeight: 600,
    color: "#1a1a1a",
  },
  divider: {
    height: 1,
    background: "#e2e8f0",
    margin: "16px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1a1a1a",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 900,
    color: "#555555",
  },
  checkoutBtn: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: 12,
    fontSize: 18,
  },
  continueShopping: {
    display: "inline-block",
    textAlign: "center",
    padding: "8px 12px",
    color: "#555555",
    border: "1px solid #555555",
    borderRadius: 6,
    fontWeight: 600,
    marginBottom: 12,
    fontSize: 13,
    transition: "all 0.3s ease",
    background: "transparent",
  },
  infoBox: {
    marginTop: 24,
    padding: 16,
    background: "#f8fafc",
    borderRadius: 8,
    border: "1px solid #dbeafe",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1a1a1a",
    margin: "0 0 8px 0",
  },
  infoBenefits: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: 13,
    color: "#6b7280",
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 40px",
    background: "#f8fafc",
    borderRadius: 16,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 32,
  },
  emptyButton: {
    display: "inline-block",
    padding: "14px 32px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    borderRadius: 8,
    fontWeight: 700,
    transition: "all 0.3s ease",
    fontSize: 16,
  },
};
