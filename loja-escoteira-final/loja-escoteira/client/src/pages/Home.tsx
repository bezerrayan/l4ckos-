/**
 * Página Home - Página inicial com promoções e destaques
 * Exibe carrossel de promoções e alguns produtos featured
 */

import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PromoCarousel from "../components/PromoCarousel";
import { MOCK_PRODUCTS } from "../lib/mockProducts";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();
  // 📌 Pegar todos os produtos para destaque (3 camisas personalizadas)
  const destaque = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div>
      {/* 🎯 Hero Section */}
      <div
        style={{
          ...styles.heroContainer,
          gridTemplateColumns: isMobile ? "1fr" : styles.heroContainer.gridTemplateColumns,
          gap: isMobile ? 24 : styles.heroContainer.gap,
          marginBottom: isMobile ? 36 : styles.heroContainer.marginBottom,
          padding: isMobile ? "18px 0" : styles.heroContainer.padding,
        }}
      >
        <div style={styles.heroContent}>
          <h1 style={{ ...styles.heroTitle, fontSize: isMobile ? 34 : styles.heroTitle.fontSize }}>
            Bem-vindo à Nossa Loja
          </h1>
          <p style={{ ...styles.heroSubtitle, fontSize: isMobile ? 16 : styles.heroSubtitle.fontSize }}>
            Descubra uma seleção variada de produtos de qualidade para esportes, aventura e muito mais
          </p>
          <div style={styles.heroButtons}>
            <Link to="/produtos" style={styles.ctaPrimary}>
              Explorar Catálogo
            </Link>
            <a href="#destaques" style={styles.ctaSecondary}>
              Ver Destaques
            </a>
          </div>
        </div>

        {/* Elemento Visual - Logo/Imagem da Marca */}
        <div style={{ ...styles.heroVisual, height: isMobile ? 240 : styles.heroVisual.height }}>
          <img 
            src="/images/logo%20principal.png" 
            alt="Logo da marca"
            style={styles.heroImage}
          />
        </div>
      </div>

      {/*  Carrossel de Promoções */}
      <section style={{ ...styles.promoSection, marginBottom: isMobile ? 40 : styles.promoSection.marginBottom }}>
        <PromoCarousel />
      </section>

      {/*  Destaques da Loja */}
      <section id="destaques" style={{ ...styles.section, marginBottom: isMobile ? 44 : styles.section.marginBottom }}>
        <div style={styles.sectionHeader}>
          <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 30 : styles.sectionTitle.fontSize }}>Produtos em Destaque</h2>
          <p style={styles.sectionSubtitle}>
            Conheça nossa seleção handpicked dos melhores produtos
          </p>
        </div>

        <div style={{ ...styles.productsGrid, gap: isMobile ? 16 : styles.productsGrid.gap }}>
          {destaque.map((produto, idx) => (
            <div key={produto.id} style={{
              animation: `fadeInUp 0.5s ease-out ${idx * 100}ms backwards`
            }}>
              <ProductCard product={produto} />
            </div>
          ))}
        </div>

        <div style={styles.viewAllContainer}>
          <Link to="/produtos" style={styles.viewAllBtn}>
            Ver Todos os Produtos →
          </Link>
        </div>
      </section>

      {/* ℹ Diferenciais */}
      <section style={{ ...styles.benefitsSection, marginBottom: isMobile ? 44 : styles.benefitsSection.marginBottom }}>
        <div style={styles.sectionHeader}>
          <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 30 : styles.sectionTitle.fontSize }}>Por Que Comprar Conosco</h2>
        </div>

        <div style={styles.benefitsGrid}>
          <div 
            style={styles.benefitCard}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-8px)";
              el.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
            }} 
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07)";
            }}
          >
            <div style={styles.benefitIcon}></div>
            <h3 style={styles.benefitTitle}>Entrega Rápida</h3>
            <p style={styles.benefitText}>Receba seus pedidos em até 5 dias úteis com rastreamento</p>
          </div>

          <div 
            style={styles.benefitCard}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-8px)";
              el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }} 
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 6px rgba(0,0,0,0.07)";
            }}
          >
            <div style={styles.benefitIcon}></div>
            <h3 style={styles.benefitTitle}>Segurança Garantida</h3>
            <p style={styles.benefitText}>Todos os produtos com garantia e proteção ao comprador</p>
          </div>

          <div 
            style={styles.benefitCard}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-8px)";
              el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }} 
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 6px rgba(0,0,0,0.07)";
            }}
          >
            <div style={styles.benefitIcon}></div>
            <h3 style={styles.benefitTitle}>Suporte Premium</h3>
            <p style={styles.benefitText}>Atendimento especializado pronto para ajudar</p>
          </div>

          <div 
            style={styles.benefitCard}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-8px)";
              el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }} 
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 6px rgba(0,0,0,0.07)";
            }}
          >
            <div style={styles.benefitIcon}></div>
            <h3 style={styles.benefitTitle}>Pagamento Seguro</h3>
            <p style={styles.benefitText}>Múltiplas opções de pagamento com segurança total</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ ...styles.ctaSection, padding: isMobile ? 28 : styles.ctaSection.padding }}>
        <h2 style={{ ...styles.ctaTitle, fontSize: isMobile ? 28 : styles.ctaTitle.fontSize }}>Pronto para sua próxima compra?</h2>
        <p style={styles.ctaDescription}>Explore nossa coleção completa de produtos premium</p>
        <Link to="/produtos" style={styles.ctaBig}>
          Navegar pela Loja
        </Link>
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  heroContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "center",
    marginBottom: 80,
    padding: "60px 0",
  },
  heroContent: {
    animation: "slideInRight 0.8s ease-out",
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: 900,
    color: "#1a1a1a",
    marginBottom: 20,
    lineHeight: 1.1,
    letterSpacing: "-1px",
  },
  heroSubtitle: {
    fontSize: 20,
    color: "#666666",
    marginBottom: 32,
    lineHeight: 1.6,
  },
  heroButtons: {
    display: "flex",
    gap: 16,
    marginBottom: 0,
    flexWrap: "wrap",
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "16px 32px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    borderRadius: 8,
    fontWeight: 700,
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    fontSize: 16,
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "16px 32px",
    background: "transparent",
    color: "#1a1a1a",
    border: "2px solid #1a1a1a",
    borderRadius: 8,
    fontWeight: 700,
    transition: "all 0.3s ease",
    fontSize: 16,
    cursor: "pointer",
  },
  heroVisual: {
    width: "100%",
    height: 400,
    background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    padding: 0,
  },
  promoSection: {
    marginBottom: 80,
  },
  section: {
    marginBottom: 80,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 900,
    color: "#1a1a1a",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: "#666666",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 32,
    marginBottom: 48,
  },
  viewAllContainer: {
    textAlign: "center",
  },
  viewAllBtn: {
    display: "inline-block",
    padding: "14px 48px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    borderRadius: 8,
    fontWeight: 700,
    transition: "all 0.3s ease",
    fontSize: 16,
  },
  benefitsSection: {
    marginBottom: 80,
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 24,
  },
  benefitCard: {
    padding: 32,
    background: "white",
    borderRadius: 12,
    border: "1px solid #e0e0e0",
    textAlign: "center",
    transition: "all 0.4s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
  },
  benefitIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 12,
  },
  benefitText: {
    color: "#666666",
    lineHeight: 1.6,
  },
  ctaSection: {
    padding: 60,
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    borderRadius: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  ctaTitle: {
    fontSize: 40,
    fontWeight: 900,
    color: "white",
    marginBottom: 16,
  },
  ctaDescription: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 32,
  },
  ctaBig: {
    display: "inline-block",
    padding: "16px 48px",
    background: "white",
    color: "#1a1a1a",
    borderRadius: 8,
    fontWeight: 700,
    transition: "all 0.3s ease",
    fontSize: 18,
  },
};
