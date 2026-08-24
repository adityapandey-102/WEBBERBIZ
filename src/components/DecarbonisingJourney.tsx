"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { decarbonising, gccCommitments } from "@/lib/data";

/**
 * A pinned journey: aerial footage runs underneath while the reader scrolls
 * through four frames of the catalogue's decarbonisation story.
 *
 * The video PLAYS rather than being scrubbed. Seeking this encode measured a
 * 55ms median / 95ms p90 — far past the ~16ms a scrubbed frame needs — so
 * hard-scrubbing stuttered. Instead the clip loops smoothly and the *grade*
 * is scrubbed: a warm smog wash lifts and a clear cool light comes up as the
 * reader descends, so the polluted-to-clean journey still tracks the scroll.
 */
const FRAMES = 4;

export default function DecarbonisingJourney({
  startFrame = 0,
}: {
  /** Technology opens on the definition — it reads as a conclusion there, not an intro. */
  startFrame?: 0 | 1;
}) {
  const track = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [frame, setFrame] = useState<number>(startFrame);

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
      gsap.set("[data-frame]", { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Scrubbed grade — the world clears as you descend.
      gsap.to("[data-smog]", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      gsap.fromTo(
        "[data-clear]",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
        },
      );

      // Which frame owns the viewport.
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(FRAMES - 1, Math.floor(self.progress * FRAMES));
          setFrame(i);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* Each frame arrives as a plane tilting up out of depth. */
  useEffect(() => {
    initGsap();
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-frame-in]",
        { opacity: 0, y: 44, rotateX: 12, z: -140, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        "[data-frame-line]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.12 },
      );
    }, el);
    return () => ctx.revert();
  }, [frame]);

  return (
    <div ref={track} className="relative h-[320vh] md:h-[400vh]">
      <section className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Footage */}
        <div className="absolute inset-0">
          <video
            ref={video}
            className="h-full w-full object-cover"
            src="/video/zero-emission/take-3.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Aerial view travelling from an industrial landscape to a clean one"
          />

          {/* Grade — smog lifts, clarity rises */}
          <div
            data-smog
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(58,52,44,0.72) 0%, rgba(70,62,52,0.5) 45%, rgba(40,36,30,0.68) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          <div
            data-clear
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(226,239,236,0.28) 0%, rgba(255,255,255,0.06) 50%, rgba(143,58,17,0.30) 100%)",
            }}
          />
          {/* keeps the type legible wherever the footage is bright */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(35,26,20,0.55) 0%, rgba(35,26,20,0.2) 40%, rgba(35,26,20,0.72) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div
          className="relative flex flex-1 items-center px-5 pb-28 pt-[calc(var(--header-h)+6vh)] sm:px-8 lg:px-12"
          style={{ perspective: 1400 }}
        >
          <div className="mx-auto w-full max-w-[1280px]">
            <div key={frame} data-frame-in style={{ transformStyle: "preserve-3d" }}>
              {frame === 0 && (
                <div className="max-w-4xl">
                  <span
                    data-frame-line
                    className="inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.28em] text-white/70"
                  >
                    <span className="h-px w-8 bg-white/50" />
                    Aligning to sustainability
                  </span>
                  <h2
                    data-frame-line
                    className="mt-8 font-heavy text-[clamp(2.6rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[0.02em] text-white"
                  >
                    DECARB
                    <span className="text-white/55">ONIZING</span>
                  </h2>
                  <p
                    data-frame-line
                    className="mt-8 max-w-xl text-[16px] leading-[1.8] text-white/75"
                  >
                    The journey a surface takes when the heat stops arriving — and what it means
                    for the energy behind it.
                  </p>
                </div>
              )}

              {frame === 1 && (
                <div className="max-w-3xl">
                  <span
                    data-frame-line
                    className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-white/60"
                  >
                    What it means
                  </span>
                  <p
                    data-frame-line
                    className="mt-8 font-display text-[clamp(1.7rem,4.4vw,3.2rem)] font-light leading-[1.3] text-white"
                  >
                    {decarbonising.definition}
                  </p>
                </div>
              )}

              {frame === 2 && (
                <div className="ml-auto max-w-3xl text-right">
                  <span
                    data-frame-line
                    className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-white/60"
                  >
                    In a business context
                  </span>
                  <p
                    data-frame-line
                    className="mt-8 font-display text-[clamp(1.7rem,4.4vw,3.2rem)] font-light leading-[1.3] text-white"
                  >
                    {decarbonising.business}
                  </p>
                </div>
              )}

              {frame === 3 && (
                <div className="max-w-4xl">
                  <div data-frame-line className="flex items-center gap-4">
                    <Image
                      src="/img/flags/uae.png"
                      alt=""
                      width={80}
                      height={80}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-white/25"
                    />
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-white/70">
                      United Arab Emirates
                    </span>
                  </div>

                  <div className="mt-7 flex items-start gap-6 sm:gap-10">
                    <span
                      data-frame-line
                      className="font-heavy text-[clamp(3.4rem,9vw,7rem)] font-semibold leading-[0.8] text-white"
                    >
                      1
                      <span className="align-super text-[0.42em]">ST</span>
                    </span>
                    <ul className="space-y-4 pt-1">
                      {gccCommitments.slice(0, 2).map((c) => (
                        <li
                          key={c.n}
                          data-frame-line
                          className="max-w-xl text-[clamp(1rem,2vw,1.35rem)] leading-[1.45] text-white"
                        >
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p
                    data-frame-line
                    className="mt-9 max-w-2xl text-[15px] leading-[1.8] text-white/70"
                  >
                    To lead on climate change the government is decarbonising its oil and gas
                    sector, ramping up renewables, and transitioning its food and transportation
                    systems.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="pointer-events-none absolute bottom-8 left-5 z-20 flex items-center gap-3 sm:left-8 lg:left-12">
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-white/70">
            {String(frame + 1).padStart(2, "0")}
          </span>
          <span className="flex gap-1.5">
            {Array.from({ length: FRAMES }).map((_, i) => (
              <span
                key={i}
                className={`h-[3px] rounded-full transition-all duration-600 ease-out-expo ${
                  i === frame ? "w-9 bg-white" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-white/45">
            {String(FRAMES).padStart(2, "0")}
          </span>
        </div>

        {/* Corner scrim + brand mark.
            `object-cover` crops the footage differently at every viewport ratio, so the
            generator's corner mark lands in a moving spot. This proportional wash covers
            that whole region and doubles as a vignette for the badge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 z-10 h-[52%] w-[46%] min-h-[300px] min-w-[380px]"
          style={{
            background:
              "radial-gradient(115% 115% at 100% 100%, rgba(35,26,20,0.94) 0%, rgba(35,26,20,0.85) 30%, rgba(35,26,20,0.5) 58%, transparent 80%)",
          }}
        />

        {/* Brand mark, bottom-right */}
        <div className="pointer-events-none absolute bottom-6 right-5 z-20 flex items-center gap-2.5 rounded-full bg-ink-strong/35 px-4 py-2.5 backdrop-blur-md sm:right-8 lg:right-12">
          <Image
            src="/img/brand/logo-webberbiz-white.png"
            alt=""
            width={310}
            height={310}
            className="h-6 w-6 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Webberbiz
            </span>
            <span className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.3em] text-white/70">
              Trading LLC
            </span>
          </span>
        </div>
      </section>
    </div>
  );
}
