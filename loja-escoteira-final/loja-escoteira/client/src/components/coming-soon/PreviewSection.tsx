const teaserItems = ["Equipamentos exclusivos", "Acessorios escoteiros", "Lancamentos limitados"];

export default function PreviewSection() {
  return (
    <section className="mx-auto w-full max-w-3xl border-t border-white/15 pt-6">
      <p className="text-center text-sm text-zinc-400 sm:text-base">
        {teaserItems.join(" • ")}
      </p>
      <p className="mt-4 text-center text-base text-zinc-300 sm:text-lg">Revelaremos tudo no lancamento.</p>
    </section>
  );
}
