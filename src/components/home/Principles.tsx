import Image from "next/image";
import { protections } from "@/lib/data";
import { Eyebrow } from "../ui";
import { Reveal, SplitHeading } from "../motion";

const pillars = [
  {
    title: "Nanotechnology, not paint",
    body: "A nanometer is one-billionth of a meter. A single-walled nano-tube multiplied by a hundred thousand equals one strand of human hair — that is the scale the ceramic composite works at.",
    image: "/img/bg/carbon-nanotube.webp",
  },
  {
    title: "Measured, not claimed",
    body: "Every project carries an instrument reading. 70.7°C uncoated against 46.3°C coated on a container roof; 46.1°C against 30.8°C on the ceiling below it.",
    image: "/img/proof/fluke-58.webp",
  },
  {
    title: "Twenty years of proving",
    body: "Seven years of research on top of a technology proven in the field for twenty years in India, now formulated for the temperature dynamics of the Gulf.",
    image: "/img/bg/research-lab.webp",
  },
];

export default function Principles() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1320px]">
        <Eyebrow>Our principles</Eyebrow>
        <SplitHeading
          text="Three things every Webberbiz specification holds to."
          className="mt-7 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
        />

        <Reveal stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <article key={p.title} className="rv group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 92vw, 30vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl font-medium tracking-tight">{p.title}</h3>
              </div>
              <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </Reveal>

        {/* All-in-one protection */}
        <Reveal className="mt-20 rounded-xl border border-line bg-surface px-7 py-9 sm:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                All-in-one protection
              </h3>
              <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-muted">
                What a single coat of the PU product stands between your surface and the Gulf
                climate.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {protections.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-line bg-bg px-4 py-2 text-[13px] text-muted transition-colors duration-400 hover:border-accent/40 hover:text-accent"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
