import Link from "next/link";
import Image from "next/image";
import { company, nav, products } from "@/lib/data";
import { Arrow } from "./ui";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      {/* thermal wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 68%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/img/brand/logo-webberbiz-ink.png"
                alt=""
                width={310}
                height={310}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-base font-bold tracking-tight">WEBBERBIZ</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Nanotechnology-based thermal coating and waterproofing for the UAE and the wider GCC.
              Aligning to sustainability.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["UAE", "KSA", "Qatar", "Oman", "Bahrain"].map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="ulink text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Range</h3>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products#${p.slug}`}
                    className="ulink text-sm text-muted transition-colors hover:text-ink"
                  >
                    {p.name}
                    <span className="ml-1.5 font-mono text-[10px] text-faint">
                      {p.category.split(" ").slice(-2).join(" ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Contact</h3>
            <address className="mt-5 not-italic text-sm leading-relaxed text-muted">
              {company.address.line1}
              <br />
              {company.address.line2}
              <br />
              {company.address.country}
            </address>
            <div className="mt-5 space-y-1.5 text-sm">
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="ulink block text-muted hover:text-ink">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="ulink block text-muted hover:text-ink">
                {company.email}
              </a>
            </div>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hot"
            >
              Request a survey
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.1em] text-faint">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.1em] text-faint">{company.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
