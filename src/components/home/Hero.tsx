"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { heroMetrics } from "@/lib/data";
import { Counter } from "../motion";
import { Arrow } from "../ui";

const TITLE = ["Precision", "in thermal", "performance."];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll("[data-anim]"), { opacity: 1, y: 0, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-line] > span",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.25, stagger: 0.1 },
        0.15,
      )
        .fromTo("[data-hero-eyebrow]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.1)
        .fromTo("[data-hero-lede]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1 }, 0.6)
        .fromTo("[data-hero-cta]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1 }, 0.75)
        .fromTo(
          "[data-hero-metric]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          0.9,
        )
        .fromTo(
          imgRef.current,
          { scale: 1.24, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "power3.out" },
          0,
        );

      // Scrubbed parallax + fade as the hero leaves.
      gsap.to(imgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: { trigger: el, start: "40% top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[var(--header-h)]"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div ref={imgRef} className="relative h-full w-full will-change-transform">
          <Image
            src="/img/bg/dubai-aerial.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/55 to-bg" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 105%, var(--color-accent), transparent 72%)",
          }}
        />
      </div>

      <div
        data-hero-content
        className="mx-auto w-full max-w-[1320px] px-5 pb-14 sm:px-8 lg:px-12"
      >
        <span
          data-hero-eyebrow
          data-anim
          className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent opacity-0"
        >
          <span className="h-px w-6 bg-accent/60" />
          Aligning to sustainability · Strategy of GCC
        </span>

        <h1 className="mt-7 font-display text-[clamp(2.7rem,8.6vw,7.4rem)] font-semibold leading-[0.93] tracking-[-0.035em]">
          {TITLE.map((line, i) => (
            <span key={line} data-hero-line data-anim className="block overflow-hidden">
              <span className="block will-change-transform">
                {i === TITLE.length - 1 ? (
                  <span className="bg-gradient-to-r from-accent-hot to-accent bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-9 flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <p
            data-hero-lede
            data-anim
            className="max-w-xl text-[16.5px] leading-relaxed text-muted opacity-0"
          >
            Nanotechnology-based ceramic composite coatings that cut roof temperatures by 24°C to
            30°C on metal and concrete — reducing air conditioning load, running cost and carbon
            across the UAE and GCC.
          </p>

          <div data-hero-cta data-anim className="flex flex-wrap items-center gap-3 opacity-0">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-hot hover:shadow-[0_0_44px_-8px_var(--color-accent)]"
            >
              See the range
              <Arrow />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/60 hover:bg-accent/10 hover:text-accent-hot"
            >
              Request a survey
              <Arrow />
            </Link>
          </div>
        </div>

        {/* Metric strip */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {heroMetrics.map((m) => (
            <div
              key={m.label}
              data-hero-metric
              data-anim
              className="bg-bg/80 px-5 py-6 opacity-0 backdrop-blur-sm transition-colors duration-500 hover:bg-surface/90"
            >
              <div className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-2 text-[13px] leading-snug text-muted">{m.label}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {m.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint lg:flex lg:right-12">
        Scroll
        <span className="relative block h-10 w-px bg-ink/15">
          <span className="absolute left-0 top-0 h-4 w-px scroll-cue bg-accent" />
        </span>
      </div>
    </section>
  );
}
