const teaserItems = ["Equipamentos exclusivos", "Acessorios escoteiros", "Lancamentos limitados"];

export default function PreviewSection() {
  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-zinc-300/90 bg-white/55 shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
        <div className="grid sm:grid-cols-3">
          {teaserItems.map((item, index) => {
            const withDivider = index < teaserItems.length - 1;
            return (
              <article
                key={item}
                className={`flex items-center justify-center px-4 py-5 text-center font-sans text-sm font-medium text-zinc-700 sm:text-base ${withDivider ? "border-b border-zinc-300/70 sm:border-b-0 sm:border-r" : ""}`}
              >
                <span>{item}</span>
              </article>
            );
          })}
        </div>
      </div>

      <p className="text-center font-sans text-[15px] text-zinc-600">Revelaremos tudo no lancamento.</p>
      <p className="text-center font-sans text-sm text-zinc-500 sm:text-base">&copy; 2024 L4ckos. Todos os direitos reservados.</p>
    </section>
  );
}
