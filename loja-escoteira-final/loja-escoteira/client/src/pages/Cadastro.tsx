/**
 * Página Cadastro - Registro de novos usuários
 * Mesmo design que o Login, com campos para cadastro
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import type { CSSProperties } from "react";
import { getLoginUrl } from "../const";
import { useIsMobile } from "../hooks/useIsMobile";
import { trpc } from "../lib/trpc";

export default function Cadastro() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const utils = trpc.useUtils();
  const localSignupMutation = trpc.auth.localSignup.useMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showToast({
        message: "Por favor, preencha todos os campos obrigatórios",
        duration: 3000,
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast({
        message: "As senhas não coincidem",
        duration: 3000,
      });
      return;
    }

    if (formData.password.length < 6) {
      showToast({
        message: "Senha deve ter no mínimo 6 caracteres",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await localSignupMutation.mutateAsync({
        name: `${formData.firstName} ${formData.lastName}`.trim() || formData.firstName,
        email: formData.email,
        password: formData.password,
      });
      await utils.auth.me.invalidate();

      showToast({
        message: "Cadastro realizado com sucesso!",
        duration: 3000,
      });
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.";
      showToast({
        message,
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    const loginUrl = getLoginUrl();
    if (!loginUrl) {
      showToast({
        message: "Não foi possível iniciar cadastro com Google",
        duration: 3000,
      });
      return;
    }

    window.location.href = loginUrl;
  };

  return (
    <div
      style={{
        ...styles.container,
        gridTemplateColumns: isMobile ? "1fr" : styles.container.gridTemplateColumns,
        minHeight: isMobile ? "auto" : styles.container.minHeight,
      } as CSSProperties}
    >
      {/* Lado Esquerdo - Logo e Informações */}
      <div style={{ ...styles.leftPanel, display: isMobile ? "none" : "flex" } as CSSProperties}>
        <div style={styles.logoSection as CSSProperties}>
          <div style={styles.logoPlaceholder as CSSProperties}>
            <img src="/images/logo-principal.png" alt="Logo da marca" style={styles.logoImage as CSSProperties} />
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div
        style={{
          ...styles.rightPanel,
          padding: isMobile ? "24px 14px" : styles.rightPanel.padding,
        } as CSSProperties}
      >
        {/* Header */}
        <div style={styles.header as CSSProperties}>
          <h1 style={{ ...styles.title, fontSize: isMobile ? 28 : styles.title.fontSize } as CSSProperties}>Criar Conta</h1>
          <p style={styles.subtitle as CSSProperties}>
            Preencha os dados para se registrar
          </p>
        </div>

        {/* Formulário de Cadastro */}
        <form onSubmit={handleSignUp} style={styles.form as CSSProperties}>
          <div
            style={{
              ...styles.nameRow,
              gridTemplateColumns: isMobile ? "1fr" : styles.nameRow.gridTemplateColumns,
            } as CSSProperties}
          >
            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="firstName">
                Primeiro Nome *
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="João"
                style={styles.input as CSSProperties}
                disabled={isSubmitting || localSignupMutation.isPending}
              />
            </div>

            <div style={styles.formGroup as CSSProperties}>
              <label style={styles.label as CSSProperties} htmlFor="lastName">
                Sobrenome
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="da Silva"
                style={styles.input as CSSProperties}
                disabled={isSubmitting || localSignupMutation.isPending}
              />
            </div>
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
              disabled={isSubmitting || localSignupMutation.isPending}
            />
          </div>

          <div style={styles.formGroup as CSSProperties}>
            <label style={styles.label as CSSProperties} htmlFor="password">
              Senha *
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              style={styles.input as CSSProperties}
              disabled={isSubmitting || localSignupMutation.isPending}
            />
          </div>

          <div style={styles.formGroup as CSSProperties}>
            <label
              style={styles.label as CSSProperties}
              htmlFor="confirmPassword"
            >
              Confirmar Senha *
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              style={styles.input as CSSProperties}
              disabled={isSubmitting || localSignupMutation.isPending}
            />
          </div>

          {/* Termos */}
          <div style={styles.termsBox as CSSProperties}>
            <input type="checkbox" defaultChecked />
            <label style={styles.termsLabel as CSSProperties}>
              Concordo com os{" "}
              <a href="#" style={{color: "#1a1a1a", textDecoration: "underline"}}>
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" style={{color: "#1a1a1a", textDecoration: "underline"}}>
                Política de Privacidade
              </a>
            </label>
          </div>

          {/* Botão de Cadastro */}
          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            } as CSSProperties}
            disabled={isSubmitting}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                const btn = e.currentTarget as HTMLElement;
                btn.style.transform = "translateY(-2px)";
                btn.style.boxShadow = "0 12px 24px rgba(26,26,26,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLElement;
              btn.style.transform = "translateY(0)";
              btn.style.boxShadow = "0 4px 12px rgba(26,26,26,0.2)";
            }}
          >
            {isSubmitting ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        {/* Divisor */}
        <div style={styles.divider as CSSProperties}>
          <span style={styles.dividerText as CSSProperties}>OU</span>
        </div>

        {/* Sign Up com Google */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          style={styles.googleBtn as CSSProperties}
          disabled={isSubmitting}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              const btn = e.currentTarget as HTMLElement;
              btn.style.background = "#f8f8f8";
            }
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.background = "white";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" style={{marginRight: 12}}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
          </svg>
          Cadastrar com Google
        </button>

        {/* Link para Login */}
        <div style={styles.loginSection as CSSProperties}>
          <p style={styles.loginText as CSSProperties}>
            Já tem conta?{" "}
            <a
              href="#"
              style={styles.loginLink as CSSProperties}
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Fazer login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "calc(100vh - 200px)",
    gap: 0,
    background: "white",
  },
  leftPanel: {
    background: "white",
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#1a1a1a",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  logoPlaceholder: {
    textAlign: "center",
    width: 320,
    height: 190,
    background: "transparent",
    border: "none",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(100, 100, 100, 0.6)",
    fontSize: 14,
    fontWeight: 500,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    maxWidth: "none",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  logo: {
    fontSize: 64,
    fontWeight: 900,
    color: "white",
    marginBottom: 12,
    letterSpacing: "-2px",
  },
  logoSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  benefitsColumn: {
    flex: 1,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 24,
    margin: 0,
  },
  benefits: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 14,
    color: "#333333",
    fontWeight: 500,
  },
  benefitIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  rightPanel: {
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: "500px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    overflowY: "auto",
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 900,
    color: "#1a1a1a",
    margin: 0,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 20,
  },
  nameRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1a1a1a",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    outline: "none",
  },
  termsBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: 12,
    background: "#f9f9f9",
    borderRadius: 6,
    fontSize: 13,
  },
  termsLabel: {
    color: "#666",
    lineHeight: 1.4,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "14px 24px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(26,26,26,0.2)",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    margin: "16px 0",
  },
  dividerText: {
    color: "#999",
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  googleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px",
    background: "white",
    border: "2px solid #e0e0e0",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: 16,
  },
  loginSection: {
    textAlign: "center",
    paddingTop: 16,
    borderTop: "1px solid #e0e0e0",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
    margin: 0,
  },
  loginLink: {
    color: "#1a1a1a",
    fontWeight: 700,
    marginLeft: 8,
    transition: "color 0.2s ease",
  },
};
