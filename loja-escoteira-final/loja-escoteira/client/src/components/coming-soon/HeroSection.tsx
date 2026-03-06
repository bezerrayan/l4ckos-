export default function HeroSection() {
  return (
    <section className="coming-fade-up w-full text-center">
      <div className="space-y-2">
        <p className="text-5xl font-black tracking-wide text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.1)] sm:text-6xl md:text-7xl">
          L4ckos
        </p>
        <p className="text-[11px] tracking-[0.42em] text-zinc-300 sm:text-xs md:text-sm">LOJA ESCOTEIRA</p>
      </div>

      <h1 className="mx-auto mt-7 max-w-4xl text-balance text-4xl font-black uppercase leading-[0.98] text-white sm:text-5xl md:mt-8 md:text-7xl">
        <span className="block">A nova loja escoteira</span>
        <span className="block">esta chegando</span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-zinc-200 sm:text-lg md:text-2xl">
        Equipamentos - Aventura - Tecnologia
      </p>
    </section>
  );
}
