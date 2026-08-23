import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import { SectionHead } from "@/components/ui";
import { Counter, Reveal } from "@/components/motion";
import { company, gccCommitments, markets, marqueeWords, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Firm",
  description:
    "Webberbiz Trading LLC — seven years of research on a technology proven for twenty years, formulated for the UAE and GCC.",
};

const stats = [
  { value: 7, label: "Years of research", note: "continuous development strategy" },
  { value: 20, label: "Years proving", note: "field record in India" },
  { value: 5, label: "Products in range", note: "plus COOL G for glass, coming soon" },
  { value: 5, label: "GCC markets", note: "UAE · KSA · QA · OM · BH" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The firm"
        line1="Aligning to"
        line2="sustainability."
        lede="Webberbiz Trading LLC supplies nanotechnology-based thermal coating and waterproofing from Dubai, built around one conviction: the cheapest kilowatt-hour is the one the building never needs."
        image="/img/bg/dubai-aerial.webp"
      />

      {/* Stats */}
      <div className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <Reveal stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-line pt-7">
                <div className="font-display text-[clamp(2.8rem,5vw,3.8rem)] font-light leading-[0.85] text-ink">
                  <Counter value={s.value} />
                </div>
                <div className="mt-5 text-[14.5px] text-ink-strong">{s.label}</div>
                <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                  {s.note}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* R&D */}
      <div className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Research and development"
            line1="A continuous"
            line2="development strategy."
            body="Seven years of research sit on top of a technology that has been proving itself in the field for twenty years in India. What reaches the GCC is not a new idea — it is a mature one, reformulated for a harsher temperature band."
          />

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/img/bg/research-lab.webp", cap: "Formulation and testing" },
              { src: "/img/bg/paint-cans.webp", cap: "Application trials" },
              { src: "/img/bg/concrete-crack.webp", cap: "Substrate failure study" },
              { src: "/img/bg/india-gate-smog.webp", cap: "The emissions problem we work against" },
            ].map((im) => (
              <Reveal key={im.src}>
                <figure className="group">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={im.src}
                      alt={im.cap}
                      fill
                      sizes="(max-width: 1024px) 92vw, 31vw"
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="mt-3 text-[12.5px] text-faint">{im.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Marquee words={marqueeWords} duration={50} />

      {/* Decarbonising */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Decarbonising"
            line1="Lowering carbon in"
            line2="everything we do."
            body="Decarbonisation is the process of reducing or eliminating carbon emissions from a particular process or sector of the economy. In a business context, it means continually lowering carbon emissions in everything your business does."
          />

          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="space-y-6">
              <Reveal className="overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/img/bg/co2-dashboard.webp"
                    alt="Carbon dioxide monitoring dashboard"
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal className="overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/img/bg/decarbonized.webp"
                    alt="Decarbonised"
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal stagger as="ol">
              {gccCommitments.map((c) => (
                <li key={c.n} className="border-t border-line py-8 last:border-b">
                  <div className="flex gap-7">
                    <span className="w-8 shrink-0 font-display text-2xl font-light text-ink">
                      {c.n}
                    </span>
                    <div>
                      <h3 className="text-[1.15rem] font-normal tracking-[-0.005em] text-ink-strong">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-[14.5px] leading-[1.75] text-body">{c.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal stagger className="mt-14 flex flex-wrap gap-2.5">
            {markets.map((m) => (
              <span
                key={m.name}
                className="group flex items-center gap-2.5 rounded-full border border-line bg-bg py-2 pl-2 pr-5 transition-colors duration-500 hover:border-ink/30"
              >
                <Image
                  src={m.flag}
                  alt=""
                  width={80}
                  height={80}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-[13px] text-body transition-colors group-hover:text-ink-strong">
                  {m.name}
                </span>
              </span>
            ))}
          </Reveal>
        </div>
        <div className="haze haze-bottom" />
      </div>

      {/* Range at a glance */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="The range at a glance"
            line1="Five products in the range."
            line2="One system."
            body="Each product is selective by design: built for a single substrate and a single failure mode, rather than sold as a universal coating. COOL G, a thermal coating for glass, is marked coming soon in the catalogue."
          />

          <Reveal stagger as="ul" className="mt-20">
            {products.map((p, i) => (
              <li
                key={p.slug}
                className="flex flex-col gap-3 border-t border-line py-7 last:border-b sm:flex-row sm:items-baseline sm:gap-10"
              >
                <span className="w-10 shrink-0 font-mono text-[10.5px] tracking-[0.2em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-48 shrink-0 font-display text-[1.5rem] font-semibold tracking-tight text-ink">
                  {p.name}
                </span>
                <span className="flex-1 text-[14.5px] leading-[1.7] text-body">
                  {p.category}
                  {p.base ? ` · base ${p.base}` : ""}
                </span>
                {p.comingSoon && (
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    Coming soon
                  </span>
                )}
              </li>
            ))}
          </Reveal>

          <Reveal>
            <address className="mt-16 not-italic text-[15px] leading-[1.78] text-body">
              <span className="font-display text-[1.5rem] font-semibold tracking-tight text-ink">
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
