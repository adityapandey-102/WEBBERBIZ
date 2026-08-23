import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Arrow, Eyebrow } from "../ui";
import { Reveal, SplitHeading } from "../motion";

export default function ProjectsPreview() {
  const featured = projects.slice(0, 4);

  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>A few examples of our work</Eyebrow>
            <SplitHeading
              text="Roofs, sheds and containers, before and after."
              className="mt-7 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            />
          </div>
          <Reveal>
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hot"
            >
              All projects
              <Arrow />
            </Link>
          </Reveal>
        </div>

        <Reveal stagger className="mt-16 grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects#${p.slug}`}
              className="rv group relative overflow-hidden rounded-xl border border-line"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].caption}
                  fill
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />

                {p.stat && (
                  <div className="absolute right-5 top-5 rounded-lg border border-white/25 bg-white/10 px-3.5 py-2 backdrop-blur-md">
                    <div className="font-display text-lg font-semibold tracking-tight text-white">
                      {p.stat.value}
                    </div>
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/80">
                      {p.stat.label}
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
                    {p.scope}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {p.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
