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
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-8 text-white md:py-12">
      <BackgroundEffects />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex min-h-[92vh] flex-col items-center justify-center">
          <HeroSection />
          <CountdownTimer />
          <WaitlistForm />
          <PreviewSection />
        </div>
      </div>
    </main>
  );
}
