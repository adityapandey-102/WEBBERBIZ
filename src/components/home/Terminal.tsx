import { acContext, carbonMath, energyTable } from "@/lib/data";
import { Eyebrow } from "../ui";
import { Counter, Reveal, SplitHeading } from "../motion";

/** The catalogue's energy + carbon model, presented as a readout panel. */
export default function Terminal() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Performance terminal</Eyebrow>
            <SplitHeading
              text="What 24°C off the roof is actually worth."
              className="mt-7 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            />
          </div>
          <Reveal>
            <p className="max-w-sm text-[14px] leading-relaxed text-muted">
              Temperature reduction on the roof top is directly proportional to reduced air
              conditioning energy consumption — and therefore to cost and carbon.
            </p>
          </Reveal>
        </div>

        {/* Readout */}
        <Reveal className="mt-14 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
              Energy model · 50,000 sqft PEB facility
            </span>
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              20 hrs / day
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  {energyTable.head.map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 font-mono text-[10.5px] font-normal uppercase tracking-[0.14em] text-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {energyTable.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-line/70">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-6 py-4 text-[14px] ${
                          i === 0 ? "font-display font-semibold text-ink" : "text-muted"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-accent/6">
                  {energyTable.savings.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-6 py-5 text-[14px] font-medium ${
                        i === 0 || i === 5 ? "text-accent" : "text-ink"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="border-t border-line px-6 py-4 font-mono text-[10.5px] leading-relaxed text-faint">
            {energyTable.assumption}
          </p>
        </Reveal>

        {/* Carbon math */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal stagger className="grid gap-px self-start overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {carbonMath.map((c) => (
              <div key={c.label} className="rv bg-bg px-6 py-7">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                  {c.label}
                </div>
                <div className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                  {c.value}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="rounded-xl border border-line bg-surface px-6 py-7">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-semibold tracking-tight text-accent">
                <Counter value={3.94} decimals={2} suffix="%" />
              </span>
              <span className="text-[13px] leading-snug text-muted">
                of global greenhouse
                <br />
                gas emissions
              </span>
            </div>
            <ul className="mt-6 space-y-2.5">
              {acContext.map((line) => (
                <li key={line} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-accent/70" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
