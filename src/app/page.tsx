import Hero from "@/components/home/Hero";
import Marquee from "@/components/Marquee";
import ImpactDiagram from "@/components/home/ImpactDiagram";
import Thinking from "@/components/home/Thinking";
import Philosophy from "@/components/home/Philosophy";
import Statement from "@/components/home/Statement";
import ProductShowcase from "@/components/ProductShowcase";
import Proof from "@/components/home/Proof";
import Process from "@/components/home/Process";
import Terminal from "@/components/home/Terminal";
import DecarbonisingJourney from "@/components/DecarbonisingJourney";
import Lenses from "@/components/home/Lenses";
import Principles from "@/components/home/Principles";
import Applications from "@/components/home/Applications";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Reviews from "@/components/home/Reviews";
import CTA from "@/components/home/CTA";
import Accordion from "@/components/Accordion";
import { SectionHead } from "@/components/ui";
import { SurveyAutoOpen } from "@/components/SurveyModal";
import { faqs, marqueeWords } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <SurveyAutoOpen />
      <Hero />
      <Marquee words={marqueeWords} />
      <ImpactDiagram />
      {/* <Thinking /> */}
      <Philosophy />
      <Statement />
      <ProductShowcase />
      <Proof />
      <Process />
      <Terminal />
      <DecarbonisingJourney />
      <Lenses />
      <Principles />
      <Applications />
      <ProjectsPreview />
      <Reviews />

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
