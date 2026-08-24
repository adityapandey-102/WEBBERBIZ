"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { lenses } from "@/lib/data";
import { SectionHead } from "../ui";

/**
 * The four lenses, presented as a slide: one is open at a time, filling the
 * stage with its numeral, while the rest wait as a rail. Advances on its own.
 */
export default function Lenses() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || prefersReducedMotion()) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % lenses.length), 5200);
    return () => window.clearInterval(id);
  }, [held]);

  /* Entrance */
  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-rail]",
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 74%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  /* Slide change */
  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-numeral]",
        { opacity: 0, scale: 0.82, filter: "blur(14px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" },
      );
      gsap.fromTo(
        "[data-lens-line]",
        { opacity: 0, y: 22, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.07,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [active]);

  const lens = lenses[active];

  return (
    <div
      ref={root}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="The Webberbiz framework"
          line1="Four lenses."
          line2="One specification."
          body="Every surface we quote is put through the same four questions. If it fails one of them, we say so rather than sell a coating that will not hold."
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Stage */}
          <div className="relative min-h-[320px] overflow-hidden rounded-[26px] border border-line bg-surface px-8 py-12 sm:px-14 sm:py-16">
            {/* oversized numeral, bled off the corner */}
            <span
              key={`n-${active}`}
              data-numeral
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-10 font-display text-[13rem] font-light leading-none text-ink/[0.07] sm:-top-16 sm:text-[19rem]"
            >
              {lens.n}
            </span>

            <div key={`c-${active}`} className="relative max-w-2xl">
              <span
                data-lens-line
                className="block text-[10px] font-medium uppercase tracking-[0.26em] text-faint"
              >
                Lens {lens.n} of IV
              </span>
              <h3
                data-lens-line
                className="display mt-6 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02]"
              >
                {lens.title}
              </h3>
              <p
                data-lens-line
                className="mt-6 max-w-xl text-[15.5px] leading-[1.8] text-body"
              >
                {lens.body}
              </p>
            </div>

            {/* progress */}
            <div className="absolute inset-x-8 bottom-8 flex gap-1.5 sm:inset-x-14">
              {lenses.map((l, i) => (
                <span
                  key={l.n}
                  className={`h-[3px] flex-1 rounded-full transition-all duration-700 ease-out-expo ${
                    i === active ? "bg-ink" : "bg-ink/12"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Rail */}
          <ul className="flex gap-3 overflow-x-auto pb-2 lg:w-[280px] lg:flex-col lg:overflow-visible lg:pb-0">
            {lenses.map((l, i) => (
              <li key={l.n} data-rail className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  className={`flex h-full w-[220px] items-baseline gap-4 rounded-2xl border px-6 py-5 text-left transition-all duration-500 ease-out-expo lg:w-full ${
                    i === active
                      ? "border-ink/25 bg-bg shadow-[0_16px_44px_-22px_rgba(15,26,19,0.4)]"
                      : "border-line bg-transparent hover:border-ink/20 hover:bg-bg"
                  }`}
                >
                  <span
                    className={`font-display text-lg font-light transition-colors duration-500 ${
                      i === active ? "text-ink" : "text-faint"
                    }`}
                  >
                    {l.n}
                  </span>
                  <span
                    className={`text-[15px] leading-snug transition-colors duration-500 ${
                      i === active ? "text-ink-strong" : "text-body"
                    }`}
                  >
                    {l.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
