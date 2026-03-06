import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../const";

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const TARGET_DATE = new Date("2026-09-01T00:00:00-03:00").getTime();
const INTRO_KEY = "l4ckos_intro_seen";

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
    const hasSeenIntro = sessionStorage.getItem(INTRO_KEY) === "1";
    if (hasSeenIntro) {
      setIntroDone(true);
      return;
    }

    const firstTimer = window.setTimeout(() => setSplashOut(true), 2000);
    const secondTimer = window.setTimeout(() => {
      sessionStorage.setItem(INTRO_KEY, "1");
      setIntroDone(true);
    }, 2900);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

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
          <div className="l4-splash-logo">L4K</div>
          <div className="l4-splash-bar" />
        </div>
      )}

      <div className="l4-coming-page" style={{ opacity: introDone ? 1 : 0 }}>
        <header className="l4-coming-header a1">
          <div className="l4-coming-logo-word">L4ckos</div>
          <div className="l4-coming-live">
            <span className="l4-coming-live-dot" />
            <span>Em breve</span>
          </div>
        </header>

        <main className="l4-coming-main">
          <section className="l4-left-panel">
            <div className="l4-tag a2">
              <span className="l4-tag-line" />
              <span>Loja escoteira e outdoor</span>
            </div>

            <h1 className="l4-hero-title a3">A nova loja escoteira esta chegando</h1>
            <p className="l4-hero-copy a3">
              A loja que faltava pro escoteiro brasileiro. <strong>Gear de campo, aventura e outdoor</strong> com
              curadoria real.
            </p>

            {!success && (
              <div className="a4">
                <p className="l4-form-label">Lista de acesso antecipado</p>
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
                <span>✓</span>
                <span>Voce esta na lista. Avisaremos quando abrir.</span>
              </div>
            )}

            <div className="l4-stats a4">
              <div className="l4-stat">
                <div className="l4-stat-n">+200k</div>
                <div className="l4-stat-l">produtos outdoor</div>
              </div>
              <div className="l4-stat">
                <div className="l4-stat-n">48h</div>
                <div className="l4-stat-l">entrega express</div>
              </div>
              <div className="l4-stat">
                <div className="l4-stat-n">Set/26</div>
                <div className="l4-stat-l">lancamento</div>
              </div>
            </div>
          </section>

          <section className="l4-right-panel">
            <div className="l4-right-hero a5">
              <div className="l4-right-orb" />
              <div className="l4-right-inner">
                <div className="l4-right-l4k">L4K</div>
                <div className="l4-right-coming">Chegando em</div>
                <div className="l4-right-date">
                  Setembro <span>2026</span>
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
            <div className="l4-ben-title">Gear certificado</div>
            <div className="l4-ben-desc">Equipamento para trilha, camping e aventura.</div>
          </article>
          <article className="l4-ben">
            <div className="l4-ben-title">Curadoria de campo</div>
            <div className="l4-ben-desc">Selecionado por escoteiros e guias experientes.</div>
          </article>
          <article className="l4-ben">
            <div className="l4-ben-title">Entrega nacional</div>
            <div className="l4-ben-desc">Logistica rapida para o seu role.</div>
          </article>
          <article className="l4-ben">
            <div className="l4-ben-title">Garantia real</div>
            <div className="l4-ben-desc">Troca sem burocracia se nao performar no campo.</div>
          </article>
        </section>

        <footer className="l4-footer a8">
          <span>© {year} L4ckos - Todos os direitos reservados.</span>
          <div className="l4-footer-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
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
