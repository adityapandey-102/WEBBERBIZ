import { Reveal } from "../motion";
import { SectionHead } from "../ui";

const layers = [
  {
    n: "01",
    kicker: "Substrate reading",
    title: "Metal and concrete fail differently.",
    body: "Before a product is named, the surface is read — condition, crack map, and the temperature band the site actually sits in.",
  },
  {
    n: "02",
    kicker: "Surface preparation",
    title: "The coating is only as sound as what it bonds to.",
    body: "SurfaKlean lifts micro dust and loose mortar through its detergents, without damaging reinforcement.",
  },
  {
    n: "03",
    kicker: "Nano composite",
    title: "A continuous film, not a layer of paint.",
    body: "A single-walled nano-tube multiplied a hundred thousand times equals one strand of human hair. That is the scale the ceramic composite packs at.",
  },
  {
    n: "04",
    kicker: "Thermal barrier",
    title: "Reflect first, insulate what remains.",
    body: "The coating blankets the surface and keeps the temperature away to the degree of the delta found on the surface.",
  },
  {
    n: "05",
    kicker: "Verified delta",
    title: "A measurement, not a claim.",
    body: "Surface and ambient temperatures are recorded after the first coat and again after the second, then handed over with the job.",
  },
];

export default function Thinking() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="How Webberbiz thinks"
          line1="Every surface passes"
          line2="five layers of scrutiny."
          body="Substrate. Preparation. Composite. Barrier. Proof. We read the invisible signals that decide whether a coating holds for twenty years or fails in two."
        />

        {/* Alternating timeline */}
        <div className="relative mt-24">
          {/* centre rule */}
          <span
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-line lg:block"
          />

          <ol className="space-y-16 lg:space-y-0">
            {layers.map((l, i) => {
              const left = i % 2 === 0;
              return (
                <li key={l.n} className="relative lg:min-h-[300px]">
                  {/* node */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[86px] hidden h-2 w-2 -translate-x-1/2 rounded-full bg-ink lg:block"
                  />

                  <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-24">
                    {/* copy */}
                    <Reveal
                      className={`${left ? "lg:order-1 lg:pr-4 lg:text-right" : "lg:order-2 lg:pl-4"}`}
                      y={26}
                    >
                      <span className="text-[10.5px] font-medium uppercase tracking-[0.24em] text-faint">
                        {l.n} / 05 — {l.kicker}
                      </span>
                      <h3 className="mt-4 max-w-md text-[clamp(1.25rem,2vw,1.6rem)] font-normal leading-[1.28] tracking-[-0.01em] text-ink-strong lg:ml-auto">
                        {l.title}
                      </h3>
                      <p
                        className={`mt-4 max-w-md text-[14.5px] leading-[1.75] text-body ${
                          left ? "lg:ml-auto" : ""
                        }`}
                      >
                        {l.body}
                      </p>
                    </Reveal>

                    {/* numeral */}
                    <Reveal
                      className={`${left ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6 lg:text-right"}`}
                      y={26}
                      delay={0.06}
                    >
                      <span className="font-display text-[clamp(4.5rem,11vw,9.5rem)] font-light leading-none text-ink/85">
                        {l.n}
                      </span>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
