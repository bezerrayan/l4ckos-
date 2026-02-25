import { useState } from "react";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

interface Promo {
  id: number;
  title: string;
  description: string;
  discount: string;
  color: string;
}

const PROMOS: Promo[] = [
  {
    id: 1,
    title: "Desconto em camisas escoteiras",
    description: "Até 30% OFF em modelos drifits, regatas e oversized",
    discount: "30%",
    color: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
  },
  {
    id: 2,
    title: "Promoção de Roupas",
    description: "Compre 2 e ganhe 1 desconto em camisetas e jaquetas",
    discount: "50%",
    color: "linear-gradient(135deg, #333333 0%, #1a1a1a 100%)",
  },
  {
    id: 3,
    title: "Frete Grátis",
    description: "Em compras acima de R$ 150 para todo Brasil",
    discount: "Grátis",
    color: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
  },
  {
    id: 4,
    title: "Equipamentos Esportivos",
    description: "Até 25% em mochilas, bicicletas e acessórios",
    discount: "25% ",
    color: "linear-gradient(135deg, #333333 0%, #1a1a1a 100%)",
  },
];

export default function PromoCarousel() {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % PROMOS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + PROMOS.length) % PROMOS.length);

  const promo = PROMOS[current];

  return (
    <div style={{ ...styles.carousel, marginBottom: isMobile ? 32 : styles.carousel.marginBottom }}>
      <div
        style={{
          ...styles.slide,
          background: promo.color,
          gridTemplateColumns: isMobile ? "1fr" : styles.slide.gridTemplateColumns,
          gap: isMobile ? 16 : styles.slide.gap,
          padding: isMobile ? 20 : styles.slide.padding,
          minHeight: isMobile ? 0 : styles.slide.minHeight,
        }}
      >
        <div style={styles.content}>
          <p style={styles.badge}>PROMOÇÃO</p>
          <h2 style={{ ...styles.title, fontSize: isMobile ? 24 : styles.title.fontSize }}>{promo.title}</h2>
          <p style={{ ...styles.description, fontSize: isMobile ? 14 : styles.description.fontSize }}>{promo.description}</p>
          <button
            style={styles.cta}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLElement;
              btn.style.transform = "translateY(-2px)";
              btn.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLElement;
              btn.style.transform = "translateY(0)";
              btn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            }}
          >
            Aproveitar Oferta
          </button>
        </div>

        <div style={{ ...styles.discount, padding: isMobile ? 16 : styles.discount.padding }}>
          <p style={{ ...styles.discountValue, fontSize: isMobile ? 34 : styles.discountValue.fontSize }}>{promo.discount}</p>
          <p style={styles.discountLabel}>OFF</p>
        </div>
      </div>

      {/* Controles */}
      <div style={styles.controls}>
        <button style={styles.navBtn} onClick={prev}>
          ←
        </button>

        <div style={styles.dots}>
          {PROMOS.map((_, idx) => (
            <button
              key={idx}
              style={{
                ...styles.dot,
                ...(idx === current ? styles.dotActive : {}),
              }}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>

        <button style={styles.navBtn} onClick={next}>
          →
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  carousel: {
    position: "relative",
    marginBottom: 60,
  },
  slide: {
    display: "grid",
    gridTemplateColumns: "1fr 200px",
    gap: 40,
    alignItems: "center",
    padding: 48,
    borderRadius: 16,
    color: "rgba(255,255,255,0.95)",
    minHeight: 280,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: "all 0.5s ease",
    animation: "fadeInUp 0.6s ease-out",
  },
  content: {},
  badge: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "1px",
    color: "rgba(230,241,220,0.95)",
    margin: "0 0 12px 0",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    margin: "0 0 12px 0",
    lineHeight: 1.2,
    color: "#e6f4d8",
  },
  description: {
    fontSize: 16,
    color: "rgba(230,244,220,0.9)",
    margin: "0 0 24px 0",
    lineHeight: 1.5,
  },
  cta: {
    padding: "12px 32px",
    background: "white",
    color: "#1a1a1a",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 15,
  },
  discount: {
    textAlign: "center",
    padding: 24,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  discountValue: {
    fontSize: 48,
    fontWeight: 900,
    margin: "0 0 4px 0",
    color: "#ffffff",
  },
  discountLabel: {
    fontSize: 14,
    fontWeight: 700,
    margin: 0,
    opacity: 0.95,
    color: "rgba(255,255,255,0.95)",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    marginTop: 24,
  },
  navBtn: {
    background: "#f5f5f5",
    border: "1px solid #e0e0e0",
    width: 40,
    height: 40,
    borderRadius: 50,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
    transition: "all 0.3s ease",
    color: "#1a1a1a",
  },
  dots: {
    display: "flex",
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    background: "#e0e0e0",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  dotActive: {
    background: "#1a1a1a",
    width: 28,
  },
};
