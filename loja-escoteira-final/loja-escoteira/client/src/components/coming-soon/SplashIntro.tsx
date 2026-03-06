import { useEffect, useState } from "react";

type SplashIntroProps = {
  onComplete: () => void;
};

export default function SplashIntro({ onComplete }: SplashIntroProps) {
  const [phase, setPhase] = useState<"l4k" | "l4ckos" | "out">("l4k");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("l4ckos"), 1450);
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040405_0%,#060607_40%,#020203_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(205,26,26,0.2)_0%,rgba(90,8,8,0.12)_24%,rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 coming-grid opacity-[0.03]" />

        <div className="coming-radar absolute h-[36vmin] w-[36vmin] rounded-full border border-red-500/20" />

        <div className="relative z-10 text-center">
          <p
            className={`text-[clamp(3rem,10vw,7rem)] font-extrabold leading-none tracking-tight text-white transition-all duration-700 ${
              phase === "l4k" ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
            }`}
          >
            L4K
          </p>

          <p
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(2.8rem,9vw,6.3rem)] font-extrabold leading-none tracking-tight text-white transition-all duration-700 ${
              phase === "l4ckos" ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
            }`}
          >
            L4CKOS
          </p>

          <span
            className={`mx-auto mt-4 block h-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 transition-all duration-700 ${
              phase === "l4k" ? "w-16 opacity-90" : "w-24 opacity-90"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
