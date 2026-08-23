import Image from "next/image";
import { metalApplications } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

/** The catalogue's own 3D application models, over the photographed reality. */
const models = [
  { src: "/img/apps/container.png", label: "Shipping containers" },
  { src: "/img/apps/truck-trailer.png", label: "Trailer roofs" },
  { src: "/img/apps/delivery-truck.png", label: "Temp-controlled trucks" },
  { src: "/img/apps/portacabin.png", label: "Portacabins" },
  { src: "/img/apps/industrial-shed.png", label: "Industrial sheds" },
  { src: "/img/apps/villa.png", label: "Villas & homes" },
  { src: "/img/apps/mosque.png", label: "Mosques" },
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
          body="On metal: containers, bus and train roof tops, industrial and farm sheds, oil field installations, bus shelters, train stations, refrigerated delivery trucks and water storage tanks. On concrete: buildings, homes, villas and mosques, on rooftops and walls alike."
        />

        {/* Model set */}
        <Reveal stagger className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {models.map((m) => (
            <figure key={m.src} className="group lux-card px-4 py-6 text-center">
              <div className="relative mx-auto aspect-[4/3] w-full">
                <Image
                  src={m.src}
                  alt={m.label}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-contain transition-transform duration-1000 ease-out-expo group-hover:scale-[1.07]"
                />
              </div>
              <figcaption className="mt-4 text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                {m.label}
              </figcaption>
            </figure>
          ))}
        </Reveal>

        {/* Heavy industry */}
        <Reveal className="mt-6 overflow-hidden rounded-2xl border border-line">
          <div className="relative aspect-[21/9]">
            <Image
              src="/img/bg/oil-refinery.webp"
              alt="Oil field installation"
              fill
              sizes="(max-width: 1024px) 92vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Photographed reality */}
        <Reveal stagger className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {metalApplications.map((a) => (
            <figure key={a.label} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-line">
                <Image
                  src={a.image}
                  alt={a.label}
                  fill
                  sizes="(max-width: 640px) 45vw, 18vw"
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.07]"
                />
              </div>
              <figcaption className="mt-2.5 text-[12.5px] leading-snug text-body">
                {a.label}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
