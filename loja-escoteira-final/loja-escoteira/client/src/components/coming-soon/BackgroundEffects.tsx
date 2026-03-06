export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(120,0,0,0.14)_0%,rgba(0,0,0,0.95)_44%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 coming-grid opacity-[0.06]" />
      <div className="absolute inset-0 coming-scanlines opacity-[0.02]" />
    </div>
  );
}
