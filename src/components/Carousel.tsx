"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; label: string; caption?: string };

/**
 * A continuously-moving marquee of image cards that pauses on hover, plus
 * arrows and drag for manual control. The track is duplicated so the loop is
 * seamless; the clone is hidden from assistive tech.
 */
export default function Carousel({
  slides,
  speed = 46,
  contain = false,
}: {
  slides: Slide[];
  /** Seconds for one full pass. */
  speed?: number;
  /** Contain rather than cover — for cut-out renders on a light card. */
  contain?: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const nudge = useCallback((dir: 1 | -1) => {
    const el = viewport.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 520), behavior: "smooth" });
  }, []);

  // Auto-advance by scrolling the viewport; wraps at the halfway point so the
  // duplicated track makes the seam invisible.
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    const pxPerMs = el.scrollWidth / 2 / (speed * 1000);

    const step = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused && !drag.current.active) {
        el.scrollLeft += pxPerMs * dt;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused, speed, slides.length]);

  const onDown = (e: React.PointerEvent) => {
    const el = viewport.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = viewport.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    const el = viewport.current;
    drag.current.active = false;
    el?.releasePointerCapture?.(e.pointerId);
  };

  const run = [...slides, ...slides];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={viewport}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: "grab", touchAction: "pan-y" }}
      >
        {run.map((s, i) => (
          <figure
            key={`${s.src}-${i}`}
            aria-hidden={i >= slides.length}
            className="group w-[76vw] shrink-0 sm:w-[46vw] lg:w-[30vw] xl:w-[26rem]"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-line ${
                contain ? "bg-surface" : ""
              }`}
            >
              <Image
                src={s.src}
                alt={s.label}
                fill
                draggable={false}
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 26rem"
                className={`select-none transition-transform duration-1000 ease-out-expo group-hover:scale-[1.05] ${
                  contain ? "object-contain p-8" : "object-cover"
                }`}
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-[15px] text-ink-strong">{s.label}</span>
              {s.caption && (
                <span className="shrink-0 text-[10.5px] font-medium uppercase tracking-[0.16em] text-faint">
                  {s.caption}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent"
      />

      {/* Controls */}
      <div className="mt-8 flex items-center gap-3">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => nudge(dir)}
            aria-label={dir === -1 ? "Previous" : "Next"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-strong transition-colors duration-400 hover:border-ink/40 hover:bg-surface"
          >
            <svg
              viewBox="0 0 20 16"
              className={`h-3 w-4 ${dir === -1 ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M1 8h16M12 3l5 5-5 5" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-faint">
          Drag, or hover to pause
        </span>
      </div>
    </div>
  );
}
