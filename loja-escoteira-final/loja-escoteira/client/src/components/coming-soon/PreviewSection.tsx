const previewItems = [
  "EQUIPAMENTOS EXCLUSIVOS",
  "ACESSORIOS ESCOTEIROS",
  "LANCAMENTOS LIMITADOS",
];

export default function PreviewSection() {
  return (
    <section className="coming-fade-up mx-auto mt-10 w-full max-w-5xl">
      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        {previewItems.map(item => (
          <article
            key={item}
            className="rounded-2xl border border-white/15 bg-zinc-950/45 p-5 text-center backdrop-blur-md transition hover:border-red-500/60"
          >
            <div className="h-full rounded-xl border border-white/15 bg-white/5 px-4 py-7 blur-[0.4px]">
              <p className="text-sm font-black uppercase tracking-wider text-zinc-100 md:text-base">
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
