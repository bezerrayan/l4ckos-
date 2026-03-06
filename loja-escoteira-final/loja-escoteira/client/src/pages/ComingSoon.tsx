import { useEffect, useState } from "react";
import { apiUrl } from "../const";
import logoBranco from "../images/logo_branco.jpeg";
import logoPrincipal from "../images/logo-principal.jpeg";

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const TARGET_DATE = Date.now() + 120 * 24 * 60 * 60 * 1000;
const LOGO_L4K_SRC = logoBranco;
const LOGO_L4CKOS_SRC = logoPrincipal;

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function getCountdown(now = Date.now()): Countdown {
  const diff = Math.max(0, TARGET_DATE - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ComingSoon() {
  const [introDone, setIntroDone] = useState(false);
  const [splashOut, setSplashOut] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown());
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const firstTimer = window.setTimeout(() => setSplashOut(true), 2700);
    const secondTimer = window.setTimeout(() => {
      setIntroDone(true);
    }, 3400);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(id);
  }, []);

  async function handleSubmit() {
    const normalizedEmail = email.trim().toLowerCase();
    setError("");
    if (!isValidEmail(normalizedEmail)) {
      setError("Insira um e-mail valido.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/waitlist"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      setSuccess(true);
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="l4-coming-root">
      {!introDone && (
        <div className={`l4-splash ${splashOut ? "is-out" : ""}`}>
          <div className="l4-sp-stage">
            <img className="l4-sp-img l4-sp-l4k" src={LOGO_L4K_SRC} alt="L4K" />
            <img className="l4-sp-img l4-sp-lyckos" src={LOGO_L4CKOS_SRC} alt="L4ckos" />
            <div className="l4-splash-bar" />
            <div className="l4-splash-sub">Loja Escoteira</div>
          </div>
        </div>
      )}

      <div className="l4-coming-page" style={{ opacity: introDone ? 1 : 0 }}>
        <div className="l4-noise" aria-hidden />

        <header className="l4-coming-header a1">
          <img className="l4-coming-logo-word" src={LOGO_L4CKOS_SRC} alt="L4ckos" />
          <div className="l4-coming-live">
            <span className="l4-coming-live-dot" />
            <span>Em breve</span>
          </div>
        </header>

        <main className="l4-coming-main l4-coming-main-grid">
          <section className="l4-left-panel">
            <div className="l4-tag a2 l4-eyebrow">
              <span className="l4-tag-line" />
              <span>Loja Escoteira &amp; Outdoor</span>
            </div>

            <div className="l4-hero-wm a3">
              <img src={LOGO_L4CKOS_SRC} alt="L4ckos" />
            </div>

            <p className="l4-hero-copy a3">
              A loja que faltava pro escoteiro brasileiro. <strong>Gear de campo, aventura e outdoor</strong> com
              curadoria real - testado por quem vive na natureza.
            </p>

            {!success && (
              <div className="a4">
                <p className="l4-form-label">Lista de acesso antecipado - frete gratis no lancamento</p>
                <div className={`l4-form-row ${error ? "has-error" : ""}`}>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        void handleSubmit();
                      }
                    }}
                  />
                  <button type="button" onClick={() => void handleSubmit()} disabled={loading}>
                    {loading ? "..." : "Garantir vaga"}
                  </button>
                </div>
                {error && <p className="l4-form-error">{error}</p>}
              </div>
            )}

            {success && (
              <div className="l4-form-success a4">
                <span>OK</span>
                <span>Voce esta na lista. Avisaremos quando abrir.</span>
              </div>
            )}

            <div className="l4-stats a4">
              <div className="l4-stat">
                <div className="l4-stat-n">
                  +200<b>k</b>
                </div>
                <div className="l4-stat-l">produtos outdoor</div>
              </div>
              <div className="l4-stat">
                <div className="l4-stat-n">
                  48<b>h</b>
                </div>
                <div className="l4-stat-l">entrega express</div>
              </div>
              <div className="l4-stat">
                <div className="l4-stat-n">
                  Set<b>/25</b>
                </div>
                <div className="l4-stat-l">lancamento</div>
              </div>
            </div>
          </section>

          <div className="l4-vdiv" />

          <section className="l4-right-panel">
            <div className="l4-right-hero a5">
              <div className="l4-right-orb" />
              <div className="l4-right-inner">
                <img className="l4-right-l4k" src={LOGO_L4K_SRC} alt="L4K" />
                <div className="l4-right-coming">Abertura do site</div>
                <div className="l4-right-date">
                  Em <span>120 dias</span>
                </div>
              </div>
            </div>

            <div className="l4-cd a6">
              <p className="l4-cd-title">Contagem regressiva</p>
              <div className="l4-cd-grid">
                <div className="l4-cd-cell">
                  <div className="l4-cd-n">{countdown.days}</div>
                  <div className="l4-cd-l">dias</div>
                </div>
                <div className="l4-cd-cell">
                  <div className="l4-cd-n">{countdown.hours}</div>
                  <div className="l4-cd-l">horas</div>
                </div>
                <div className="l4-cd-cell">
                  <div className="l4-cd-n">{countdown.minutes}</div>
                  <div className="l4-cd-l">min</div>
                </div>
                <div className="l4-cd-cell">
                  <div className="l4-cd-n">{countdown.seconds}</div>
                  <div className="l4-cd-l">seg</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <section className="l4-benefits a7">
          <article className="l4-ben">
            <div className="l4-bi">01</div>
            <div className="l4-ben-title">Gear certificado</div>
            <div className="l4-ben-desc">Equipamento para trilha, camping e aventura extrema.</div>
          </article>
          <article className="l4-ben">
            <div className="l4-bi">02</div>
            <div className="l4-ben-title">Curadoria de campo</div>
            <div className="l4-ben-desc">Selecionado por escoteiros e guias experientes.</div>
          </article>
          <article className="l4-ben">
            <div className="l4-bi">03</div>
            <div className="l4-ben-title">Entrega nacional</div>
            <div className="l4-ben-desc">Logistica rapida pra nao perder a janela da expedicao.</div>
          </article>
          <article className="l4-ben">
            <div className="l4-bi">04</div>
            <div className="l4-ben-title">Garantia de campo</div>
            <div className="l4-ben-desc">Troca sem burocracia se nao performar na real.</div>
          </article>
        </section>

        <footer className="l4-footer a8">
          <span>(c) 2026 L4ckos - Todos os direitos reservados.</span>
          <div className="l4-footer-links">
            <a href="https://instagram.com/l4ckos" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://wa.me" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="mailto:contato@l4ckos.com.br">contato@l4ckos.com.br</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
