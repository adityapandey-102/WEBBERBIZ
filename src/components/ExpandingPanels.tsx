"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Panel = {
  kicker: string;
  title: string;
  body: string;
  image: string;
};

/**
 * Expanding-panel carousel: the active panel opens wide, goes dark and carries
 * the photograph; the rest collapse to slim cards showing only their numeral
 * and label. Advances on its own until the reader takes over.
 */
export default function ExpandingPanels({
  panels,
  interval = 6000,
}: {
  panels: Panel[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(
      () => setActive((v) => (v + 1) % panels.length),
      interval,
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [held, interval, panels.length]);

  return (
    <div
      className="flex flex-col gap-4 lg:flex-row lg:gap-5"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      {panels.map((p, i) => {
        const isActive = i === active;
        return (
          <button
            key={p.title}
            type="button"
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-expanded={isActive}
            className={`group relative flex flex-col overflow-hidden rounded-[22px] border text-left transition-all duration-[900ms] ease-out-expo ${
              isActive
                ? "border-transparent bg-ink-strong lg:flex-[3.1]"
                : "border-line bg-surface hover:bg-surface-2 lg:flex-[1]"
            }`}
            style={{ minHeight: isActive ? 520 : 520 }}
          >
            {/* Photograph — mounted only while open, so no ghost during the fade */}
            {isActive && (
              <div className="absolute inset-0">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-strong/92 via-ink-strong/45 to-ink-strong/80" />
              </div>
            )}

            {/* Top row: kicker + numeral */}
            <div className="relative flex items-start justify-between gap-4 px-7 pt-7 sm:px-8">
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.24em] transition-colors duration-700 ${
                  isActive ? "text-white/70" : "text-faint"
                } ${isActive ? "opacity-100" : "opacity-0 lg:opacity-0"}`}
              >
                {p.kicker}
              </span>
              <span
                className={`font-display text-[2.6rem] leading-none transition-colors duration-700 ${
                  isActive ? "text-white" : "text-ink/12"
                }`}
              >
                .{String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Open panel: headline sits under the kicker */}
            <div
              className={`relative px-7 pt-3 transition-all duration-700 sm:px-8 ${
                isActive ? "opacity-100" : "pointer-events-none h-0 overflow-hidden opacity-0"
              }`}
            >
              <h3 className="max-w-[18ch] text-[1.35rem] font-normal leading-snug text-white sm:text-[1.55rem]">
                {p.title}
              </h3>
            </div>

            {/* Foot */}
            <div className="absolute inset-x-0 bottom-0 px-7 pb-7 sm:px-8">
              {isActive ? (
                <p className="max-w-[46ch] text-[13.5px] leading-[1.75] text-white/85">{p.body}</p>
              ) : (
                <>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
                    {p.kicker}
                  </span>
                  <span className="mt-3 block max-w-[16ch] text-[1.05rem] leading-snug text-ink-strong">
                    {p.title}
                  </span>
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
