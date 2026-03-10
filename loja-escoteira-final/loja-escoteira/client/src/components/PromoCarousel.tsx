import { useEffect, useMemo, useState } from "react";
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
    color: "linear-gradient(135deg, #151515 0%, #2a0a12 100%)",
  },
  {
    id: 2,
    badge: "PROMOCAO",
    title: "Promocao de roupas",
    description: "Compre 2 e ganhe desconto progressivo em camisetas e jaquetas.",
    ctaLabel: "Ver promocao",
    discount: "50%",
    discountLabel: "OFF",
    color: "linear-gradient(135deg, #1a1a1a 0%, #32111a 100%)",
  },
];

export default function PromoCarousel() {
  const isMobile = useIsMobile(980);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const promotionsQuery = trpc.products.promotions.useQuery();

  const promos = useMemo<Promo[]>(() => {
    const fromApi = (promotionsQuery.data ?? []).map((item: any) => ({
      id: Number(item.id),
      badge: String(item.badge ?? "").trim() || "PROMOCAO",
      title: String(item.title ?? "").trim() || "Oferta especial",
      description: String(item.description ?? "").trim() || "Confira condicoes exclusivas por tempo limitado.",
      ctaLabel: String(item.ctaLabel ?? "").trim() || "Aproveitar oferta",
      discount: String(item.discountText ?? "").trim() || "30%",
      discountLabel: String(item.discountLabel ?? "").trim() || "OFF",
      color: String(item.bgStyle ?? "").trim() || "linear-gradient(135deg, #151515 0%, #2a0a12 100%)",
    }));

    return fromApi.length > 0 ? fromApi : PROMOS_FALLBACK;
  }, [promotionsQuery.data]);

  useEffect(() => {
    if (paused || promos.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, promos.length]);

  useEffect(() => {
    if (current > promos.length - 1) {
      setCurrent(0);
    }
  }, [current, promos.length]);

  const promo = promos[current] ?? promos[0];
  if (!promo) return null;

  return (
    <div
      style={{ ...styles.carousel, marginBottom: isMobile ? 32 : styles.carousel.marginBottom }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          ...styles.slide,
          backgroundImage: `${promo.color}, linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #2a0a12 100%)`,
          backgroundBlendMode: "overlay, normal",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
          gap: isMobile ? 16 : styles.slide.gap,
          padding: isMobile ? 20 : styles.slide.padding,
          minHeight: isMobile ? 0 : styles.slide.minHeight,
        }}
      >
        <div style={styles.content}>
          <p style={styles.badge}>{promo.badge}</p>
          <h2 style={{ ...styles.title, fontSize: isMobile ? 24 : styles.title.fontSize }}>{promo.title}</h2>
          <p style={{ ...styles.description, fontSize: isMobile ? 14 : styles.description.fontSize }}>{promo.description}</p>
          <button style={{ ...styles.cta, width: isMobile ? "100%" : undefined }}>{promo.ctaLabel}</button>
        </div>

        <div style={{ ...styles.discount, padding: isMobile ? 16 : styles.discount.padding, width: isMobile ? "100%" : undefined }}>
          <p style={{ ...styles.discountValue, fontSize: isMobile ? 34 : styles.discountValue.fontSize }}>{promo.discount}</p>
          <p style={styles.discountLabel}>{promo.discountLabel}</p>
        </div>
      </div>

      <div style={styles.controls}>
        <button style={styles.navBtn} onClick={() => setCurrent((prev) => (prev - 1 + promos.length) % promos.length)} aria-label="Banner anterior">
          {"<"}
        </button>

        <div style={styles.dots}>
          {promos.map((_, idx) => (
            <button
              key={idx}
              style={{ ...styles.dot, ...(idx === current ? styles.dotActive : {}) }}
              onClick={() => setCurrent(idx)}
              aria-label={`Ir para banner ${idx + 1}`}
            />
          ))}
        </div>

        <button style={styles.navBtn} onClick={() => setCurrent((prev) => (prev + 1) % promos.length)} aria-label="Proximo banner">
          {">"}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 40,
    alignItems: "center",
    padding: 48,
    borderRadius: 16,
    color: "rgba(255,255,255,0.95)",
    minHeight: 280,
    boxShadow: "0 12px 34px rgba(0,0,0,0.35)",
    border: "1px solid #2f2f2f",
    transition: "all 0.5s ease",
    animation: "fadeInUp 0.6s ease-out",
  },
  content: {},
  badge: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2px",
    color: "#f7c8d1",
    margin: "0 0 12px 0",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    margin: "0 0 12px 0",
    lineHeight: 1.2,
    color: "#f0ede8",
  },
  description: {
    fontSize: 16,
    color: "rgba(240,237,232,0.88)",
    margin: "0 0 24px 0",
    lineHeight: 1.5,
  },
  cta: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #e8002a 0%, #a4001c 100%)",
    color: "#ffffff",
    border: "1px solid #ff3156",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 14,
    boxShadow: "0 8px 20px rgba(232,0,42,0.35)",
  },
  discount: {
    textAlign: "center",
    padding: 24,
    background: "rgba(12,12,12,0.55)",
    borderRadius: 12,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.14)",
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
    background: "#141414",
    border: "1px solid #2f2f2f",
    width: 40,
    height: 40,
    borderRadius: 50,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
    transition: "all 0.3s ease",
    color: "#f0ede8",
  },
  dots: {
    display: "flex",
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    background: "#343434",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  dotActive: {
    background: "#e8002a",
    width: 28,
  },
};
