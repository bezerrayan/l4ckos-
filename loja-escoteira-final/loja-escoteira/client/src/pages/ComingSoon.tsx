import { useEffect } from "react";
import EmailCapture from "../components/coming-soon/EmailCapture";

export default function ComingSoon() {
  useEffect(() => {
    document.title = "L4ckos — Em Breve";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", "A nova loja escoteira esta chegando.");
  }, []);

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-3xl flex-col items-center justify-center gap-8 text-center">
        <div>
          <p className="text-4xl font-black tracking-wide">L4ckos</p>
          <p className="mt-1 text-xs tracking-[0.35em] text-zinc-300">LOJA ESCOTEIRA</p>
        </div>

        <h1 className="text-3xl font-black uppercase md:text-5xl">
          Estamos preparando algo grande
        </h1>
        <p className="max-w-2xl text-zinc-300">
          A nova loja escoteira esta quase pronta. Equipamentos, aventura e tecnologia em um so lugar.
        </p>

        <EmailCapture />
      </div>
    </main>
  );
}
