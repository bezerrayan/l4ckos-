import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { trpc } from "../lib/trpc";
import { apiUrl } from "../const";
import "./Home.css";
import logoPrincipalPreta from "../images/logo-principal-preta.jpeg";
import camisaFallback from "../images/camisa.png";
import PromoCarousel from "../components/PromoCarousel";

type ProductItem = {
  id: number;
  name: string;
  priceCents: number;
  imageUrl: string;
  category?: string | null;
};

const productBgClasses = [
  "l4-home-prod-img-1",
  "l4-home-prod-img-2",
  "l4-home-prod-img-3",
  "l4-home-prod-img-4",
  "l4-home-prod-img-5",
  "l4-home-prod-img-6",
  "l4-home-prod-img-7",
  "l4-home-prod-img-8",
];

const testimonials = [
  {
    initials: "CL",
    name: "Carlos Lima",
    city: "Brasilia, DF",
    text: "Produto de qualidade e entrega rapida. O atendimento ajudou em tudo no meu primeiro pedido.",
  },
  {
    initials: "MF",
    name: "Marina Freitas",
    city: "Sao Paulo, SP",
    text: "Comprei para trilha e acampamento. Chegou bem embalado e exatamente como descrito no site.",
  },
  {
    initials: "JP",
    name: "Joao Pedro",
    city: "Belo Horizonte, MG",
    text: "Precisei trocar tamanho e resolveram muito rapido. Experiencia bem segura do inicio ao fim.",
  },
];

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format((cents || 0) / 100);
}

function resolveProductImageUrl(raw: string | null | undefined) {
  const value = (raw || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;
  if (value.startsWith("/")) return apiUrl(value);
  return apiUrl(`/${value}`);
}

export default function Home() {
  const navigate = useNavigate();
  const productsQuery = trpc.products.list.useQuery({ limit: 12 });

  const products = useMemo<ProductItem[]>(
    () =>
      (productsQuery.data ?? []).slice(0, 8).map(item => ({
        id: item.id,
        name: item.name,
        priceCents: Number(item.price ?? 0),
        imageUrl: resolveProductImageUrl(item.imageUrl),
        category: item.category,
      })),
    [productsQuery.data],
  );

  return (
    <div className="l4-home">
      <div className="l4-home-announce">
        <span className="l4-home-announce-track">
          FRETE GRATIS ACIMA DE R$299 - NOVA COLECAO DISPONIVEL - USE L4CKOS10 E GANHE 10% OFF - TROCA GRATIS EM 30 DIAS
          - FRETE GRATIS ACIMA DE R$299 - NOVA COLECAO DISPONIVEL - USE L4CKOS10 E GANHE 10% OFF - TROCA GRATIS EM 30 DIAS
        </span>
      </div>

      <section className="l4-home-hero">
        <div className="l4-home-hero-grid" />
        <div className="l4-home-hero-bg" />
        <div className="l4-home-hero-content">
          <div className="l4-home-tag">Drop 04 - Disponivel Agora</div>
          <h1 className="l4-home-title">
            <span>BEM-VINDO</span>
            <br />
            <span className="outline">A NOSSA</span>
            <br />
            <span className="accent">LOJA</span>
          </h1>
          <p className="l4-home-subtitle">
            Descubra uma selecao variada de produtos de qualidade para esportes, aventura e movimento escoteiro.
          </p>
          <div className="l4-home-hero-cta">
            <Link to="/produtos" className="l4-btn-primary">
              Explorar Catalogo
            </Link>
            <a href="#l4-products" className="l4-btn-outline">
              Ver Destaques
            </a>
          </div>
        </div>
        <div className="l4-home-hero-logo-wrap">
          <img src={logoPrincipalPreta} alt="Logo L4CKOS" className="l4-home-hero-logo" />
        </div>
      </section>

      <div className="l4-home-marquee">
        <div className="l4-home-marquee-track">
          <span>STREETWEAR</span>
          <span>L4CKOS</span>
          <span>NOVO DROP</span>
          <span>LIMITED EDITION</span>
          <span>URBAN CULTURE</span>
          <span>STREETWEAR</span>
          <span>L4CKOS</span>
          <span>NOVO DROP</span>
          <span>LIMITED EDITION</span>
          <span>URBAN CULTURE</span>
        </div>
      </div>

      <section className="l4-home-section">
        <div className="l4-home-section-header">
          <div>
            <div className="l4-home-section-tag">// Explorar</div>
            <h2 className="l4-home-section-title">CATEGORIAS</h2>
          </div>
          <Link className="l4-home-view-all" to="/produtos">
            Ver Todas
          </Link>
        </div>
        <div className="l4-home-categories-grid">
          <Link className="l4-home-cat l4-home-cat-large l4-home-cat-1" to="/produtos">
            <span className="l4-home-cat-name">CAMPING</span>
          </Link>
          <Link className="l4-home-cat l4-home-cat-2" to="/produtos">
            <span className="l4-home-cat-name">UNIFORMES</span>
          </Link>
          <Link className="l4-home-cat l4-home-cat-3" to="/produtos">
            <span className="l4-home-cat-name">TRILHA</span>
          </Link>
          <Link className="l4-home-cat l4-home-cat-4" to="/produtos">
            <span className="l4-home-cat-name">ACESSORIOS</span>
          </Link>
          <Link className="l4-home-cat l4-home-cat-5" to="/produtos">
            <span className="l4-home-cat-name">MOCHILAS</span>
          </Link>
        </div>
      </section>

      <section id="l4-products" className="l4-home-section l4-home-products-wrap">
        <div className="l4-home-section-header">
          <div>
            <div className="l4-home-section-tag">// Destaque</div>
            <h2 className="l4-home-section-title">MAIS VENDIDOS</h2>
          </div>
          <Link className="l4-home-view-all" to="/produtos">
            Ver Todos
          </Link>
        </div>
        <div className="l4-home-products-grid">
          {products.map((product, idx) => (
            <article
              key={product.id}
              className="l4-home-product-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/produto/${product.id}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(`/produto/${product.id}`);
                }
              }}
            >
              <div className={`l4-home-product-img ${productBgClasses[idx % productBgClasses.length]}`}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = camisaFallback;
                    }}
                  />
                ) : (
                  <img src={camisaFallback} alt={product.name} loading="lazy" />
                )}
              </div>
              <div className="l4-home-product-info">
                <h3 className="l4-home-product-name">{product.name}</h3>
                <div className="l4-home-product-meta">
                  <span>{formatCurrency(product.priceCents)}</span>
                  <span className="l4-home-product-link">
                    ver
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="l4-home-section" style={{ paddingTop: 0 }}>
        <PromoCarousel />
      </section>

      <section className="l4-home-section">
        <div className="l4-home-section-header">
          <div>
            <div className="l4-home-section-tag">// Reviews</div>
            <h2 className="l4-home-section-title">O QUE FALAM</h2>
          </div>
        </div>
        <div className="l4-home-testimonials-grid">
          {testimonials.map(item => (
            <article key={item.initials} className="l4-home-testimonial">
              <div className="l4-home-testimonial-quote">"</div>
              <p>{item.text}</p>
              <div className="l4-home-testimonial-author">
                <div className="l4-home-avatar">{item.initials}</div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.city}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="l4-home-newsletter">
        <div>
          <h3>FIQUE POR DENTRO</h3>
          <p>Receba novidades, promocoes e lancamentos em primeira mao.</p>
        </div>
        <Link to="/contato" className="l4-btn-primary">
          Falar com a loja
        </Link>
      </section>
    </div>
  );
}
