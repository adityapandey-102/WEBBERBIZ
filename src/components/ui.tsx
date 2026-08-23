import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 16"
      aria-hidden="true"
      className={`h-3 w-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 8h16M12 3l5 5-5 5" />
    </svg>
  );
}

/** Black pill (primary) and outlined pill (secondary), as the inspiration uses. */
export function Pill({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "bg-black text-white hover:bg-ink"
      : "border border-line bg-bg text-ink-strong hover:border-ink/40 hover:bg-surface";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13.5px] font-semibold tracking-[0.02em] transition-all duration-500 ease-out-expo ${styles} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

/**
 * The section header used throughout: eyebrow, a two-line display heading whose
 * second line is grey italic, and an optional body column on the right.
 */
export function SectionHead({
  eyebrow,
  line1,
  line2,
  body,
  className = "",
  size = "lg",
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  body?: ReactNode;
  className?: string;
  size?: "lg" | "md";
}) {
  const scale =
    size === "lg"
      ? "text-[clamp(2.4rem,5.6vw,4.4rem)]"
      : "text-[clamp(2rem,4.4vw,3.4rem)]";

  return (
    <div className={`grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 ${className}`}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={`display mt-6 ${scale}`}>
          <span className="block">{line1}</span>
          {line2 && <span className="display-italic block">{line2}</span>}
        </h2>
      </div>
      {body && (
        <div className="flex items-start lg:pt-16">
          <div className="max-w-xl text-[15.5px] leading-[1.75] text-body">{body}</div>
        </div>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative px-5 py-24 sm:px-8 md:py-32 lg:px-12 ${className}`}>
      <div className="mx-auto w-full max-w-[1280px]">{children}</div>
    </section>
  );
}

export function IndexLabel({ n, total, label }: { n: number; total: number; label?: string }) {
  const pad = (x: number) => String(x).padStart(2, "0");
  return (
    <span className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-faint">
      {pad(n)} / {pad(total)}
      {label ? ` — ${label}` : ""}
    </span>
  );
}
