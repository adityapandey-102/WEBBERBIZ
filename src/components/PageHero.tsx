"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "./ui";
import { LineReveal, Reveal } from "./motion";

/**
 * Sub-page hero: the same full-bleed background treatment as the home hero,
 * so every page opens the same way.
 */
export default function PageHero({
  eyebrow,
  line1,
  line2,
  lede,
  image,
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  lede: string;
  image: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = wrap.current;
    const img = bg.current;
    if (!el || !img || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
      );
      gsap.to(img, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div ref={bg} className="relative h-full w-full will-change-transform">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        {/* Light scrim keeps the deep-teal display face readable over the photograph */}
        <div className="absolute inset-0 bg-bg/48" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,249,0.88) 0%, rgba(250,250,249,0.55) 40%, rgba(250,250,249,0.3) 68%, var(--color-bg) 100%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 pb-24 pt-[calc(var(--header-h)+9vh)] text-center sm:px-8 md:pb-28 lg:px-12">
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
    </div>
  );
}
