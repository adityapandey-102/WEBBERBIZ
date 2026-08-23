import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";
import { SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
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
        line1="Request"
        line2="a survey."
        lede="Send us the surface, the area and what it is costing you to cool. We come back with the specification, the expected delta and the energy it saves."
        image="/img/work/roller-roof.webp"
      />

      <div className="px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            <div className="space-y-6">
              <Reveal className="lux-card px-8 py-9">
                <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
                  Office
                </h2>
                <address className="mt-6 not-italic text-[15.5px] leading-[1.78]">
                  <span className="font-display text-[1.5rem] font-semibold tracking-tight text-ink">
                    {company.name}
                  </span>
                  <span className="mt-2 block text-body">
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                    <br />
                    {company.address.country}
                  </span>
                </address>

                <div className="mt-7 space-y-4 border-t border-line pt-6">
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                      Phone
                    </div>
                    <a
                      href={`tel:${company.phone.replace(/\s/g, "")}`}
                      className="ulink mt-1.5 inline-block text-[15px] text-body hover:text-ink"
                    >
                      {company.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                      Email
                    </div>
                    <a
                      href={`mailto:${company.email}`}
                      className="ulink mt-1.5 inline-block text-[15px] text-body hover:text-ink"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal className="lux-card px-8 py-9">
                <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
                  Markets served
                </h2>
                <ul className="mt-6 space-y-4">
                  {markets.map((m) => (
                    <li key={m.name} className="flex items-center gap-3">
                      <Image
                        src={m.flag}
                        alt=""
                        width={80}
                        height={80}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="text-[14.5px] text-body">{m.name}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/img/bg/dubai-night.webp"
                    alt="Dubai at night"
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
    </>
  );
}
