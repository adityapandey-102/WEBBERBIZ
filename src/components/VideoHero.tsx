"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "./ui";
import { SurveyButton } from "./SurveyModal";

/**
 * The home hero's structure, backed by video instead of a still: a tall scroll
 * track with a sticky stage, the footage full-bleed behind the type, and the
 * same scrubbed push-in / lift-away on scroll.
 */
export default function VideoHero({
  eyebrow,
  line1,
  line2,
  lede,
  src,
  primary,
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  lede: string;
  src: string;
  primary?: { label: string; href: string };
}) {
  const track = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initGsap();
    const el = track.current;
    if (!el) return;

    const v = video.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }

    if (prefersReducedMotion()) {
      v?.pause();
      gsap.set([bg.current, copy.current], { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          "[data-v-line] > span",
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.35, stagger: 0.11 },
          0.15,
        )
        .fromTo("[data-v-sub]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.7)
        .fromTo("[data-v-cta]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.85)
        .fromTo(
          bg.current,
          { scale: 1.14, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.2, ease: "power3.out" },
          0,
        );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 },
          })
          .to(bg.current, { scale: 1.16, ease: "none" }, 0)
          .to(copy.current, { yPercent: -28, opacity: 0, ease: "none" }, 0);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={track} className="relative h-auto md:h-[190vh]">
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden md:sticky md:top-0 md:h-screen">
        <div className="absolute inset-0 -z-10">
          <div ref={bg} className="relative h-full w-full will-change-transform">
            <video
              ref={video}
              className="h-full w-full object-cover"
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Nanoscale particle structure"
            />
          </div>

          {/* Dark scrim: the footage reads as lit particles on black, and the
              type sits light on top. The last stop resolves to the page ground
              so the hero hands off to the section below without a hard seam. */}
          <div className="absolute inset-0 bg-[#120c08]/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,7,5,0.82) 0%, rgba(10,7,5,0.5) 30%, rgba(10,7,5,0.42) 58%, rgba(18,12,8,0.72) 86%, var(--color-bg) 100%)",
            }}
          />
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-5 pb-12 pt-[calc(var(--header-h)+8vh)] sm:px-8 md:pb-16">
          <div ref={copy} className="mx-auto w-full max-w-[1280px] text-center">
            <span className="eyebrow on-dark">{eyebrow}</span>

            <h1 className="display on-dark mx-auto mt-7 max-w-[19ch] text-[clamp(2.6rem,7.4vw,5.8rem)] leading-[0.96]">
              {(line2 ? [line1, line2] : [line1]).map((line, i) => (
                <span key={line} data-v-line className="block overflow-hidden pb-[0.05em]">
                  <span
                    className={`block will-change-transform ${i === 1 ? "display-italic" : ""}`}
                    style={{ opacity: 0 }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-v-sub
              className="mx-auto mt-8 max-w-[60ch] text-[15.5px] leading-[1.78] text-[#e3d8cf] opacity-0"
            >
              {lede}
            </p>

            <div
              data-v-cta
              className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0"
            >
              {primary && (
                <Link
                  href={primary.href}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent-soft px-7 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-500 hover:bg-ink"
                >
                  {primary.label}
                  <Arrow />
                </Link>
              )}
              <SurveyButton className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[13.5px] font-semibold text-white backdrop-blur-sm transition-all duration-500 hover:border-white/60 hover:bg-white/20">
                Request a Survey
              </SurveyButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
