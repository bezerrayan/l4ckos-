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
    <article className="text-center">
      <p className={`text-5xl font-extrabold tracking-tight text-white sm:text-6xl ${pulse ? "coming-seconds-pulse" : ""}`}>
        {value}
      </p>
      <p className="mt-1.5 text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-[11px]">{label}</p>
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
    <section className="mx-auto w-full max-w-4xl">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 md:gap-6">
        <CountdownItem value={pad(countdown.days)} label="Dias" />
        <CountdownItem value={pad(countdown.hours)} label="Horas" />
        <CountdownItem value={pad(countdown.minutes)} label="Min" />
        <CountdownItem value={pad(countdown.seconds)} label="Seg" pulse />
      </div>
    </section>
  );
}
