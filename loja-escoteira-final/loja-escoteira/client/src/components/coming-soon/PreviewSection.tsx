const previewItems = [
  "EQUIPAMENTOS EXCLUSIVOS",
  "ACESSORIOS ESCOTEIROS",
  "LANCAMENTOS LIMITADOS",
];

export default function PreviewSection() {
  return (
    <section className="coming-fade-up mx-auto mt-9 w-full max-w-5xl px-1 sm:mt-10 sm:px-0">
      <div className="grid gap-3 md:grid-cols-3 md:gap-5">
        {previewItems.map(item => (
          <article
            key={item}
            className="rounded-2xl border border-white/15 bg-zinc-950/45 p-4 text-center shadow-[0_0_24px_rgba(255,255,255,0.05)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-red-500/60 md:p-5"
          >
            <div className="flex min-h-[112px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-7 [filter:blur(0.45px)]">
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
