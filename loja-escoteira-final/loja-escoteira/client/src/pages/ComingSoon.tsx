import { useEffect } from "react";
import BackgroundEffects from "../components/coming-soon/BackgroundEffects";
import CountdownTimer from "../components/coming-soon/CountdownTimer";
import HeroSection from "../components/coming-soon/HeroSection";
import PreviewSection from "../components/coming-soon/PreviewSection";
import WaitlistForm from "../components/coming-soon/WaitlistForm";

export default function ComingSoon() {
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <BackgroundEffects />

      <div className="relative z-10 mx-auto flex min-h-screen w-full items-center justify-center px-5 py-12 sm:px-8 md:px-12">
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
