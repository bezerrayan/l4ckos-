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
    <section className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-white/10 bg-zinc-950/45 p-4 sm:p-6">
        <p className="font-['Inter'] text-center text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300 sm:text-base">
          Acesso antecipado
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Digite seu email"
            className="font-['Inter'] h-12 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 sm:h-13"
          />

          <button
            type="submit"
            disabled={loading}
            className="font-['Inter'] h-12 w-full rounded-xl border border-white/30 bg-white/5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:border-red-500/70 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(255,0,0,0.18)] disabled:opacity-70 sm:h-13 sm:text-base"
          >
            {loading ? "Enviando..." : "Quero acesso VIP"}
          </button>
        </form>

        {feedback ? (
          <p className="font-['Inter'] mt-3 text-center text-sm text-zinc-300">{feedback}</p>
        ) : null}

        <p className="font-['Inter'] mt-4 text-center text-xs text-zinc-500 sm:text-sm">
          1.274 pessoas ja entraram na lista
        </p>
      </div>
    </section>
  );
}
