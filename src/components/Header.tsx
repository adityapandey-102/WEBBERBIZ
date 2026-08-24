"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, nav } from "@/lib/data";
import { lockScroll, unlockScroll } from "./SmoothScroll";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Routes whose hero sits on darkened video: until the bar goes solid, the
     lockup has to be the white one or it disappears into the footage. */
  const overDarkHero = pathname.startsWith("/technology") && !solid && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid && !open ? "bg-bg/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          {/* Mark */}
          <Link href="/" className="group flex items-center" aria-label={company.name}>
            <Image
              src={
                overDarkHero
                  ? "/img/brand/webberbiz-lockup-white.png"
                  : "/img/brand/webberbiz-lockup.png"
              }
              alt={company.name}
              width={1200}
              height={295}
              priority
              className="h-9 w-auto object-contain transition-opacity duration-500 group-hover:opacity-80 sm:h-10"
            />
          </Link>

          {/* Centre pill nav */}
          <nav
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border p-1.5 backdrop-blur-xl transition-colors duration-500 lg:flex ${
              overDarkHero ? "border-white/15 bg-black/40" : "border-line bg-bg/70"
            }`}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2.5 text-[13.5px] transition-all duration-400 ${
                  isActive(item.href)
                    ? overDarkHero
                      ? "bg-white text-ink-strong"
                      : "bg-ink text-white"
                    : overDarkHero
                      ? "text-white/85 hover:text-white"
                      : "text-body hover:text-ink-strong"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-accent-soft px-6 py-3 text-[13.5px] font-semibold text-white transition-colors duration-500 hover:bg-ink sm:inline-flex"
            >
              Request a Survey
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-strong transition-colors hover:border-ink/40 lg:hidden"
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
        className={`fixed inset-0 z-40 bg-bg transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8 pb-16 pt-[var(--header-h)]">
          <nav className="flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline gap-4 border-b border-line py-4 transition-all duration-500"
                style={{
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transitionDelay: `${90 + i * 55}ms`,
                }}
              >
                <span className="text-[10px] font-medium tracking-[0.24em] text-faint">
                  0{i + 1}
                </span>
                <span
                  className={`display text-4xl ${isActive(item.href) ? "text-ink" : "text-ink-strong"}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="mt-10 inline-flex justify-center rounded-full bg-accent-soft px-7 py-4 text-[13.5px] font-semibold text-white"
          >
            Request a Survey
          </Link>
        </div>
      </div>
    </>
  );
}
