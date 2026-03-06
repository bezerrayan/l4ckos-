import { useState } from "react";
import { apiUrl } from "../../const";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFeedback("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setFeedback("Digite um email valido.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(apiUrl("/api/waitlist"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Nao foi possivel entrar na lista agora.");
      }

      setFeedback("Voce entrou na lista VIP.");
      setEmail("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nao foi possivel entrar na lista agora.";
      setFeedback(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="coming-fade-up mx-auto mt-1 w-full max-w-4xl px-1 sm:px-0">
      <div className="rounded-2xl border border-white/16 bg-zinc-950/78 p-4 shadow-[0_0_34px_rgba(255,0,0,0.08)] backdrop-blur-md md:p-6">
        <h2 className="text-center text-lg font-black uppercase tracking-[0.18em] text-white md:text-2xl">
          Acesso antecipado
        </h2>

        <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-3xl space-y-3">
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Digite seu email"
            className="h-13 w-full rounded-xl border border-white/35 bg-black/35 px-5 text-lg text-white outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(255,0,0,0.18)] md:h-14"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-13 w-full rounded-xl border border-white/95 bg-black text-lg font-semibold uppercase tracking-wide text-white transition hover:border-red-500 hover:shadow-[0_0_28px_rgba(255,0,0,0.45)] disabled:opacity-70 md:h-14"
          >
            {loading ? "Enviando..." : "Quero acesso antecipado"}
          </button>
        </form>

        {feedback ? <p className="mt-3 text-center text-sm text-zinc-200">{feedback}</p> : null}

        <p className="mt-3 text-center text-base font-medium text-zinc-300">1.274 pessoas ja estao esperando</p>

        <div className="mx-auto mt-4 max-w-3xl">
          <a
            href="https://instagram.com/l4ckos"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/40 bg-zinc-900/35 text-sm font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-red-500 hover:text-red-300"
          >
            Seguir novidades
          </a>
        </div>
      </div>
    </section>
  );
}
