const previewItems = [
  "EQUIPAMENTOS EXCLUSIVOS",
  "ACESSORIOS ESCOTEIROS",
  "LANCAMENTOS LIMITADOS",
];

export default function PreviewSection() {
  return (
    <section className="coming-fade-up mx-auto mt-2 w-full max-w-5xl px-1 sm:px-0">
      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        {previewItems.map(item => (
          <article
            key={item}
            className="group relative overflow-hidden rounded-2xl border border-white/14 bg-zinc-950/62 p-4 text-center shadow-[0_0_24px_rgba(255,255,255,0.05)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-red-500/55 md:p-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(255,0,0,0.18),transparent_45%)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex min-h-[120px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-7 [filter:blur(0.25px)]">
              <p className="text-sm font-black uppercase tracking-[0.08em] text-zinc-100 md:text-base">
                {item}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-zinc-300 md:text-base">
        Revelaremos tudo no lancamento.
      </p>
    </section>
  );
}
