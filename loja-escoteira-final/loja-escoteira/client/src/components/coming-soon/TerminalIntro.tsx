import { useEffect, useMemo, useState } from "react";

const LINES = [
  "> Inicializando sistema L4ckos...",
  "> Carregando modulos...",
  "> Preparando lancamento...",
];

export default function TerminalIntro() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const renderedLines = useMemo(() => {
    return LINES.map((line, index) => {
      if (index < lineIndex) return line;
      if (index > lineIndex) return "";
      return line.slice(0, charIndex);
    });
  }, [lineIndex, charIndex]);

  useEffect(() => {
    if (lineIndex >= LINES.length) return;

    const currentLine = LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const timer = window.setTimeout(() => setCharIndex(prev => prev + 1), 22);
      return () => window.clearTimeout(timer);
    }

    const nextLineTimer = window.setTimeout(() => {
      setLineIndex(prev => prev + 1);
      setCharIndex(0);
    }, 280);

    return () => window.clearTimeout(nextLineTimer);
  }, [lineIndex, charIndex]);

  return (
    <section className="coming-fade-up mx-auto mt-7 w-full max-w-3xl">
      <div className="rounded-xl border border-white/20 bg-black/70 px-4 py-4 font-mono text-sm text-zinc-200 shadow-[0_0_30px_rgba(255,0,0,0.07)] md:text-base">
        {renderedLines.map((line, index) => (
          <p key={index} className="leading-7">
            <span className="text-red-500">{line.startsWith(">") ? ">" : ""}</span>
            {line.startsWith(">") ? line.slice(1) : line}
            {index === lineIndex && lineIndex < LINES.length ? <span className="coming-terminal-cursor">_</span> : null}
          </p>
        ))}
      </div>
    </section>
  );
}
