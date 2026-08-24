"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { SectionHead } from "../ui";

/**
 * Slide 15 of the catalogue — "IMPACT of HIGH Temperature" — rebuilt as a live
 * diagram. The four quadrants keep the source's reading order and content; the
 * colours are drawn from this site's own palette rather than the deck's.
 */
type Quadrant = {
  n: string;
  key: string;
  title: string;
  items: string[];
  emphasis?: string;
  image: string;
  colour: string;
  /** Corner the text block occupies. */
  corner: "tl" | "tr" | "bl" | "br";
  /** Diagonal label rotation inside the diamond. */
  labelRotate: number;
};

const QUADRANTS: Quadrant[] = [
  {
    n: "1/4",
    key: "humans",
    title: "Humans",
    items: ["Lower productivity / yield loss", "Compromised quality", "Fatigue & lack of wellness", "Accidents"],
    image: "/img/bg/industrial-worker.webp",
    colour: "#C97B3C",
    corner: "tl",
    labelRotate: -45,
  },
  {
    n: "2/4",
    key: "infrastructure",
    title: "Infrastructure",
    items: ["High maintenance", "Weakened structure", "High replacement costs", "Possible accidents"],
    image: "/img/bg/steel-structure.webp",
    colour: "#A8502E",
    corner: "tr",
    labelRotate: 45,
  },
  {
    n: "3/4",
    key: "energy",
    title: "Energy",
    items: ["High consumption of power", "High running costs", "Waste of energy"],
    emphasis: "The price of energy will always increase",
    image: "/img/bg/thermostat.webp",
    colour: "#2F9C7F",
    corner: "br",
    labelRotate: -45,
  },
  {
    n: "4/4",
    key: "environment",
    title: "Environment",
    items: ["Damaging the ecosystem"],
    emphasis: "Carbonising the environment",
    image: "/img/bg/decarbonized.webp",
    colour: "#2E6F8E",
    corner: "bl",
    labelRotate: 45,
  },
];

/** Simple line glyphs, echoing the deck's iconography. */
const ICONS: Record<string, string> = {
  humans: "M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 21a8 8 0 0 1 16 0",
  infrastructure: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6",
  energy: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  environment: "M12 21c5-3 8-7 8-11a8 8 0 1 0-16 0c0 4 3 8 8 11ZM12 3v18",
};

/** Corner placement for the four text blocks around the diamond. */
const CORNER: Record<Quadrant["corner"], string> = {
  tl: "lg:col-start-1 lg:row-start-1 lg:text-right lg:items-end",
  tr: "lg:col-start-3 lg:row-start-1 lg:text-left lg:items-start",
  bl: "lg:col-start-1 lg:row-start-2 lg:text-right lg:items-end",
  br: "lg:col-start-3 lg:row-start-2 lg:text-left lg:items-start",
};

export default function ImpactDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState<string | null>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set("[data-q], [data-hub], [data-block]", { opacity: 1, scale: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      // the diamond assembles, quadrant by quadrant, out of the centre
      tl.fromTo(
        "[data-q]",
        { opacity: 0, scale: 0.35, transformOrigin: "center center" },
        { opacity: 1, scale: 1, duration: 1.05, ease: "back.out(1.5)", stagger: 0.11 },
        0,
      );
      tl.fromTo(
        "[data-hub]",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.8)" },
        0.35,
      );
      tl.fromTo(
        "[data-block]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.09 },
        0.5,
      );

      // the hub breathes, so the diagram never feels frozen
      gsap.to("[data-hub-ring]", {
        scale: 1.09,
        opacity: 0.25,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative overflow-hidden bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="Impact of high temperature"
          line1="Heat does not stop"
          line2="at discomfort."
          body="Untreated surface temperature reaches four separate parts of a business at once — the people under the roof, the structure itself, the energy bill, and the environment that pays for it."
        />

        {/* Diagram: three columns on desktop — text, diamond, text */}
        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* text blocks, ordered so mobile reads 1→4 */}
          {QUADRANTS.map((q) => (
            <article
              key={q.key}
              data-block
              onMouseEnter={() => setHot(q.key)}
              onMouseLeave={() => setHot(null)}
              className={`flex flex-col ${CORNER[q.corner]} order-none transition-opacity duration-500 ${
                hot && hot !== q.key ? "lg:opacity-45" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: `${q.colour}1f`, color: q.colour }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={ICONS[q.key]} />
                  </svg>
                </span>
                <h3 className="font-display text-[1.7rem] font-semibold tracking-tight" style={{ color: q.colour }}>
                  {q.title}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.2em] text-faint">{q.n}</span>
              </div>

              <ul className="mt-4 space-y-1.5">
                {q.items.map((item) => (
                  <li key={item} className="text-[14.5px] leading-[1.65] text-body">
                    {item}
                  </li>
                ))}
                {q.emphasis && (
                  <li className="text-[14.5px] font-semibold leading-[1.65] text-ink-strong">
                    {q.emphasis}
                  </li>
                )}
              </ul>

              <div
                className={`mt-6 w-full max-w-[300px] overflow-hidden rounded-xl border border-line ${
                  q.corner === "tl" || q.corner === "bl" ? "lg:ml-auto" : ""
                }`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={q.image}
                    alt={q.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 300px"
                    className="object-cover transition-transform duration-[1100ms] ease-out-expo hover:scale-[1.05]"
                  />
                </div>
              </div>
            </article>
          ))}

          {/* the diamond itself */}
          <div className="order-first mx-auto lg:order-none lg:col-start-2 lg:row-span-2">
            <div className="relative aspect-square w-[min(430px,80vw)]">
              <div className="absolute inset-[9%] rotate-45">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1.5">
                  {/* order here follows the visual quadrants, not reading order */}
                  {[QUADRANTS[0], QUADRANTS[1], QUADRANTS[3], QUADRANTS[2]].map((q, i) => (
                    <button
                      key={q.key}
                      data-q
                      type="button"
                      onMouseEnter={() => setHot(q.key)}
                      onMouseLeave={() => setHot(null)}
                      onFocus={() => setHot(q.key)}
                      onBlur={() => setHot(null)}
                      aria-label={`${q.title} — ${q.n}`}
                      className="relative overflow-hidden transition-all duration-500 ease-out-expo"
                      style={{
                        background: q.colour,
                        borderRadius:
                          ["18px 4px 4px 4px", "4px 18px 4px 4px", "4px 4px 4px 18px", "4px 4px 18px 4px"][i],
                        opacity: hot && hot !== q.key ? 0.55 : 1,
                        transform: hot === q.key ? "scale(1.04)" : "scale(1)",
                      }}
                    >
                      <span
                        className="absolute left-1/2 top-1/2 whitespace-nowrap font-semibold text-white/95"
                        style={{
                          fontSize: "clamp(8px,1.25vw,10.5px)",
                          letterSpacing: "0.16em",
                          transform: `translate(-50%,-50%) rotate(${q.labelRotate}deg)`,
                        }}
                      >
                        {q.title.toUpperCase()} {q.n}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* hub */}
              <div
                data-hub
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-bg text-center shadow-[0_20px_60px_-18px_rgba(15,26,19,0.28)]"
              >
                <span
                  data-hub-ring
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-ink/12"
                />
                <span className="font-display text-[clamp(1.1rem,3vw,1.7rem)] font-semibold leading-none tracking-tight text-ink">
                  IMPACT
                </span>
                <span className="mt-1 text-[10px] italic text-faint">of</span>
                <span className="mt-1 px-3 font-display text-[clamp(0.9rem,2.2vw,1.15rem)] font-medium leading-tight text-ink-strong">
                  HIGH Temperature
                </span>
                <span className="mt-3 flex gap-1.5" aria-hidden>
                  {QUADRANTS.map((q) => (
                    <span
                      key={q.key}
                      className="h-1.5 w-1.5 rounded-[1px] transition-all duration-500"
                      style={{
                        background: q.colour,
                        transform: hot === q.key ? "scale(1.7)" : "scale(1)",
                      }}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
