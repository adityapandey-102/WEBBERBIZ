"use client";

import Image from "next/image";
import { useState } from "react";
import { thermalReadings } from "@/lib/data";

const MIN = 20;
const MAX = 80;
const TICKS = [20, 30, 40, 50, 60, 70, 80];

const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

/**
 * Coated against uncoated. A dumbbell reads the *gap* — which is the product —
 * more directly than paired bars. Two series, so identity is carried by legend,
 * dot shape position and direct value labels as well as colour.
 */
export default function ThermalChart() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-line bg-bg">
      {/* Field photograph behind the plot — held back so the data stays dominant */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/img/proof/fluke-compare.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover object-center opacity-[0.09]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/86 to-bg/70" />
      </div>

      <figcaption className="relative flex flex-col gap-5 border-b border-line px-7 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-9">
        <div>
          <h3 className="font-display text-[1.6rem] font-normal leading-tight text-ink">
            Surface temperature, coated against uncoated
          </h3>
          <p className="mt-2.5 max-w-lg text-[13.5px] leading-[1.7] text-body">
            Each row is one structure, measured at the same moment on a coated and an uncoated
            section. The bar between the dots is the reduction.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-6">
          {[
            { label: "Uncoated", color: "var(--color-data-hot)" },
            { label: "Coated", color: "var(--color-data-cool)" },
          ].map((s) => (
            <span key={s.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full ring-2 ring-bg"
                style={{ background: s.color }}
                aria-hidden
              />
              <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted">
                {s.label}
              </span>
            </span>
          ))}
        </div>
      </figcaption>

      <div className="relative px-7 pb-3 pt-9 sm:px-9">
        {thermalReadings.map((r, i) => {
          const delta = +(r.uncoated - r.coated).toFixed(1);
          const active = hover === i;
          return (
            <div
              key={r.label}
              className="group relative border-b border-line-soft py-6 last:border-b-0"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="flex items-baseline justify-between gap-6">
                <div className="min-w-0">
                  <span className="text-[14px] text-ink-strong">{r.label}</span>
                  <span className="ml-2.5 text-[11.5px] text-faint">{r.sub}</span>
                </div>
                <span className="shrink-0 font-display text-[1.4rem] leading-none text-ink">
                  −{delta}
                  <span className="ml-0.5 align-top text-[11px] text-muted">°C</span>
                </span>
              </div>

              {/* Track */}
              <div className="relative mt-5 h-6">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" aria-hidden />

                {/* the reduction */}
                <span
                  className="absolute top-1/2 h-[7px] -translate-y-1/2 rounded-full transition-all duration-500 ease-out-expo"
                  style={{
                    left: `${pct(r.coated)}%`,
                    width: `${pct(r.uncoated) - pct(r.coated)}%`,
                    background:
                      "linear-gradient(to right, var(--color-data-cool), var(--color-data-hot))",
                    opacity: hover !== null && !active ? 0.4 : 1,
                  }}
                  aria-hidden
                />

                {/* endpoints */}
                {(
                  [
                    { v: r.coated, c: "var(--color-data-cool)", side: "left" as const },
                    { v: r.uncoated, c: "var(--color-data-hot)", side: "right" as const },
                  ]
                ).map((d) => (
                  <span
                    key={d.side}
                    className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
                    style={{ left: `${pct(d.v)}%` }}
                  >
                    <span
                      className="block h-3.5 w-3.5 rounded-full ring-[3px] ring-bg transition-transform duration-400 ease-out-expo"
                      style={{
                        background: d.c,
                        transform: active ? "scale(1.25)" : "scale(1)",
                      }}
                      aria-hidden
                    />
                    <span
                      className="absolute whitespace-nowrap text-[12px] font-medium tabular-nums text-ink-strong"
                      style={
                        d.side === "left"
                          ? { right: "1.4rem" }
                          : { left: "1.4rem" }
                      }
                    >
                      {d.v.toFixed(1)}°
                    </span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Axis */}
      <div className="relative border-t border-line px-7 py-4 sm:px-9">
        <div className="relative h-4">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute -translate-x-1/2 text-[10px] tabular-nums text-faint"
              style={{ left: `${pct(t)}%` }}
            >
              {t}°
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
