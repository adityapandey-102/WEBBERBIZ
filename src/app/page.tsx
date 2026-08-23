import Hero from "@/components/home/Hero";
import Marquee from "@/components/Marquee";
import Layers from "@/components/home/Layers";
import Impact from "@/components/home/Impact";
import Range from "@/components/home/Range";
import Process from "@/components/home/Process";
import Terminal from "@/components/home/Terminal";
import Framework from "@/components/home/Framework";
import Principles from "@/components/home/Principles";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import CTA from "@/components/home/CTA";
import Testimonials from "@/components/Testimonials";
import Accordion from "@/components/Accordion";
import { Eyebrow } from "@/components/ui";
import { SplitHeading } from "@/components/motion";
import { faqs, marqueeWords } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee words={marqueeWords} />
      <Layers />
      <Impact />
      <Range />
      <Process />
      <Terminal />
      <Framework />
      <Principles />
      <ProjectsPreview />

      {/* Client voices */}
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

      {/* Direct answers */}
      <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>Direct answers</Eyebrow>
              <SplitHeading
                text="The questions that decide a specification."
                className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
            </div>
            <Accordion items={faqs} />
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}
