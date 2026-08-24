import Image from "next/image";
import Link from "next/link";
import ScrollingRow from "../ScrollingRow";
import { products } from "@/lib/data";
import { Arrow, Pill, SectionHead } from "../ui";
import { Reveal } from "../motion";

const cards = products.map((p, i) => (
  <Link
    key={p.slug}
    href={`/products#${p.slug}`}
    className="lux-card group/card flex h-[470px] w-[300px] flex-col px-8 py-8 transition-colors duration-700 hover:border-ink/20 sm:w-[330px]"
  >
    <div className="flex items-start justify-between">
      <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint">
        {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
      </span>
      {p.comingSoon && (
        <span className="rounded-full border border-line px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-muted">
          Soon
        </span>
      )}
    </div>

    <div className="relative mt-6 flex h-[168px] items-center justify-center">
      <Image
        src={p.image}
        alt={p.name}
        width={340}
        height={430}
        sizes="330px"
        className="h-full w-auto object-contain transition-transform duration-[1100ms] ease-out-expo group-hover/card:-translate-y-2 group-hover/card:scale-[1.05]"
      />
    </div>

    <h3 className="mt-7 font-display text-[1.7rem] font-semibold leading-none tracking-tight text-ink">
      {p.name}
    </h3>
    <p className="mt-2 text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] text-faint">
      {p.category}
    </p>
    <p className="mt-4 line-clamp-3 overflow-hidden text-[13.5px] leading-[1.7] text-body">
      {p.blurb}
    </p>

    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[12.5px] font-semibold text-ink">
      Details
      <Arrow />
    </span>
  </Link>
));

export default function Range() {
  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="Product range"
          line1="Selective, and highly"
          line2="specialised."
          body="Five specialised products for the UAE and GCC, each built for one substrate and one failure mode — with COOL G for glass coming soon."
        />
      </div>

      <Reveal className="mt-16">
        <ScrollingRow items={cards} duration={24} />
      </Reveal>

      <div className="mx-auto mt-14 w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Pill href="/products">See the full range</Pill>
        </Reveal>
      </div>
    </div>
  );
}
