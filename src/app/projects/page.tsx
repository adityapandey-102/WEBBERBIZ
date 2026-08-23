import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { Arrow, Eyebrow, IndexLabel } from "@/components/ui";
import { Reveal, SplitHeading } from "@/components/motion";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Container proof of concept, industrial sheds, schools, madrasas and residential roofs — measured temperature reductions from Webberbiz thermal coating and waterproofing.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="A few examples of our work"
        title="Every roof handed over with a number on it."
        lede="Proof of concept work, industrial sheds, schools, madrasas and homes — each with the surface and ambient readings recorded against the baseline before coating."
        image="/img/projects/roof-white-app.webp"
      />

      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          {projects.map((p, i) => (
            <section
              key={p.slug}
              id={p.slug}
              className="scroll-mt-28 border-t border-line py-20 first:border-t-0 md:py-24"
            >
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div className="lg:sticky lg:top-[calc(var(--header-h)+56px)] lg:self-start">
                  <IndexLabel n={i + 1} total={projects.length} />
                  <SplitHeading
                    text={p.title}
                    className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.025em]"
                  />
                  <Reveal>
                    <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                      {p.scope}
                    </p>
                    <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">{p.body}</p>
                  </Reveal>

                  {p.stat && (
                    <Reveal delay={0.08}>
                      <div className="mt-8 inline-flex flex-col rounded-xl border border-accent/25 bg-accent/6 px-6 py-5">
                        <span className="font-display text-3xl font-semibold tracking-tight text-accent">
                          {p.stat.value}
                        </span>
                        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                          {p.stat.label}
                        </span>
                      </div>
                    </Reveal>
                  )}
                </div>

                <Reveal stagger className="grid grid-cols-2 gap-4">
                  {p.images.map((img) => (
                    <figure key={img.src} className="rv group">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          sizes="(max-width: 1024px) 45vw, 28vw"
                          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                        />
                      </div>
                      <figcaption className="mt-2.5 text-[12.5px] leading-snug text-faint">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </Reveal>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Voices */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <Eyebrow>Client voices</Eyebrow>
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      <div className="px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-7 rounded-2xl border border-line bg-surface px-7 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Want the same reading on your roof?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              We start with a survey and a thermal baseline, so the delta we hand back is measured
              against your surface — not a specification sheet.
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
