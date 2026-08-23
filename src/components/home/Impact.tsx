import Image from "next/image";
import { impacts, temperatureBands } from "@/lib/data";
import { Eyebrow } from "../ui";
import { Reveal, SplitHeading } from "../motion";

export default function Impact() {
  return (
    <div className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <SplitHeading
              text="Heat is the tax every surface in the Gulf pays."
              className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            />
            <Reveal>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
                Understanding the temperature dynamics is where every specification begins. These
                are the surface bands observed in the UAE — before any coating is applied.
              </p>
            </Reveal>
          </div>

          {/* Temperature bands */}
          <Reveal stagger className="flex flex-col justify-end gap-4">
            {temperatureBands.map((b) => (
              <div key={b.region} className="rv">
                <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  <span>{b.region}</span>
                  <span className="text-accent">
                    {b.low}°C – {b.high}°C
                  </span>
                </div>
                <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-line">
                  <span
                    className="absolute inset-y-0 rounded-full bg-gradient-to-r from-accent-deep via-accent to-accent-hot"
                    style={{
                      left: `${(b.low / 100) * 100}%`,
                      right: `${100 - (b.high / 100) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="rv mt-3 text-[13px] leading-relaxed text-faint">
              Our products would provide the best-in-class thermal resistant insulation that will
              reduce roof temperatures by 24°C to 30°C, based on environmental conditions.
            </p>
          </Reveal>
        </div>

        {/* Four domains */}
        <Reveal stagger className="mt-20 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {impacts.map((d) => (
            <article key={d.domain} className="rv group relative overflow-hidden bg-bg">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-55 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                <h3 className="absolute bottom-3.5 left-5 font-display text-lg font-semibold tracking-tight">
                  {d.domain}
                </h3>
              </div>
              <ul className="space-y-2.5 px-5 py-6">
                {d.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13.5px] leading-snug text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-accent/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
