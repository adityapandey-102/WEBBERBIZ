import { acContext, emissionsSplit, energyTable } from "@/lib/data";
import { Reveal } from "../motion";
import { Pill, SectionHead } from "../ui";

const cells = [
  {
    label: "Annual cost saving",
    value: "93,024",
    unit: "AED",
    body: "The difference in energy cost between an 18°C and a 24°C reduction on the same facility, over one year.",
  },
  {
    label: "CO₂ avoided",
    value: "208,080",
    unit: "KG",
    body: "244,800 kWh saved at 0.85 kg of CO₂ per kWh — the decarbonising impact of one coated roof.",
  },
  {
    label: "AC share of global GHG",
    value: "3.94",
    unit: "%",
    body: "Air conditioning accounts for 1,950 million tons of CO₂ a year. Roof temperature is the lever.",
  },
];

export default function Terminal() {
  const total = emissionsSplit.parts.reduce((s, p) => s + p.value, 0);

  return (
    <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="Performance terminal"
          line1="What 24°C off the roof"
          line2="is actually worth."
          body="Temperature reduction on the roof top is directly proportional to reduced air-conditioning energy consumption — and therefore to running cost and to carbon."
        />

        {/* Terminal panel */}
        <Reveal className="mt-16 overflow-hidden rounded-2xl border border-line bg-bg">
          {/* chrome */}
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden>
                {["#dedede", "#dedede", "#dedede"].map((c, i) => (
                  <span key={i} className="h-2 w-2 rounded-full" style={{ background: c }} />
                ))}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                Webberbiz Performance Terminal
              </span>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-data-cool" aria-hidden />
              50,000 sqft PEB · modelled
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            {/* headline metric */}
            <div className="border-b border-line px-7 py-9 sm:px-9 lg:border-b-0 lg:border-r">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                Data index: 01
              </div>
              <div className="mt-1.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-strong">
                Energy saved per year
              </div>

              <div className="mt-10 flex items-end gap-3">
                <span className="font-display text-[clamp(3.4rem,7vw,5.4rem)] font-light leading-[0.85] text-ink">
                  244,800
                </span>
                <span className="mb-2 font-display text-lg italic text-muted">kWh</span>
              </div>

              {/* sparkline — the downward energy curve after coating */}
              <svg
                viewBox="0 0 220 34"
                className="mt-5 h-8 w-full max-w-[240px]"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 6 C 40 8, 62 10, 88 16 S 150 27, 218 29"
                  stroke="var(--color-muted)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <circle cx="218" cy="29" r="3" fill="var(--color-data-cool)" />
              </svg>

              <div className="mt-7 border-t border-dashed border-line pt-5">
                <p className="max-w-sm text-[13.5px] leading-[1.7] text-body">
                  {energyTable.assumption}
                </p>
              </div>
            </div>

            {/* stacked cells */}
            <div>
              {cells.map((c, i) => (
                <div
                  key={c.label}
                  className={`grid grid-cols-[auto_1fr] items-center gap-6 px-7 py-7 sm:px-9 ${
                    i < cells.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <div className="min-w-[128px]">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {c.label}
                    </div>
                    <div className="mt-2 flex items-end gap-1.5">
                      <span className="font-display text-[2.4rem] font-light leading-[0.85] text-ink">
                        {c.value}
                      </span>
                      <span className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                        {c.unit}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] leading-[1.65] text-body">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="flex flex-col gap-2 border-t border-line px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>Consumption of energy in kWh for 20 hrs</span>
            <span>Source · Webberbiz Product Presentation, May 2025</span>
          </div>
        </Reveal>

        {/* The energy table, read straight from the catalogue */}
        <Reveal className="mt-6 overflow-hidden rounded-2xl border border-line bg-bg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="border-b border-line px-6 py-4 text-left font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                Energy model · consumption in kWh
              </caption>
              <thead>
                <tr className="border-b border-line">
                  {energyTable.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-6 py-4 font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {energyTable.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-line-soft">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-6 py-4 text-[14px] tabular-nums ${
                          i === 0 ? "font-display text-lg text-ink" : "text-body"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-surface">
                  {energyTable.savings.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-6 py-5 text-[14px] tabular-nums ${
                        i === 0
                          ? "font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink"
                          : "font-medium text-ink-strong"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Emissions split — explains where the 1,950 Mt comes from */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="lux-card px-8 py-9">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              Where air conditioning&rsquo;s {emissionsSplit.total} of CO₂ goes
            </span>

            <div className="mt-7 flex h-3 gap-[2px] overflow-hidden rounded-full">
              {emissionsSplit.parts.map((p, i) => (
                <span
                  key={p.label}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${(p.value / total) * 100}%`,
                    background: i === 0 ? "var(--color-data-hot)" : "var(--color-data-cool)",
                  }}
                />
              ))}
            </div>

            <ul className="mt-6 space-y-4">
              {emissionsSplit.parts.map((p, i) => (
                <li key={p.label} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[2px]"
                    style={{
                      background: i === 0 ? "var(--color-data-hot)" : "var(--color-data-cool)",
                    }}
                    aria-hidden
                  />
                  <span>
                    <span className="text-[14px] text-ink-strong">
                      {p.value} Mt — {p.label}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-faint">{p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lux-card px-8 py-9">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              Why it matters
            </span>
            <ul className="mt-6 space-y-4">
              {acContext.map((line) => (
                <li key={line} className="flex gap-3 text-[14px] leading-[1.7] text-body">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Pill href="/technology" variant="outline">
                How the coating works
              </Pill>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
