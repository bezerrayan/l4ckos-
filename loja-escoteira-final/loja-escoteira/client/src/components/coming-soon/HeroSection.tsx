export default function HeroSection() {
  return (
    <section className="coming-fade-up w-full text-center">
      <div className="space-y-2">
        <p className="text-4xl font-black tracking-wide text-white sm:text-5xl md:text-6xl">L4ckos</p>
        <p className="text-[11px] tracking-[0.38em] text-zinc-300 sm:text-xs md:text-sm">LOJA ESCOTEIRA</p>
      </div>

      <h1 className="coming-glitch mx-auto mt-7 max-w-4xl text-balance text-3xl font-black uppercase leading-[1.02] text-white sm:text-4xl md:mt-8 md:text-6xl">
        <span className="block">A nova loja escoteira</span>
        <span className="block">esta chegando</span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-zinc-200 sm:text-base md:text-xl">
        Equipamentos - Aventura - Tecnologia
      </p>
    </section>
  );
}
