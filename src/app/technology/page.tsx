import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Eyebrow } from "@/components/ui";
import { Counter, Reveal, SplitHeading } from "@/components/motion";
import { nanoFacts, workingPrinciple, impacts, temperatureBands } from "@/lib/data";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How nanotechnology-based ceramic composite coatings reflect and insulate — the working principle, the scale involved, and the measured temperature deltas.",
};

const readings = [
  { label: "Metal roof, uncoated", value: "70.7°C", tone: "hot" },
  { label: "Metal roof, coated", value: "46.3°C", tone: "cool" },
  { label: "Inside ceiling, uncoated", value: "46.1°C", tone: "hot" },
  { label: "Inside ceiling, coated", value: "30.8°C", tone: "cool" },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Nanotechnology"
        title="All products are nanotechnology based."
        lede="A nanometer is one-billionth of a meter. At that scale a ceramic composite forms a continuous film that reflects first and insulates what remains — keeping the temperature away from the substrate."
        image="/img/bg/nano-spheres.webp"
      />

      {/* Scale */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>The scale</Eyebrow>
              <SplitHeading
                text="One-billionth of a meter."
                className="mt-7 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
              />
              <Reveal>
                <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
                  A single-walled nano-tube multiplied a hundred thousand times equals one strand of
                  human hair. That is the order of magnitude the composite works at.
                </p>
              </Reveal>

              <Reveal stagger as="ul" className="mt-10 space-y-0">
                {nanoFacts.map((f) => (
                  <li
                    key={f}
                    className="rv flex gap-4 border-t border-line py-5 text-[15px] leading-relaxed text-muted last:border-b"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                    {f}
                  </li>
                ))}
              </Reveal>
            </div>

            <Reveal className="flex items-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-bg">
                <Image
                  src="/img/bg/carbon-nanotube.webp"
                  alt="Single-walled carbon nanotube structure"
                  fill
                  sizes="(max-width: 1024px) 90vw, 44vw"
                  className="object-contain p-10"
                />
                <div className="absolute bottom-5 left-5 right-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
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
        <div className="relative mx-auto w-full max-w-[1320px]">
          <Eyebrow>Working principle</Eyebrow>
          <SplitHeading
            text="Reflector, insulator, substrate."
            className="mt-7 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
          />
          <Reveal>
            <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-muted">
              The coating blankets the surface and keeps the temperature away to the degree of the
              delta found on the surface. The total effect is balanced by a logical proportion, and
              a proportional impact on the environment.
            </p>
          </Reveal>

          <Reveal stagger className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {workingPrinciple.map((w) => (
              <div key={w.n} className="rv bg-bg px-7 py-9">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{w.n}</span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight">{w.title}</h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </Reveal>

          {/* Coated vs uncoated readings */}
          <Reveal stagger className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {readings.map((r) => (
              <div key={r.label} className="rv bg-bg px-6 py-7">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                  {r.label}
                </div>
                <div
                  className={`mt-3 font-display text-3xl font-semibold tracking-tight ${
                    r.tone === "hot" ? "text-warm" : "text-accent"
                  }`}
                >
                  {r.value}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-faint">
              The low surface temperature on the metal roof gives a low temperature on the inside
              ceiling, which results in a low ambient temperature in the room below. Significantly
              reduces surface temperature by about 24°C, and inside ambient temperature by about
              10°C to 18°C.
            </p>
          </Reveal>
        </div>
        <div className="haze haze-bottom" />
      </div>

      {/* Temperature dynamics */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Temperature dynamics</Eyebrow>
              <SplitHeading
                text="Temperatures observed in the UAE."
                className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
              <Reveal>
                <div className="mt-9 flex items-baseline gap-4">
                  <span className="font-display text-6xl font-semibold tracking-tight text-accent">
                    <Counter value={24} suffix="–30°C" />
                  </span>
                  <span className="max-w-[12rem] text-[13.5px] leading-snug text-muted">
                    best-in-class thermal resistant insulation, based on environmental conditions
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal stagger className="flex flex-col justify-center gap-6">
              {temperatureBands.map((b) => (
                <div key={b.region} className="rv">
                  <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                    <span>{b.region}</span>
                    <span className="text-warm">
                      {b.low}°C – {b.high}°C
                    </span>
                  </div>
                  <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="absolute inset-y-0 rounded-full bg-gradient-to-r from-accent via-warm to-warm"
                      style={{ left: `${b.low}%`, right: `${100 - b.high}%` }}
                    />
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Impact of high temperature */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <Eyebrow>Impact of high temperature</Eyebrow>
          <SplitHeading
            text="What untreated heat costs, across four domains."
            className="mt-7 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
          />

          <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impacts.map((d) => (
              <article
                key={d.domain}
                className="rv group overflow-hidden rounded-xl border border-line bg-bg"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 23vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="px-6 py-7">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{d.domain}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {d.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[13.5px] leading-snug text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-accent/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
        <div className="haze haze-bottom" />
      </div>
    </>
  );
}
