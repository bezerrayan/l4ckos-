const previewItems = [
  "EQUIPAMENTOS EXCLUSIVOS",
  "ACESSORIOS ESCOTEIROS",
  "LANCAMENTOS LIMITADOS",
];

export default function PreviewSection() {
  return (
    <section className="coming-fade-up mx-auto mt-3 w-full max-w-5xl px-1 sm:px-0">
      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        {previewItems.map(item => (
          <article
            key={item}
            className="group relative overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/60 p-4 text-center shadow-[0_0_26px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-red-500/32 md:p-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,0,0,0.1),transparent_50%)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex min-h-[120px] items-center justify-center rounded-xl border border-white/12 bg-[linear-gradient(165deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-4 py-7">
              <p className="text-sm font-black uppercase tracking-[0.08em] text-zinc-100 md:text-[15px]">
                {item}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-zinc-400 md:text-base">
        Revelaremos tudo no lancamento.
      </p>
    </section>
  );
}
