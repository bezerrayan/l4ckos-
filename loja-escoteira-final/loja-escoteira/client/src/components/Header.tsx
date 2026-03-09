import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/UserContext";
import { useIsMobile } from "../hooks/useIsMobile";
import logoBranco from "../images/logo_branco.png";
import "./Header.css";

function firstName(name?: string, email?: string) {
  const trimmed = name?.trim();
  if (trimmed) return trimmed.split(/\s+/)[0];
  const local = email?.split("@")[0]?.trim();
  if (!local) return "Usuario";
  return local.split(/[._-]+/)[0] || local;
}

export default function Header() {
  const location = useLocation();
  const { favorites } = useFavorites();
  const { user, logout } = useUser();
  const isMobile = useIsMobile(980);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = Boolean(user?.isAuthenticated);
  const displayName = firstName(user?.name, user?.email);

  const navItems = [
    { to: "/", label: "Inicio", active: location.pathname === "/" },
    {
      to: "/produtos",
      label: "Produtos",
      active: location.pathname === "/produtos" || location.pathname.startsWith("/produto/"),
    },
    { to: "/meus-pedidos", label: "Pedidos", active: location.pathname === "/meus-pedidos" },
    { to: "/acompanhar-pedido", label: "Acompanhar", active: location.pathname === "/acompanhar-pedido" },
    { to: "/contato", label: "Contato", active: location.pathname === "/contato" },
  ];

  return (
    <header className="l4-header">
      <div className="l4-header-inner">
        <Link to="/" className="l4-header-brand" onClick={() => setMenuOpen(false)}>
          <img src={logoBranco} alt="L4ckos" />
          <span>LOJA ESCOTEIRA</span>
        </Link>

        <button className="l4-header-menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          {menuOpen ? "x" : "="}
        </button>

        <nav className={`l4-header-nav ${isMobile ? "mobile" : ""} ${menuOpen ? "open" : ""}`}>
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className={`l4-header-link ${item.active ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/favoritos" className={`l4-header-link ${location.pathname === "/favoritos" ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
            Favoritos{favorites.length > 0 ? ` (${favorites.length})` : ""}
          </Link>
          <Link to="/carrinho" className={`l4-header-link ${location.pathname === "/carrinho" ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
            Carrinho
          </Link>

          {isAuthenticated ? (
            <div className="l4-header-user">
              <Link to="/perfil" className="l4-header-chip" onClick={() => setMenuOpen(false)}>
                Ola, {displayName}
              </Link>
              {user?.role === "admin" ? (
                <Link to="/admin" className="l4-header-chip admin" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              ) : null}
              <button
                className="l4-header-chip danger"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="l4-header-auth">
              <Link to="/login" className="l4-header-chip" onClick={() => setMenuOpen(false)}>
                Entrar
              </Link>
              <Link to="/cadastro" className="l4-header-chip white" onClick={() => setMenuOpen(false)}>
                Criar Conta
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

