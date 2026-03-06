export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.9)_40%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,0,0,0.16)_0%,rgba(255,0,0,0.06)_26%,rgba(0,0,0,0)_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.45)_48%,rgba(0,0,0,0.82)_100%)]" />
      <div className="absolute inset-0 coming-grid opacity-[0.045]" />
      <div className="absolute inset-0 coming-scanlines opacity-[0.015]" />
    </div>
  );
}
