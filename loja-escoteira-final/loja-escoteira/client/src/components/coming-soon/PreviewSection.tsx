const previewItems = [
  "EQUIPAMENTOS EXCLUSIVOS",
  "ACESSORIOS ESCOTEIROS",
  "LANCAMENTOS LIMITADOS",
];

export default function PreviewSection() {
  return (
    <section className="coming-fade-up mx-auto mt-8 w-full max-w-5xl px-1 sm:mt-9 sm:px-0">
      <div className="grid gap-3 md:grid-cols-3 md:gap-5">
        {previewItems.map(item => (
          <article
            key={item}
            className="rounded-2xl border border-white/12 bg-zinc-950/55 p-4 text-center shadow-[0_0_20px_rgba(255,255,255,0.03)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-red-500/50 md:p-5"
          >
            <div className="flex min-h-[104px] items-center justify-center rounded-xl border border-white/12 bg-white/5 px-4 py-7 [filter:blur(0.35px)]">
              <p className="text-sm font-black uppercase tracking-wider text-zinc-100 md:text-[15px]">
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
