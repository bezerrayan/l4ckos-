import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../const";
import logoPrincipalPreta from "../images/logo-principal-preta.jpeg";

type Countdown = { days: string; hours: string; minutes: string; seconds: string };

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCountdown(targetDate: number, now = Date.now()): Countdown {
  const diff = Math.max(0, targetDate - now);
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    minutes: pad(Math.floor((diff % 3_600_000) / 60_000)),
    seconds: pad(Math.floor((diff % 60_000) / 1_000)),
  };
}

export default function ComingSoon() {
  const targetDate = useMemo(() => Date.now() + 120 * 24 * 60 * 60 * 1000, []);
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(targetDate));
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [splashOut, setSplashOut] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const startOut = window.setTimeout(() => setSplashOut(true), 1250);
    const finish = window.setTimeout(() => setIntroDone(true), 1750);
    return () => {
      window.clearTimeout(startOut);
      window.clearTimeout(finish);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setCountdown(getCountdown(targetDate)), 1000);
    return () => window.clearInterval(id);
  }, [targetDate]);

  async function handleSubmit() {
    const normalizedEmail = email.trim().toLowerCase();
    setError("");
    setSuccessMessage("");
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
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) {
        throw new Error(data?.message || "Algo deu errado. Tente novamente.");
      }
      setSuccess(true);
      setSuccessMessage(data?.message || "Voce esta na lista. Avisaremos quando abrir.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="l4-coming-v2-root">
      {!introDone && (
        <div className={`l4-coming-v2-splash ${splashOut ? "is-out" : ""}`}>
          <img src={logoPrincipalPreta} alt="L4CKOS" />
        </div>
      )}

      <div className={`l4-coming-v2-page ${introDone ? "is-ready" : ""}`}>
        <main className="l4-coming-v2-main">
          <section className="l4-coming-v2-left">
            <div className="l4-coming-v2-badge">
              <span className="dot" />
              Loja Escoteira &amp; Outdoor
            </div>

            <div className="l4-coming-v2-logo-wrap">
              <img src={logoPrincipalPreta} alt="L4CKOS" className="l4-coming-v2-logo" />
            </div>

            <p className="l4-coming-v2-tagline">
              A loja que faltava pro escoteiro brasileiro.
              <br />
              <strong>Gear de campo, aventura e outdoor</strong> com curadoria real - testado por quem vive na
              natureza.
            </p>

            <div>
              <div className="l4-coming-v2-cd-label">Abrindo em</div>
              <div className="l4-coming-v2-cd-row">
                <div className="l4-coming-v2-cd-cell">
                  <span className="num">{countdown.days}</span>
                  <span className="lbl">Dias</span>
                </div>
                <div className="l4-coming-v2-cd-cell">
                  <span className="num">{countdown.hours}</span>
                  <span className="lbl">Horas</span>
                </div>
                <div className="l4-coming-v2-cd-cell">
                  <span className="num">{countdown.minutes}</span>
                  <span className="lbl">Min</span>
                </div>
                <div className="l4-coming-v2-cd-cell">
                  <span className="num">{countdown.seconds}</span>
                  <span className="lbl">Seg</span>
                </div>
              </div>
            </div>
          </section>

          <section className="l4-coming-v2-right">
            <div className="l4-coming-v2-right-top">
              <div className="mini">Acesso antecipado</div>
              <h1>
                CHEGANDO
                <br />
                EM BREVE
              </h1>
              <p>
                Entra na lista agora e garante frete gratis, desconto exclusivo e acesso 24h antes de todo mundo.
              </p>

              {!success ? (
                <div className="l4-coming-v2-form-wrap">
                  <div className="l4-coming-v2-form-label">Seu e-mail</div>
                  <div className={`l4-coming-v2-form-row ${error ? "has-error" : ""}`}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          void handleSubmit();
                        }
                      }}
                      placeholder="voce@email.com"
                    />
                    <button type="button" onClick={() => void handleSubmit()} disabled={loading}>
                      {loading ? "..." : "ENTRAR NA LISTA"}
                    </button>
                  </div>
                  {error ? <div className="l4-coming-v2-form-error">{error}</div> : null}
                  <div className="l4-coming-v2-form-note">Sem spam. So avisamos quando abrir.</div>
                </div>
              ) : (
                <div className="l4-coming-v2-success">
                  <div className="icon">OK</div>
                  <div className="title">VAGA GARANTIDA</div>
                  <div className="sub">{successMessage || "Voce sera avisado antes de todo mundo."}</div>
                </div>
              )}
            </div>

            <div className="l4-coming-v2-diff">
              <div>
                <span>Frete gratis no lancamento</span>
                <b>-</b>
              </div>
              <div>
                <span>Acesso 24h antes</span>
                <b>-</b>
              </div>
              <div>
                <span>Desconto exclusivo de 10%</span>
                <b>-</b>
              </div>
              <div>
                <span>Gear testado de verdade</span>
                <b>-</b>
              </div>
            </div>
          </section>
        </main>

        <footer className="l4-coming-v2-footer">
          <div className="copy">(c) 2026 L4ckos - Brasilia/DF</div>
          <div className="links">
            <a href="https://instagram.com/l4ckos" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://wa.me/5561998030913" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="mailto:contato@l4ckos.com.br">contato@l4ckos.com.br</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
