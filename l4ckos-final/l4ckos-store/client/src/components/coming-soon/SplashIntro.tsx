import { useEffect, useState } from "react";

type SplashIntroProps = {
  onComplete: () => void;
};

type IntroPhase = "boot" | "l4k" | "l4kHold" | "l4ckos" | "l4ckosHold" | "out";

export default function SplashIntro({ onComplete }: SplashIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>("boot");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("l4k"), 400);
    const t2 = window.setTimeout(() => setPhase("l4kHold"), 1200);
    const t3 = window.setTimeout(() => setPhase("l4ckos"), 2000);
    const t4 = window.setTimeout(() => setPhase("l4ckosHold"), 2600);
    const t5 = window.setTimeout(() => setPhase("out"), 3200);
    const t6 = window.setTimeout(() => onComplete(), 3600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
      window.clearTimeout(t6);
    };
  }, [onComplete]);

  const showL4K = phase === "l4k" || phase === "l4kHold";
  const showL4ckos = phase === "l4ckos" || phase === "l4ckosHold";

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-[#0f0f12] transition-opacity duration-700 ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#121216_0%,#0e0e12_45%,#09090b_100%)]" />

        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.12)_28%,rgba(239,68,68,0.08)_46%,rgba(0,0,0,0)_66%)] transition-opacity duration-700 ${
            showL4K || showL4ckos ? "opacity-100" : "opacity-30"
          }`}
        />

        <div className="absolute inset-0 coming-grid opacity-[0.02]" />

        <div className="coming-radar absolute h-[40vmin] w-[40vmin] rounded-full border border-zinc-200/20" />

        <div className="relative z-10 text-center">
          <p
            className={`text-[clamp(3rem,10vw,7rem)] font-extrabold leading-none tracking-tight text-white transition-all duration-700 ${
              showL4K ? "scale-100 opacity-100 blur-0" : "scale-[0.88] opacity-0 blur-[6px]"
            }`}
            style={{
              textShadow: showL4K ? "0 0 28px rgba(255, 255, 255, 0.26), 0 0 20px rgba(239, 68, 68, 0.18)" : "none",
              transform: phase === "l4kHold" ? "scale(1.02)" : undefined,
            }}
          >
            L4K
          </p>

          <p
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(2.8rem,9vw,6.3rem)] font-extrabold leading-none tracking-tight text-white transition-all duration-700 ${
              showL4ckos ? "scale-100 opacity-100 blur-0" : "scale-[0.9] opacity-0 blur-[6px]"
            }`}
            style={{
              textShadow: showL4ckos ? "0 0 30px rgba(255, 255, 255, 0.3), 0 0 24px rgba(239, 68, 68, 0.16)" : "none",
              transform: phase === "l4ckosHold" ? "translate(-50%, -50%) scale(1.02)" : undefined,
            }}
          >
            L4CKOS
          </p>

          <span
            className={`mx-auto mt-4 block h-1 rounded-full bg-gradient-to-r from-zinc-200/0 via-zinc-100 to-zinc-200/0 transition-all duration-700 ${
              showL4K ? "w-16 opacity-90" : showL4ckos ? "w-24 opacity-90" : "w-10 opacity-20"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
