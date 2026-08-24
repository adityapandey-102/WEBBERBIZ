import Image from "next/image";
import { process } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

const icons = [
  "M3 12h3l2-5 3 10 2.5-7 1.8 4H21", // survey — a trace
  "M4 18h16M6 18V9l6-4 6 4v9", // preparation — the structure
  "M12 3v5l-3 2 3 3-2 3 2 5", // crack
  "M5 8h14v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8ZM9 8V5h6v3M12 15v5", // coating
  "M4 12.5 9 17l11-11", // verified
];

export default function Process() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="How we work"
          line1="Five steps to a"
          line2="documented delta."
          body="From the first thermal baseline to the reading we hand back, the sequence never changes — because the number at the end is only as trustworthy as the preparation before it."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-16">
          {/* A single restrained plate, not a full-width banner */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/img/work/roller-closeup.webp"
                  alt="Applying the coating with a roller"
                  fill
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5 max-w-xs text-[13px] leading-[1.7] text-faint">
                Good surface preparation is mandatory. Every reduction we quote is a measurement
                taken on site, not a specification-sheet figure.
              </figcaption>
            </figure>
          </Reveal>

          {/* Numbered steps as a hairline sequence */}
          <Reveal stagger as="ol" className="lg:pt-2">
            {process.map((s, i) => (
              <li key={s.n} className="group border-t border-line py-7 last:border-b">
                <div className="flex gap-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-bg transition-colors duration-500 group-hover:border-ink/35">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px] text-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d={icons[i]} />
                    </svg>
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10.5px] tracking-[0.22em] text-faint">
                        {s.n}
                      </span>
                      <h3 className="text-[1.15rem] font-normal tracking-[-0.005em] text-ink-strong">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-[14.5px] leading-[1.75] text-body">
                      {s.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
