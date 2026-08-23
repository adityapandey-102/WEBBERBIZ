import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { Pill, SectionHead } from "@/components/ui";
import { LineReveal, Reveal } from "@/components/motion";
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
        line1="Every roof handed over"
        line2="with a number on it."
        lede="Proof of concept work, industrial sheds, schools, madrasas and homes — each with the surface and ambient readings recorded against the baseline before coating."
        image="/img/projects/solar-after.webp"
      />

      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          {projects.map((p, i) => (
            <section
              key={p.slug}
              id={p.slug}
              className="scroll-mt-28 border-t border-line py-20 first:border-t-0 md:py-24"
            >
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>

                  <LineReveal
                    lines={[p.title]}
                    className="display mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.06]"
                  />

                  <Reveal>
                    <p className="mt-5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-faint">
                      {p.scope}
                    </p>
                    <p className="mt-6 max-w-lg text-[15px] leading-[1.78] text-body">{p.body}</p>
                  </Reveal>

                  {p.stat && (
                    <Reveal delay={0.08}>
                      <div className="lux-card mt-9 inline-flex flex-col px-7 py-6">
                        <span className="font-display text-[2.6rem] font-light leading-[0.85] text-ink">
                          {p.stat.value}
                        </span>
                        <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                          {p.stat.label}
                        </span>
                      </div>
                    </Reveal>
                  )}
                </div>

                <Reveal stagger className="grid grid-cols-2 gap-4">
                  {p.images.map((img) => (
                    <figure key={img.src} className="group">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line">
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          sizes="(max-width: 1024px) 45vw, 28vw"
                          className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.07]"
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

      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <SectionHead
            eyebrow="Client voices"
            line1="Validated by the"
            line2="people who live under it."
            body="The catalogue carries one letter, signed by two people, about a twenty-four-year-old house with the same two complaints we hear most: heat inside, and leakage through the cracks."
          />
          <div className="mt-16">
            <Testimonials />
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      <div className="px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-8 rounded-2xl border border-line bg-surface px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display text-[clamp(1.7rem,3.2vw,2.4rem)]">
              Want the same reading on your roof?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.78] text-body">
              We start with a survey and a thermal baseline, so the delta we hand back is measured
              against your surface — not a specification sheet.
            </p>
          </div>
          <Pill href="/contact">Request a Survey</Pill>
        </div>
      </div>
    </>
  );
}
