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
    <section className="coming-fade-up mx-auto mt-9 w-full max-w-4xl rounded-2xl border border-white/20 bg-black/45 px-4 py-5 backdrop-blur-md md:mt-10 md:px-8 md:py-7">
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="rounded-xl border border-white/20 bg-black/60 px-2 py-3 text-center">
          <span className="coming-glow-red block text-3xl font-black tracking-wider text-white md:text-6xl">
            {pad(countdown.days)}
          </span>
        </div>
        <div className="rounded-xl border border-white/20 bg-black/60 px-2 py-3 text-center">
          <span className="coming-glow-red block text-3xl font-black tracking-wider text-white md:text-6xl">
            {pad(countdown.hours)}
          </span>
        </div>
        <div className="rounded-xl border border-white/20 bg-black/60 px-2 py-3 text-center">
          <span className="coming-glow-red block text-3xl font-black tracking-wider text-white md:text-6xl">
            {pad(countdown.minutes)}
          </span>
        </div>
        <div className="rounded-xl border border-white/20 bg-black/60 px-2 py-3 text-center">
          <span className="coming-glow-red coming-seconds-pulse block text-3xl font-black tracking-wider text-white md:text-6xl">
            {pad(countdown.seconds)}
          </span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-400 md:text-xs">
        <span>Dias</span>
        <span>Horas</span>
        <span>Min</span>
        <span>Seg</span>
      </div>
    </section>
  );
}
