import Image from "next/image";
import { leakageAreas, metalApplications } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

/** A compact row of the catalogue's own models, at a size that supports the text. */
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

export default function Applications() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="Umpteen applications"
          line1="Anywhere the sun"
          line2="reaches a surface."
          body="One temperature problem, two substrates. On metal it is containers, roofs and rolling stock; on concrete it is buildings, homes, villas and mosques — rooftops and walls alike."
        />

        {/* Two columns of surfaces, set as lists rather than galleries */}
        <div className="mt-20 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h3 className="font-display text-[1.4rem] text-ink">On metal</h3>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                HEAT PLUG
              </span>
            </div>
            <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2">
              {metalApplications.map((a, i) => (
                <li
                  key={a.label}
                  className="flex items-baseline gap-3.5 border-b border-line-soft py-3.5"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] text-body">{a.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12.5px] leading-relaxed text-faint">
              Specified for anti-corrosive properties as well as thermal performance.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h3 className="font-display text-[1.4rem] text-ink">On concrete</h3>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                AQUAPLUG
              </span>
            </div>
            <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2">
              {leakageAreas.map((a, i) => (
                <li
                  key={a}
                  className="flex items-baseline gap-3.5 border-b border-line-soft py-3.5"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] text-body">{a}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12.5px] leading-relaxed text-faint">
              Buildings, homes, villas and mosques, on rooftops and walls — plus animal enclosures,
              farmhouses and walkways.
            </p>
          </Reveal>
        </div>

        {/* Compact model strip */}
        <Reveal stagger className="mt-16 grid grid-cols-4 gap-3 border-t border-line pt-10 sm:grid-cols-8">
          {models.map((m) => (
            <figure key={m.src} className="group text-center">
              <div className="relative mx-auto aspect-square w-full max-w-[92px]">
                <Image
                  src={m.src}
                  alt={m.label}
                  fill
                  sizes="92px"
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
