import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Arrow, Pill, SectionHead } from "../ui";
import { Reveal } from "../motion";

export default function Range() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="Product range"
          line1="Selective, and highly"
          line2="specialised."
          body="Five formulations, each built for one substrate and one failure mode — thermal load on metal, thermal load on concrete, water ingress, surface preparation, and glass."
        />

        <Reveal stagger className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Link
              key={p.slug}
              href={`/products#${p.slug}`}
              className="lux-card group relative flex flex-col overflow-hidden px-8 py-9 transition-all duration-700 ease-out-expo hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint">
                  {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </span>
                {p.comingSoon && (
                  <span className="rounded-full border border-line px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-muted">
                    Coming soon
                  </span>
                )}
              </div>

              <div className="relative mt-8 flex h-44 items-center justify-center">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={340}
                  height={430}
                  sizes="(max-width: 640px) 60vw, 24vw"
                  className="h-full w-auto object-contain transition-transform duration-1000 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.05]"
                />
              </div>

              <h3 className="mt-8 font-display text-[1.85rem] font-semibold tracking-tight text-ink">
                {p.name}
              </h3>
              <p className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-faint">
                {p.category}
                {p.base ? ` · base ${p.base}` : ""}
              </p>
              <p className="mt-4 flex-1 text-[13.5px] leading-[1.72] text-body">{p.blurb}</p>

              <span className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold text-ink">
                Details
                <Arrow />
              </span>
            </Link>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <Pill href="/products">See the full range</Pill>
        </Reveal>
      </div>
    </div>
  );
}
