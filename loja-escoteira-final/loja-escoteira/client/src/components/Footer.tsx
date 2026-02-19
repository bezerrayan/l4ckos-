import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Coluna 1: Sobre */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Sobre Nós</h4>
          <p style={styles.columnText}>
            Sua loja premium de qualidade e confiança. Oferecemos produtos variados com garantia e atendimento especializado para todas as suas necessidades.
          </p>
          <div style={styles.social}>
          <a href="#" style={styles.socialIcon} title="WhatsApp">
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ color: "white" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.672.15-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.672-1.611-.92-2.206-.242-.579-.487-.5-.672-.51-.173-.008-.372-.01-.571-.01s-.521.074-.794.372c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.26.489 1.689.625.71.227 1.356.195 1.866.118.569-.085 1.758-.718 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.273-.198-.571-.347zM12 2C6.486 2 2 6.486 2 12c0 2.11.615 4.066 1.677 5.708L2 22l4.404-1.643C8.916 21.4 10.42 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z"></path>
  </svg>
</a>

            <a href="https://www.instagram.com/l4ckos/" style={styles.socialIcon} title="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 11.37 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
              </svg>
            </a>
          
          </div>
        </div>

        {/* Coluna 2: Links */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Links Rápidos</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/" style={styles.link}>Início</Link>
            </li>
            <li>
              <Link to="/produtos" style={styles.link}>Produtos</Link>
            </li>
            <li>
              <Link to="/carrinho" style={styles.link}>Carrinho</Link>
            </li>
            <li>
              <Link to="/sobre" style={styles.link}>Sobre Nós</Link>
            </li>
            <li>
              <Link to="/faqs" style={styles.link}>FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Informações */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Informações</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/sobre" style={styles.link}>Sobre a Loja</Link>
            </li>
            <li>
              <Link to="/privacidade" style={styles.link}>Política de Privacidade</Link>
            </li>
            <li>
              <Link to="/termos" style={styles.link}>Termos de Serviço</Link>
            </li>
            <li>
              <Link to="/contato" style={styles.link}>Contato</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Contato */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Contato</h4>
          <p style={styles.contactItem}>
            <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
                <path d="M4 4h16v12H4z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              contato@ycstore.com.br
            </span>
          </p>
          <p style={styles.contactItem}>
            <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
                <path d="M22 16.92V21a1 1 0 0 1-1.09 1A19 19 0 0 1 3 5.09 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75c.12.66.35 1.3.69 1.86a1 1 0 0 1-.24 1.11L8.91 9.91a12.07 12.07 0 0 0 6 6l1.2-1.02a1 1 0 0 1 1.1-.24c.56.34 1.2.57 1.86.69a1 1 0 0 1 .75 1V21z"></path>
              </svg>
              (61) 99803-0913
            </span>
          </p>
          <p style={styles.contactItem}>
            <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
                <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="2"></circle>
              </svg>
              Brasília - DF
            </span>
          </p>
        </div>
      </div>

      {/* Linha divisória */}
      <div style={styles.divider}></div>

      {/* Bottom */}
      <div style={styles.bottom}>
        <p style={styles.copyright}>
          © {currentYear} l4ckos. Todos os direitos reservados.
        </p>
        <div style={styles.payments}>
          <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
            Pix • Cartão de Crédito • Boleto
          </span>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, CSSProperties> = {
  footer: {
    background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
    color: "white",
    padding: "60px 0",
    marginTop: 100,
  },
  container: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 32px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 40,
  },
  column: {
    animation: "fadeInUp 0.6s ease-out",
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  columnText: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 16,
  },
  social: {
    display: "flex",
    gap: 12,
  },
  socialIcon: {
    fontSize: 24,
    transition: "transform 0.3s ease",
    cursor: "pointer",
    display: "inline-block",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontSize: 14,
    display: "block",
    marginBottom: 12,
  },
  contactItem: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 12,
    lineHeight: 1.6,
  },
  divider: {
    maxWidth: 1400,
    margin: "40px auto",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  bottom: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
  },
  copyright: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    margin: 0,
  },
  payments: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
};
