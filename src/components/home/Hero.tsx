"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { heroMetrics } from "@/lib/data";
import { Arrow } from "../ui";

/**
 * A tall scroll track with a sticky stage: the headline holds, the architecture
 * plate grows from a plate into a full-bleed image, and a cloud wipe hands over
 * to the page body.
 */
export default function Hero() {
  const track = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = track.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set([plate.current, copy.current], { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      // Entrance — runs at every width.
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
          plate.current,
          { scale: 0.82, opacity: 0, yPercent: 8 },
          { scale: 1, opacity: 1, yPercent: 0, duration: 1.7, ease: "power3.out" },
          0.3,
        );

      const mm = gsap.matchMedia();

      // Desktop: the plate grows to full bleed while the copy lifts away, and the
      // metric bar rides in on the same scrub.
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 },
          })
          .to(plate.current, { scale: 1.46, yPercent: -8, ease: "none" }, 0)
          .to(copy.current, { yPercent: -34, opacity: 0, ease: "none" }, 0)
          .fromTo(
            "[data-h-metrics]",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, ease: "none" },
            0.15,
          );
      });

      // Mobile: there is no sticky track to scrub, so simply reveal the metrics.
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          "[data-h-metrics]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    /* Sticky stage only where there is height for it; on phones the hero flows normally
       so the copy, the plate and the metric bar all get room. */
    <div ref={track} className="relative h-auto md:h-[210vh]">
      <section className="flex flex-col overflow-hidden md:sticky md:top-0 md:h-screen">
        {/* Pale sky ground */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, #eef3f5 0%, #f4f6f5 38%, var(--color-bg) 78%)",
          }}
        />

        <div className="relative flex h-full flex-col justify-start pt-[calc(var(--header-h)+3vh)]">
          {/* Copy */}
          <div ref={copy} className="relative z-20 px-5 text-center sm:px-8">
            <h1 className="display mx-auto max-w-[19ch] text-[clamp(2.6rem,7.2vw,5.6rem)] leading-[0.96]">
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
              className="mx-auto mt-7 max-w-[62ch] text-[15.5px] leading-[1.75] text-body opacity-0"
            >
              Nanotechnology-based ceramic composite coatings that cut roof temperatures by 24°C to
              30°C on metal and concrete — reducing air-conditioning load, running cost and carbon
              across the UAE and GCC.
            </p>

            <div
              data-h-cta
              className="mt-9 flex flex-wrap items-center justify-center gap-3 opacity-0"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-500 hover:bg-ink"
              >
                See the Range
                <Arrow />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-bg px-7 py-3.5 text-[13.5px] font-semibold text-ink-strong transition-all duration-500 hover:border-ink/40 hover:bg-surface"
              >
                Request a Survey
                <Arrow />
              </Link>
            </div>
          </div>

          {/* Architecture plate */}
          <div className="relative z-10 mt-10 h-[46vh] md:mt-auto md:h-auto md:flex-1">
            <div
              ref={plate}
              className="absolute inset-x-0 bottom-0 top-0 origin-bottom will-change-transform md:top-[6vh]"
            >
              <div className="relative mx-auto h-full w-[min(1180px,92vw)] overflow-hidden rounded-t-[14px]">
                <Image
                  src="/img/projects/villas.webp"
                  alt="Villas finished with Webberbiz thermal coating"
                  fill
                  priority
                  sizes="(max-width: 1180px) 92vw, 1180px"
                  className="object-cover object-[center_62%]"
                />
              </div>
            </div>
          </div>

          {/* Metric bar */}
          <div
            data-h-metrics
            className="relative z-20 mx-auto mb-10 w-[min(1120px,92vw)] opacity-0 md:mb-[7vh]"
          >
            {/* Light glass so the figures stay legible over sky or over architecture. */}
            <div className="grid grid-cols-2 divide-x divide-y divide-line/70 overflow-hidden rounded-2xl border border-white/70 bg-white/78 backdrop-blur-xl sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-5">
              {heroMetrics.map((m) => (
                <div key={m.label} className="px-4 py-5 text-center sm:px-5">
                  <div className="font-display text-[26px] font-semibold tracking-tight text-ink">
                    {m.display}
                  </div>
                  <div className="mt-1.5 text-[9.5px] font-medium uppercase tracking-[0.18em] text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cloud-wipe" />
      </section>
    </div>
  );
}
