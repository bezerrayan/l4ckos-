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

function CountdownItem({
  value,
  label,
  pulse = false,
  withDivider = false,
}: {
  value: string;
  label: string;
  pulse?: boolean;
  withDivider?: boolean;
}) {
  return (
    <article
      className={`relative flex flex-col items-center justify-center px-2 py-3 text-center sm:py-4 ${withDivider ? "after:absolute after:right-0 after:top-3 after:h-[calc(100%-24px)] after:w-px after:bg-zinc-300/70" : ""}`}
    >
      <p className={`font-sans text-[clamp(1.9rem,5.5vw,2.95rem)] font-bold leading-none tracking-tight text-zinc-800 ${pulse ? "coming-seconds-pulse" : ""}`}>
        {value}
      </p>
      <p className="mt-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]">{label}</p>
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
      <div className="overflow-hidden rounded-xl border border-zinc-300/90 bg-white/60 shadow-[0_8px_20px_rgba(0,0,0,0.07)] backdrop-blur-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          <CountdownItem value={pad(countdown.days)} label="Dias" withDivider />
          <CountdownItem value={pad(countdown.hours)} label="Horas" withDivider />
          <CountdownItem value={pad(countdown.minutes)} label="Min" withDivider />
          <CountdownItem value={pad(countdown.seconds)} label="Seg" pulse />
        </div>
      </div>
    </section>
  );
}
