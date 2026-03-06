export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,0,0,0.18)_0%,rgba(0,0,0,0.92)_52%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 coming-grid coming-parallax-slow opacity-35" />
      <div className="absolute inset-0 coming-grid coming-parallax-fast opacity-15" />
      <div className="absolute inset-0 coming-scanlines opacity-25" />
      <div className="absolute inset-0 coming-particles opacity-75" />

      <div className="absolute left-1/2 top-1/2 h-[72vw] w-[72vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-600/30 coming-radar" />
      <div className="absolute left-1/2 top-1/2 h-[52vw] w-[52vw] max-h-[390px] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/40 coming-radar [animation-delay:900ms]" />
      <div className="absolute left-1/2 top-1/2 h-[30vw] w-[30vw] max-h-[220px] max-w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/45 coming-radar [animation-delay:1400ms]" />
      <div className="absolute left-1/2 top-1/2 h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_18px_rgba(255,0,0,0.9)]" />
    </div>
  );
}
