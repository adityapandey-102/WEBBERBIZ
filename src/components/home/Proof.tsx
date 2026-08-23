import ThermalChart from "../ThermalChart";
import { fieldLog, method } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

export default function Proof() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="The evidence"
          line1="Not instinct."
          line2="Instrument readings."
          body="Each pair was logged on the same structure at the same moment, with a thermal gun on coated and uncoated sections side by side. The gap between the two points is the whole product."
        />

        <Reveal className="mt-16">
          <ThermalChart />
        </Reveal>

        {/* Field log + method, side by side */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="overflow-hidden rounded-2xl border border-line bg-bg">
            <div className="border-b border-line px-7 py-5">
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                Field log · additional stations
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    {["Station", "Uncoated", "Coated", "Delta"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-7 py-3.5 font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-faint"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fieldLog.map((r) => (
                    <tr key={r.subject} className="border-b border-line-soft last:border-b-0">
                      <td className="px-7 py-4 text-[13.5px] text-ink-strong">{r.subject}</td>
                      <td className="px-7 py-4 text-[13.5px] tabular-nums text-data-hot">
                        {r.uncoated}
                      </td>
                      <td className="px-7 py-4 text-[13.5px] tabular-nums text-data-cool">
                        {r.coated}
                      </td>
                      <td className="px-7 py-4 font-display text-[1.15rem] tabular-nums text-ink">
                        {r.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="lux-card px-8 py-8">
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
              How the reading is taken
            </h3>
            <ol className="mt-6 space-y-5">
              {method.map((m, i) => (
                <li key={m} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-[10.5px] tracking-[0.18em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13.5px] leading-[1.72] text-body">{m}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* Reading notes */}
        <Reveal stagger className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Read the gap, not the value",
              b: "Absolute temperature moves with the weather. What holds steady across sites is the delta — consistently 20°C to 24°C on metal, and up to 30°C in the right conditions.",
            },
            {
              t: "The ceiling follows the roof",
              b: "On the same container the roof fell 24.4°C and the ceiling below it fell 15.3°C. The room no longer needs to be cooled as hard, which is where the energy saving comes from.",
            },
            {
              t: "Two coats, measured twice",
              b: "The delta is taken after the first coat and again after the second, so the contribution of each layer is visible rather than assumed.",
            },
          ].map((c) => (
            <div key={c.t} className="border-t border-line pt-6">
              <h3 className="text-[15px] font-medium tracking-[-0.005em] text-ink">{c.t}</h3>
              <p className="mt-3 text-[13.5px] leading-[1.72] text-body">{c.b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
