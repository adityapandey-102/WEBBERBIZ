import { testimonial } from "@/lib/data";
import { Reveal } from "./motion";

/**
 * One quote, two signatories — exactly as the catalogue presents it.
 */
export default function Testimonials() {
  return (
    <Reveal>
      <figure className="lux-card px-8 py-10 sm:px-12 sm:py-14">
        <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 text-ink/25" fill="currentColor">
          <path d="M9.6 4.8C6 6.6 3.6 10.2 3.6 14.4c0 3 1.8 4.8 4.2 4.8 2.2 0 3.9-1.7 3.9-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.8 2-4 4.1-5.1l-1.7-1.8Zm10.2 0c-3.6 1.8-6 5.4-6 9.6 0 3 1.8 4.8 4.2 4.8 2.2 0 3.9-1.7 3.9-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.8 2-4 4.1-5.1l-1.7-1.8Z" />
        </svg>

        <blockquote className="mt-7 max-w-4xl font-display text-[clamp(1.15rem,2.1vw,1.6rem)] font-light leading-[1.55] tracking-[-0.005em] text-ink-strong">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <figcaption className="mt-9 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:gap-14">
          {testimonial.signatories.map((s) => (
            <div key={s.name}>
              <div className="text-[15px] text-ink-strong">{s.name}</div>
              <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.18em] text-faint">
                {s.role}
              </div>
            </div>
          ))}
        </figcaption>
      </figure>
    </Reveal>
  );
}
