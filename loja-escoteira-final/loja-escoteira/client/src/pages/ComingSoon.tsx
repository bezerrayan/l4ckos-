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

      <div className="relative z-10 mx-auto flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-4xl">
          <div className="coming-fade-up space-y-10 rounded-3xl bg-gradient-to-b from-zinc-950/80 to-black/75 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.55)] sm:p-8 md:space-y-12 md:p-12">
            <HeroSection />
            <CountdownTimer />
            <WaitlistForm />
            <PreviewSection />
          </div>
        </div>
      </div>
    </main>
  );
}
