export default function HeroSection() {
  return (
    <section className="text-center text-zinc-900">
      <div className="mx-auto inline-flex flex-col items-center">
        <p className="font-sans text-[clamp(2.3rem,6vw,4.1rem)] font-extrabold leading-none tracking-tight text-zinc-800">L4ckos</p>
        <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.34em] text-zinc-600 sm:text-xs">Loja Escoteira</p>
      </div>

      <h1 className="mx-auto mt-8 max-w-4xl text-balance font-sans text-[clamp(2rem,5.2vw,3.8rem)] font-bold leading-[1.05] tracking-tight text-zinc-800">
        A nova loja escoteira
        <br />
        esta chegando
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-balance font-sans text-base leading-relaxed text-zinc-600 sm:text-lg">
        Equipamentos premium para aventura, tecnologia e movimento.
      </p>
    </section>
  );
}
