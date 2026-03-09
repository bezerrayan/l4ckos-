import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import logoPrincipalPreta from "../images/logo-principal-preta.jpeg";

export default function Sobre() {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.container as CSSProperties}>
      <div style={{ ...styles.hero, padding: isMobile ? "42px 14px" : styles.hero.padding, marginBottom: isMobile ? 34 : styles.hero.marginBottom } as CSSProperties}>
        <h1 style={{ ...styles.title, fontSize: isMobile ? 34 : styles.title.fontSize }}>Sobre a L4ckos</h1>
        <p style={{ ...styles.subtitle, fontSize: isMobile ? 16 : styles.subtitle.fontSize }}>
          Sua parceira de confianca no movimento escoteiro
        </p>
      </div>

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
          <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 28 : styles.sectionTitle.fontSize }}>Nossa historia</h2>
          <p style={styles.text}>
            A L4CKOS nasceu com a ideia de criar uma identidade unica para o publico em geral,
            onde as pessoas possam se identificar facilmente. O nome surgiu de vivencias dos criadores,
            com proposta forte, memoravel e autentica para a cultura de aventura.
          </p>
        </div>
        <div style={styles.sectionImage as CSSProperties}>
          <img src={logoPrincipalPreta} alt="Logo L4CKOS" style={styles.realImage as CSSProperties} />
        </div>
      </section>

      <section style={{ ...styles.valuesSection, padding: isMobile ? "0 14px" : styles.valuesSection.padding, margin: isMobile ? "0 auto 40px" : styles.valuesSection.margin } as CSSProperties}>
        <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 28 : styles.sectionTitle.fontSize }}>Nossos valores</h2>
        <div style={styles.valuesGrid as CSSProperties}>
          <div style={styles.valueCard as CSSProperties}>
            <h3 style={styles.valueTitle}>Qualidade</h3>
            <p style={styles.valueText}>Produtos selecionados com rigor para garantir durabilidade e excelencia.</p>
          </div>
          <div style={styles.valueCard as CSSProperties}>
            <h3 style={styles.valueTitle}>Compromisso</h3>
            <p style={styles.valueText}>Dedicacao para apoiar crescimento e desenvolvimento da comunidade escoteira.</p>
          </div>
          <div style={styles.valueCard as CSSProperties}>
            <h3 style={styles.valueTitle}>Confianca</h3>
            <p style={styles.valueText}>Relacionamento transparente e atendimento que voce pode confiar.</p>
          </div>
          <div style={styles.valueCard as CSSProperties}>
            <h3 style={styles.valueTitle}>Inovacao</h3>
            <p style={styles.valueText}>Busca constante por novos produtos e melhorias da experiencia.</p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.ctaSection, padding: isMobile ? "34px 14px" : styles.ctaSection.padding } as CSSProperties}>
        <h2 style={{ ...styles.ctaTitle, fontSize: isMobile ? 28 : styles.ctaTitle.fontSize }}>Pronto para sua proxima aventura?</h2>
        <p style={styles.ctaText}>Explore nossa colecao completa de produtos para o movimento escoteiro.</p>
        <Link to="/produtos" style={styles.ctaButton as CSSProperties}>
          Ver Produtos Agora
        </Link>
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { minHeight: "100vh", paddingBottom: 80 },
  hero: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    color: "white",
    padding: "80px 40px",
    textAlign: "center",
    marginBottom: 60,
  },
  title: { fontSize: 48, fontWeight: 900, margin: 0, marginBottom: 16, color: "white" },
  subtitle: { fontSize: 20, color: "rgba(255, 255, 255, 0.8)", margin: 0 },
  section: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "center",
    maxWidth: 1400,
    margin: "0 auto 80px",
    padding: "0 40px",
  },
  sectionContent: { display: "flex", flexDirection: "column", gap: 24 },
  sectionTitle: { fontSize: 36, fontWeight: 800, color: "#f0ede8", margin: 0, marginBottom: 16 },
  text: { fontSize: 16, color: "#a6a6a6", lineHeight: "1.8", margin: 0 },
  sectionImage: { width: "100%" },
  realImage: {
    width: "100%",
    height: 400,
    objectFit: "cover",
    borderRadius: 12,
    border: "1px solid #2a2a2a",
    background: "#111111",
  },
  valuesSection: { maxWidth: 1400, margin: "0 auto 80px", padding: "0 40px" },
  valuesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24, marginTop: 40 },
  valueCard: { background: "#151515", padding: 28, borderRadius: 12, border: "1px solid #2a2a2a", textAlign: "center" },
  valueTitle: { fontSize: 20, fontWeight: 700, color: "#f0ede8", margin: "0 0 12px 0" },
  valueText: { fontSize: 14, color: "#a6a6a6", margin: 0, lineHeight: "1.6" },
  ctaSection: {
    textAlign: "center",
    maxWidth: 1400,
    margin: "0 auto",
    padding: "60px 40px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    borderRadius: 16,
    color: "white",
  },
  ctaTitle: { fontSize: 36, fontWeight: 800, margin: 0, marginBottom: 16, color: "white" },
  ctaText: { fontSize: 16, color: "rgba(255, 255, 255, 0.8)", margin: "0 0 32px 0" },
  ctaButton: {
    display: "inline-block",
    padding: "14px 32px",
    background: "#111111",
    color: "#ffffff",
    textDecoration: "none",
    border: "1px solid #2f2f2f",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 16,
  },
};
