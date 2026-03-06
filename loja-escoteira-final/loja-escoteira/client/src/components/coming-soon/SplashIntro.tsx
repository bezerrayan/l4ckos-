import { useEffect, useState } from "react";

type SplashIntroProps = {
  onComplete: () => void;
};

export default function SplashIntro({ onComplete }: SplashIntroProps) {
  const [phase, setPhase] = useState<"l4k" | "l4ckos" | "out">("l4k");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("l4ckos"), 1500);
    const t2 = window.setTimeout(() => setPhase("out"), 2800);
    const t3 = window.setTimeout(() => onComplete(), 3200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(210,18,18,0.26)_0%,rgba(90,0,0,0.14)_25%,rgba(0,0,0,0)_62%)]" />

        <div className="coming-parallax-slow absolute h-[42vmin] w-[42vmin] rounded-full border border-red-600/22" />
        <div className="absolute h-[28vmin] w-[28vmin] rounded-full border border-red-500/24" />

        <div className="relative z-10 text-center">
          <p
            className={`font-sans text-[clamp(3rem,10vw,7rem)] font-extrabold tracking-tight text-white transition-all duration-700 ${
              phase === "l4k" ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            L4K
          </p>

          <p
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[clamp(2.7rem,9vw,6.4rem)] font-extrabold tracking-tight text-white transition-all duration-700 ${
              phase === "l4ckos" ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            L4CKOS
          </p>
        </div>
      </div>
    </div>
  );
}
