import Image from "next/image";
import ScrollingRow from "../ScrollingRow";
import { leakageAreas, metalApplications } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

/** The catalogue's own models, kept as a quiet index beneath the lists. */
const models = [
  { src: "/img/apps/container.png", label: "Containers" },
  { src: "/img/apps/truck-trailer.png", label: "Trailers" },
  { src: "/img/apps/industrial-shed.png", label: "Sheds" },
  { src: "/img/apps/portacabin.png", label: "Portacabins" },
  { src: "/img/apps/villa.png", label: "Villas" },
  { src: "/img/apps/mosque.png", label: "Mosques" },
  { src: "/img/apps/delivery-truck.png", label: "Cold trucks" },
  { src: "/img/apps/container-cafe.png", label: "Container builds" },
];

const cards = metalApplications.map((a, i) => (
  <figure
    key={a.label}
    className="group/card relative h-[380px] w-[300px] overflow-hidden rounded-[20px] border border-line sm:h-[420px] sm:w-[340px]"
  >
    <Image
      src={a.image}
      alt={a.label}
      fill
      sizes="340px"
      className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover/card:scale-[1.06]"
    />
    {/* readable foot */}
    <div className="absolute inset-0 bg-gradient-to-t from-ink-strong/85 via-ink-strong/10 to-transparent" />
    <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
      <span className="font-display text-[1.35rem] leading-tight text-white">{a.label}</span>
      <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-white/60">
        {String(i + 1).padStart(2, "0")}
      </span>
    </figcaption>
  </figure>
));

export default function Applications() {
  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="Umpteen applications"
          line1="Anywhere the sun"
          line2="reaches a surface."
          body="One temperature problem, two substrates. On metal it is containers, roofs and rolling stock; on concrete it is buildings, homes, villas and mosques — rooftops and walls alike."
        />
      </div>

      {/* Full-bleed moving row */}
      <Reveal className="mt-16">
        <ScrollingRow items={cards} duration={30} />
      </Reveal>

      <div className="mx-auto mt-20 w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {[
            {
              title: "On metal",
              product: "HEAT PLUG",
              items: metalApplications.map((a) => a.label),
              note: "Specified for anti-corrosive properties as well as thermal performance.",
            },
            {
              title: "On concrete",
              product: "AQUAPLUG",
              items: leakageAreas,
              note: "Buildings, homes, villas and mosques, on rooftops and walls — plus animal enclosures, farmhouses and walkways.",
            },
          ].map((col, ci) => (
            <Reveal key={col.title} delay={ci * 0.06}>
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <h3 className="font-display text-[1.5rem] text-ink">{col.title}</h3>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                  {col.product}
                </span>
              </div>
              <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2">
                {col.items.map((label, i) => (
                  <li
                    key={label}
                    className="flex items-baseline gap-3.5 border-b border-line-soft py-3.5"
                  >
                    <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] text-body">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12.5px] leading-relaxed text-faint">{col.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          stagger
          className="mt-16 grid grid-cols-4 gap-3 border-t border-line pt-10 sm:grid-cols-8"
        >
          {models.map((m) => (
            <figure key={m.src} className="group text-center">
              <div className="relative mx-auto aspect-square w-full max-w-[88px]">
                <Image
                  src={m.src}
                  alt={m.label}
                  fill
                  sizes="88px"
                  className="object-contain transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
              </div>
              <figcaption className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">
                {m.label}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
