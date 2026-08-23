"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "./ui";
import { SplitHeading } from "./motion";

/** Shared hero for every sub-page: masked image, scrubbed parallax, split title. */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = wrap.current;
    const img = imgRef.current;
    if (!el || !img || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.18 },
        { scale: 1, duration: 1.8, ease: "power3.out" },
      );
      gsap.to(img, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="grain relative overflow-hidden pt-[var(--header-h)]">
      <div className="absolute inset-0 -z-10">
        <div ref={imgRef} className="relative h-full w-full will-change-transform">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/85 via-bg/70 to-bg" />
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-28 lg:px-12">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SplitHeading
          as="h1"
          text={title}
          className="mt-7 max-w-5xl font-display text-[clamp(2.4rem,6.4vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
          start="top 95%"
        />
        <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-muted">{lede}</p>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
