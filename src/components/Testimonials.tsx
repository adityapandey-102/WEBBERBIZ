import { testimonials } from "@/lib/data";
import { Reveal } from "./motion";

/** Card row, as the inspiration presents client voices. */
export default function Testimonials() {
  return (
    <Reveal stagger className="grid gap-5 md:grid-cols-2">
      {testimonials.map((t) => (
        <figure key={t.name} className="lux-card flex flex-col px-8 py-9 sm:px-10 sm:py-11">
          <blockquote className="flex-1 text-[15px] leading-[1.8] text-body">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 border-t border-line pt-6">
            <div className="text-[14.5px] text-ink-strong">{t.name}</div>
            <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.2em] text-faint">
              {t.role}
            </div>
          </figcaption>
        </figure>
      ))}
    </Reveal>
  );
}
