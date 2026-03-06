import { useEffect, useMemo, useState } from "react";

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function getCountdown(targetTimestamp: number): CountdownState {
  const diff = Math.max(0, targetTimestamp - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const targetTimestamp = useMemo(() => new Date("2026-06-30T12:00:00-03:00").getTime(), []);
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdown(targetTimestamp));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(targetTimestamp));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetTimestamp]);

  return (
    <section className="coming-fade-up mx-auto mt-2 w-full max-w-5xl rounded-2xl border border-white/14 bg-black/58 px-3 py-4 backdrop-blur-md md:px-5 md:py-5">
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        <div className="rounded-xl border border-white/14 bg-zinc-950/92 px-2 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:py-3.5">
          <span className="coming-glow-red block text-5xl font-black tracking-[0.04em] text-white md:text-7xl">
            {pad(countdown.days)}
          </span>
        </div>
        <div className="rounded-xl border border-white/14 bg-zinc-950/92 px-2 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:py-3.5">
          <span className="coming-glow-red block text-5xl font-black tracking-[0.04em] text-white md:text-7xl">
            {pad(countdown.hours)}
          </span>
        </div>
        <div className="rounded-xl border border-white/14 bg-zinc-950/92 px-2 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:py-3.5">
          <span className="coming-glow-red block text-5xl font-black tracking-[0.04em] text-white md:text-7xl">
            {pad(countdown.minutes)}
          </span>
        </div>
        <div className="rounded-xl border border-white/14 bg-zinc-950/92 px-2 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:py-3.5">
          <span className="coming-glow-red coming-seconds-pulse block text-5xl font-black tracking-[0.04em] text-white md:text-7xl">
            {pad(countdown.seconds)}
          </span>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 md:text-xs">
        <span>Dias</span>
        <span>Horas</span>
        <span>Min</span>
        <span>Seg</span>
      </div>
    </section>
  );
}
