import Image from "next/image";
import { process } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

const icons = [
  // survey
  "M3 12h3l2-5 3 10 2.5-7 1.8 4H21",
  // preparation
  "M4 18h16M6 18V9l6-4 6 4v9",
  // crack fill
  "M12 3v5l-3 2 3 3-2 3 2 5",
  // coating
  "M5 8h14v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8ZM9 8V5h6v3M12 15v5",
  // verify
  "M4 12.5 9 17l11-11",
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

        <Reveal className="mt-16 overflow-hidden rounded-2xl border border-line">
          <div className="relative aspect-[16/9]">
            <Image
              src="/img/work/roller-closeup.webp"
              alt="Applying the coating with a roller"
              fill
              sizes="(max-width: 1024px) 92vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Icon rail */}
        <Reveal stagger className="relative mt-20 hidden grid-cols-5 lg:grid">
          <span
            aria-hidden
            className="absolute left-[10%] right-[10%] top-7 border-t border-dashed border-line"
          />
          {process.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-bg">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-ink"
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
            </div>
          ))}
        </Reveal>

        {/* Steps */}
        <Reveal stagger className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {process.map((s) => (
            <div key={s.n} className="text-center lg:px-2">
              <span className="font-mono text-[10.5px] tracking-[0.24em] text-faint">{s.n}</span>
              <h3 className="mt-3 text-[15.5px] font-medium tracking-[-0.005em] text-ink-strong">
                {s.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.72] text-body">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
