import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/UserContext";
import type { CSSProperties } from "react";

export default function Header() {
  const { favorites } = useFavorites();
  const { user, logout } = useUser();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logoContainer as CSSProperties}>
            <div style={styles.logoBadge as CSSProperties}>
              <div style={styles.logoText}>L4ckos</div>
              <div style={styles.logoUnderline}></div>
            </div>
            <p style={styles.tagline}>Loja Escoteira</p>
          </div>
        </Link>

        <nav style={styles.nav}>
          <Link 
            style={styles.link}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "rgba(255,255,255,0.1)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.transform = "translateY(0)";
            }}
            to="/"
          >
            Início
          </Link>
          <Link 
            style={styles.link}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "rgba(255,255,255,0.1)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.transform = "translateY(0)";
            }}
            to="/produtos"
          >
            Produtos
          </Link>
          <Link 
            style={styles.link}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "rgba(255,255,255,0.1)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.transform = "translateY(0)";
            }}
            to="/favoritos"
          >
            <span style={{display: "inline-flex", alignItems: "center", gap: 8, position: "relative"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Favoritos
              {favorites.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  background: "#dc2626",
                  color: "white",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                }}>
                  {favorites.length}
                </span>
              )}
            </span>
          </Link>
          <Link 
            style={styles.link}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "rgba(255,255,255,0.1)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.transform = "translateY(0)";
            }}
            to="/carrinho"
          >
            <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
                <path d="M6 6h15l-1.5 9h-13z"></path>
                <circle cx="9" cy="20" r="1"></circle>
                <circle cx="19" cy="20" r="1"></circle>
              </svg>
              Carrinho
            </span>
          </Link>
          {/* Botão de Login/Perfil */}
          {user && user.isAuthenticated ? (
            <div style={styles.userMenu as CSSProperties}>
              <Link to="/perfil" style={styles.userInfo as CSSProperties}>
                <div style={styles.avatar as CSSProperties}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{width: "100%", height: "100%", borderRadius: "50%"}} />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div style={styles.userName as CSSProperties}>
                  {user.name}
                </div>
              </Link>
              <button
                onClick={logout}
                style={styles.logoutBtn as CSSProperties}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLElement;
                  btn.style.backgroundColor = "#dc2626";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLElement;
                  btn.style.backgroundColor = "rgba(220,38,38,0.1)";
                }}
              >
                Sair
              </button>
            </div>
          ) : (
            <div style={styles.authLinks as CSSProperties}>
              <Link
                to="/login"
                style={styles.loginBtn as CSSProperties}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#333333";
                  el.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.15)";
                  el.style.transform = "scale(1)";
                }}
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                style={styles.signupBtn as CSSProperties}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#ffffff";
                  el.style.color = "#1a1a1a";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "white";
                  el.style.color = "#1a1a1a";
                }}
              >
                Criar Conta
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    borderBottom: "2px solid #444444",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1400,
    margin: "0 auto",
    padding: "16px 32px",
  },
  logoLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  logoBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 900,
    color: "white",
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  logoUnderline: {
    width: 40,
    height: 3,
    background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
    borderRadius: "2px",
  },
  tagline: {
    fontSize: 11,
    color: "#9d9d9d",
    margin: 0,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  nav: {
    display: "flex",
    gap: 24,
    alignItems: "center",
  },
  link: {
    color: "white",
    fontWeight: 600,
    fontSize: 15,
    padding: "8px 14px",
    borderRadius: 6,
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 14px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    transition: "all 0.3s ease",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    cursor: "pointer",
    userSelect: "none",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 700,
    fontSize: 14,
  },
  userName: {
    color: "white",
    fontWeight: 600,
    fontSize: 13,
    maxWidth: 120,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  logoutBtn: {
    padding: "6px 14px",
    background: "rgba(220,38,38,0.1)",
    color: "#dc2626",
    border: "none",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  loginBtn: {
    color: "white",
    fontWeight: 600,
    fontSize: 15,
    padding: "8px 16px",
    borderRadius: 6,
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  authLinks: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  signupBtn: {
    color: "#1a1a1a",
    fontWeight: 600,
    fontSize: 15,
    padding: "8px 16px",
    borderRadius: 6,
    background: "white",
    border: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};
