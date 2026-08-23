import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/data";
import { Arrow } from "../ui";
import { Reveal, SplitHeading } from "../motion";

export default function CTA() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/projects/white-roof-wide.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg/88" />
      </div>

      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 py-28 sm:px-8 md:py-36 lg:px-12">
        <div className="max-w-3xl">
          <SplitHeading
            text="Tell us what the roof is doing. We will tell you what it could be."
            className="font-display text-[clamp(2.1rem,5.4vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          />
          <Reveal>
            <p className="mt-8 max-w-xl text-[16.5px] leading-relaxed text-muted">
              Send us the surface, the area and what it is costing you to cool. We will come back
              with the specification, the expected delta and the energy it saves.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-hot hover:shadow-[0_0_44px_-8px_var(--color-accent)]"
              >
                Request a survey
                <Arrow />
              </Link>
              <Link
                href="/technology"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/60 hover:bg-accent/8 hover:text-accent"
              >
                How the coating works
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <address className="mt-14 not-italic font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-faint">
              {company.address.line1} · {company.address.line2}
              <br />
              {company.address.country}
            </address>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
