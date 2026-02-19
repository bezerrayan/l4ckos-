/**
 * Página Contato - Formulário para contatar a loja
 */

import { useState, useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import type { CSSProperties } from "react";

export default function Contato() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      showToast({
        message: "Por favor, preencha todos os campos obrigatórios",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    // Simular envio
    setTimeout(() => {
      showToast({
        message: "Mensagem enviada com sucesso! Responderemos em breve.",
        duration: 4000,
      });
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "duvida",
        mensagem: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div style={styles.container as CSSProperties}>
      {/* Hero Section */}
      <div style={styles.hero as CSSProperties}>
        <h1 style={styles.title}>Entre em Contato</h1>
        <p style={styles.subtitle}>
          Estamos aqui para ajudar! Tire suas dúvidas ou envie sugestões
        </p>
      </div>

      <div style={styles.content as CSSProperties}>
        {/* Informações de Contato */}
        <div style={styles.infoSection as CSSProperties}>
          <h2 style={styles.sectionTitle}>Informações de Contato</h2>
          
          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>@</div>
            <div>
              <h3 style={styles.infoTitle}>Email</h3>
              <p style={styles.infoText}>contato@l4ckos.com</p>
              <p style={styles.infoText}>suporte@l4ckos.com</p>
            </div>
          </div>

          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>☎</div>
            <div>
              <h3 style={styles.infoTitle}>Telefone</h3>
              <p style={styles.infoText}>(11) 99999-9999</p>
              <p style={styles.infoText}>(11) 3333-3333</p>
            </div>
          </div>

          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>◐</div>
            <div>
              <h3 style={styles.infoTitle}>Horário de Atendimento</h3>
              <p style={styles.infoText}>Seg - Sex: 09:00 - 18:00</p>
              <p style={styles.infoText}>Sáb: 10:00 - 14:00</p>
            </div>
          </div>

          <div style={styles.infoCard as CSSProperties}>
            <div style={styles.infoIcon as CSSProperties}>◈</div>
            <div>
              <h3 style={styles.infoTitle}>Localização</h3>
              <p style={styles.infoText}>Rua da Loja, 123</p>
              <p style={styles.infoText}>São Paulo - SP, 01234-567</p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div style={styles.formSection as CSSProperties}>
          <h2 style={styles.sectionTitle}>Envie uma Mensagem</h2>
          
          <form onSubmit={handleSubmit} style={styles.form as CSSProperties}>
            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="nome">
                Nome Completo *
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
                Email *
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
                Telefone (Opcional)
              </label>
              <input
                id="telefone"
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
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
                <option value="duvida">Dúvida sobre Produtos</option>
                <option value="pedido">Dúvida sobre Pedido</option>
                <option value="entrega">Dúvida sobre Entrega</option>
                <option value="devolucao">Devoluções</option>
                <option value="sugestao">Sugestão</option>
                <option value="reclamacao">Reclamação</option>
                <option value="outro">Outro</option>
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
                placeholder="Escreva sua mensagem aqui..."
                style={{...styles.input, minHeight: 150} as CSSProperties}
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
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(26,26,26,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(26,26,26,0.1)";
              }}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
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
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
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
    color: "#0d0d0d",
    margin: 0,
  },
  infoCard: {
    display: "flex",
    gap: 16,
    padding: 24,
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
  },
  infoIcon: {
    fontSize: 32,
    minWidth: 40,
    textAlign: "center",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0d0d0d",
    margin: "0 0 8px 0",
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    margin: "0 0 4px 0",
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
    color: "#0d0d0d",
  },
  input: {
    padding: "12px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    backgroundColor: "white",
  },
  submitButton: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
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
