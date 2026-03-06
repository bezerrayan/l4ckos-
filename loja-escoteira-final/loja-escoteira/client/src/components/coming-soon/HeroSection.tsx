export default function HeroSection() {
  return (
    <section className="text-center">
      <div className="mx-auto inline-flex flex-col items-center">
        <p className="text-[clamp(2.8rem,7vw,5rem)] font-extrabold leading-none tracking-tight text-white">L4ckos</p>
        <span className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-90" />
        <p className="mt-2 text-[10px] uppercase tracking-[0.34em] text-zinc-400 sm:text-xs">Loja Escoteira</p>
      </div>

      <h1 className="mx-auto mt-8 max-w-4xl text-balance text-[clamp(2.15rem,6vw,4.45rem)] font-semibold leading-[1.05] tracking-tight text-white">
        A nova loja escoteira esta chegando
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-balance text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
        Equipamentos, aventura e tecnologia em uma experiencia premium para o seu movimento.
      </p>
    </section>
  );
}
