"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { reviews } from "@/lib/data";
import { Reveal } from "../motion";

/** Five-star row, filled to the review's rating. */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex justify-center gap-1.5" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill={i < n ? "var(--color-data-hot)" : "var(--color-line)"}
          aria-hidden
        >
          <path d="M12 2.5l2.9 6.06 6.6.9-4.8 4.6 1.2 6.56L12 17.5l-5.9 3.12 1.2-6.56-4.8-4.6 6.6-.9L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % reviews.length), 7000);
    return () => window.clearInterval(id);
  }, [held]);

  /* The swapped-in review rises through a light blur. */
  useEffect(() => {
    initGsap();
    const el = card.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-review]",
        { opacity: 0, y: 16, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
      );
    }, el);
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Centred header, as the reference lays it out */}
        <Reveal className="text-center">
          <span className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-faint">
            What clients say
          </span>
          <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04]">
            Hear from those <span className="display-italic">under the roof</span>
          </h2>
        </Reveal>

        {/* Card */}
        <Reveal delay={0.08} className="mt-14">
          <div
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            ref={card}
            className="mx-auto max-w-2xl rounded-2xl border border-line bg-bg px-8 py-12 shadow-[0_24px_70px_-40px_rgba(35,26,20,0.35)] sm:px-14"
          >
            {/* Only the active review is mounted — crossfading two blocks of prose
                left them legibly overlapping mid-transition. */}
            <div className="relative flex min-h-[248px] flex-col sm:min-h-[210px]">
              <figure
                key={reviews[active].name}
                data-review
                className="flex flex-1 flex-col items-center text-center"
              >
                <Stars n={reviews[active].stars} />

                <blockquote className="mt-6 text-[15px] italic leading-[1.85] text-body">
                  &ldquo;{reviews[active].quote}&rdquo;
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3.5 pt-8">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-muted"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <circle cx="12" cy="8" r="3.4" />
                      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-left">
                    <span className="block text-[14.5px] font-medium text-ink-strong">
                      {reviews[active].name}
                    </span>
                    <span className="block text-[12px] text-faint">{reviews[active].role}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>

        {/* Dots */}
        <Reveal delay={0.12}>
          <div className="mt-8 flex items-center justify-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show review from ${r.name}`}
                aria-current={i === active}
                className="group p-2"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ease-out-expo ${
                    i === active
                      ? "h-2 w-7 bg-ink"
                      : "h-2 w-2 bg-ink/20 group-hover:bg-ink/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
