import { Link } from "react-router-dom";
import logoBranco from "../images/logo_branco.png";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="l4-footer">
      <div className="l4-footer-grid">
        <div>
          <img src={logoBranco} alt="L4ckos" className="l4-footer-logo" />
          <p className="l4-footer-text">
            Sua loja premium de qualidade e confianca. Produtos para aventura, trilha e movimento escoteiro.
          </p>
        </div>

        <div>
          <h4>Loja</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/carrinho">Carrinho</Link></li>
            <li><Link to="/meus-pedidos">Meus Pedidos</Link></li>
          </ul>
        </div>

        <div>
          <h4>Suporte</h4>
          <ul>
            <li><Link to="/acompanhar-pedido">Acompanhar Pedido</Link></li>
            <li><Link to="/trocas-e-devolucoes">Trocas e Devolucoes</Link></li>
            <li><Link to="/faqs">FAQ</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/termos">Termos</Link></li>
            <li><Link to="/privacidade">Privacidade</Link></li>
          </ul>
        </div>
      </div>

      <div className="l4-footer-bottom">
        <span>© {year} L4ckos. Todos os direitos reservados.</span>
        <span>PIX • Cartao • Boleto</span>
      </div>
    </footer>
  );
}

