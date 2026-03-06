const teaserItems = ["Equipamentos exclusivos", "Acessorios escoteiros", "Lancamentos limitados"];

export default function PreviewSection() {
  return (
    <section className="mx-auto w-full max-w-3xl border-t border-white/70 pt-7 font-mono">
      <p className="text-center text-2xl text-white sm:text-3xl">
        {teaserItems.join(" • ")}
      </p>
      <p className="mt-8 text-center text-2xl text-white sm:text-3xl">Revelaremos tudo no lancamento.</p>
    </section>
  );
}
