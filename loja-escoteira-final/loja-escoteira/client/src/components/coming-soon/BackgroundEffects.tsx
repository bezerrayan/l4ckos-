export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#fafafa_0%,#ececee_40%,#dddde2_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.14)_35%,rgba(30,30,32,0.16)_100%)]" />
      <div className="absolute inset-0 coming-grid opacity-[0.025]" />
      <div className="absolute inset-0 coming-scanlines opacity-[0.02]" />
      <div className="absolute inset-0 coming-particles opacity-[0.2]" />

      <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.2)_42%,rgba(255,255,255,0)_72%)]" />
      <div className="coming-parallax-slow absolute left-1/2 top-1/2 h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-800/5" />
      <div className="coming-parallax-fast absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-800/5" />
    </div>
  );
}
