/**
 * Página Contato - Formulário para contatar a loja
 */

import { useState, useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import type { CSSProperties } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { apiUrl } from "../const";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export default function Contato() {
  const isMobile = useIsMobile();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "duvida",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = formData.email.trim().toLowerCase();

    if (!formData.nome || !normalizedEmail || !formData.mensagem) {
      showToast({
        message: "Por favor, preencha todos os campos obrigatórios.",
        duration: 3000,
      });
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      showToast({
        message: "Informe um e-mail válido.",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nome,
          email: normalizedEmail,
          subject: formData.assunto,
          message: formData.mensagem,
        }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error || "Erro ao enviar mensagem.");
      }

      showToast({
        message: "Mensagem enviada com sucesso. Responderemos em breve.",
        duration: 4000,
      });
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "duvida",
        mensagem: "",
      });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : "Erro ao enviar mensagem.",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container as CSSProperties}>
      <div
        style={{
          ...styles.hero,
          padding: isMobile ? "42px 14px" : styles.hero.padding,
          marginBottom: isMobile ? 30 : styles.hero.marginBottom,
        } as CSSProperties}
      >
        <h1 style={{ ...styles.title, fontSize: isMobile ? 34 : styles.title.fontSize }}>
          Fale com a L4CKOS
        </h1>
        <p style={{ ...styles.subtitle, fontSize: isMobile ? 16 : styles.subtitle.fontSize }}>
          Tire dúvidas sobre produtos, pedidos, entregas, trocas e pós-venda.
        </p>
      </div>

      <div
        style={{
          ...styles.content,
          gridTemplateColumns: isMobile ? "1fr" : styles.content.gridTemplateColumns,
          gap: isMobile ? 24 : styles.content.gap,
          padding: isMobile ? "0 14px" : styles.content.padding,
        } as CSSProperties}
      >
        <div style={styles.infoSection as CSSProperties}>
          <h2 style={styles.sectionTitle}>Canais de Atendimento</h2>

          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>@</div>
            <div>
              <h3 style={styles.infoTitle}>E-mail</h3>
              <p style={styles.infoText}>contato@l4ckos.com.br</p>
              <p style={styles.infoCaption}>Canal oficial para dúvidas, suporte e pós-venda.</p>
            </div>
          </div>

          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>W</div>
            <div>
              <h3 style={styles.infoTitle}>WhatsApp</h3>
              <p style={styles.infoText}>+55 (61) 99803-0913</p>
              <p style={styles.infoCaption}>Atendimento direto para orientações e acompanhamento.</p>
            </div>
          </div>

          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>◷</div>
            <div>
              <h3 style={styles.infoTitle}>Prazo de resposta</h3>
              <p style={styles.infoText}>Atendimento em dias úteis</p>
              <p style={styles.infoCaption}>Buscamos responder em até 1 dia útil.</p>
            </div>
          </div>

          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>◎</div>
            <div>
              <h3 style={styles.infoTitle}>Cobertura</h3>
              <p style={styles.infoText}>Atendimento online em todo o Brasil</p>
              <p style={styles.infoCaption}>
                Para agilizar o suporte, informe o número do pedido quando aplicável.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.formSection as CSSProperties}>
          <h2 style={styles.sectionTitle}>Envie uma Mensagem</h2>

          <form onSubmit={handleSubmit} style={styles.form as CSSProperties}>
            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="nome">
                Nome completo *
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                style={styles.input as CSSProperties}
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="email">
                E-mail *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                style={styles.input as CSSProperties}
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="telefone">
                Telefone ou WhatsApp (opcional)
              </label>
              <input
                id="telefone"
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(61) 99803-0913"
                style={styles.input as CSSProperties}
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="assunto">
                Assunto *
              </label>
              <select
                id="assunto"
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                style={styles.input as CSSProperties}
                disabled={isSubmitting}
              >
                <option value="duvida">Dúvida sobre produtos</option>
                <option value="pedido">Dúvida sobre pedido</option>
                <option value="entrega">Dúvida sobre entrega</option>
                <option value="devolucao">Trocas e devoluções</option>
                <option value="sugestao">Sugestão</option>
                <option value="reclamacao">Reclamação</option>
                <option value="outro">Outro assunto</option>
              </select>
            </div>

            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="mensagem">
                Mensagem *
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Descreva sua dúvida ou solicitação. Se houver pedido, informe o número para agilizar o atendimento."
                style={{ ...styles.input, minHeight: 150 } as CSSProperties}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.submitButton,
                opacity: isSubmitting ? 0.7 : 1,
              } as CSSProperties}
              disabled={isSubmitting}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 20px rgba(26,26,26,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 12px rgba(26,26,26,0.1)";
              }}
            >
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    paddingBottom: 80,
    color: "#f0ede8",
  },
  hero: {
    background: "linear-gradient(135deg, #101010 0%, #232323 100%)",
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
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    color: "#d4d4d8",
    margin: 0,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 40px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: "#f0ede8",
    margin: 0,
  },
  infoCard: {
    display: "flex",
    gap: 16,
    padding: 20,
    borderRadius: 12,
    background: "#151515",
    border: "1px solid #2a2a2a",
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: "#202020",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f0ede8",
    fontWeight: 800,
    flexShrink: 0,
  },
  infoTitle: {
    margin: "0 0 6px 0",
    fontSize: 18,
    color: "#f0ede8",
  },
  infoText: {
    margin: "0 0 4px 0",
    color: "#d4d4d8",
    lineHeight: 1.6,
  },
  infoCaption: {
    margin: 0,
    color: "#9f9f9f",
    lineHeight: 1.6,
    fontSize: 14,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: "#f0ede8",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #2f2f2f",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    backgroundColor: "#0f0f0f",
    color: "#f0ede8",
  },
  submitButton: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: 12,
  },
};
