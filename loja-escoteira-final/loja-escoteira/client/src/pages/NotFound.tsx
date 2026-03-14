import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="l4-error-wrap">
      <div className="l4-error-noise" aria-hidden />
      <div className="l4-error-grid" aria-hidden />

      <div className="l4-error-card">
        <p className="l4-error-code">404</p>
        <h1 className="l4-error-title">Página não encontrada</h1>
        <p className="l4-error-text">A rota que você tentou acessar não existe ou foi movida.</p>

        <div className="l4-error-actions">
          <button type="button" className="l4-error-btn l4-error-btn-primary" onClick={() => navigate("/")}>
            Ir para início
          </button>
          <button type="button" className="l4-error-btn l4-error-btn-ghost" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    </section>
  );
}
