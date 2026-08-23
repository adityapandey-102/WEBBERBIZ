import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import { Eyebrow } from "@/components/ui";
import { Counter, Reveal, SplitHeading } from "@/components/motion";
import { company, gccCommitments, markets, marqueeWords, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Firm",
  description:
    "Webberbiz Trading LLC — seven years of research on a technology proven for twenty years, formulated for the UAE and GCC.",
};

const stats = [
  { value: 7, suffix: "", label: "Years of research", note: "continuous development" },
  { value: 20, suffix: "", label: "Years proving", note: "field record in India" },
  { value: 5, suffix: "", label: "Products in range", note: "metal, concrete, water, glass" },
  { value: 5, suffix: "", label: "GCC markets", note: "UAE · KSA · QA · OM · BH" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The firm"
        title="Aligning to sustainability."
        lede="Webberbiz Trading LLC supplies nanotechnology-based thermal coating and waterproofing from Dubai, built around one conviction: the cheapest kilowatt-hour is the one the building never needs."
        image="/img/bg/dubai-aerial.webp"
      />

      {/* Stats */}
      <div className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <Reveal stagger className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rv bg-bg px-6 py-8">
                <div className="font-display text-4xl font-semibold tracking-tight text-accent">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-[14px] text-ink">{s.label}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {s.note}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* R&D */}
      <div className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/img/bg/research-lab.webp"
                  alt="Research and development laboratory"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Eyebrow>Research and development</Eyebrow>
              <SplitHeading
                text="A continuous development strategy."
                className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
              <Reveal>
                <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
                  Seven years of research sit on top of a technology that has been proving itself in
                  the field for twenty years in India. What reaches the GCC is not a new idea — it
                  is a mature one, reformulated for a harsher temperature band.
                </p>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
                  Every product in the range is nanotechnology based, and every one is selective:
                  built for a single substrate and a single failure mode rather than sold as a
                  universal coating.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <Marquee words={marqueeWords} duration={40} />

      {/* Decarbonising */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Decarbonising</Eyebrow>
              <SplitHeading
                text="Lowering carbon in everything the business does."
                className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
              <Reveal>
                <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
                  Decarbonisation is the process of reducing or eliminating carbon emissions from a
                  particular process or sector of the economy. In a business context, decarbonising
                  means continually lowering carbon emissions in everything your business does.
                </p>
              </Reveal>

              <Reveal stagger className="mt-10 flex flex-wrap gap-2.5">
                {markets.map((m) => (
                  <span
                    key={m.name}
                    className="rv group flex items-center gap-2.5 rounded-full border border-line bg-bg py-2 pl-2 pr-4 transition-colors duration-500 hover:border-accent/40"
                  >
                    <Image
                      src={m.flag}
                      alt=""
                      width={80}
                      height={80}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-[13px] text-muted transition-colors group-hover:text-ink">
                      {m.name}
                    </span>
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal stagger as="ol" className="lg:pt-4">
              {gccCommitments.map((c) => (
                <li key={c.n} className="rv border-t border-line py-7 last:border-b">
                  <div className="flex gap-6">
                    <span className="w-8 shrink-0 font-display text-lg font-semibold tracking-tight text-accent">
                      {c.n}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-medium tracking-tight">{c.title}</h3>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{c.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      {/* Range summary */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <Eyebrow>The range at a glance</Eyebrow>
          <SplitHeading
            text="Five formulations, one system."
            className="mt-7 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
          />

          <Reveal stagger as="ul" className="mt-14">
            {products.map((p, i) => (
              <li
                key={p.slug}
                className="rv flex flex-col gap-3 border-t border-line py-7 last:border-b sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="w-10 shrink-0 font-mono text-[11px] tracking-[0.2em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-44 shrink-0 font-display text-lg font-semibold tracking-tight">
                  {p.name}
                </span>
                <span className="flex-1 text-[14.5px] leading-relaxed text-muted">
                  {p.category}
                  {p.base ? ` · base ${p.base}` : ""}
                </span>
                {p.comingSoon && (
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-cool">
                    Coming soon
                  </span>
                )}
              </li>
            ))}
          </Reveal>

          <Reveal>
            <address className="mt-16 not-italic text-[15px] leading-relaxed text-muted">
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                {company.name}
              </span>
              <br />
              {company.address.line1}
              <br />
              {company.address.line2}, {company.address.country}
            </address>
          </Reveal>
        </div>
      </div>
    </>
  );
}
