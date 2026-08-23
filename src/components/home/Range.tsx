import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Arrow, Eyebrow, IndexLabel } from "../ui";
import { Reveal, SplitHeading } from "../motion";

const toneRing = {
  hot: "group-hover:border-accent/45",
  cool: "group-hover:border-cool/45",
  neutral: "group-hover:border-ink/25",
} as const;

const toneGlow = {
  hot: "var(--color-accent)",
  cool: "var(--color-cool)",
  neutral: "var(--color-muted)",
} as const;

export default function Range() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Product range</Eyebrow>
            <SplitHeading
              text="Selective and highly specialised products for the UAE and GCC."
              className="mt-7 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            />
          </div>
          <Reveal>
            <Link
              href="/products"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hot"
            >
              All products
              <Arrow />
            </Link>
          </Reveal>
        </div>

        <Reveal
          stagger
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((p, i) => (
            <Link
              key={p.slug}
              href={`/products#${p.slug}`}
              className={`rv group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface/50 p-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-surface ${toneRing[p.tone]}`}
            >
              {/* hover glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-40"
                style={{ background: toneGlow[p.tone] }}
              />

              <div className="relative flex items-start justify-between">
                <IndexLabel n={i + 1} total={products.length} />
                {p.comingSoon && (
                  <span className="rounded-full border border-cool/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-cool">
                    Coming soon
                  </span>
                )}
              </div>

              <div className="relative mt-6 flex h-40 items-center justify-center">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={340}
                  height={420}
                  sizes="(max-width: 640px) 60vw, 24vw"
                  className="h-full w-auto object-contain transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.06]"
                />
              </div>

              <h3 className="relative mt-7 font-display text-2xl font-bold tracking-tight">
                {p.name}
              </h3>
              <p className="relative mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                {p.category}
                {p.base ? ` · base ${p.base}` : ""}
              </p>
              <p className="relative mt-4 flex-1 text-[14px] leading-relaxed text-muted">
                {p.blurb}
              </p>

              <span className="relative mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-accent">
                Details
                <Arrow />
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
