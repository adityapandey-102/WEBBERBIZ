"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "../ui";
import { SplitHeading } from "../motion";

const layers = [
  {
    n: "01",
    title: "Substrate intelligence",
    body: "Metal and concrete fail differently under heat. Every specification starts by reading the substrate — its condition, its crack map and the temperature band the site actually sits in.",
    image: "/img/bg/steel-structure.webp",
  },
  {
    n: "02",
    title: "Surface preparation",
    body: "Good surface preparation is mandatory. SurfaKlean lifts micro dust and loose mortar through its detergents without damaging reinforcement, so the coating bonds to sound material.",
    image: "/img/work/roller-closeup.webp",
  },
  {
    n: "03",
    title: "Nano composite",
    body: "A single-walled nano-tube multiplied a hundred thousand times equals one strand of human hair. At that scale the ceramic composite packs into a continuous, unbroken film.",
    image: "/img/bg/nano-spheres.webp",
  },
  {
    n: "04",
    title: "Thermal barrier",
    body: "The coating blankets the surface and keeps the temperature away to the degree of the delta found on the surface — reflecting first, then insulating what remains.",
    image: "/img/proof/fluke-compare.webp",
  },
  {
    n: "05",
    title: "Verified delta",
    body: "Surface and ambient temperatures are recorded after the first coat and again after the second, so the reduction handed over is a measurement, not a claim.",
    image: "/img/proof/test-boxes.webp",
  },
];

export default function Layers() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-layer]");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          },
        );
        // Drive the sticky visual from whichever row owns the viewport centre.
        ScrollTriggerCreate(row, i, setActive);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1320px]">
        <Eyebrow>How Webberbiz reads a surface</Eyebrow>
        <SplitHeading
          text="Five layers between the sun and the room below."
          className="mt-7 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* Rows */}
          <ol className="order-2 lg:order-1">
            {layers.map((l, i) => (
              <li
                key={l.n}
                data-layer
                data-index={i}
                className={`group border-t border-line py-8 transition-colors duration-500 last:border-b ${
                  active === i ? "border-accent/30" : ""
                }`}
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 ${
                      active === i ? "text-accent" : "text-faint"
                    }`}
                  >
                    {l.n}
                  </span>
                  <h3
                    className={`font-display text-xl font-medium tracking-tight transition-colors duration-500 sm:text-2xl ${
                      active === i ? "text-accent" : "text-ink"
                    }`}
                  >
                    {l.title}
                  </h3>
                </div>
                <p className="mt-3.5 max-w-xl pl-10 text-[15px] leading-relaxed text-muted">
                  {l.body}
                </p>

                {/* mobile image */}
                <div className="relative mt-6 ml-10 aspect-[16/10] overflow-hidden rounded-lg lg:hidden">
                  <Image
                    src={l.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 90vw, 0px"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>

          {/* Sticky visual */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-[calc(var(--header-h)+48px)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line">
                {layers.map((l, i) => (
                  <Image
                    key={l.n}
                    src={l.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 44vw, 0px"
                    className="object-cover transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: `scale(${active === i ? 1 : 1.08})`,
                    }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80">
                    {layers[active].title}
                  </span>
                  <span className="font-mono text-[11px] text-accent">{layers[active].n}</span>
                </div>
              </div>

              {/* progress */}
              <div className="mt-5 flex gap-1.5">
                {layers.map((l, i) => (
                  <span
                    key={l.n}
                    className={`h-0.5 flex-1 rounded-full transition-all duration-600 ${
                      active === i ? "bg-accent" : "bg-ink/12"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small helper kept outside the component body for readability. */
function ScrollTriggerCreate(
  row: HTMLElement,
  i: number,
  setActive: (n: number) => void,
) {
  ScrollTrigger.create({
    trigger: row,
    start: "top 60%",
    end: "bottom 60%",
    onToggle: (self) => self.isActive && setActive(i),
  });
}
