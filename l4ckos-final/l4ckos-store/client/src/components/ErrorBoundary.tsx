import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="l4-error-wrap l4-error-wrap-full">
          <div className="l4-error-noise" aria-hidden />
          <div className="l4-error-grid" aria-hidden />

          <section className="l4-error-card">
            <p className="l4-error-code">500</p>
            <h2 className="l4-error-title">Erro inesperado</h2>
            <p className="l4-error-text">Algo deu errado ao carregar esta pagina.</p>

            <div className="l4-error-actions">
              <button type="button" className="l4-error-btn l4-error-btn-primary" onClick={() => window.location.reload()}>
                Recarregar pagina
              </button>
              <button type="button" className="l4-error-btn l4-error-btn-ghost" onClick={() => (window.location.href = "/")}>
                Ir para Home
              </button>
            </div>

            {this.state.error?.stack ? (
              <details className="l4-error-debug">
                <summary>Detalhes tecnicos</summary>
                <pre>{this.state.error.stack}</pre>
              </details>
            ) : null}
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
