const teaserItems = ["Equipamentos exclusivos", "Acessorios escoteiros", "Lancamentos limitados"];

export default function PreviewSection() {
  return (
    <section className="mx-auto w-full max-w-4xl border-t border-white/12 pt-7">
      <p className="text-center text-sm text-zinc-400 sm:text-base">{teaserItems.join(" • ")}</p>
      <p className="mt-4 text-center text-base text-zinc-300 sm:text-lg">Revelaremos tudo no lancamento.</p>
    </section>
  );
}
