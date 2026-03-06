import { useCallback, useEffect, useState } from "react";
import { BellRing, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import BackgroundEffects from "../components/coming-soon/BackgroundEffects";
import CountdownTimer from "../components/coming-soon/CountdownTimer";
import HeroSection from "../components/coming-soon/HeroSection";
import PreviewSection from "../components/coming-soon/PreviewSection";
import SplashIntro from "../components/coming-soon/SplashIntro";
import WaitlistForm from "../components/coming-soon/WaitlistForm";

const INTRO_KEY = "l4ckos_intro_seen";

export default function ComingSoon() {
  const [isReady, setIsReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    document.title = "L4ckos - Em Breve";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", "A nova loja escoteira esta chegando.");
  }, []);

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
      setShowIntro(!seen);
    } catch {
      setShowIntro(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // ignore sessionStorage errors
    }
    setShowIntro(false);
  }, []);

  if (!isReady) {
    return <main className="min-h-screen bg-[#efefef]" />;
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#efefef] text-zinc-900">
      {showIntro ? <SplashIntro onComplete={handleIntroComplete} /> : null}

      <BackgroundEffects />

      <div
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full items-stretch justify-center px-3 py-6 transition-opacity duration-700 sm:px-5 sm:py-8 md:px-8 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[min(1920px,98vw)] flex-col justify-center">
          <section className="grid gap-6 xl:min-h-[70vh] lg:grid-cols-12">
            <section className="lg:col-span-7">
              <section className="coming-fade-up mx-auto w-full rounded-3xl border border-zinc-200/85 bg-white/58 px-4 py-6 shadow-[0_16px_46px_rgba(0,0,0,0.09)] backdrop-blur-sm sm:px-8 sm:py-9">
                <HeroSection />
              </section>

              <section className="coming-slide-up mx-auto mt-5 w-full rounded-3xl border border-zinc-200/85 bg-white/60 p-4 shadow-[0_16px_42px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6" style={{ animationDelay: "60ms" }}>
                <CountdownTimer />
                <section className="mt-6">
                  <WaitlistForm />
                </section>
              </section>
            </section>

            <section className="coming-slide-up lg:col-span-5" style={{ animationDelay: "120ms" }}>
              <div className="h-full min-h-[420px] rounded-3xl border border-zinc-200/85 bg-white/60 p-4 shadow-[0_16px_42px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-7">
                <h2 className="font-sans text-xl font-semibold text-zinc-800 sm:text-3xl">Por que entrar agora</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-600 sm:text-lg">
                  Voce recebe prioridade no lancamento e condicoes especiais antes do publico geral.
                </p>

                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/72 px-3 py-3">
                    <BellRing size={18} className="text-zinc-500" />
                    <p className="font-sans text-sm font-medium text-zinc-700 sm:text-base">Aviso imediato por email</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/72 px-3 py-3">
                    <ShieldCheck size={18} className="text-zinc-500" />
                    <p className="font-sans text-sm font-medium text-zinc-700 sm:text-base">Acesso antecipado exclusivo</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/72 px-3 py-3">
                    <Truck size={18} className="text-zinc-500" />
                    <p className="font-sans text-sm font-medium text-zinc-700 sm:text-base">Novas linhas outdoor e escoteiras</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-zinc-200 bg-white/72 px-4 py-3">
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-zinc-500">Previsao</p>
                    <p className="mt-1 font-sans text-base font-semibold text-zinc-800 sm:text-xl">Lancamento em 2026</p>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-white/72 px-4 py-3">
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-zinc-500">Beneficio de estreia</p>
                    <p className="mt-1 font-sans text-base font-semibold text-zinc-800 sm:text-xl">Cupom e condicao especial</p>
                  </div>
                </div>

                <p className="mt-4 inline-flex items-center gap-2 font-sans text-sm text-zinc-600">
                  <CheckCircle2 size={16} className="text-zinc-500" />
                  Sem spam. Apenas comunicados importantes.
                </p>
              </div>
            </section>
          </section>

          <section className="coming-slide-up mx-auto mt-6 w-full" style={{ animationDelay: "220ms" }}>
            <PreviewSection />
          </section>

          <section className="coming-slide-up mt-5 w-full" style={{ animationDelay: "280ms" }}>
            <div className="rounded-2xl border border-zinc-200/85 bg-white/54 px-4 py-4 text-center shadow-[0_12px_28px_rgba(0,0,0,0.07)] backdrop-blur-sm sm:px-8">
              <p className="font-sans text-sm text-zinc-600 sm:text-lg">
                Quer prioridade real? Entre na lista para receber o link assim que a loja abrir.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
