"use client";

import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "./ui";
import { LineReveal, Reveal } from "./motion";

/**
 * Hero backed by video rather than a still. The clip is held in a rounded plate
 * with a hairline frame so it reads as a deliberate window, not a washed-out
 * background — no scrim over the footage itself, so it stays sharp.
 */
export default function VideoHero({
  eyebrow,
  line1,
  line2,
  lede,
  src,
  poster,
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  lede: string;
  src: string;
  poster?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initGsap();
    const el = wrap.current;
    const pl = plate.current;
    if (!el || !pl) return;

    // Autoplay policies require this combination; play() may still reject.
    const v = video.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }

    if (prefersReducedMotion()) {
      v?.pause();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pl,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.25 },
      );
      gsap.to(pl, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative overflow-hidden bg-bg">
      {/* a soft ground so the plate has something to sit on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: "linear-gradient(to bottom, #eef3f5 0%, var(--color-bg) 88%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-14 pt-[calc(var(--header-h)+8vh)] text-center sm:px-8 lg:px-12">
        <Eyebrow>{eyebrow}</Eyebrow>

        <LineReveal
          as="h1"
          lines={line2 ? [line1, line2] : [line1]}
          className="display mx-auto mt-7 max-w-[20ch] text-[clamp(2.4rem,6.2vw,4.8rem)] leading-[0.99]"
          italicFrom={1}
          start="top 95%"
        />

        <Reveal>
          <p className="mx-auto mt-8 max-w-[60ch] text-[15.5px] leading-[1.78] text-body">{lede}</p>
        </Reveal>
      </div>

      {/* Video plate — full colour, no overlay, so nothing is washed out */}
      <div className="relative mx-auto w-[min(1180px,92vw)] pb-20">
        <div
          ref={plate}
          className="relative overflow-hidden rounded-[26px] border border-line bg-surface shadow-[0_40px_110px_-45px_rgba(15,26,19,0.45)]"
        >
          <div className="relative aspect-[16/9]">
            <video
              ref={video}
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Webberbiz coating application"
            />
          </div>
        </div>

        {/* grounding glow under the plate */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-2 left-1/2 h-16 w-[78%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: "rgba(15,26,19,0.12)" }}
        />
      </div>
    </div>
  );
}
