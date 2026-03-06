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
    return <main className="min-h-screen bg-black" />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {showIntro ? <SplashIntro onComplete={handleIntroComplete} /> : null}

      <BackgroundEffects />

      <div
        className={`relative z-10 mx-auto flex min-h-screen w-full items-center justify-center px-5 py-12 transition-opacity duration-700 sm:px-8 md:px-12 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-5xl space-y-11 sm:space-y-12 md:space-y-14">
          <section className="coming-fade-up">
            <HeroSection />
          </section>

          <section className="coming-slide-up">
            <CountdownTimer />
          </section>

          <section className="coming-slide-up" style={{ animationDelay: "120ms" }}>
            <WaitlistForm />
          </section>

          <section className="coming-slide-up" style={{ animationDelay: "220ms" }}>
            <PreviewSection />
          </section>
        </div>
      </div>
    </main>
  );
}
