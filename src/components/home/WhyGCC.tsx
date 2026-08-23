import Image from "next/image";
import { markets } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

const facts = [
  {
    value: "1st",
    label: "In the region to sign the Paris Agreement",
    body: "The UAE was the first country in the region to sign the Paris Agreement, and the first to commit to net zero carbon emissions by 2050.",
  },
  {
    value: "79°C",
    label: "Peak observed surface temperature",
    body: "Across the bands observed in the UAE, surfaces sit between 63°C and 79°C — the load every roof, container and shed carries through the day.",
  },
  {
    value: "3.94%",
    label: "Of global greenhouse gas emissions",
    body: "Air conditioning releases the equivalent of 1,950 million tons of CO₂ annually. Lowering the roof lowers the load that produces it.",
  },
  {
    value: "2050",
    label: "Net zero carbon commitment",
    body: "To lead on climate change the government is decarbonising oil and gas, ramping up renewables, and transitioning food and transportation systems.",
  },
  {
    value: "5",
    label: "GCC markets served",
    body: "The United Arab Emirates, Saudi Arabia, Qatar, Oman and Bahrain — one temperature problem, one specialised product range.",
  },
];

export default function WhyGCC() {
  return (
    <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="Why the GCC"
          line1="The region that committed"
          line2="first, and hardest."
          body="Decarbonisation is the process of reducing or eliminating carbon emissions from a sector of the economy. In a business context it means continually lowering carbon in everything your business does — and in the Gulf, that conversation starts on the roof."
        />

        {/* The commitment, pictured */}
        <Reveal className="mt-16 overflow-hidden rounded-2xl border border-line">
          <div className="relative aspect-[21/9]">
            <Image
              src="/img/flags/uae-waving.png"
              alt="Flag of the United Arab Emirates"
              fill
              sizes="(max-width: 1024px) 92vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Editorial stat list */}
        <Reveal stagger className="mt-20">
          {facts.map((f) => (
            <div
              key={f.label}
              className="grid gap-4 border-t border-line py-9 last:border-b lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
            >
              <div>
                <div className="font-display text-[clamp(2.6rem,5vw,4rem)] font-light leading-[0.9] text-ink">
                  {f.value}
                </div>
                <div className="mt-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-faint">
                  {f.label}
                </div>
              </div>
              <p className="max-w-xl text-[15px] leading-[1.78] text-body lg:pt-3">{f.body}</p>
            </div>
          ))}
        </Reveal>

        {/* Markets */}
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
  );
}
