import { statement } from "@/lib/data";
import { WordReveal } from "../motion";

export default function Statement() {
  return (
    <div className="relative flex min-h-[92vh] items-center justify-center px-5 py-32 sm:px-8">
      <WordReveal
        lines={statement}
        className="mx-auto max-w-4xl text-center text-[clamp(1.6rem,4.2vw,3.05rem)] font-light leading-[1.42] tracking-[-0.015em]"
      />
    </div>
  );
}
