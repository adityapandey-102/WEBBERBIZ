"use client";

import { useState } from "react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-8 py-7 text-left"
            >
              <span className="flex items-start gap-6">
                <span className="mt-2 font-mono text-[10.5px] tracking-[0.2em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[1.05rem] leading-snug tracking-[-0.005em] transition-colors duration-400 sm:text-[1.15rem] ${
                    isOpen ? "text-ink" : "text-ink-strong group-hover:text-ink"
                  }`}
                >
                  {item.q}
                </span>
              </span>
              <span
                className={`relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-500 ease-out-expo ${
                  isOpen ? "rotate-45 text-ink" : "text-muted"
                }`}
                aria-hidden
              >
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
              </span>
            </button>

            <div
              className="grid transition-all duration-600 ease-out-expo"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 pl-12 text-[14.5px] leading-[1.8] text-body">
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
