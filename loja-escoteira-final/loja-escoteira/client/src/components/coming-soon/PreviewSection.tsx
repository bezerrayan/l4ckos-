const teaserItems = ["Equipamentos exclusivos", "Acessorios escoteiros", "Lancamentos limitados"];

export default function PreviewSection() {
  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {teaserItems.map(item => (
          <article
            key={item}
            className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(28,28,28,0.56),rgba(9,9,9,0.42))] p-4 text-center text-sm font-semibold text-zinc-200 shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[linear-gradient(145deg,rgba(40,40,40,0.58),rgba(11,11,11,0.45))] sm:text-base"
          >
            {item}
          </article>
        ))}
      </div>

      <p className="mt-5 text-center text-base text-zinc-300 sm:text-lg">Revelaremos tudo no lancamento.</p>
    </section>
  );
}
