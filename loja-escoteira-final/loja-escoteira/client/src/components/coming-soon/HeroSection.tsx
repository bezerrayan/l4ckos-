export default function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-3xl text-center">
      <div className="space-y-2">
        <p className="font-['Inter'] text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          L4ckos
        </p>
        <p className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.38em] text-zinc-400 sm:text-xs">
          Loja Escoteira
        </p>
      </div>

      <p className="font-['Inter'] mt-8 text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-6xl">
        A nova loja escoteira esta chegando.
      </p>

      <p className="font-['Inter'] mx-auto mt-4 max-w-2xl text-balance text-sm font-normal leading-relaxed text-zinc-300 sm:text-base md:text-lg">
        Equipamentos, aventura e tecnologia em uma experiencia nova.
      </p>
    </section>
  );
}
