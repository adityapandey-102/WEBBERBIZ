"use client";

import { useState } from "react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-7 text-left"
            >
              <span className="flex items-start gap-5">
                <span className="mt-1.5 font-mono text-[11px] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-lg font-medium tracking-tight transition-colors duration-400 sm:text-xl ${
                    isOpen ? "text-accent" : "text-ink group-hover:text-accent-hot"
                  }`}
                >
                  {item.q}
                </span>
              </span>
              <span
                className={`relative mt-2 block h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "rotate-45 text-accent" : "text-muted"
                }`}
              >
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
              </span>
            </button>

            <div
              className="grid transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-8 pl-10 text-[15px] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
