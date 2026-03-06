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
    <section className="mx-auto w-full max-w-2xl font-mono">
      <div className="space-y-4">
        <p className="text-center text-3xl font-semibold uppercase tracking-[0.15em] text-white sm:text-4xl">
          Acesso antecipado
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Digite seu email"
            className="h-14 w-full border border-white/80 bg-transparent px-4 text-2xl text-white outline-none placeholder:text-zinc-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full bg-transparent text-2xl font-semibold uppercase tracking-[0.08em] text-white transition hover:text-red-400 disabled:opacity-70"
          >
            {loading ? "[ ENVIANDO ]" : "[ QUERO ACESSO ANTECIPADO ]"}
          </button>
        </form>

        {feedback ? (
          <p className="text-center text-xl text-zinc-300">{feedback}</p>
        ) : null}

        <p className="text-center text-2xl text-white">
          1.274 pessoas ja entraram na lista
        </p>

        <div>
          <a
            href="https://instagram.com/l4ckos"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center text-2xl text-white transition hover:text-red-400"
          >
            Seguir novidades
          </a>
        </div>
      </div>
    </section>
  );
}
