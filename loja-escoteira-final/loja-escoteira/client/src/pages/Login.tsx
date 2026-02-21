/**
 * Página Login - Autenticação de usuários
 * Pronto para integração com Google OAuth
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import type { CSSProperties } from "react";
import type { User } from "../types/user";
import { getLoginUrl } from "../const";

export default function Login() {
  const navigate = useNavigate();
  const { login, setUser, isLoading } = useUser();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast({
        message: "Por favor, preencha todos os campos",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast({
        message: "Login realizado com sucesso!",
        duration: 3000,
      });
      navigate("/");
    } catch (err) {
      showToast({
        message: "Erro ao fazer login. Verifique suas credenciais.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const loginUrl = getLoginUrl();
    if (!loginUrl) {
      showToast({
        message: "Não foi possível iniciar login com Google",
        duration: 3000,
      });
      return;
    }

    window.location.href = loginUrl;
  };

  return (
    <div style={styles.container as CSSProperties}>
      {/* Lado Esquerdo - Logo e Informações */}
      <div style={styles.leftPanel as CSSProperties}>
        <div style={styles.logoSection as CSSProperties}>
          <div style={styles.logoPlaceholder as CSSProperties}>
            {/* Espaço para logo da marca */}
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div style={styles.rightPanel as CSSProperties}>
        {/* Header */}
        <div style={styles.header as CSSProperties}>
          <h1 style={styles.title as CSSProperties}>Bem-vindo</h1>
          <p style={styles.subtitle as CSSProperties}>
            Faça login ou crie sua conta
          </p>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleEmailLogin} style={styles.form as CSSProperties}>
          <div style={styles.formGroup as CSSProperties}>
            <label style={styles.label as CSSProperties} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={styles.input as CSSProperties}
              disabled={isSubmitting || isLoading}
            />
          </div>

          <div style={styles.formGroup as CSSProperties}>
            <label style={styles.label as CSSProperties} htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input as CSSProperties}
              disabled={isSubmitting || isLoading}
            />
          </div>

          {/* Lembrar e Esqueceu Senha */}
          <div style={styles.optionsRow as CSSProperties}>
            <label style={styles.checkboxLabel as CSSProperties}>
              <input type="checkbox" style={{marginRight: 8}} />
              Lembrar-me
            </label>
            <a href="#" style={styles.forgotLink as CSSProperties}>
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              opacity: isSubmitting || isLoading ? 0.7 : 1,
              cursor: isSubmitting || isLoading ? "not-allowed" : "pointer",
            } as CSSProperties}
            disabled={isSubmitting || isLoading}
            onMouseEnter={(e) => {
              if (!isSubmitting && !isLoading) {
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
            {isSubmitting || isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Divisor */}
        <div style={styles.divider as CSSProperties}>
          <span style={styles.dividerText as CSSProperties}>OU</span>
        </div>

        {/* Login com Google */}
        <button
          onClick={handleGoogleLogin}
          style={styles.googleBtn as CSSProperties}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.background = "#f8f8f8";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.background = "white";
          }}
          disabled={isSubmitting || isLoading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" style={{marginRight: 12}} aria-hidden="true" focusable="false">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
          </svg>
          Continuar com Google
        </button>

        {/* Link para Sign Up */}
        <div style={styles.signupSection as CSSProperties}>
          <p style={styles.signupText as CSSProperties}>
            Não tem conta? 
            <a 
              href="#" 
              style={styles.signupLink as CSSProperties}
              onClick={(e) => {
                e.preventDefault();
                navigate("/cadastro");
              }}
            >
              Criar conta
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
    alignItems: "flex-start",
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
    height: 250,
    background: "rgba(200, 200, 200, 0.2)",
    border: "2px dashed rgba(100, 100, 100, 0.4)",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(100, 100, 100, 0.6)",
    fontSize: 14,
    fontWeight: 500,
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
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
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
    gap: 20,
    marginBottom: 24,
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
  optionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#666",
  },
  forgotLink: {
    color: "#1a1a1a",
    fontWeight: 600,
    transition: "color 0.2s ease",
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
    margin: "20px 0",
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
    marginBottom: 24,
  },
  signupSection: {
    textAlign: "center",
    paddingTop: 24,
    borderTop: "1px solid #e0e0e0",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
    margin: 0,
  },
  signupLink: {
    color: "#1a1a1a",
    fontWeight: 700,
    marginLeft: 8,
    transition: "color 0.2s ease",
  },
};
