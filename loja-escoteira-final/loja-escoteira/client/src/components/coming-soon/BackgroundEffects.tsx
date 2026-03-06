export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,0,0,0.12)_0%,rgba(0,0,0,0.93)_48%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.6)_35%,rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 coming-grid coming-parallax-slow opacity-20" />
      <div className="absolute inset-0 coming-grid coming-parallax-fast opacity-10" />
      <div className="absolute inset-0 coming-scanlines opacity-12" />
      <div className="absolute inset-0 coming-particles opacity-55" />

      <div className="absolute left-1/2 top-[40%] h-[72vw] w-[72vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-600/20 coming-radar" />
      <div className="absolute left-1/2 top-[40%] h-[52vw] w-[52vw] max-h-[390px] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/28 coming-radar [animation-delay:900ms]" />
      <div className="absolute left-1/2 top-[40%] h-[30vw] w-[30vw] max-h-[220px] max-w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/35 coming-radar [animation-delay:1400ms]" />
      <div className="absolute left-1/2 top-[40%] h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/85 shadow-[0_0_12px_rgba(255,0,0,0.7)]" />
    </div>
  );
}
