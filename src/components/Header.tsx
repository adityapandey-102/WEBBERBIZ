"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, initGsap } from "@/lib/gsap";
import { company, nav } from "@/lib/data";
import { Arrow } from "./ui";

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    initGsap();
    const el = headerRef.current;
    if (!el) return;

    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      if (open) return;
      const goingDown = y > last && y > 260;
      gsap.to(el, {
        yPercent: goingDown ? -100 : 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid || open
            ? "border-b border-line bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="group flex items-center gap-3" aria-label={company.name}>
            <Image
              src="/img/brand/logo-webberbiz-ink.png"
              alt=""
              width={310}
              height={310}
              priority
              className="h-10 w-10 object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[18deg]"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-bold tracking-tight text-ink">
                WEBBERBIZ
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                Trading LLC
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ulink text-[13.5px] tracking-tight transition-colors duration-300 ${
                    active ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-hot hover:shadow-[0_0_34px_-8px_var(--color-accent)] sm:inline-flex"
            >
              Request a survey
              <Arrow />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-400 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-400 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-bg/97 backdrop-blur-2xl transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8 pb-16 pt-[var(--header-h)]">
          <nav className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-semibold tracking-tight text-ink transition-all duration-500 hover:text-accent sm:text-4xl"
                style={{
                  transform: open ? "translateY(0)" : "translateY(24px)",
                  opacity: open ? 1 : 0,
                  transitionDelay: `${80 + i * 55}ms`,
                }}
              >
                <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {company.address.line1}
            <br />
            {company.address.line2} · {company.address.country}
          </div>
        </div>
      </div>
    </>
  );
}
