"use client";

import { useState } from "react";
import { thermalReadings } from "@/lib/data";

const MAX = 80; // °C — axis top, comfortably above the 70.7°C peak
const TICKS = [0, 20, 40, 60, 80];

const COOL = "var(--color-data-cool)";
const HOT = "var(--color-data-hot)";

/**
 * Coated against uncoated, across the four measurement contexts the catalogue
 * records. Two series, so identity is carried by legend + direct labels as well
 * as colour.
 */
export default function ThermalChart() {
  const [hover, setHover] = useState<{ i: number; series: "coated" | "uncoated" } | null>(null);

  return (
    <figure className="lux-card px-6 py-8 sm:px-9 sm:py-10">
      <figcaption className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-[1.3rem] font-normal tracking-[-0.01em] text-ink">
            Surface temperature, coated against uncoated
          </h3>
          <p className="mt-2 max-w-lg text-[13.5px] leading-[1.7] text-body">
            Every pair below is a reading taken on the same structure, at the same time, with only
            the coating differing.
          </p>
        </div>

        {/* Legend — always present for two series */}
        <div className="flex shrink-0 items-center gap-5">
          {[
            { label: "Uncoated", color: HOT },
            { label: "Coated", color: COOL },
          ].map((s) => (
            <span key={s.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ background: s.color }}
                aria-hidden
              />
              <span className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-body">
                {s.label}
              </span>
            </span>
          ))}
        </div>
      </figcaption>

      <div className="mt-9 space-y-7">
        {thermalReadings.map((r, i) => {
          const delta = +(r.uncoated - r.coated).toFixed(1);
          return (
            <div key={r.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[13.5px] text-ink-strong">
                  {r.label}
                  <span className="ml-2 text-[11.5px] text-faint">{r.sub}</span>
                </span>
                <span className="shrink-0 text-[11.5px] font-medium uppercase tracking-[0.12em] text-ink">
                  −{delta}°C
                </span>
              </div>

              <div className="mt-3 space-y-[2px]">
                {(
                  [
                    { key: "uncoated" as const, v: r.uncoated, color: HOT },
                    { key: "coated" as const, v: r.coated, color: COOL },
                  ]
                ).map((bar) => {
                  const active = hover?.i === i && hover.series === bar.key;
                  return (
                    <div
                      key={bar.key}
                      className="relative flex h-7 items-center"
                      onMouseEnter={() => setHover({ i, series: bar.key })}
                      onMouseLeave={() => setHover(null)}
                    >
                      <div
                        className="h-[13px] rounded-r-[4px] transition-all duration-500 ease-out-expo"
                        style={{
                          width: `${(bar.v / MAX) * 100}%`,
                          background: bar.color,
                          opacity: hover && !active ? 0.5 : 1,
                        }}
                      />
                      <span
                        className="ml-2.5 text-[12px] font-medium tabular-nums text-ink-strong transition-opacity duration-300"
                        style={{ opacity: hover && !active ? 0.45 : 1 }}
                      >
                        {bar.v.toFixed(1)}°C
                      </span>

                      {active && (
                        <span
                          role="status"
                          className="pointer-events-none absolute -top-8 left-0 z-10 rounded-md border border-line bg-bg px-2.5 py-1.5 text-[11px] whitespace-nowrap text-ink-strong shadow-sm"
                        >
                          {bar.key === "coated" ? "Coated" : "Uncoated"} · {bar.v.toFixed(1)}°C
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Axis */}
      <div className="relative mt-8 border-t border-line pt-2.5">
        <div className="flex justify-between">
          {TICKS.map((t) => (
            <span key={t} className="text-[10.5px] tabular-nums text-faint">
              {t}°C
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
