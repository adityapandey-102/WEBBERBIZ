import Hero from "@/components/home/Hero";
import Marquee from "@/components/Marquee";
import Thinking from "@/components/home/Thinking";
import Philosophy from "@/components/home/Philosophy";
import Statement from "@/components/home/Statement";
import Range from "@/components/home/Range";
import Proof from "@/components/home/Proof";
import Process from "@/components/home/Process";
import Terminal from "@/components/home/Terminal";
import WhyGCC from "@/components/home/WhyGCC";
import Lenses from "@/components/home/Lenses";
import Principles from "@/components/home/Principles";
import Applications from "@/components/home/Applications";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import CTA from "@/components/home/CTA";
import Testimonials from "@/components/Testimonials";
import Accordion from "@/components/Accordion";
import { SectionHead } from "@/components/ui";
import { faqs, marqueeWords } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee words={marqueeWords} />
      {/* <Thinking /> */}
      <Philosophy />
      <Statement />
      <Range />
      <Proof />
      <Process />
      <Terminal />
      <WhyGCC />
      <Lenses />
      <Principles />
      <Applications />
      <ProjectsPreview />

      {/* Client voices */}
      <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
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
      </div>

      {/* Direct answers */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHead
                eyebrow="Direct answers"
                line1="Clear parameters."
                line2="Total transparency."
                size="md"
              />
            </div>
            <Accordion items={faqs} />
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>

      <CTA />
    </>
  );
}
