import { useEffect } from "react";
import BackgroundEffects from "../components/coming-soon/BackgroundEffects";
import CountdownTimer from "../components/coming-soon/CountdownTimer";
import HeroSection from "../components/coming-soon/HeroSection";
import PreviewSection from "../components/coming-soon/PreviewSection";
import TerminalIntro from "../components/coming-soon/TerminalIntro";
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="w-full max-w-6xl">
          <section className="mx-auto w-full max-w-5xl rounded-[30px] border border-white/10 bg-zinc-950/52 p-5 shadow-[0_0_90px_rgba(0,0,0,0.72)] backdrop-blur-xl sm:p-7 md:p-10">
            <div className="space-y-7 md:space-y-9">
              <HeroSection />
              <TerminalIntro />
              <CountdownTimer />
              <WaitlistForm />
              <PreviewSection />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
