import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import { Pill, SectionHead } from "@/components/ui";
import { Counter, LineReveal, Reveal } from "@/components/motion";
import {
  company,
  gccCommitments,
  impacts,
  markets,
  marqueeWords,
  products,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Webberbiz Trading LLC — seven years of research on a technology proven for twenty years, formulated for the temperature dynamics of the UAE and GCC.",
};

const credentials = [
  { value: 7, suffix: "", label: "Years of research", note: "Continuous development strategy" },
  { value: 20, suffix: "", label: "Years of proving", note: "Field record in India" },
  { value: 5, suffix: "", label: "Products in the range", note: "Plus COOL G for glass, soon" },
  { value: 5, suffix: "", label: "GCC markets", note: "UAE · KSA · QA · OM · BH" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Webberbiz Trading LLC"
        line1="Aligning to"
        line2="sustainability."
        lede="A Dubai trading house supplying nanotechnology-based thermal coating and waterproofing across the Gulf, built around one conviction: the cheapest kilowatt-hour is the one the building never needs."
        image="/img/bg/dubai-aerial.webp"
      />

      {/* Opening statement */}
      <div className="px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <LineReveal
              lines={["Selective, and highly", "specialised products", "for the UAE and GCC."]}
              className="display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.06]"
              italicFrom={2}
            />
            <Reveal>
              <div className="space-y-5 text-[15.5px] leading-[1.8] text-body lg:pt-3">
                <p>
                  Webberbiz supplies a deliberately narrow range. Each product is built for one
                  substrate and one failure mode — thermal load on metal, thermal load on concrete,
                  water ingress, and surface preparation — rather than sold as a universal coating.
                </p>
                <p>
                  Every product in the range is nanotechnology based, and every specification we
                  issue is backed by a reading taken on the surface itself.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Credentials */}
          <Reveal stagger className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((s) => (
              <div key={s.label} className="border-t border-line pt-7">
                <div className="font-display text-[clamp(2.8rem,5vw,3.8rem)] font-light leading-[0.85] text-ink">
                  <Counter value={s.value} suffix={s.suffix} />
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

      {/* Research */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Research and development"
            line1="A continuous"
            line2="development strategy."
            body="Seven years of research sit on top of a technology that has been proving itself in the field for twenty years in India. What reaches the Gulf is not a new idea — it is a mature one, reformulated for a harsher temperature band."
          />

          <div className="mt-20 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <figure className="group overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/img/bg/research-lab.webp"
                    alt="Formulation and testing"
                    fill
                    sizes="(max-width: 1024px) 92vw, 56vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="bg-bg px-7 py-5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-faint">
                    Formulation
                  </span>
                  <p className="mt-2.5 max-w-lg text-[14px] leading-[1.7] text-body">
                    Ceramic composite chemistry developed and tested against the substrates it will
                    meet on site.
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <div className="grid gap-6 lg:col-span-5">
              {[
                {
                  src: "/img/bg/paint-cans.webp",
                  kicker: "Application",
                  body: "Coats are trialled by brush, roller and spray before a method is specified.",
                },
                {
                  src: "/img/bg/concrete-crack.webp",
                  kicker: "Failure study",
                  body: "How concrete and metal actually fail under Gulf heat decides the formulation.",
                },
              ].map((im) => (
                <Reveal key={im.src}>
                  <figure className="group overflow-hidden rounded-2xl border border-line">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={im.src}
                        alt={im.kicker}
                        fill
                        sizes="(max-width: 1024px) 92vw, 40vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption className="bg-bg px-6 py-4">
                      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-faint">
                        {im.kicker}
                      </span>
                      <p className="mt-2 text-[13.5px] leading-[1.65] text-body">{im.body}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      <Marquee words={marqueeWords} duration={50} />

      {/* Decarbonising — the belief, as a pull quote */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Why we exist"
            line1="Lowering carbon in"
            line2="everything we do."
          />

          <Reveal className="mt-16">
            <blockquote className="lux-card px-8 py-12 sm:px-14 sm:py-16">
              <p className="max-w-4xl font-display text-[clamp(1.4rem,3vw,2.15rem)] font-light leading-[1.45] text-ink">
                &ldquo;Decarbonisation is the process of reducing or eliminating carbon emissions
                from a particular process or sector of the economy. In a business context,
                decarbonising means{" "}
                <span className="display-italic text-ink">
                  continually lowering carbon emissions in everything your business does.
                </span>
                &rdquo;
              </p>
              <footer className="mt-9 flex items-center gap-4 border-t border-line pt-7">
                <span className="h-px w-10 bg-ink/40" />
                <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-faint">
                  Webberbiz Product Presentation, May 2025
                </span>
              </footer>
            </blockquote>
          </Reveal>

          {/* Why heat is the lever */}
          <Reveal stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impacts.map((d) => (
              <div key={d.domain} className="border-t border-line pt-6">
                <h3 className="text-[1.1rem] font-normal tracking-[-0.005em] text-ink">
                  {d.domain}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {d.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13px] leading-snug text-body">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/45" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* The GCC */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Strategy of GCC"
            line1="The region that committed"
            line2="first, and hardest."
            body="The UAE was the first country in the region to sign the Paris Agreement and the first to commit to net zero by 2050. That is the policy backdrop every roof in the Gulf now sits under."
          />

          <Reveal stagger as="ol" className="mt-20 grid gap-x-16 md:grid-cols-2">
            {gccCommitments.map((c) => (
              <li key={c.n} className="border-t border-line py-8">
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

      {/* Range + contact */}
      <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="The range at a glance"
            line1="Five products."
            line2="One system."
            body="Each is selective by design: built for a single substrate and a single failure mode. COOL G, a thermal coating for glass, is marked coming soon in the catalogue."
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
                <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                  {p.comingSoon ? "Coming soon" : (p.weight ?? "")}
                </span>
              </li>
            ))}
          </Reveal>

          <Reveal>
            <div className="mt-20 flex flex-col items-start gap-8 rounded-2xl border border-line bg-surface px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
              <address className="not-italic">
                <span className="font-display text-[1.6rem] font-semibold tracking-tight text-ink">
                  {company.name}
                </span>
                <span className="mt-3 block text-[15px] leading-[1.78] text-body">
                  {company.address.line1}
                  <br />
                  {company.address.line2}, {company.address.country}
                </span>
              </address>
              <Pill href="/contact">Request a Survey</Pill>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
