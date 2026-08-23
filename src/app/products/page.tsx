import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import { Arrow, Eyebrow, IndexLabel } from "@/components/ui";
import { Reveal, SplitHeading } from "@/components/motion";
import {
  leakageAreas,
  metalApplications,
  products,
  protections,
  waterUseCases,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "HEAT PLUG thermal coating for metal and concrete, AQUAPLUG nanotechnology waterproofing, SurfaKlean surface preparation and COOL G for glass.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product range"
        title="Selective and highly specialised products for the UAE and GCC."
        lede="Five formulations, each built for one substrate and one failure mode — thermal load on metal, thermal load on concrete, water ingress, surface preparation, and glass."
        image="/img/bg/paint-cans.webp"
      />

      {/* Product detail */}
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          {products.map((p, i) => (
            <section
              key={p.slug}
              id={p.slug}
              className="scroll-mt-28 border-t border-line py-20 first:border-t-0 md:py-28"
            >
              <div
                className={`grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Copy */}
                <div>
                  <div className="flex items-center justify-between">
                    <IndexLabel n={i + 1} total={products.length} />
                    {p.comingSoon && (
                      <span className="rounded-full border border-cool/40 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-cool">
                        Coming soon
                      </span>
                    )}
                  </div>

                  {p.wordmark ? (
                    <Image
                      src={p.wordmark}
                      alt={p.name}
                      width={520}
                      height={140}
                      className="mt-6 h-11 w-auto object-contain object-left sm:h-14"
                    />
                  ) : (
                    <h2 className="mt-6 font-display text-4xl font-bold tracking-tight">
                      {p.name}
                    </h2>
                  )}

                  <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                    {p.category}
                    {p.base ? ` · base ${p.base}` : ""}
                  </p>

                  <SplitHeading
                    text={p.headline}
                    as="h3"
                    className="mt-7 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-[1.16] tracking-[-0.02em]"
                  />

                  <Reveal>
                    <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted">
                      {p.blurb}
                    </p>
                  </Reveal>

                  {p.detail.length > 0 && (
                    <Reveal stagger className="mt-6 space-y-3.5">
                      {p.detail.map((d) => (
                        <p key={d} className="rv max-w-xl text-[14.5px] leading-relaxed text-muted">
                          {d}
                        </p>
                      ))}
                    </Reveal>
                  )}

                  <Reveal stagger className="mt-8 flex flex-wrap gap-2.5">
                    {p.properties.map((prop) => (
                      <span
                        key={prop}
                        className="rv rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-muted"
                      >
                        {prop}
                      </span>
                    ))}
                  </Reveal>
                </div>

                {/* Pack shot */}
                <Reveal className="flex items-center justify-center">
                  <div className="relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface">
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 translate-y-1/3 rounded-full opacity-25 blur-[70px]"
                      style={{
                        background:
                          p.tone === "cool" ? "var(--color-cool)" : "var(--color-accent)",
                      }}
                    />
                    <Image
                      src={p.image}
                      alt={`${p.name} — ${p.category}`}
                      width={620}
                      height={760}
                      sizes="(max-width: 1024px) 80vw, 40vw"
                      className="relative h-[78%] w-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </Reveal>
              </div>
            </section>
          ))}
        </div>
      </div>

      <Marquee words={protections} duration={34} />

      {/* Metal applications */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <Eyebrow>Umpteen applications</Eyebrow>
          <SplitHeading
            text="Where HEAT PLUG goes on metal."
            className="mt-7 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
          />

          <Reveal stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {metalApplications.map((a) => (
              <figure key={a.label} className="rv group">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-line">
                  <Image
                    src={a.image}
                    alt={a.label}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                  />
                </div>
                <figcaption className="mt-3 text-[13px] leading-snug text-muted">
                  {a.label}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Waterproofing */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>AQUAPLUG</Eyebrow>
              <SplitHeading
                text="Stops leakages in eleven places most systems only cover."
                className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
              <Reveal>
                <p className="mt-7 max-w-lg text-[15.5px] leading-relaxed text-muted">
                  Proven waterproofing technology for the past 20 years. The composite-based
                  compound works on wicking action, is done without disturbing the existing surface,
                  and leakage stops in 8 hours.
                </p>
              </Reveal>
              <Reveal stagger className="mt-9 flex flex-wrap gap-2.5">
                {leakageAreas.map((a) => (
                  <span
                    key={a}
                    className="rv rounded-full border border-line bg-bg px-4 py-2 text-[13px] text-muted transition-colors duration-400 hover:border-cool/50 hover:text-cool"
                  >
                    {a}
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal stagger className="grid grid-cols-2 gap-4">
              {waterUseCases.map((u) => (
                <figure key={u.label} className="rv group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                    <Image
                      src={u.image}
                      alt={u.label}
                      fill
                      sizes="(max-width: 1024px) 45vw, 22vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-[12.5px] text-muted">{u.label}</figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      {/* Tail CTA */}
      <div className="px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-7 rounded-2xl border border-line bg-surface px-7 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Not sure which formulation the surface needs?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              Send us the substrate and the area. We will specify the product, the number of coats
              and the expected reduction.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-hot hover:shadow-[0_0_44px_-8px_var(--color-accent)]"
          >
            Request a survey
            <Arrow />
          </Link>
        </div>
      </div>
    </>
  );
}
