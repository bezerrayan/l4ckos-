export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#fafafa_0%,#e8e8eb_42%,#d8d8de_100%)]" />

      <div className="absolute inset-0">
        <div className="absolute left-[-8%] top-[14%] h-[34%] w-[44%] rounded-[24px] bg-zinc-500/8 blur-[34px]" />
        <div className="absolute right-[-10%] top-[16%] h-[36%] w-[46%] rounded-[24px] bg-zinc-600/10 blur-[36px]" />
        <div className="absolute left-[-6%] bottom-[14%] h-[30%] w-[46%] rounded-[24px] bg-zinc-600/10 blur-[32px]" />
        <div className="absolute right-[-10%] bottom-[12%] h-[32%] w-[45%] rounded-[24px] bg-zinc-600/10 blur-[34px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.2)_36%,rgba(255,255,255,0.58)_100%)]" />
      <div className="absolute inset-0 coming-grid opacity-[0.018]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(239,68,68,0.08)_0%,rgba(239,68,68,0.02)_26%,rgba(255,255,255,0)_56%)]" />
    </div>
  );
}
