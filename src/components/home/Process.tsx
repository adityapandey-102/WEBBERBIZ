import Image from "next/image";
import { process } from "@/lib/data";
import { Eyebrow } from "../ui";
import { Reveal, SplitHeading } from "../motion";

export default function Process() {
  return (
    <div className="relative overflow-hidden bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1320px]">
        <Eyebrow>How we work</Eyebrow>
        <SplitHeading
          text="Five steps from first reading to a documented delta."
          className="mt-7 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* Sticky image */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+56px)]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line">
                <Image
                  src="/img/work/roller-roof.webp"
                  alt="Applying thermal coating with a roller"
                  fill
                  sizes="(min-width: 1024px) 38vw, 0px"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-faint">
                Good surface preparation is mandatory. Every reduction we quote is a measurement
                taken on site, not a specification sheet figure.
              </p>
            </div>
          </div>

          {/* Steps */}
          <Reveal stagger as="ol" className="space-y-0">
            {process.map((s) => (
              <li key={s.n} className="rv border-t border-line py-8 last:border-b">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{s.n}</span>
                  <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3.5 max-w-xl pl-10 text-[15px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
