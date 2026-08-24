"use client";

import { useState, type ReactNode } from "react";

/**
 * A continuously translating row. The track is duplicated so the loop is
 * seamless, and it holds still while a pointer is over it — including touch,
 * where there is no hover, so a tap-and-hold parks the row too.
 */
export default function ScrollingRow({
  items,
  duration = 26,
  gap = "gap-5",
  className = "",
}: {
  items: ReactNode[];
  /** Seconds for one full pass — lower is faster. */
  duration?: number;
  gap?: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className={`marquee-track flex w-max ${gap}`}
        style={{
          ["--dur" as string]: `${duration}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className={`flex shrink-0 ${gap}`} aria-hidden={copy === 1}>
            {items.map((node, i) => (
              <div key={`${copy}-${i}`} className="shrink-0">
                {node}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Edge fades keep the row feeling continuous rather than cut off */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent sm:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent sm:w-32"
      />
    </div>
  );
}
