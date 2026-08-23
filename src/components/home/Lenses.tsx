import { lenses } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

export default function Lenses() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="The Webberbiz framework"
          line1="Four lenses."
          line2="One specification."
          body="Every surface we quote is put through the same four questions. If it fails one of them, we say so rather than sell a coating that will not hold."
        />

        <Reveal stagger className="mt-20 grid gap-5 md:grid-cols-2">
          {lenses.map((l) => (
            <article key={l.n} className="lux-card relative overflow-hidden px-8 py-10 sm:px-10">
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-7 font-display text-[7rem] font-light leading-none text-ink/[0.055]"
              >
                {l.n}
              </span>
              <div className="relative">
                <h3 className="text-[1.45rem] font-normal tracking-[-0.01em] text-ink">
                  {l.title}
                </h3>
                <p className="mt-4 max-w-md text-[14.5px] leading-[1.75] text-body">{l.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
