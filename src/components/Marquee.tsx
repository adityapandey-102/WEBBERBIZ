export default function Marquee({
  words,
  duration = 52,
  className = "",
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const run = [...words, ...words];

  return (
    <div
      className={`relative flex overflow-hidden border-y border-line py-7 ${className}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-12 pr-12"
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {run.map((w, i) => (
          <span key={i} className="flex shrink-0 items-center gap-12">
            <span className="font-display text-2xl font-light tracking-tight text-ink/70 sm:text-3xl">
              {w}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-faint" />
          </span>
        ))}
      </div>
    </div>
  );
}
