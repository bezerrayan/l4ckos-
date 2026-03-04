import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { trpc } from "../lib/trpc";

interface Promo {
  id: number;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  discount: string;
  discountLabel: string;
  color: string;
}

const PROMOS_FALLBACK: Promo[] = [
  {
    id: 1,
    badge: "PROMOCAO",
    title: "Desconto em camisas escoteiras",
    description: "Ate 30% OFF em modelos dry fit, regatas e oversized.",
    ctaLabel: "Aproveitar oferta",
    discount: "30%",
    discountLabel: "OFF",
    color: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
  },
  {
    id: 2,
    badge: "PROMOCAO",
    title: "Promocao de roupas",
    description: "Compre 2 e ganhe desconto progressivo em camisetas e jaquetas.",
    ctaLabel: "Ver promocao",
    discount: "50%",
    discountLabel: "OFF",
    color: "linear-gradient(135deg, #333333 0%, #1a1a1a 100%)",
  },
];

export default function PromoCarousel() {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const promotionsQuery = trpc.products.promotions.useQuery();

  const promos = useMemo<Promo[]>(() => {
    const fromApi = (promotionsQuery.data ?? []).map((item: any) => ({
      id: Number(item.id),
      badge: String(item.badge ?? "PROMOCAO"),
      title: String(item.title ?? ""),
      description: String(item.description ?? ""),
      ctaLabel: String(item.ctaLabel ?? "Aproveitar oferta"),
      discount: String(item.discountText ?? ""),
      discountLabel: String(item.discountLabel ?? "OFF"),
      color: String(item.bgStyle ?? "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)"),
    }));

    return fromApi.length > 0 ? fromApi : PROMOS_FALLBACK;
  }, [promotionsQuery.data]);

  const next = () => setCurrent(prev => (prev + 1) % promos.length);
  const prev = () => setCurrent(prev => (prev - 1 + promos.length) % promos.length);
  const promo = promos[current] ?? promos[0];
  if (!promo) return null;

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
          <p style={styles.badge}>{promo.badge}</p>
          <h2 style={{ ...styles.title, fontSize: isMobile ? 24 : styles.title.fontSize }}>{promo.title}</h2>
          <p style={{ ...styles.description, fontSize: isMobile ? 14 : styles.description.fontSize }}>{promo.description}</p>
          <button style={styles.cta}>{promo.ctaLabel}</button>
        </div>

        <div style={{ ...styles.discount, padding: isMobile ? 16 : styles.discount.padding }}>
          <p style={{ ...styles.discountValue, fontSize: isMobile ? 34 : styles.discountValue.fontSize }}>{promo.discount}</p>
          <p style={styles.discountLabel}>{promo.discountLabel || "OFF"}</p>
        </div>
      </div>

      <div style={styles.controls}>
        <button style={styles.navBtn} onClick={prev}>
          ←
        </button>

        <div style={styles.dots}>
          {promos.map((_, idx) => (
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

