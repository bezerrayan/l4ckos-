import { useCallback, useEffect, useState } from "react";
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
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full items-center justify-center px-4 py-8 transition-opacity duration-700 sm:px-6 sm:py-10 md:px-8 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-4xl">
          <section className="mx-auto w-full rounded-[34px] border border-zinc-200/80 bg-white/44 px-4 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:px-8 sm:py-11">
            <section className="coming-fade-up mx-auto w-full">
              <HeroSection />
            </section>

            <section className="coming-slide-up mx-auto mt-8 w-full" style={{ animationDelay: "60ms" }}>
              <CountdownTimer />
            </section>

            <section className="coming-slide-up mx-auto mt-8 w-full" style={{ animationDelay: "120ms" }}>
              <WaitlistForm />
            </section>
          </section>

          <section className="coming-slide-up mx-auto mt-7 w-full sm:mt-9" style={{ animationDelay: "220ms" }}>
            <PreviewSection />
          </section>
        </div>
      </div>
    </main>
  );
}
