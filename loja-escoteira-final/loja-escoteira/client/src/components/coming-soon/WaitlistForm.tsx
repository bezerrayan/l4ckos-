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
      <div className="space-y-4 rounded-2xl bg-zinc-950/35 p-5 sm:p-6">
        <p className="text-center text-lg font-semibold uppercase tracking-[0.16em] text-white sm:text-xl">
          Acesso antecipado
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Digite seu email"
            className="h-13 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/65 focus:ring-2 focus:ring-red-500/20 sm:h-14 sm:text-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-13 w-full rounded-xl bg-white px-4 text-sm font-semibold uppercase tracking-[0.09em] text-black transition hover:bg-red-500 hover:text-white disabled:opacity-70 sm:h-14 sm:text-base"
          >
            {loading ? "Enviando..." : "Quero acesso antecipado"}
          </button>
        </form>

        {feedback ? (
          <p className="text-center text-sm text-zinc-300 sm:text-base">{feedback}</p>
        ) : null}

        <p className="text-center text-sm text-zinc-400 sm:text-base">
          1.274 pessoas ja entraram na lista
        </p>

        <div>
          <a
            href="https://instagram.com/l4ckos"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-transparent text-sm font-medium text-zinc-300 transition hover:border-white/40 hover:text-white"
          >
            Seguir novidades
          </a>
        </div>
      </div>
    </section>
  );
}
