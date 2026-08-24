import ExpandingPanels, { type Panel } from "../ExpandingPanels";
import { Reveal } from "../motion";
import { SectionHead } from "../ui";

const panels: Panel[] = [
  {
    kicker: "Substrate intelligence",
    title: "Every surface begins with what it is made of.",
    body: "Metal, concrete, asbestos and glass each fail differently under heat, and each takes its own formulation. Condition, crack map and the temperature band of the site decide the specification before a product is named.",
    image: "/img/bg/steel-structure.webp",
  },
  {
    kicker: "Measured evidence",
    title: "Conviction built on instrument readings.",
    body: "Surface and ambient temperatures are logged before the first coat and again after the second. On a 10-foot container that meant 70.7°C falling to 46.3°C at the roof, and 46.1°C to 30.8°C at the ceiling below it.",
    image: "/img/proof/test-boxes.webp",
  },
  {
    kicker: "Long-term durability",
    title: "Built for twenty years of proving.",
    body: "Seven years of research sit on a technology already proven in the field for twenty years, reformulated for the Gulf temperature band. Anticorrosive, anti-fungal and crack resistant, so the delta holds.",
    image: "/img/bg/research-lab.webp",
  },
];

export default function Principles() {
  return (
    <div className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHead
          eyebrow="Our principles"
          line1="How we evaluate"
          line2="every surface."
          body="Every specification we issue is shaped by the substrate beneath it, the readings taken on it, and the years the coating has to survive — so clients buy a measured outcome rather than a claim."
        />

        <Reveal className="mt-16">
          <ExpandingPanels panels={panels} />
        </Reveal>
      </div>
    </div>
  );
}
