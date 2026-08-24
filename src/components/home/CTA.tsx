import { company } from "@/lib/data";
import { Pill } from "../ui";
import { SurveyButton } from "../SurveyModal";
import { LineReveal, Reveal } from "../motion";

export default function CTA() {
  return (
    <div className="relative px-5 py-32 sm:px-8 md:py-40 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px] text-center">
        <LineReveal
          as="h2"
          lines={["Tell us what the roof is doing.", "We will tell you what it could be."]}
          className="display mx-auto max-w-[22ch] text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.02]"
          italicFrom={1}
        />

        <Reveal>
          <p className="mx-auto mt-9 max-w-xl text-[15.5px] leading-[1.78] text-body">
            Send us the surface, the area and what it is costing you to cool. We come back with the
            specification, the expected delta and the energy it saves.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <SurveyButton className="inline-flex items-center gap-2.5 rounded-full bg-accent-soft px-7 py-3.5 text-[13.5px] font-semibold tracking-[0.02em] text-white transition-all duration-500 ease-out-expo hover:bg-ink">
              Request a Survey
            </SurveyButton>
            <Pill href="/technology" variant="outline">
              How the coating works
            </Pill>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <address className="mt-16 not-italic text-[10.5px] font-medium uppercase leading-relaxed tracking-[0.22em] text-faint">
            {company.address.line1} · {company.address.line2}
            <br />
            {company.address.country}
          </address>
        </Reveal>
      </div>
    </div>
  );
}
