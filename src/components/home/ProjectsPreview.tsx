import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Arrow, Pill, SectionHead } from "../ui";
import { Reveal } from "../motion";

export default function ProjectsPreview() {
  const featured = projects.slice(0, 4);

  return (
    <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="A few examples of our work"
          line1="Roofs, sheds and containers."
          line2="Before, and after."
          body="Proof of concept work, industrial sheds, schools, madrasas and homes — each handed over with the surface and ambient readings recorded against the baseline."
        />

        <Reveal stagger className="mt-20 grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects#${p.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-line"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].caption}
                  fill
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />

                {p.stat && (
                  <div className="absolute right-5 top-5 rounded-xl border border-white/30 bg-white/15 px-4 py-2.5 backdrop-blur-md">
                    <div className="font-display text-xl font-semibold tracking-tight text-white">
                      {p.stat.value}
                    </div>
                    <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white/85">
                      {p.stat.label}
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
                    {p.scope}
                  </p>
                  <h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-tight tracking-tight text-white">
                    {p.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[12.5px] font-semibold text-white/90">
                    View project
                    <Arrow />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <Pill href="/projects">All projects</Pill>
        </Reveal>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
