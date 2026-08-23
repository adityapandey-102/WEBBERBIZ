"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % testimonials.length), 9000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-9 w-9 text-accent/40"
        fill="currentColor"
      >
        <path d="M9.6 4.8C6 6.6 3.6 10.2 3.6 14.4c0 3 1.8 4.8 4.2 4.8 2.2 0 3.9-1.7 3.9-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.8 2-4 4.1-5.1l-1.7-1.8Zm10.2 0c-3.6 1.8-6 5.4-6 9.6 0 3 1.8 4.8 4.2 4.8 2.2 0 3.9-1.7 3.9-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.8 2-4 4.1-5.1l-1.7-1.8Z" />
      </svg>

      <div className="relative mt-8 min-h-[280px] sm:min-h-[240px] md:min-h-[210px]">
        {testimonials.map((t, idx) => (
          <blockquote
            key={t.name}
            aria-hidden={idx !== i}
            className="absolute inset-0 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: idx === i ? 1 : 0,
              transform: `translateY(${idx === i ? 0 : 20}px)`,
              pointerEvents: idx === i ? "auto" : "none",
            }}
          >
            <p className="max-w-4xl font-display text-lg font-light leading-[1.6] tracking-tight text-ink sm:text-xl md:text-[22px]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-7 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span>
                <span className="block text-sm font-medium text-ink">{t.name}</span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {t.role}
                </span>
              </span>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3">
        {testimonials.map((t, idx) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show testimonial from ${t.name}`}
            aria-current={idx === i}
            className="group relative h-8 w-8"
          >
            <span
              className={`absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                idx === i
                  ? "h-2.5 w-2.5 bg-accent"
                  : "h-1.5 w-1.5 bg-ink/25 group-hover:bg-ink/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
