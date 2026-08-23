"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "./ui";
import { LineReveal, Reveal } from "./motion";

/** Sub-page hero: centred display type over a pale ground, with a scaling plate. */
export default function PageHero({
  eyebrow,
  line1,
  line2,
  lede,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  lede: string;
  image: string;
  imageAlt?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = wrap.current;
    const img = plate.current;
    if (!el || !img || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(img, { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" });
      gsap.to(img, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative overflow-hidden pt-[var(--header-h)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, #eef3f5 0%, var(--color-bg) 62%)" }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-5 pb-16 pt-16 text-center sm:px-8 md:pb-20 md:pt-20 lg:px-12">
        <Eyebrow>{eyebrow}</Eyebrow>

        <LineReveal
          as="h1"
          lines={line2 ? [line1, line2] : [line1]}
          className="display mx-auto mt-7 max-w-[20ch] text-[clamp(2.4rem,6.2vw,4.8rem)] leading-[0.99]"
          italicFrom={1}
          start="top 95%"
        />

        <Reveal>
          <p className="mx-auto mt-8 max-w-[62ch] text-[15.5px] leading-[1.78] text-body">{lede}</p>
        </Reveal>
      </div>

      {/* Plate */}
      <div className="mx-auto w-[min(1180px,92vw)] px-0">
        <div ref={plate} className="relative aspect-[21/9] overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1180px) 92vw, 1180px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
