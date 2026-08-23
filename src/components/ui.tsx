import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent ${className}`}
    >
      <span className="h-px w-6 bg-accent/60" />
      {children}
    </span>
  );
}

export function IndexLabel({ n, total }: { n: number; total: number }) {
  const pad = (x: number) => String(x).padStart(2, "0");
  return (
    <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
      {pad(n)}
      <span className="mx-1 text-faint/50">/</span>
      {pad(total)}
    </span>
  );
}
