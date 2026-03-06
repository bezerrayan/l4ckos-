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

function CountdownItem({ value, label, pulse = false }: { value: string; label: string; pulse?: boolean }) {
  return (
    <article className="rounded-2xl border border-white/12 bg-black/35 px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <p
        className={`font-['Inter'] text-4xl font-bold tracking-tight text-white sm:text-5xl ${
          pulse ? "coming-seconds-pulse" : ""
        }`}
      >
        {value}
      </p>
      <p className="font-['Inter'] mt-1 text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-400 sm:text-xs">
        {label}
      </p>
    </article>
  );
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
    <section className="mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <CountdownItem value={pad(countdown.days)} label="Dias" />
        <CountdownItem value={pad(countdown.hours)} label="Horas" />
        <CountdownItem value={pad(countdown.minutes)} label="Min" />
        <CountdownItem value={pad(countdown.seconds)} label="Seg" pulse />
      </div>
    </section>
  );
}
