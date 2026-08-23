import Image from "next/image";
import ThermalChart from "../ThermalChart";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

/** Instrument photographs behind the numbers in the chart. */
const evidence = [
  { src: "/img/proof/fluke-compare.webp", caption: "71.9°C uncoated against 45.8°C coated" },
  { src: "/img/proof/fluke-58.webp", caption: "58.1°C — uncoated container wall" },
  { src: "/img/proof/fluke-35.webp", caption: "35.4°C — the same wall, coated" },
  { src: "/img/proof/meter-readings.webp", caption: "Paired meters, outer and inner surface" },
  { src: "/img/proof/test-boxes.webp", caption: "Coated and uncoated test boxes" },
  { src: "/img/proof/boxes-field.webp", caption: "Boxes under identical field conditions" },
  { src: "/img/proof/box-glass.webp", caption: "Glazed test box, COOL G trial" },
];

export default function Proof() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="The evidence"
          line1="Not instinct."
          line2="Instrument readings."
          body="Each pair was logged on the same structure at the same moment, with a thermal gun on coated and uncoated sections side by side. The gap between the two bars is the whole product."
        />

        <Reveal className="mt-16">
          <ThermalChart />
        </Reveal>

        {/* How to read it */}
        <Reveal stagger className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Read the gap, not the bar",
              b: "Absolute temperature moves with the weather. What holds steady across sites is the delta — consistently 20°C to 24°C on metal, and up to 30°C in the right conditions.",
            },
            {
              t: "The ceiling follows the roof",
              b: "On the same container the roof fell 24.4°C and the ceiling below it fell 15.3°C. The room does not need to be cooled as hard, which is where the energy saving comes from.",
            },
            {
              t: "Two coats, measured twice",
              b: "The delta is taken after the first coat and again after the second, so the contribution of each layer is visible rather than assumed.",
            },
          ].map((c) => (
            <div key={c.t} className="lux-card px-7 py-8">
              <h3 className="text-[1.05rem] font-medium tracking-[-0.005em] text-ink">{c.t}</h3>
              <p className="mt-3 text-[13.5px] leading-[1.72] text-body">{c.b}</p>
            </div>
          ))}
        </Reveal>

        {/* Instrument photographs */}
        <Reveal stagger className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {evidence.map((e) => (
            <figure key={e.src} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-surface">
                <Image
                  src={e.src}
                  alt={e.caption}
                  fill
                  sizes="(max-width: 768px) 45vw, 16vw"
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.06]"
                />
              </div>
              <figcaption className="mt-2.5 text-[11.5px] leading-snug text-faint">
                {e.caption}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
