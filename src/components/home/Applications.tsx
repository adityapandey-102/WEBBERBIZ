"use client";

import Image from "next/image";
import { useState } from "react";
import ScrollingRow from "../ScrollingRow";
import { metalApplications } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

/**
 * The catalogue's own application models. Each opens a small dialogue on hover —
 * on touch, where there is no hover, the row scrolls horizontally and a tap
 * opens the same panel.
 */
const models = [
  {
    src: "/img/apps/container.png",
    label: "Containers",
    note: "The proof-of-concept substrate. A 10-foot container fell from 70.7°C to 46.3°C at the roof.",
    product: "HEAT PLUG · metal",
  },
  {
    src: "/img/apps/truck-trailer.png",
    label: "Trailer roofs",
    note: "Trailer and rolling-stock roofs take direct sun all day, with no shade and constant vibration.",
    product: "HEAT PLUG · metal",
  },
  {
    src: "/img/apps/industrial-shed.png",
    label: "Industrial sheds",
    note: "Across multiple sheds the roof came down from 57.4°C to 36.1°C — a 20°C to 24°C reduction.",
    product: "HEAT PLUG · metal",
  },
  {
    src: "/img/apps/portacabin.png",
    label: "Portacabins",
    note: "Thin steel shells with little insulation, so the inside ambient tracks the roof almost exactly.",
    product: "HEAT PLUG · metal",
  },
  {
    src: "/img/apps/villa.png",
    label: "Villas & homes",
    note: "Recommended for all buildings, homes and villas — on rooftops and walls alike.",
    product: "HEAT PLUG · concrete",
  },
  {
    src: "/img/apps/mosque.png",
    label: "Mosques",
    note: "Rooftops, side walls and the outside areas of masjids, applied as two coats before colour.",
    product: "HEAT PLUG · concrete",
  },
  {
    src: "/img/apps/delivery-truck.png",
    label: "Cold trucks",
    note: "Temperature-controlled delivery vehicles, where every degree off the roof is refrigeration load saved.",
    product: "HEAT PLUG · metal",
  },
  {
    src: "/img/apps/container-cafe.png",
    label: "Container builds",
    note: "Occupied container conversions, where the ceiling below the roof fell 46.1°C to 30.8°C.",
    product: "HEAT PLUG · metal",
  },
];

function ModelCard({ m }: { m: (typeof models)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <figure
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      className="group relative h-[230px] w-[210px] shrink-0 select-none rounded-2xl border border-line bg-bg px-5 py-6 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/25 sm:h-[250px] sm:w-[230px]"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[130px]">
        <Image
          src={m.src}
          alt={m.label}
          fill
          sizes="130px"
          className="object-contain transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />
      </div>
      <figcaption className="mt-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-strong">
        {m.label}
      </figcaption>

      {/* Dialogue */}
      <div
        role="tooltip"
        aria-hidden={!open}
        className={`pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-40 w-[260px] -translate-x-1/2 rounded-xl border border-line bg-bg p-4 text-left shadow-[0_24px_60px_-18px_rgba(35,26,20,0.3)] transition-all duration-400 ease-out-expo ${
          open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="text-[9.5px] font-medium uppercase tracking-[0.2em] text-faint">
          {m.product}
        </span>
        <p className="mt-2 text-[13px] leading-[1.65] text-body">{m.note}</p>
        {/* pointer */}
        <span
          aria-hidden
          className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-line bg-bg"
        />
      </div>
    </figure>
  );
}

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

      {/* Full-bleed moving row of photographed surfaces */}
      <Reveal className="mt-16">
        <ScrollingRow items={cards} duration={30} />
      </Reveal>

      {/* Model set — hover (or tap) for the detail */}
      <div className="mx-auto mt-20 w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
            Hover a surface for detail
          </p>
        </Reveal>

        {/* horizontal scroll on small screens, wrapped grid above */}
        <Reveal className="mt-6">
          <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 pt-14 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {models.map((m) => (
              <ModelCard key={m.src} m={m} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
