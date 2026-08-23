import Image from "next/image";
import { gccCommitments, markets } from "@/lib/data";
import { Eyebrow } from "../ui";
import { Reveal, SplitHeading } from "../motion";

export default function Framework() {
  return (
    <div className="relative overflow-hidden bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Why the GCC</Eyebrow>
            <SplitHeading
              text="A region that committed first, and is decarbonising fastest."
              className="mt-7 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            />
            <Reveal>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
                Decarbonisation is the process of reducing or eliminating carbon emissions from a
                particular process or sector of the economy. In a business context, decarbonising
                means continually lowering carbon emissions in everything your business does.
              </p>
            </Reveal>

            {/* Markets */}
            <Reveal stagger className="mt-10 flex flex-wrap gap-2.5">
              {markets.map((m) => (
                <span
                  key={m.name}
                  className="rv group flex items-center gap-2.5 rounded-full border border-line bg-bg py-2 pl-2 pr-4 transition-colors duration-500 hover:border-accent/40"
                >
                  <Image
                    src={m.flag}
                    alt=""
                    width={80}
                    height={80}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-[13px] text-muted transition-colors group-hover:text-ink">
                    {m.name}
                  </span>
                </span>
              ))}
            </Reveal>
          </div>

          {/* Roman-numeral commitments */}
          <Reveal stagger as="ol" className="lg:pt-4">
            {gccCommitments.map((c) => (
              <li key={c.n} className="rv border-t border-line py-7 last:border-b">
                <div className="flex gap-6">
                  <span className="w-8 shrink-0 font-display text-lg font-semibold tracking-tight text-accent">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium tracking-tight">{c.title}</h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{c.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
