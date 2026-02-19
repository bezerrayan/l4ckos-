/**
 * Página Perfil - Dados do usuário logado
 */

import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import type { CSSProperties } from "react";

export default function Perfil() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  if (!user || !user.isAuthenticated) {
    return (
      <div style={styles.container as CSSProperties}>
        <div style={styles.notLoggedIn as CSSProperties}>
          <h1 style={styles.title as CSSProperties}>Acesso Negado</h1>
          <p style={styles.message as CSSProperties}>
            Você precisa estar logado para acessar esta página
          </p>
          <button
            onClick={() => navigate("/login")}
            style={styles.button as CSSProperties}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLElement;
              btn.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLElement;
              btn.style.transform = "scale(1)";
            }}
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja fazer logout?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div style={styles.container as CSSProperties}>
      {/* Header do Perfil */}
      <div style={styles.profileHeader as CSSProperties}>
        <div style={styles.avatarLarge as CSSProperties}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <span>{user.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div style={styles.profileInfo as CSSProperties}>
          <h1 style={styles.userName as CSSProperties}>
            Olá, {user.name}! 👋
          </h1>
          <p style={styles.email as CSSProperties}>{user.email}</p>
          <p style={styles.memberDate as CSSProperties}>
            Membro desde {new Date(user.createdAt || Date.now()).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Seções de Perfil */}
      <div style={styles.sectionsGrid as CSSProperties}>
        {/* Dados Pessoais */}
        <div style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>Dados Pessoais</h2>
          <div style={styles.infoGroup as CSSProperties}>
            <label style={styles.infoLabel as CSSProperties}>Nome Completo</label>
            <p style={styles.infoValue as CSSProperties}>{user.name}</p>
          </div>
          <div style={styles.infoGroup as CSSProperties}>
            <label style={styles.infoLabel as CSSProperties}>Email</label>
            <p style={styles.infoValue as CSSProperties}>{user.email}</p>
          </div>
          <button style={styles.editBtn as CSSProperties}>
            ✏️ Editar Perfil
          </button>
        </div>

        {/* Endereços */}
        <div style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>Endereços Salvos</h2>
          <p style={styles.emptyText as CSSProperties}>
            Você ainda não tem endereços salvos
          </p>
          <button style={styles.addBtn as CSSProperties}>
            + Adicionar Endereço
          </button>
        </div>

        {/* Métodos de Pagamento */}
        <div style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>Métodos de Pagamento</h2>
          <p style={styles.emptyText as CSSProperties}>
            Você ainda não tem métodos de pagamento salvos
          </p>
          <button style={styles.addBtn as CSSProperties}>
            + Adicionar Cartão
          </button>
        </div>

        {/* Preferências */}
        <div style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>Preferências</h2>
          <div style={styles.preferenceItem as CSSProperties}>
            <input type="checkbox" defaultChecked />
            <label>Receber emails de promoções</label>
          </div>
          <div style={styles.preferenceItem as CSSProperties}>
            <input type="checkbox" defaultChecked />
            <label>Notificações de pedidos</label>
          </div>
          <div style={styles.preferenceItem as CSSProperties}>
            <input type="checkbox" />
            <label>Notificações de produtos</label>
          </div>
        </div>

        {/* Segurança */}
        <div style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>Segurança</h2>
          <button style={styles.changePasswordBtn as CSSProperties}>
            🔐 Alterar Senha
          </button>
          <button style={styles.twoFactorBtn as CSSProperties}>
            ✓ Ativar Autenticação de Dois Fatores
          </button>
        </div>

        {/* Zona de Perigo */}
        <div style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>Zona de Perigo</h2>
          <button
            onClick={handleLogout}
            style={styles.logoutBtnLarge as CSSProperties}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLElement;
              btn.style.background = "#991b1b";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLElement;
              btn.style.background = "#dc2626";
            }}
          >
            Fazer Logout
          </button>
          <button style={styles.deleteBtnLarge as CSSProperties}>
            ⚠️ Deletar Conta
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  notLoggedIn: {
    textAlign: "center",
    padding: 80,
    background: "#f9f9f9",
    borderRadius: 12,
    border: "2px dashed #e0e0e0",
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    color: "#1a1a1a",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  button: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  profileHeader: {
    display: "flex",
    gap: 40,
    alignItems: "flex-start",
    padding: 40,
    background: "linear-gradient(135deg, #f5f5f5 0%, #f0f0f0 100%)",
    borderRadius: 12,
    marginBottom: 40,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "#1a1a1a",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 48,
    fontWeight: 700,
    overflow: "hidden",
    flexShrink: 0,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 32,
    fontWeight: 900,
    color: "#1a1a1a",
    margin: 0,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
    margin: 0,
    marginBottom: 4,
  },
  memberDate: {
    fontSize: 14,
    color: "#999",
    margin: 0,
  },
  sectionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 24,
    marginBottom: 40,
  },
  section: {
    padding: 24,
    background: "white",
    border: "1px solid #e0e0e0",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 20,
    margin: 0,
  },
  infoGroup: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#1a1a1a",
    margin: 0,
    fontWeight: 600,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    margin: 0,
    marginBottom: 16,
  },
  editBtn: {
    width: "100%",
    padding: "10px 16px",
    background: "#1a1a1a",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  addBtn: {
    width: "100%",
    padding: "10px 16px",
    background: "white",
    color: "#1a1a1a",
    border: "2px solid #1a1a1a",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  preferenceItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 12,
    background: "#f9f9f9",
    borderRadius: 6,
    marginBottom: 12,
  },
  changePasswordBtn: {
    width: "100%",
    padding: "10px 16px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    marginBottom: 8,
  },
  twoFactorBtn: {
    width: "100%",
    padding: "10px 16px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
  },
  logoutBtnLarge: {
    width: "100%",
    padding: "10px 16px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    marginBottom: 8,
    transition: "all 0.2s ease",
  },
  deleteBtnLarge: {
    width: "100%",
    padding: "10px 16px",
    background: "white",
    color: "#dc2626",
    border: "2px solid #dc2626",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
