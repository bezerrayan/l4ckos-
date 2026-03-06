export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050506_0%,#060608_42%,#050506_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(180,24,24,0.2)_0%,rgba(90,14,14,0.12)_22%,rgba(0,0,0,0)_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.92)_100%)]" />

      <div className="coming-parallax-slow absolute left-1/2 top-[38%] h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-red-700/10" />
      <div className="coming-radar absolute left-1/2 top-[38%] h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-red-500/10" />

      <div className="absolute inset-0 coming-grid opacity-[0.04]" />
      <div className="absolute inset-0 coming-particles opacity-[0.2]" />
      <div className="absolute inset-0 coming-scanlines opacity-[0.016]" />
    </div>
  );
}
