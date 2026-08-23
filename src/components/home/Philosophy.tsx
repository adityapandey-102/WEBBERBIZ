import Image from "next/image";
import { philosophy } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

export default function Philosophy() {
  return (
    <div className="relative bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="haze haze-top" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="Our philosophy"
          line1="Rooted in evidence."
          line2="Built to last."
          body="We believe a coating is not bought — it is specified. Our advisors combine twenty years of field record with the temperature dynamics of the Gulf, offering a judgment no datasheet can replicate."
        />

        <Reveal stagger className="mt-20 grid gap-5 md:grid-cols-5">
          {philosophy.map((p) => (
            <article
              key={p.title}
              className={`lux-card group relative overflow-hidden ${
                p.span === "wide" ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              {/* washed image bleeding from the right */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-2/3">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover opacity-[0.14] grayscale transition-all duration-1000 ease-out-expo group-hover:scale-105 group-hover:opacity-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/55 to-transparent" />
              </div>

              <div className="relative px-8 py-9 sm:px-10 sm:py-11">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.24em] text-faint">
                  {p.kicker}
                </span>
                <h3 className="mt-5 text-[1.4rem] font-normal tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-sm text-[14.5px] leading-[1.75] text-body">{p.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
