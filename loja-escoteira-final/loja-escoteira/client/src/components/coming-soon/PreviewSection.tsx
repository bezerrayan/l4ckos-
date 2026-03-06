const teaserItems = ["Equipamentos exclusivos", "Acessorios escoteiros", "Lancamentos limitados"];

export default function PreviewSection() {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="grid gap-3 sm:grid-cols-3">
        {teaserItems.map(item => (
          <article
            key={item}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center transition hover:-translate-y-0.5 hover:border-red-500/30 hover:bg-white/[0.04]"
          >
            <p className="font-['Inter'] text-sm font-medium tracking-[0.03em] text-zinc-200 sm:text-base">{item}</p>
          </article>
        ))}
      </div>

      <p className="font-['Inter'] mt-5 text-center text-sm text-zinc-400 sm:text-base">
        Revelaremos tudo no lancamento.
      </p>
    </section>
  );
}
