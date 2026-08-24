"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { products } from "@/lib/data";
import { Arrow } from "./ui";

/**
 * Full-viewport product showcase.
 *
 * The display word is the *substrate*, not the pack name — three products in the
 * range are all called HEAT PLUG, so the headline would sit unchanged across
 * three slides. The pack name is carried by its brand wordmark beneath.
 */
const WORD: Record<string, string> = {
  "heatplug-containers": "Containers",
  "heatplug-metal": "Metal",
  "heatplug-concrete": "Concrete",
  aquaplug: "Water",
  surfaklean: "Surface",
  coolg: "Glass",
};

/** What each product protects, drawn from the catalogue's own application models. */
const ORBIT: Record<string, string[]> = {
  "heatplug-containers": ["container", "truck-trailer", "container-cafe", "delivery-truck"],
  "heatplug-metal": ["industrial-shed", "portacabin", "truck-trailer", "container"],
  "heatplug-concrete": ["villa", "mosque", "portacabin", "industrial-shed"],
  aquaplug: ["villa", "mosque", "container-cafe", "portacabin"],
  surfaklean: ["container", "villa", "industrial-shed", "truck-trailer"],
  coolg: ["villa", "mosque", "container-cafe", "portacabin"],
};

/** Near-white tints mixed from the theme's own data tokens. */
const TINT: Record<string, string> = {
  hot: "#faf7f4",
  cool: "#f4f8f6",
  neutral: "#f7f7f4",
};

/**
 * Depth slots around the centre. `depth` drives the cursor parallax — nearer
 * objects travel further, which is what sells the field as three-dimensional.
 */
const SLOTS = [
  { left: "5%", top: "14%", size: 220, blur: 1.2, opacity: 0.9, drift: -16, spin: -7, depth: 0.5, hideSm: false },
  { left: "74%", top: "9%", size: 185, blur: 0, opacity: 1, drift: 14, spin: 6, depth: 0.35, hideSm: false },
  { left: "0%", top: "57%", size: 300, blur: 3, opacity: 0.75, drift: 20, spin: 5, depth: 1, hideSm: true },
  { left: "77%", top: "55%", size: 255, blur: 2, opacity: 0.82, drift: -18, spin: -6, depth: 0.8, hideSm: true },
];

const PACK_BOX =
  "relative shrink-0 h-[32vh] max-h-[350px] w-[min(300px,42vw)] sm:h-[36vh] sm:w-[min(300px,46vw)]";

function NavButton({
  dir,
  onClick,
  className = "",
}: {
  dir: -1 | 1;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === -1 ? "Previous product" : "Next product"}
      className={`group/nav h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-bg/70 text-ink-strong backdrop-blur-sm transition-all duration-500 ease-out-expo hover:border-ink/45 hover:bg-ink hover:text-white ${className}`}
    >
      <svg
        viewBox="0 0 20 16"
        className={`h-3.5 w-4 transition-transform duration-500 ease-out-expo ${
          dir === -1 ? "rotate-180 group-hover/nav:-translate-x-0.5" : "group-hover/nav:translate-x-0.5"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M1 8h16M12 3l5 5-5 5" />
      </svg>
    </button>
  );
}

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  /** The slide being replaced, kept mounted so the two can dissolve through each other. */
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [held, setHeld] = useState(false);
  const [fitted, setFitted] = useState(false);

  const stage = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const dirRef = useRef<1 | -1>(1);
  const activeRef = useRef(0);
  const outSize = useRef("0px");
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const product = products[active];
  const word = WORD[product.slug];
  const orbit = ORBIT[product.slug] ?? [];

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /** Capture the outgoing slide (and its measured type size) before swapping. */
  const change = useCallback((next: number, dir: 1 | -1) => {
    if (next === activeRef.current) return;
    dirRef.current = dir;
    outSize.current = wordRef.current?.style.fontSize ?? "0px";
    setOutgoing(activeRef.current);
    setActive(next);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) =>
      change((activeRef.current + dir + products.length) % products.length, dir),
    [change],
  );

  /* Autoplay, held while a pointer is on the stage. */
  useEffect(() => {
    if (held || prefersReducedMotion()) return;
    const id = window.setInterval(() => go(1), 5600);
    return () => window.clearInterval(id);
  }, [held, go]);

  /**
   * Size the display word by measuring it rather than estimating per-character
   * width — Poppins ExtraBold is wider than a coefficient predicts, and the word
   * changes length on every slide.
   */
  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    const fit = () => {
      const avail = Math.min(window.innerWidth * 0.9, 1560);
      const BASE = 100;
      el.style.fontSize = `${BASE}px`;
      const natural = el.scrollWidth;
      if (!natural) return;
      const size = Math.min((avail / natural) * BASE, window.innerWidth * 0.19, 240);
      el.style.fontSize = `${size}px`;
      setFitted(true);
    };

    fit();
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(fit).catch(() => {});
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [word]);

  /* Idle drift + cursor parallax. */
  useEffect(() => {
    initGsap();
    const el = stage.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-orbit]");
      nodes.forEach((node, i) => {
        const s = SLOTS[i % SLOTS.length];
        gsap.to(node, {
          yPercent: s.drift / 3,
          rotation: s.spin,
          duration: 5 + i * 0.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      const setters = nodes.map((n) => ({
        x: gsap.quickTo(n, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(n, "y", { duration: 1.1, ease: "power3.out" }),
      }));

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setters.forEach((set, i) => {
          const d = SLOTS[i % SLOTS.length].depth;
          set.x(-nx * 60 * d);
          set.y(-ny * 40 * d);
        });
      };

      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  /**
   * The swap, timed off the reference: the outgoing pack and word smear out
   * horizontally while the incoming ones smear in, overlapping for about 100ms.
   * Nothing rotates — a flat pack shot rotated in 3D reads as a turning sheet of
   * paper, not a turning tin.
   */
  useEffect(() => {
    initGsap();
    const el = stage.current;
    if (!el) return;

    tlRef.current?.kill();
    const dir = dirRef.current;
    const done = () => setOutgoing(null);

    if (prefersReducedMotion()) {
      done();
      return;
    }

    const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, el);
    const tl = gsap.timeline({ onComplete: done });
    tlRef.current = tl;

    // leaving
    tl.to(q("[data-letter-out]"), {
      opacity: 0,
      filter: "blur(16px)",
      x: -34 * dir,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.012,
    }, 0);
    tl.to(q("[data-pack-out]"), {
      opacity: 0,
      filter: "blur(12px)",
      x: -24 * dir,
      duration: 0.32,
      ease: "power2.in",
    }, 0);

    // arriving
    tl.fromTo(q("[data-letter-in]"), {
      opacity: 0,
      filter: "blur(16px)",
      x: 34 * dir,
    }, {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.018,
    }, 0.07);

    tl.fromTo(q("[data-pack-in]"), {
      opacity: 0,
      filter: "blur(12px)",
      x: 24 * dir,
    }, {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      duration: 0.6,
      ease: "power3.out",
    }, 0.06);

    tl.fromTo(q("[data-shadow]"), { scaleX: 0.7, opacity: 0 }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.55,
      ease: "power3.out",
    }, 0.1);

    tl.fromTo(q("[data-orbit]"), {
      opacity: 0,
      xPercent: 22 * dir,
      scale: 1.1,
    }, {
      opacity: (i: number) => SLOTS[i % SLOTS.length].opacity,
      xPercent: 0,
      scale: 1,
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.04,
    }, 0.02);

    tl.fromTo(q("[data-meta]"), { opacity: 0, y: 14 }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    }, 0.14);

    return () => {
      tl.kill();
    };
  }, [active]);

  const outProduct = outgoing !== null ? products[outgoing] : null;

  return (
    <section
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      className="relative overflow-hidden transition-colors duration-700 ease-out-expo"
      style={{ backgroundColor: TINT[product.tone] }}
      aria-roledescription="carousel"
      aria-label="Product range"
    >
      {/* soft centre bloom, so the pack sits in light rather than on a flat field */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 68%)" }}
      />

      <div
        ref={stage}
        className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-center px-5 pb-24 pt-[calc(var(--header-h)+5vh)] sm:px-8 lg:px-12"
      >
        {/* Floating application models */}
        {SLOTS.map((s, i) => {
          const name = orbit[i % Math.max(orbit.length, 1)];
          if (!name) return null;
          return (
            <div
              key={`${product.slug}-${i}`}
              data-orbit
              aria-hidden
              className={`pointer-events-none absolute ${s.hideSm ? "hidden lg:block" : ""}`}
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                filter: s.blur ? `blur(${s.blur}px)` : undefined,
                opacity: s.opacity,
              }}
            >
              <Image
                src={`/img/apps/${name}.png`}
                alt=""
                fill
                sizes="300px"
                className="object-contain drop-shadow-[0_18px_40px_rgba(15,26,19,0.10)]"
              />
            </div>
          );
        })}

        {/* Pack row — arrows are siblings of the pack, so nothing can overlap. */}
        <div className="relative flex w-full items-center justify-center">
          {/* outgoing word, held at the size it was measured to */}
          {outProduct && (
            <h2
              key={`wo-${outProduct.slug}`}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-max -translate-x-1/2 -translate-y-1/2 text-center font-heavy font-extrabold leading-[0.8] text-ink"
              style={{ fontSize: outSize.current, letterSpacing: "0.05em" }}
            >
              {WORD[outProduct.slug].split("").map((ch, i) => (
                <span key={i} data-letter-out className="inline-block will-change-transform">
                  {ch}
                </span>
              ))}
            </h2>
          )}

          <h2
            key={`w-${product.slug}`}
            ref={wordRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-max -translate-x-1/2 -translate-y-1/2 text-center font-heavy font-extrabold leading-[0.8] text-ink"
            style={{ fontSize: 0, letterSpacing: "0.05em", visibility: fitted ? "visible" : "hidden" }}
          >
            <span className="sr-only">{word}</span>
            {word.split("").map((ch, i) => (
              <span key={i} data-letter-in aria-hidden className="inline-block will-change-transform">
                {ch}
              </span>
            ))}
          </h2>

          <div className="relative z-30 flex w-full max-w-[34rem] items-center justify-center gap-3 sm:justify-between">
            <NavButton dir={-1} onClick={() => go(-1)} className="hidden sm:flex" />

            <div className={PACK_BOX}>
              {outProduct && (
                <div key={`po-${outProduct.slug}`} data-pack-out className="absolute inset-0 z-20">
                  <Image
                    src={outProduct.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="300px"
                    className="object-contain drop-shadow-[0_34px_70px_rgba(15,26,19,0.22)]"
                  />
                </div>
              )}

              <div key={`p-${product.slug}`} data-pack-in className="absolute inset-0 z-20">
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.category}`}
                  fill
                  priority={active === 0}
                  sizes="300px"
                  className="object-contain drop-shadow-[0_34px_70px_rgba(15,26,19,0.22)]"
                />
              </div>

              {/* grounding shadow */}
              <div
                key={`s-${product.slug}`}
                data-shadow
                aria-hidden
                className="pointer-events-none absolute -bottom-4 left-1/2 h-5 w-[62%] -translate-x-1/2 rounded-[50%] blur-md"
                style={{ background: "rgba(15,26,19,0.16)" }}
              />
            </div>

            <NavButton dir={1} onClick={() => go(1)} className="hidden sm:flex" />
          </div>
        </div>

        {/* Meta — the brand wordmark carries the product name */}
        <div
          key={`m-${product.slug}`}
          data-meta
          className="relative z-30 mx-auto mt-14 flex max-w-lg flex-col items-center text-center"
        >
          {product.wordmark ? (
            <Image
              src={product.wordmark}
              alt={product.name}
              width={520}
              height={140}
              className="h-9 w-auto object-contain sm:h-11"
            />
          ) : (
            <span className="font-heavy text-[1.5rem] font-extrabold tracking-[0.08em] text-ink">
              {product.name}
            </span>
          )}

          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
            {product.category}
            {product.comingSoon ? " · coming soon" : ""}
          </p>

          <Link
            href={`/products#${product.slug}`}
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-black px-8 py-3.5 text-[13.5px] font-semibold text-white transition-all duration-500 ease-out-expo hover:bg-ink"
          >
            View product
            <Arrow />
          </Link>
        </div>

        {/* Index — on a phone the arrows live here instead, within thumb reach */}
        <div className="absolute inset-x-0 bottom-7 z-30 flex items-center justify-center gap-3 px-4 sm:bottom-8 sm:gap-6">
          <NavButton dir={-1} onClick={() => go(-1)} className="flex sm:hidden" />

          <span className="hidden font-mono text-[10.5px] tracking-[0.2em] text-faint sm:block">
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => change(i, i > activeRef.current ? 1 : -1)}
                aria-label={`Show ${p.name}, ${p.category}`}
                aria-current={i === active}
                className="group p-1.5 sm:p-2"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-600 ease-out-expo ${
                    i === active
                      ? "w-8 bg-ink sm:w-10"
                      : "w-4 bg-ink/20 group-hover:bg-ink/45 sm:w-5"
                  }`}
                />
              </button>
            ))}
          </div>

          <span className="hidden font-mono text-[10.5px] tracking-[0.2em] text-faint sm:block">
            {String(products.length).padStart(2, "0")}
          </span>

          <NavButton dir={1} onClick={() => go(1)} className="flex sm:hidden" />
        </div>
      </div>
    </section>
  );
}
