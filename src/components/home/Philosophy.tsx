import Image from "next/image";
import { philosophy } from "@/lib/data";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

/**
 * Asymmetric card pair per row. The photograph occupies the right of each card
 * and is faded to near-neutral at rest; on hover it comes up to full colour.
 * The left-hand fade is a CSS mask on the image itself rather than an overlay,
 * so there is no seam where the two would meet.
 */
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
              className={`group relative min-h-[320px] overflow-hidden rounded-[22px] border border-line bg-bg transition-colors duration-700 hover:border-ink/20 ${
                p.span === "wide" ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[62%]">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover opacity-25 grayscale transition-all duration-[900ms] ease-out-expo group-hover:opacity-80 group-hover:grayscale-0"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 34%, #000 72%)",
                    maskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 34%, #000 72%)",
                  }}
                />
              </div>

              <div className="relative flex h-full max-w-[62%] flex-col px-8 py-9 sm:px-10 sm:py-11">
                <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-faint">
                  {p.kicker}
                </span>
                <h3 className="mt-6 max-w-[14ch] text-[1.5rem] font-normal leading-tight tracking-[-0.012em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-[32ch] text-[14px] leading-[1.8] text-body">{p.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>

      <div className="haze haze-bottom" />
    </div>
  );
}
