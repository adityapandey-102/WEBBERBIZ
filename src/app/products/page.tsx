import type { Metadata } from "next";
import Image from "next/image";
import ProductShowcase from "@/components/ProductShowcase";
import Marquee from "@/components/Marquee";
import { Pill, SectionHead } from "@/components/ui";
import { FlyerProvider, FlyerButton } from "@/components/FlyerModal";
import { LineReveal, Reveal } from "@/components/motion";
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
      <ProductShowcase />

      <FlyerProvider>
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          {products.map((p, i) => (
            <section
              key={p.slug}
              id={p.slug}
              className="scroll-mt-28 border-t border-line py-20 first:border-t-0 md:py-28"
            >
              <div
                className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint">
                      {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                    </span>
                    {p.comingSoon && (
                      <span className="rounded-full border border-line px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-muted">
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
                      className="mt-7 h-11 w-auto object-contain object-left sm:h-14"
                    />
                  ) : (
                    <h2 className="mt-7 font-display text-5xl font-semibold tracking-tight text-ink">
                      {p.name}
                    </h2>
                  )}

                  <p className="mt-5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-faint">
                    {p.category}
                    {p.note ? ` — ${p.note}` : ""}
                    {p.base ? ` · base ${p.base}` : ""}
                  </p>

                  {/* What the pack itself states */}
                  {(p.packaging || p.weight) && (
                    <dl className="mt-7 divide-y divide-line border-y border-line">
                      {p.packaging && (
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                          <dt className="w-28 shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                            On the pack
                          </dt>
                          <dd className="text-[13.5px] leading-[1.7] text-body">{p.packaging}</dd>
                        </div>
                      )}
                      {p.weight && (
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                          <dt className="w-28 shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                            Nett weight
                          </dt>
                          <dd className="text-[13.5px] leading-[1.7] text-body">{p.weight}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  <LineReveal
                    as="h3"
                    lines={[p.headline]}
                    className="mt-8 max-w-lg text-[clamp(1.25rem,2.2vw,1.7rem)] font-normal leading-[1.3] tracking-[-0.01em] text-ink-strong"
                  />

                  <Reveal>
                    <p className="mt-6 max-w-lg text-[15px] leading-[1.78] text-body">{p.blurb}</p>
                  </Reveal>

                  {p.detail.length > 0 && (
                    <Reveal stagger className="mt-5 space-y-4">
                      {p.detail.map((d) => (
                        <p key={d} className="max-w-lg text-[14px] leading-[1.75] text-body">
                          {d}
                        </p>
                      ))}
                    </Reveal>
                  )}

                  <Reveal stagger className="mt-9 flex flex-wrap gap-2.5">
                    {p.properties.map((prop) => (
                      <span
                        key={prop}
                        className="rounded-full border border-line bg-surface px-4 py-2 text-[12.5px] text-body"
                      >
                        {prop}
                      </span>
                    ))}
                  </Reveal>

                  <Reveal className="mt-8">
                    <FlyerButton product={p} />
                  </Reveal>
                </div>

                <Reveal className="flex items-center justify-center">
                  <div className="lux-card relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.name} — ${p.category}`}
                      width={620}
                      height={760}
                      sizes="(max-width: 1024px) 80vw, 40vw"
                      className="relative h-[76%] w-auto object-contain"
                    />
                  </div>

                </Reveal>
              </div>
            </section>
          ))}
        </div>
      </div>
      </FlyerProvider>

      <Marquee words={protections} duration={44} />

      {/* Metal applications */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Umpteen applications"
            line1="Where HEAT PLUG"
            line2="goes on metal."
            body="Containers, bus and train roof tops, industrial and farm sheds, oil field installations, bus shelters, train stations, temperature-controlled delivery trucks and water storage tanks."
          />

          <Reveal stagger className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {metalApplications.map((a) => (
              <figure key={a.label} className="group">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-line">
                  <Image
                    src={a.image}
                    alt={a.label}
                    fill
                    sizes="(max-width: 640px) 45vw, 18vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.07]"
                  />
                </div>
                <figcaption className="mt-2.5 text-[12.5px] leading-snug text-body">
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
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="AQUAPLUG"
            line1="Works with water."
            line2="Against water."
            body="Where the market lays a parchment over the surface and leaves the crack intact underneath, the nano particulates travel with water into the crack and seal it from within. Proven for twenty years; leakage stops in eight hours."
          />

          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal stagger className="flex flex-wrap content-start gap-2.5">
              {leakageAreas.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-line bg-bg px-4 py-2 text-[13px] text-body transition-colors duration-400 hover:border-ink/30 hover:text-ink"
                >
                  {a}
                </span>
              ))}
            </Reveal>

            <Reveal stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {waterUseCases.map((u) => (
                <figure key={u.label} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-line">
                    <Image
                      src={u.image}
                      alt={u.label}
                      fill
                      sizes="(max-width: 1024px) 45vw, 20vw"
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.07]"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-[12px] text-body">{u.label}</figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      <div className="px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-8 rounded-2xl border border-line bg-surface px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display text-[clamp(1.7rem,3.2vw,2.4rem)]">
              Not sure which formulation the surface needs?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.78] text-body">
              Send us the substrate and the area. We will specify the product, the number of coats
              and the expected reduction.
            </p>
          </div>
          <Pill href="/contact">Request a Survey</Pill>
        </div>
      </div>
    </>
  );
}
