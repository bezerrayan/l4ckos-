/**
 * Página Sobre Nós - Informações sobre a loja
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Sobre() {
  const isMobile = useIsMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.container as CSSProperties}>
      {/* Hero Section */}
      <div style={{ ...styles.hero, padding: isMobile ? "42px 14px" : styles.hero.padding, marginBottom: isMobile ? 34 : styles.hero.marginBottom } as CSSProperties}>
        <h1 style={{ ...styles.title, fontSize: isMobile ? 34 : styles.title.fontSize }}>Sobre a L4ckos</h1>
        <p style={{ ...styles.subtitle, fontSize: isMobile ? 16 : styles.subtitle.fontSize }}>
          Sua parceira de confiança no movimento escoteiro
        </p>
      </div>

      {/* Seção Principal */}
      <section
        style={{
          ...styles.section,
          gridTemplateColumns: isMobile ? "1fr" : styles.section.gridTemplateColumns,
          gap: isMobile ? 24 : styles.section.gap,
          margin: isMobile ? "0 auto 40px" : styles.section.margin,
          padding: isMobile ? "0 14px" : styles.section.padding,
        } as CSSProperties}
      >
        <div style={styles.sectionContent as CSSProperties}>
          <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 28 : styles.sectionTitle.fontSize }}>Nossa História</h2>
          <p style={styles.text}>
            A L4ckos nasceu com a missão de oferecer produtos de qualidade premium para o movimento escoteiro brasileiro. Com anos de experiência no mercado, nos tornamos referência em equipamentos, uniformes e materiais para scouts de todas as idades.
          </p>
          <p style={styles.text}>
            Acreditamos que o escotismo transforma vidas, e nossos produtos são cuidadosamente selecionados para acompanhar cada aventura, cada desafio e cada momento de aprendizado dos nossos clientes.
          </p>
        </div>
        <div style={styles.sectionImage as CSSProperties}>
          <div style={styles.imagePlaceholder as CSSProperties}>
            [Foto da loja/equipe]
          </div>
        </div>
      </section>

      {/* Valores */}
      <section style={{ ...styles.valuesSection, padding: isMobile ? "0 14px" : styles.valuesSection.padding, margin: isMobile ? "0 auto 40px" : styles.valuesSection.margin } as CSSProperties}>
        <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 28 : styles.sectionTitle.fontSize }}>Nossos Valores</h2>
        <div style={styles.valuesGrid as CSSProperties}>
          <div style={styles.valueCard as CSSProperties}>
            <div style={styles.valueIcon as CSSProperties}>★</div>
            <h3 style={styles.valueTitle}>Qualidade</h3>
            <p style={styles.valueText}>
              Produtos selecionados com rigor para garantir durabilidade e excelência
            </p>
          </div>
          <div style={styles.valueCard as CSSProperties}>
            <div style={styles.valueIcon as CSSProperties}>✓</div>
            <h3 style={styles.valueTitle}>Compromisso</h3>
            <p style={styles.valueText}>
              Dedicados a apoiar o crescimento e desenvolvimento dos scouts
            </p>
          </div>
          <div style={styles.valueCard as CSSProperties}>
            <div style={styles.valueIcon as CSSProperties}>◆</div>
            <h3 style={styles.valueTitle}>Confiança</h3>
            <p style={styles.valueText}>
              Relacionamento transparente e atendimento que você pode confiar
            </p>
          </div>
          <div style={styles.valueCard as CSSProperties}>
            <div style={styles.valueIcon as CSSProperties}>▴</div>
            <h3 style={styles.valueTitle}>Inovação</h3>
            <p style={styles.valueText}>
              Constantemente buscando novos produtos e melhorias
            </p>
          </div>
        </div>
      </section>

      {/* Números */}
      <section style={{ ...styles.statsSection, padding: isMobile ? "34px 14px" : styles.statsSection.padding, marginBottom: isMobile ? 40 : styles.statsSection.marginBottom } as CSSProperties}>
        <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 28 : styles.sectionTitle.fontSize }}>Nossos Números</h2>
        <div style={styles.statsGrid as CSSProperties}>
          <div style={styles.statCard as CSSProperties}>
            <div style={styles.statNumber as CSSProperties}>+500</div>
            <div style={styles.statLabel as CSSProperties}>Produtos</div>
          </div>
          <div style={styles.statCard as CSSProperties}>
            <div style={styles.statNumber as CSSProperties}>+10K</div>
            <div style={styles.statLabel as CSSProperties}>Clientes Satisfeitos</div>
          </div>
          <div style={styles.statCard as CSSProperties}>
            <div style={styles.statNumber as CSSProperties}>+5</div>
            <div style={styles.statLabel as CSSProperties}>Anos de Mercado</div>
          </div>
          <div style={styles.statCard as CSSProperties}>
            <div style={styles.statNumber as CSSProperties}>100%</div>
            <div style={styles.statLabel as CSSProperties}>Satisfação Garantida</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...styles.ctaSection, padding: isMobile ? "34px 14px" : styles.ctaSection.padding } as CSSProperties}>
        <h2 style={{ ...styles.ctaTitle, fontSize: isMobile ? 28 : styles.ctaTitle.fontSize }}>Pronto para sua próxima aventura?</h2>
        <p style={styles.ctaText}>
          Explore nossa coleção completa de produtos para o movimento escoteiro
        </p>
        <Link to="/produtos" style={styles.ctaButton as CSSProperties}>
          Ver Produtos Agora
        </Link>
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    paddingBottom: 80,
  },
  hero: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    color: "white",
    padding: "80px 40px",
    textAlign: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    margin: 0,
    marginBottom: 16,
    color: "white",
  },
  subtitle: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  section: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "center",
    marginBottom: 80,
    maxWidth: 1400,
    margin: "0 auto 80px",
    padding: "0 40px",
  },
  sectionContent: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: "#000000",
    margin: 0,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#555555",
    lineHeight: "1.8",
    margin: 0,
  },
  sectionImage: {
    width: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: 400,
    background: "rgba(200, 200, 200, 0.2)",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    color: "#888888",
    border: "2px dashed rgba(100, 100, 100, 0.3)",
  },
  valuesSection: {
    maxWidth: 1400,
    margin: "0 auto 80px",
    padding: "0 40px",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 32,
    marginTop: 40,
  },
  valueCard: {
    background: "#f8fafc",
    padding: 32,
    borderRadius: 12,
    textAlign: "center",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  valueIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  valueTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0d0d0d",
    margin: "0 0 12px 0",
  },
  valueText: {
    fontSize: 14,
    color: "#666666",
    margin: 0,
    lineHeight: "1.6",
  },
  statsSection: {
    background: "#f8fafc",
    padding: "60px 40px",
    marginBottom: 80,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 32,
    maxWidth: 1400,
    margin: "40px auto 0",
  },
  statCard: {
    textAlign: "center",
    padding: 32,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 900,
    color: "#0d0d0d",
    margin: 0,
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
    marginTop: 8,
  },
  ctaSection: {
    textAlign: "center",
    maxWidth: 1400,
    margin: "0 auto",
    padding: "60px 40px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    borderRadius: 16,
    color: "white",
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: 800,
    margin: 0,
    marginBottom: 16,
    color: "white",
  },
  ctaText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    margin: "0 0 32px 0",
  },
  ctaButton: {
    display: "inline-block",
    padding: "14px 32px",
    background: "white",
    color: "#1a1a1a",
    textDecoration: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 16,
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};
