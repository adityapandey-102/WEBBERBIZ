export default function Marquee({
  words,
  duration = 42,
  className = "",
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  // Duplicated once so the -50% keyframe loops seamlessly.
  const run = [...words, ...words];

  return (
    <div
      className={`relative flex overflow-hidden border-y border-line bg-surface/60 py-5 ${className}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-10 pr-10"
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {run.map((w, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-lg font-medium tracking-tight text-muted sm:text-xl">
              {w}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
