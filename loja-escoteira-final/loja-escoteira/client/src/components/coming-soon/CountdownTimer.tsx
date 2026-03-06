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
    <article className="rounded-2xl border border-white/12 bg-[linear-gradient(145deg,rgba(34,34,34,0.56),rgba(10,10,10,0.4))] px-2 py-4 text-center shadow-[0_14px_34px_rgba(0,0,0,0.26)] backdrop-blur-sm sm:px-3 sm:py-5">
      <p className={`text-[clamp(2.2rem,6vw,3.7rem)] font-bold leading-none tracking-tight text-white ${pulse ? "coming-seconds-pulse" : ""}`}>
        {value}
      </p>
      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-400 sm:text-[11px]">{label}</p>
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
    <section>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5">
        <CountdownItem value={pad(countdown.days)} label="Dias" />
        <CountdownItem value={pad(countdown.hours)} label="Horas" />
        <CountdownItem value={pad(countdown.minutes)} label="Min" />
        <CountdownItem value={pad(countdown.seconds)} label="Seg" pulse />
      </div>
    </section>
  );
}
