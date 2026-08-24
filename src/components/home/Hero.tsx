"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "../ui";
import { SurveyButton } from "../SurveyModal";

/**
 * Full-bleed background photograph behind the type, with a light scrim so the
 * deep-teal display face keeps its contrast. The plate slowly pushes in as the
 * section scrolls, and the copy lifts away.
 */
export default function Hero() {
  const track = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = track.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set([bg.current, copy.current], { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          "[data-h-line] > span",
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.35, stagger: 0.11 },
          0.15,
        )
        .fromTo("[data-h-sub]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.7)
        .fromTo("[data-h-cta]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.85)
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
        {/* Background plate */}
        <div className="absolute inset-0 -z-10">
          <div ref={bg} className="relative h-full w-full will-change-transform">
            <Image
              src="/img/bg/dubai-aerial.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* Light scrim keeps the deep-teal type readable over the photograph */}
          <div className="absolute inset-0 bg-bg/45" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(250,250,249,0.9) 0%, rgba(250,250,249,0.62) 34%, rgba(250,250,249,0.34) 62%, rgba(250,250,249,0.82) 90%, var(--color-bg) 100%)",
            }}
          />
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-5 pb-12 pt-[calc(var(--header-h)+8vh)] sm:px-8 md:pb-16">
          <div ref={copy} className="mx-auto w-full max-w-[1280px] text-center">
            <h1 className="display mx-auto max-w-[19ch] text-[clamp(2.6rem,7.4vw,5.8rem)] leading-[0.96]">
              {["Precision in thermal", "performance."].map((line, i) => (
                <span key={line} data-h-line className="block overflow-hidden pb-[0.05em]">
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
              data-h-sub
              className="mx-auto mt-8 max-w-[60ch] text-[15.5px] leading-[1.78] text-body opacity-0"
            >
              Nanotechnology-based ceramic composite coatings that cut roof temperatures by 24°C to
              30°C on metal and concrete — reducing air-conditioning load, running cost and carbon
              across the UAE and GCC.
            </p>

            <div
              data-h-cta
              className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-500 hover:bg-ink"
              >
                See the Range
                <Arrow />
              </Link>
              <SurveyButton className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 bg-bg/80 px-7 py-3.5 text-[13.5px] font-semibold text-ink-strong backdrop-blur-sm transition-all duration-500 hover:border-ink/45 hover:bg-bg">
                Request a Survey
              </SurveyButton>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
