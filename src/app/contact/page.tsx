import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";
import { Eyebrow } from "@/components/ui";
import { Reveal, SplitHeading } from "@/components/motion";
import { company, faqs, markets } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a survey from Webberbiz Trading LLC — Al Ghurair Centre, Deira, Dubai, United Arab Emirates.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a survey."
        lede="Send us the surface, the area and what it is costing you to cool. We will come back with the specification, the expected delta and the energy it saves."
        image="/img/work/roller-roof.webp"
      />

      <div className="px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            {/* Details */}
            <div className="space-y-8">
              <Reveal className="rounded-2xl border border-line bg-surface px-7 py-8">
                <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                  Office
                </h2>
                <address className="mt-5 not-italic text-[16px] leading-relaxed text-ink">
                  <span className="font-display font-semibold">{company.name}</span>
                  <br />
                  <span className="text-muted">
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                    <br />
                    {company.address.country}
                  </span>
                </address>

                <div className="mt-7 space-y-3 border-t border-line pt-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                      Phone
                    </div>
                    <a
                      href={`tel:${company.phone.replace(/\s/g, "")}`}
                      className="ulink mt-1 inline-block text-[15px] text-muted hover:text-accent"
                    >
                      {company.phone}
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                      Email
                    </div>
                    <a
                      href={`mailto:${company.email}`}
                      className="ulink mt-1 inline-block text-[15px] text-muted hover:text-accent"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal className="rounded-2xl border border-line bg-surface px-7 py-8">
                <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                  Markets served
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {markets.map((m) => (
                    <li key={m.name} className="flex items-center gap-3">
                      <Image
                        src={m.flag}
                        alt=""
                        width={80}
                        height={80}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="text-[14.5px] text-muted">{m.name}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/img/bg/dubai-night.webp"
                    alt="Dubai skyline"
                    fill
                    sizes="(max-width: 1024px) 92vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="haze haze-top" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>Direct answers</Eyebrow>
              <SplitHeading
                text="Before you write to us."
                className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
            </div>
            <Accordion items={faqs} />
          </div>
        </div>
        <div className="haze haze-bottom" />
      </div>
    </>
  );
}
