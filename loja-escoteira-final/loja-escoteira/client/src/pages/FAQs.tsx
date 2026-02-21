/**
 * Página FAQs - Perguntas Frequentes
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

interface FAQ {
  id: number;
  pergunta: string;
  resposta: string;
  categoria: string;
}

const FAQS: FAQ[] = [
  {
    id: 1,
    categoria: "Pedidos",
    pergunta: "Como faço um pedido?",
    resposta:
      "Você pode fazer um pedido navegando pela nossa loja, adicionando produtos ao carrinho e seguindo o processo de checkout. Será necessário ter uma conta ou criar uma para finalizar a compra.",
  },
  {
    id: 2,
    categoria: "Pedidos",
    pergunta: "Qual é o prazo de entrega?",
    resposta:
      "Os prazos de entrega variam de 5 a 10 dias úteis para regiões de São Paulo, e de 10 a 15 dias úteis para outras regiões do Brasil. Você receberá um código de rastreamento por email.",
  },
  {
    id: 3,
    categoria: "Pedidos",
    pergunta: "Qual é o valor mínimo para compra?",
    resposta:
      "Não há valor mínimo para compra. Você pode comprar desde um único produto. No entanto, oferecemos frete grátis para compras acima de R$ 200.",
  },
  {
    id: 4,
    categoria: "Pagamento",
    pergunta: "Quais são as formas de pagamento aceitas?",
    resposta:
      "Aceitamos cartão de crédito, PIX, boleto bancário e transferência bancária. Todas as transações são seguras e criptografadas.",
  },
  {
    id: 5,
    categoria: "Pagamento",
    pergunta: "Posso parcelar meu pedido?",
    resposta:
      "Sim! No pagamento com cartão de crédito, você pode parcelar em até 12 vezes sem juros. Outras formas de pagamento são à vista.",
  },
  {
    id: 6,
    categoria: "Devolução",
    pergunta: "Qual é a política de devolução?",
    resposta:
      "Você tem até 30 dias para devolver produtos em perfeito estado. Basta entrar em contato conosco, e enviaremos um código de devolução. O frete de devolução é cobrado pelo cliente, exceto em caso de defeito.",
  },
  {
    id: 7,
    categoria: "Devolução",
    pergunta: "E se o produto chegar com defeito?",
    resposta:
      "Se receber um produto com defeito, entre em contato imediatamente. Faremos a troca ou devolução sem custo algum para você. Basta fotografar o defeito para análise.",
  },
  {
    id: 8,
    categoria: "Conta",
    pergunta: "Como criar uma conta?",
    resposta:
      "Clique no botão 'Criar Conta' no topo da página e preencha seus dados. Você receberá um email de confirmação. Após confirmar, sua conta estará ativa.",
  },
  {
    id: 9,
    categoria: "Conta",
    pergunta: "Esqueci minha senha. O que faço?",
    resposta:
      "Clique em 'Esqueceu a senha?' na página de login. Você receberá um email com um link para redefinir sua senha.",
  },
  {
    id: 10,
    categoria: "Produtos",
    pergunta: "Os produtos vêm com garantia?",
    resposta:
      "Sim! Todos os nossos produtos vêm com garantia do fabricante. Os prazos variam entre 1 a 2 anos dependendo do produto. Consulte a descrição de cada item.",
  },
];

const CATEGORIAS = ["Todos", "Pedidos", "Pagamento", "Devolução", "Conta", "Produtos"];

export default function FAQs() {
  const isMobile = useIsMobile();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [faqAberta, setFaqAberta] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqsFiltradas =
    categoriaSelecionada === "Todos"
      ? FAQS
      : FAQS.filter((faq) => faq.categoria === categoriaSelecionada);

  return (
    <div style={styles.container as CSSProperties}>
      {/* Hero Section */}
      <div style={{ ...styles.hero, padding: isMobile ? "42px 14px" : styles.hero.padding, marginBottom: isMobile ? 30 : styles.hero.marginBottom } as CSSProperties}>
        <h1 style={{ ...styles.title, fontSize: isMobile ? 34 : styles.title.fontSize }}>Perguntas Frequentes</h1>
        <p style={{ ...styles.subtitle, fontSize: isMobile ? 16 : styles.subtitle.fontSize }}>
          Encontre respostas para as dúvidas mais comuns
        </p>
      </div>

      {/* Filtros */}
      <div style={{ ...styles.filtersSection, padding: isMobile ? "0 14px" : styles.filtersSection.padding, margin: isMobile ? "0 auto 24px" : styles.filtersSection.margin } as CSSProperties}>
        <h2 style={styles.filterTitle as CSSProperties}>Filtrar por Categoria</h2>
        <div style={styles.filterButtons as CSSProperties}>
          {CATEGORIAS.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSelecionada(categoria)}
              style={{
                ...styles.filterButton,
                background:
                  categoriaSelecionada === categoria
                    ? "#1a1a1a"
                    : "#f8fafc",
                color:
                  categoriaSelecionada === categoria
                    ? "white"
                    : "#1a1a1a",
              } as CSSProperties}
              onMouseEnter={(e) => {
                if (categoriaSelecionada !== categoria) {
                  (e.currentTarget as HTMLElement).style.background =
                    "#e2e8f0";
                }
              }}
              onMouseLeave={(e) => {
                if (categoriaSelecionada !== categoria) {
                  (e.currentTarget as HTMLElement).style.background =
                    "#f8fafc";
                }
              }}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div
        style={{
          ...styles.faqsContainer,
          gridTemplateColumns: isMobile ? "1fr" : styles.faqsContainer.gridTemplateColumns,
          gap: isMobile ? 20 : styles.faqsContainer.gap,
          padding: isMobile ? "0 14px" : styles.faqsContainer.padding,
        } as CSSProperties}
      >
        <div style={styles.faqsList as CSSProperties}>
          {faqsFiltradas.map((faq) => (
            <div
              key={faq.id}
              style={styles.faqItem as CSSProperties}
              onClick={() =>
                setFaqAberta(faqAberta === faq.id ? null : faq.id)
              }
            >
              <div style={styles.faqHeader as CSSProperties}>
                <div style={styles.faqQuestion as CSSProperties}>
                  <span style={styles.faqIcon as CSSProperties}>
                    {faqAberta === faq.id ? "▼" : "▶"}
                  </span>
                  <h3 style={styles.pergunta as CSSProperties}>
                    {faq.pergunta}
                  </h3>
                </div>
                <span style={styles.faqCategory as CSSProperties}>
                  {faq.categoria}
                </span>
              </div>

              {faqAberta === faq.id && (
                <div style={styles.resposta as CSSProperties}>
                  {faq.resposta}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div style={styles.sidebar as CSSProperties}>
          <div style={styles.sidebarCard as CSSProperties}>
            <h3 style={styles.sidebarTitle as CSSProperties}>
              Não encontrou o que procura?
            </h3>
            <p style={styles.sidebarText as CSSProperties}>
              Entre em contato conosco através do formulário de contato ou
              pelos canais abaixo.
            </p>
            <Link to="/contato" style={styles.sidebarButton as CSSProperties}>
              Ir para Contato
            </Link>
          </div>

          <div style={styles.sidebarCard as CSSProperties}>
            <h3 style={styles.sidebarTitle as CSSProperties}>
              ◆ Chat ao Vivo
            </h3>
            <p style={styles.sidebarText as CSSProperties}>
              Disponível de segunda a sexta das 9h às 18h
            </p>
            <button style={styles.sidebarButton as CSSProperties}>
              Iniciar Chat
            </button>
          </div>

          <div style={styles.sidebarCard as CSSProperties}>
            <h3 style={styles.sidebarTitle as CSSProperties}>
              📧 Email de Suporte
            </h3>
            <p style={styles.sidebarText as CSSProperties}>
              suporte@l4ckos.com
            </p>
            <p style={styles.sidebarSubtext as CSSProperties}>
              Responderemos em até 24 horas
            </p>
          </div>
        </div>
      </div>
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
    padding: "60px 40px",
    textAlign: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    margin: 0,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  filtersSection: {
    maxWidth: 1400,
    margin: "0 auto 40px",
    padding: "0 40px",
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0d0d0d",
    margin: "0 0 20px 0",
  },
  filterButtons: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  filterButton: {
    padding: "10px 20px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  faqsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gap: 40,
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 40px",
  },
  faqsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  faqItem: {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  faqHeader: {
    padding: "20px",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  faqQuestion: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    flex: 1,
  },
  faqIcon: {
    fontSize: 12,
    color: "#0d0d0d",
    marginTop: 4,
    fontWeight: 700,
  },
  pergunta: {
    fontSize: 16,
    fontWeight: 600,
    color: "#0d0d0d",
    margin: 0,
  },
  faqCategory: {
    fontSize: 12,
    color: "#888888",
    background: "white",
    padding: "4px 12px",
    borderRadius: 20,
    whiteSpace: "nowrap",
  },
  resposta: {
    padding: "20px",
    background: "white",
    borderTop: "1px solid #e2e8f0",
    fontSize: 14,
    color: "#555555",
    lineHeight: "1.7",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  sidebarCard: {
    padding: 24,
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0d0d0d",
    margin: "0 0 12px 0",
  },
  sidebarText: {
    fontSize: 14,
    color: "#666666",
    margin: "0 0 16px 0",
    lineHeight: "1.6",
  },
  sidebarSubtext: {
    fontSize: 12,
    color: "#999999",
    margin: 0,
  },
  sidebarButton: {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    background: "#1a1a1a",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
};
