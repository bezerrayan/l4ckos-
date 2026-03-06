export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,0,0,0.08)_0%,rgba(0,0,0,0.92)_46%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.75)_45%,rgba(0,0,0,0.97)_100%)]" />

      <div className="absolute inset-0 coming-grid coming-parallax-slow opacity-[0.11]" />
      <div className="absolute inset-0 coming-grid coming-parallax-fast opacity-[0.04]" />
      <div className="absolute inset-0 coming-scanlines opacity-[0.05]" />
      <div className="absolute inset-0 coming-particles opacity-[0.26]" />

      <div className="absolute left-1/2 top-[30%] h-[78vw] w-[78vw] max-h-[760px] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-600/9 coming-radar" />
      <div className="absolute left-1/2 top-[30%] h-[56vw] w-[56vw] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/12 coming-radar [animation-delay:850ms]" />
      <div className="absolute left-1/2 top-[30%] h-[34vw] w-[34vw] max-h-[300px] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/16 coming-radar [animation-delay:1400ms]" />
      <div className="absolute left-1/2 top-[30%] h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/55 shadow-[0_0_10px_rgba(255,0,0,0.35)]" />
    </div>
  );
}
