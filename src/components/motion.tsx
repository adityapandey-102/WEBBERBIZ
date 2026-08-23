"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, initGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ Reveal */

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of animating the wrapper itself. */
  stagger?: boolean;
  delay?: number;
  y?: number;
  start?: string;
};

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
  delay = 0,
  y = 34,
  start = "top 82%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------- SplitHeading */

/**
 * Splits on words and animates each line up from behind a mask.
 * We split by word (not character) so wrapping stays natural at every breakpoint.
 */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  start = "top 85%",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word] > span"));
    if (!words.length) return;

    if (prefersReducedMotion()) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 118, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: "power4.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, delay, start]);

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-word
          className="inline-block overflow-hidden align-bottom"
        >
          <span className="inline-block will-change-transform" style={{ opacity: 0 }}>
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ----------------------------------------------------------------- Counter */

export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) +
      suffix;

    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix, prefix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

