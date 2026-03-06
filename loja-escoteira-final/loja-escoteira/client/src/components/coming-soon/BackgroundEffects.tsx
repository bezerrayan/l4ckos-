export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050506_0%,#040406_45%,#020203_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(185,24,24,0.22)_0%,rgba(120,7,7,0.10)_26%,rgba(0,0,0,0)_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0.48)_48%,rgba(0,0,0,0.88)_100%)]" />

      <div className="coming-parallax-slow absolute left-1/2 top-[42%] h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-red-700/15" />
      <div className="coming-radar absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-red-500/15" />

      <div className="absolute inset-0 coming-grid opacity-[0.045]" />
      <div className="absolute inset-0 coming-particles opacity-[0.24]" />
      <div className="absolute inset-0 coming-scanlines opacity-[0.018]" />
    </div>
  );
}
