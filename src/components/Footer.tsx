import Link from "next/link";
import Image from "next/image";
import { company, nav, products } from "@/lib/data";
import { Arrow } from "./ui";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/img/brand/logo-webberbiz-ink.png"
                alt=""
                width={310}
                height={310}
                className="h-9 w-9 object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[22px] font-semibold tracking-tight text-ink">
                  Webberbiz
                </span>
                <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.34em] text-faint">
                  Trading LLC
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-[14px] leading-[1.75] text-body">
              Nanotechnology-based thermal coating and waterproofing for the UAE and the wider GCC.
              Aligning to sustainability.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
              Navigate
            </h3>
            <ul className="mt-6 space-y-3.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="ulink text-[14px] text-body transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
              Range
            </h3>
            <ul className="mt-6 space-y-3.5">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products#${p.slug}`}
                    className="ulink text-[14px] text-body transition-colors hover:text-ink"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
              Contact
            </h3>
            <address className="mt-6 not-italic text-[14px] leading-[1.75] text-body">
              {company.address.line1}
              <br />
              {company.address.line2}
              <br />
              {company.address.country}
            </address>
            <div className="mt-5 space-y-2 text-[14px]">
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="ulink block text-body hover:text-ink"
              >
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="ulink block text-body hover:text-ink">
                {company.email}
              </a>
            </div>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink"
            >
              Request a Survey
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-faint">
            &copy; {new Date().getFullYear()} {company.name}
          </p>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-faint">
            {company.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
