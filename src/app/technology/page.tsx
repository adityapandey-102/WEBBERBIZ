import type { Metadata } from "next";
import Image from "next/image";
import VideoHero from "@/components/VideoHero";
import PrincipleDiagram from "@/components/PrincipleDiagram";
import ThermalChart from "@/components/ThermalChart";
import { SectionHead } from "@/components/ui";
import { Counter, Reveal } from "@/components/motion";
import {
  acContext,
  emissionsSplit,
  impacts,
  nanoFacts,
  protections,
  temperatureBands,
  workingPrinciple,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How nanotechnology-based ceramic composite coatings reflect and insulate — the working principle, the scale involved, and the measured temperature deltas.",
};

export default function TechnologyPage() {
  const total = emissionsSplit.parts.reduce((s, p) => s + p.value, 0);

  return (
    <>
      <VideoHero
        eyebrow="Nanotechnology"
        line1="All products are"
        line2="nanotechnology based."
        lede="A nanometer is one-billionth of a meter. At that scale a ceramic composite forms a continuous film that reflects first and insulates what remains — keeping the temperature away from the substrate."
        src="/video/tech-hero.mp4"
      />

      {/* The scale */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="The scale"
            line1="One-billionth"
            line2="of a meter."
            body="A single-walled nano-tube multiplied a hundred thousand times equals one strand of human hair. That is the order of magnitude the composite works at — small enough to pack into a film with no gaps for heat to find."
          />

          <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal stagger as="ul">
              {nanoFacts.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-5 border-t border-line py-6 text-[15.5px] leading-[1.7] text-body last:border-b"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                  {f}
                </li>
              ))}
            </Reveal>

            <Reveal>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-bg">
                <Image
                  src="/img/bg/carbon-nanotube.webp"
                  alt="Single-walled carbon nanotube structure"
                  fill
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-contain p-10"
                />
                <div className="absolute inset-x-6 bottom-6 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Single-walled nano-tube × 100,000 = 1 strand of hair
                </div>
              </div>

            </Reveal>
          </div>
        </div>
      </div>

      {/* Working principle */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Working principle"
            line1="Reflector, insulator,"
            line2="substrate."
            body="The coating blankets the surface and keeps the temperature away to the degree of the delta found on the surface. The total effect is balanced by a logical proportion, and a proportional impact on the environment."
          />

          <Reveal className="mt-16">
            <PrincipleDiagram />
          </Reveal>

          <Reveal stagger className="mt-6 grid gap-5 md:grid-cols-3">
            {workingPrinciple.map((w) => (
              <div key={w.n} className="lux-card px-8 py-9">
                <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint">{w.n}</span>
                <h3 className="mt-5 text-[1.2rem] font-normal tracking-[-0.01em] text-ink">
                  {w.title}
                </h3>
                <p className="mt-3.5 text-[14px] leading-[1.75] text-body">{w.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="haze haze-bottom" />
      </div>

      {/* Readings */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="The readings"
            line1="Not instinct."
            line2="Instrument readings."
            body="Each pair below was logged on the same structure at the same moment, with a thermal gun on coated and uncoated sections side by side."
          />
          <Reveal className="mt-16">
            <ThermalChart />
          </Reveal>
        </div>
      </div>

      {/* Temperature dynamics */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Temperature dynamics"
            line1="Temperatures observed"
            line2="in the UAE."
            body="Understanding the temperature dynamics is where every specification begins. These are the surface bands recorded before any coating is applied."
          />

          <div className="mt-20 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-[clamp(3.4rem,7vw,5.4rem)] font-light leading-[0.85] text-ink">
                  <Counter value={24} suffix="–30°C" />
                </span>
              </div>
              <p className="mt-5 max-w-xs text-[14.5px] leading-[1.75] text-body">
                Best-in-class thermal resistant insulation, based on environmental conditions — the
                reduction our products deliver against the bands on the right.
              </p>
            </Reveal>

            <Reveal stagger className="flex flex-col justify-center gap-8">
              {temperatureBands.map((b) => (
                <div key={b.region}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-faint">
                      {b.region}
                    </span>
                    <span className="font-mono text-[13px] text-data-hot">
                      {b.low}°C – {b.high}°C
                    </span>
                  </div>
                  <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="absolute inset-y-0 rounded-full"
                      style={{
                        left: `${b.low}%`,
                        right: `${100 - b.high}%`,
                        background:
                          "linear-gradient(to right, var(--color-data-cool), var(--color-data-hot))",
                      }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between font-mono text-[9.5px] text-faint">
                    <span>0°C</span>
                    <span>100°C</span>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      {/* Impact */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Impact of high temperature"
            line1="What untreated heat"
            line2="costs, in four domains."
            body="Heat is not only a comfort problem. It shortens the life of the structure, drains the grid, and carbonises the environment that produced it."
          />

          <Reveal stagger className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impacts.map((d) => (
              <article key={d.domain} className="group overflow-hidden rounded-2xl border border-line">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, 23vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.06]"
                  />
                </div>
                <div className="bg-surface px-7 py-8">
                  <h3 className="text-[1.15rem] font-normal tracking-[-0.01em] text-ink">
                    {d.domain}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {d.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[13.5px] leading-snug text-body">
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/45"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Reveal>

          {/* All-in-one protection */}
          <Reveal className="mt-6 rounded-2xl border border-line bg-surface px-8 py-10 sm:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="display text-[clamp(1.6rem,3vw,2.2rem)]">All-in-one protection</h3>
                <p className="mt-3 max-w-md text-[14.5px] leading-[1.75] text-body">
                  What a single coat stands between your surface and the Gulf climate.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {protections.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-line bg-bg px-4 py-2 text-[13px] text-body transition-colors duration-400 hover:border-ink/30 hover:text-ink"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Decarbonising context */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Decarbonising"
            line1="Cooling is a"
            line2="carbon problem."
            body="Temperature reduction on the roof top is directly proportional to reduced air conditioning energy consumption, thereby reducing cost and carbon footprint."
          />

          <div className="mt-20 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
            <Reveal className="lux-card px-8 py-9">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-[clamp(3rem,6vw,4.6rem)] font-light leading-[0.85] text-ink">
                  <Counter value={3.94} decimals={2} suffix="%" />
                </span>
                <span className="text-[13.5px] leading-snug text-body">
                  of global greenhouse
                  <br />
                  gas emissions
                </span>
              </div>

              <div className="mt-9">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Where air conditioning&rsquo;s {emissionsSplit.total} of CO₂ goes
                </span>
                <div className="mt-4 flex h-3 gap-[2px] overflow-hidden rounded-full">
                  {emissionsSplit.parts.map((p, i) => (
                    <span
                      key={p.label}
                      className="h-full first:rounded-l-full last:rounded-r-full"
                      style={{
                        width: `${(p.value / total) * 100}%`,
                        background:
                          i === 0 ? "var(--color-data-hot)" : "var(--color-data-cool)",
                      }}
                    />
                  ))}
                </div>
                <ul className="mt-5 space-y-3.5">
                  {emissionsSplit.parts.map((p, i) => (
                    <li key={p.label} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{
                          background:
                            i === 0 ? "var(--color-data-hot)" : "var(--color-data-cool)",
                        }}
                        aria-hidden
                      />
                      <span>
                        <span className="text-[14px] text-ink-strong">
                          {p.value} Mt — {p.label}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] text-faint">{p.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal className="overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/img/bg/global-emissions.webp"
                    alt="Breakdown of global greenhouse gas emissions by sector"
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-contain bg-bg p-4"
                  />
                </div>
              </Reveal>
              <Reveal className="lux-card px-8 py-8">
                <ul className="space-y-4">
                  {acContext.map((line) => (
                    <li key={line} className="flex gap-3 text-[14px] leading-[1.72] text-body">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>
    </>
  );
}
