"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, nav } from "@/lib/data";

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
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid && !open ? "bg-bg/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          {/* Mark */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label={company.name}>
            <Image
              src="/img/brand/logo-webberbiz-ink.png"
              alt=""
              width={310}
              height={310}
              priority
              className="h-9 w-9 object-contain transition-transform duration-700 ease-out-expo group-hover:rotate-[14deg]"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[22px] font-semibold tracking-tight text-ink">
                Webberbiz
              </span>
              <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.34em] text-faint">
                Trading LLC
              </span>
            </span>
          </Link>

          {/* Centre pill nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-line bg-bg/70 p-1.5 backdrop-blur-xl lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2.5 text-[13.5px] transition-all duration-400 ${
                  isActive(item.href)
                    ? "bg-ink text-white"
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
              className="hidden rounded-full bg-black px-6 py-3 text-[13.5px] font-semibold text-white transition-colors duration-500 hover:bg-ink sm:inline-flex"
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
            className="mt-10 inline-flex justify-center rounded-full bg-black px-7 py-4 text-[13.5px] font-semibold text-white"
          >
            Request a Survey
          </Link>
        </div>
      </div>
    </>
  );
}
