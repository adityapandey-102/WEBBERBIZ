/**
 * Every figure, claim and quote in this file is transcribed from
 * "Webberbiz - Product Presentation, May 2025" (45pp).
 * TODO markers flag details the catalogue does not contain.
 */

export const company = {
  name: "Webberbiz Trading LLC",
  short: "Webberbiz",
  tagline: "Aligning to sustainability",
  strapline: "Strategy of GCC",
  address: {
    line1: "341A-066 Al Ghurair Centre",
    line2: "Deira, Dubai",
    country: "United Arab Emirates",
  },
  // TODO - not present in the catalogue; replace before launch.
  phone: "+971 0 000 0000",
  email: "info@webberbiz.example",
  copyright: "Property of Webberbiz Trading LLC. Duplication Prohibited.",
};

export const nav = [
  { label: "About us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const heroMetrics = [
  { display: "24–30°C", label: "Roof temp cut" },
  { display: "20 yrs", label: "Field proven" },
  { display: "8 hrs", label: "Leakage stops" },
  { display: "244,800", label: "kWh saved / yr" },
  { display: "208 t", label: "CO₂ saved / yr" },
];

export const marqueeWords = [
  "Thermal Coating",
  "Waterproofing",
  "Nanotechnology",
  "Decarbonization",
  "Surface Preparation",
  "Net Zero 2050",
];

/* ---------------------------------------------------------------- products */

export type Product = {
  slug: string;
  name: string;
  wordmark?: string;
  category: string;
  base?: string;
  /** Secondary label from the product range slide, e.g. High durability. */
  note?: string;
  /** Nett weight as printed on the pack. */
  weight?: string;
  /** What the packaging itself states. */
  packaging?: string;
  headline: string;
  blurb: string;
  image: string;
  tone: "hot" | "cool" | "neutral";
  properties: string[];
  detail: string[];
  /** Additional pack shots / labels for the same product from the catalogue. */
  variants?: { src: string; caption: string }[];
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    slug: "heatplug-containers",
    name: "HEAT PLUG",
    wordmark: "/img/brand/wordmark-heatplug.png",
    category: "Coating for metal containers",
    note: "High durability",
    weight: "20 kg nett when packed",
    packaging: "Nanotechnology based thermal coating composite compound, for external metal surfaces — protection in high temperatures.",
    headline:
      "A nanotechnology-based ceramic composite thermal coating, specialised for metallic surfaces.",
    blurb:
      "Anticorrosive, anti-algae, anti-fungal and crack resistant. Significantly reduces surface temperature by about 24°C and inside ambient temperature by about 10°C to 18°C.",
    image: "/img/products/heatplug-metal.png",
    tone: "hot",
    properties: [
      "High durability",
      "Anticorrosive",
      "Anti algae",
      "Anti fungal",
      "Crack resistant",
    ],
    detail: [
      "A proof of concept carried out on a container in the UAE on 26-27 September 2023 recorded a surface temperature drop of 24°C and a room temperature drop of 15°C.",
      "In a miniature container the uncoated outer surface reached 69.7°C against 36.5°C coated - a delta reduction of 20.9°.",
    ],
    variants: [
      { src: "/img/products/heatplug-container.png", caption: "20 kg pack" },
    ],
  },
  {
    slug: "heatplug-metal",
    name: "HEAT PLUG",
    wordmark: "/img/brand/wordmark-heatplug.png",
    category: "Coating for all metal surfaces",
    weight: "20 kg nett when packed",
    packaging: "Nanotechnology based thermal coating composite compound, for external metal surfaces — protection in high temperatures.",
    headline: "The same ceramic composite, specified across every external metal surface.",
    blurb:
      "Built for the temperature dynamics of the UAE and wider GCC, where surfaces are observed between 63°C and 79°C. Applied to industrial sheds, roofs, tanks and rolling stock alike.",
    image: "/img/products/heatplug-metal-blue.png",
    tone: "hot",
    properties: ["Anticorrosive", "Anti algae", "Anti fungal", "Crack resistant"],
    detail: [
      "The coating blankets the surface and keeps the temperature away to the degree of the delta found on the surface.",
      "Measured on a 10-foot container: 70.7°C uncoated against 46.3°C coated on the metal roof, and 46.1°C against 30.8°C on the inside ceiling.",
    ],
  },
  {
    slug: "heatplug-concrete",
    name: "HEAT PLUG",
    wordmark: "/img/brand/wordmark-heatplug.png",
    category: "Coating for cemented surfaces",
    base: "Water",
    weight: "20 kg nett when packed",
    packaging: "Nanotechnology based thermal coating composite compound, for concreted and cemented surfaces.",
    headline:
      "A nanotechnology-based ceramic composite thermal coating, specialised for cement and concrete surfaces.",
    blurb:
      "Anti-algae, anti-fungal and crack resistant. Recommended for all buildings, homes, villas and mosques, on rooftops and walls.",
    image: "/img/products/heatplug-concrete.png",
    tone: "hot",
    properties: [
      "Thermal resistant",
      "Crack resistant",
      "Anti fungal",
      "Algae resistant",
      "Water base",
    ],
    detail: [
      "Reduces temperature up to 24°C for concrete surfaces. The elongation characteristics resist cracking to a large extent, and the coating resists any bacterial or fungal activity.",
      "Applied as two layers before a coloured paint is given. Also suited to animal enclosures in zoos, farmhouses, walkways and the outside areas of masjids.",
    ],
    variants: [
      { src: "/img/products/heatplug-concrete-lg.png", caption: "20 kg pack" },
      { src: "/img/products/heatplug-concrete-hero.png", caption: "On site" },
    ],
  },
  {
    slug: "aquaplug",
    name: "AQUAPLUG",
    wordmark: "/img/brand/wordmark-aquaplug.png",
    category: "Waterproof solution for cemented surfaces",
    base: "Water",
    weight: "20 kg nett when packed",
    packaging: "Nanotechnology based waterproofing compound — seals cracks on cemented surfaces.",
    headline:
      "A nanotechnology-based composite waterproofing solution for cement concrete surfaces.",
    blurb:
      "The solution soaks itself with water, penetrates hairline cracks and seals them - an impregnate using water as its carrier. It works with water, against water.",
    image: "/img/products/aquaplug.png",
    tone: "cool",
    properties: ["Seals hairline cracks", "Impregnation / wicking", "Water carrier", "Brush or spray"],
    detail: [
      "Where the market provides a parchment or layer that leaves the crack itself intact, the nano particulates accompany water into the crack to seal it.",
      "Proven waterproofing technology for the past 20 years. The composite-based compound works on wicking action, is applied without disturbing the existing surface, and leakage stops in 8 hours.",
    ],
    variants: [{ src: "/img/products/aquaplug-lg.png", caption: "20 kg pack" }],
  },
  {
    slug: "surfaklean",
    name: "SURFAKLEAN",
    wordmark: "/img/brand/wordmark-surfaklean.png",
    category: "Universal cleaner concentrate",
    packaging: "Surface cleaning compound — used on metal, concrete, tiles and plastic.",
    headline: "Surface cleaning and preparation compound.",
    blurb:
      "An eco-friendly product that does not damage reinforcement. Removes micro dust and loose mortar easily, and is recommended as the ideal cleaning agent for all Webberbiz coating product-line applications.",
    image: "/img/products/surfaklean.png",
    tone: "neutral",
    properties: [
      "Eco-friendly",
      "Safe on reinforcement",
      "Removes micro dust",
      "Removes loose mortar",
      "Metal, concrete, tiles, plastic",
    ],
    detail: [
      "It has a special property to remove emerging dust and dirt through its detergents and support the cleaning process.",
      "Good surface preparation is mandatory before any Webberbiz coating is applied - SurfaKlean is the recommended agent.",
    ],
  },
  {
    slug: "coolg",
    name: "COOL G",
    category: "Thermal coating for glass",
    packaging: "A nano technology product — blocks ultraviolet and infrared radiations.",
    headline: "Thermal coating for glass, of all types.",
    blurb:
      "A nano technology product that blocks ultraviolet and infrared radiations. Coming soon to the Webberbiz range.",
    image: "/img/products/coolg.png",
    tone: "cool",
    properties: [
      "Blocks ultraviolet radiation",
      "Blocks infrared radiation",
      "Glass of all types",
      "Nano technology",
    ],
    detail: [],
    variants: [{ src: "/img/brand/badge-coolg.png", caption: "Thermal coating for glass" }],
    comingSoon: true,
  },
];

/* ------------------------------------------------------------- technology */

export const nanoFacts = [
  "A sheet of paper is about 100,000 nanometers thick.",
  "A strand of human DNA is 2.5 nanometers in diameter.",
  "There are 25,400,000 nanometers in one inch.",
  "A human hair is approximately 80,000-100,000 nanometers wide.",
];

export const workingPrinciple = [
  {
    n: "01",
    title: "Reflector",
    body: "The outermost ceramic composite reflects incident radiation before it is absorbed into the substrate.",
  },
  {
    n: "02",
    title: "Insulator",
    body: "The coating blankets the surface and keeps the temperature away to the degree of the delta found on the surface.",
  },
  {
    n: "03",
    title: "Substrate",
    body: "The protected metal or concrete beneath, which stays at a materially lower temperature than an uncoated equivalent.",
  },
];

export const temperatureBands = [
  { region: "Site reading 1", low: 63, high: 79 },
  { region: "Site reading 2", low: 68, high: 77 },
  { region: "Site reading 3", low: 66, high: 72 },
];

export const impacts = [
  {
    domain: "Humans",
    items: [
      "Lower productivity / yield loss",
      "Compromised quality",
      "Fatigue and lack of wellness",
      "Accidents",
    ],
    image: "/img/bg/industrial-worker.webp",
  },
  {
    domain: "Infrastructure",
    items: [
      "High maintenance",
      "Weakened structure",
      "High replacement costs",
      "Possible accidents",
    ],
    image: "/img/bg/steel-structure.webp",
  },
  {
    domain: "Environment",
    items: ["Damaging the ecosystem", "Carbonising the environment"],
    image: "/img/bg/city-smog.webp",
  },
  {
    domain: "Energy",
    items: [
      "High consumption of power",
      "High running costs",
      "Waste of energy",
      "The price of energy will always increase",
    ],
    image: "/img/bg/thermostat.webp",
  },
];

export const protections = [
  "Heat",
  "Alkali",
  "Water",
  "Acid",
  "Dust",
  "Weather",
  "Chemical",
  "Abrasion",
  "Algae & Fungus",
];

/* ------------------------------------------------------------ energy model */

export const energyTable = {
  assumption:
    "Assuming a 50,000 sqft PEB industrial facility. Consumption of energy in kWh for 20 hours.",
  head: ["Δ°C", "1 Ton / Day", "200T / Month", "200T / Year", "1 kWh", "Total cost of energy"],
  rows: [
    ["18°C", "17.4", "104,400", "1,252,800", "AED 0.38", "AED 476,064"],
    ["24°C", "14", "84,000", "1,008,000", "AED 0.38", "AED 383,040"],
  ],
  savings: ["Savings", "3.4 kWh", "20,400 kWh", "244,800 kWh", "", "AED 93,024"],
};

export const carbonMath = [
  { label: "Energy saved", value: "244,800 kWh" },
  { label: "CO₂ per kWh", value: "0.85 kg" },
  { label: "Total CO₂ saved", value: "208,080 kg" },
];

export const acContext = [
  "Air conditioning is responsible for the equivalent of 1,950 million tons of carbon dioxide released annually.",
  "That is 3.94% of global greenhouse gas emissions.",
  "531 million tons come from energy expended to control the temperature, and 599 million tons from removing humidity.",
];

/* ------------------------------------------------------------- application */

export const metalApplications = [
  { label: "Containers", image: "/img/use/containers.webp" },
  { label: "Bus roof tops", image: "/img/use/school-bus.webp" },
  { label: "Industrial sheds", image: "/img/use/metal-roof.webp" },
  { label: "Train roof tops", image: "/img/use/train.webp" },
  { label: "Farm sheds", image: "/img/use/farm-shed.webp" },
  { label: "Oil field installations", image: "/img/use/oil-field.webp" },
  { label: "Bus shelters", image: "/img/use/bus-shelter.webp" },
  { label: "Train stations", image: "/img/use/train-station.webp" },
  { label: "Temp. controlled delivery trucks", image: "/img/use/refrigerated-truck.webp" },
  { label: "Water storage tanks", image: "/img/use/water-tank.webp" },
];

export const leakageAreas = [
  "Basements",
  "Balconies",
  "Rooftops",
  "Retaining walls",
  "Rooftop gardens",
  "Water bodies",
  "Pools",
  "Water running bodies",
  "Bathrooms",
  "Canals",
  "Sumps",
];

export const waterUseCases = [
  { label: "Rooftop gardens", image: "/img/use/rooftop-garden.webp" },
  { label: "Pools", image: "/img/use/pool.webp" },
  { label: "Canals & water bodies", image: "/img/use/canal.webp" },
  { label: "Bathrooms", image: "/img/use/bathroom.webp" },
  { label: "Water running bodies", image: "/img/use/water-body.webp" },
  { label: "Basements", image: "/img/use/basement.webp" },
];

/* ---------------------------------------------------------------- process */

export const process = [
  {
    n: "01",
    title: "Survey & thermal baseline",
    body: "The surface is read before anything is applied - substrate condition, crack mapping and the temperature dynamics of the site itself.",
  },
  {
    n: "02",
    title: "Surface preparation",
    body: "Good surface preparation is mandatory. SurfaKlean removes micro dust and loose mortar without damaging reinforcement.",
  },
  {
    n: "03",
    title: "Crack filling & screed",
    body: "Damaged screed is removed, cracks are opened and filled, and a new screed is laid with AQUAPLUG where waterproofing is in scope.",
  },
  {
    n: "04",
    title: "Coating application",
    body: "HEAT PLUG is brushed or sprayed in two coats. The delta is measured after the first coat and again after the second.",
  },
  {
    n: "05",
    title: "Verification & aftercare",
    body: "Surface and ambient temperatures are recorded against the baseline, and the roof is handed over with the measured reduction documented.",
  },
];

/* --------------------------------------------------------------- projects */

export type Project = {
  slug: string;
  title: string;
  scope: string;
  body: string;
  stat?: { value: string; label: string };
  images: { src: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "uae-container-poc",
    title: "Container proof of concept, UAE",
    scope: "HEAT PLUG · metal · 26-27 September 2023",
    body: "A proof of concept carried out on a 10-foot container. Surface temperature was logged across both coats through the working day, from 5:30 AM to 3:00 PM.",
    stat: { value: "24°C", label: "surface temperature drop" },
    images: [
      { src: "/img/work/container-crew.webp", caption: "Applying the first coat" },
      { src: "/img/work/container-ladder.webp", caption: "Second coat on the container wall" },
      { src: "/img/proof/fluke-compare.webp", caption: "71.9°C uncoated against 45.8°C coated" },
      { src: "/img/proof/coating-meter.webp", caption: "Inside and outside readings with coating" },
          { src: "/img/work/container-crew2.webp", caption: "Night application on the container" },
],
  },
  {
    slug: "industrial-sheds",
    title: "Multiple industrial sheds",
    scope: "HEAT PLUG · metal roofing",
    body: "Thermal coating applied across multiple industrial shed roofs, reducing the temperature on the roof by between 20°C and 24°C.",
    stat: { value: "57.4 → 36.1°C", label: "roof surface" },
    images: [
      { src: "/img/projects/metal-roof-partial.webp", caption: "Part-coated metal roof" },
      { src: "/img/projects/metal-roof-roller.webp", caption: "Roller application" },
      { src: "/img/projects/metal-roof-white.webp", caption: "Completed roof" },
      { src: "/img/projects/metal-roof-coated.webp", caption: "Coated profile sheeting" },
          { src: "/img/projects/roof-app1.webp", caption: "Coating the shed roof" },
      { src: "/img/projects/roof-app2.webp", caption: "Second coat across the run" },
],
  },
  {
    slug: "4000-sft-building",
    title: "50-year-old, 4,000 SFT building",
    scope: "AQUAPLUG + HEAT PLUG · complete roof repair",
    body: "A roof with multiple large and micro cracks leading to direct leakage into the house. Work involved complete screed removal, ponding, crack filling, a new screed with AQUAPLUG and thermal coating with HEAT PLUG to avoid future cracks and leakage.",
    images: [
      { src: "/img/projects/house-before.webp", caption: "Before - damaged roof" },
      { src: "/img/projects/house-screed.webp", caption: "New screed laid" },
      { src: "/img/projects/house-coating.webp", caption: "Thermal coating applied" },
      { src: "/img/projects/house-after.webp", caption: "After" },
          { src: "/img/projects/damaged-ceiling.webp", caption: "Ceiling damage from the leak" },
      { src: "/img/projects/damp-ceiling.webp", caption: "Dampness before the rework" },
      { src: "/img/projects/house-exterior.webp", caption: "The house after completion" },
      { src: "/img/projects/interior.webp", caption: "Interior, dry and cooler" },
],
  },
  {
    slug: "60000-sft-school",
    title: "60,000 SFT school",
    scope: "AQUAPLUG + ENERSHIED + HEAT PLUG",
    body: "Multiple large and micro cracks were leading to huge water leakage on the top floor, with wall cracks causing seepage and fungal growth. Cracks were opened by machine, damaged screed removed and replaced with an AQUAPLUG screed, then ponded and crack-filled before thermal coating the roof and side wall.",
    images: [
      { src: "/img/projects/school-before.webp", caption: "Before" },
      { src: "/img/projects/school-strip.webp", caption: "Damaged screed removed" },
      { src: "/img/projects/school-mid.webp", caption: "New screed" },
      { src: "/img/projects/school-work.webp", caption: "Coating in progress" },
    ],
  },
  {
    slug: "madrasa",
    title: "Madrasa project",
    scope: "AQUAPLUG + HEAT PLUG · roof and side wall",
    body: "Complete rework of the roof with AQUAPLUG waterproofing, ponding and crack filling, then thermal coating with HEAT PLUG on the roof and side wall. Dampness and leakage stopped.",
    stat: { value: "21.7°C", label: "reduction · 12-14°C inside" },
    images: [
      { src: "/img/projects/madrasa-before.webp", caption: "Before - cracked roof" },
      { src: "/img/projects/madrasa-work.webp", caption: "Crack filling" },
      { src: "/img/projects/madrasa-after.webp", caption: "After" },
      { src: "/img/projects/roof-white-app.webp", caption: "Finished thermal coat" },
          { src: "/img/projects/roof-before.webp", caption: "Roof condition on survey" },
],
  },
  {
    slug: "6000-sft-building",
    title: "25-year-old, 6,000 SFT building",
    scope: "AQUAPLUG + HEAT PLUG · roof and side wall",
    body: "Multiple large and micro cracks were leading to direct leakage from the roof into the house. Complete rework of the roof and side wall with AQUAPLUG waterproofing and ponding, including crack filling, followed by thermal coating with HEAT PLUG.",
    stat: { value: "23.2°C", label: "reduction" },
    images: [
      { src: "/img/projects/red-roof-before.webp", caption: "Before - cracked terrace" },
      { src: "/img/projects/red-roof-worker.webp", caption: "Crack filling in progress" },
      { src: "/img/projects/finished-roof.webp", caption: "After" },
      { src: "/img/projects/white-roof-wide.webp", caption: "Coated roof" },
          { src: "/img/projects/roof-coating.webp", caption: "Coating the side wall" },
      { src: "/img/projects/crack-repair.webp", caption: "Crack repair detail" },
],
  },
  {
    slug: "chicken-farm",
    title: "Chicken farm, asbestos sheet",
    scope: "HEAT PLUG · asbestos roofing",
    body: "Thermal coating applied to asbestos sheet roofing on a chicken farm, reducing the temperature on the roof by 24°C.",
    stat: { value: "19.2°C", label: "measured reduction" },
    images: [
      { src: "/img/projects/asbestos-farm.webp", caption: "Coating asbestos sheeting" },
      { src: "/img/projects/asbestos-coating.webp", caption: "Coated run" },
      { src: "/img/projects/asbestos-worker.webp", caption: "Application detail" },
      { src: "/img/projects/crack-roof.webp", caption: "Surface preparation" },
    ],
  },
  {
    slug: "rooftops-parapets",
    title: "Multiple rooftops and parapet walls",
    scope: "HEAT PLUG · residential",
    body: "Thermal coating applied across multiple rooftops and parapet walls, reducing the temperature on the roof by between 20°C and 24°C.",
    stat: { value: "20–24°C", label: "roof reduction" },
    images: [
      { src: "/img/projects/solar-work.webp", caption: "Working around solar" },
      { src: "/img/projects/solar-after.webp", caption: "Completed roof" },
      { src: "/img/projects/terrace-mid.webp", caption: "Parapet walls coated" },
      { src: "/img/projects/terrace-after.webp", caption: "After" },
          { src: "/img/projects/roof-solar.webp", caption: "Coated roof beneath the array" },
      { src: "/img/projects/white-roof.webp", caption: "Finished parapet and deck" },
],
  },
];

/* ------------------------------------------------------------ testimonials */

/**
 * The catalogue carries ONE testimonial, jointly credited to both signatories.
 * It is reproduced here as a single quote rather than split between them.
 */
export const testimonial = {
  quote:
    "We had many issues in our 24-year-old old house, especially with heat inside the house and the leakage due to cracks on my roof and wall. After multiple research, I found the team and handed over the job to repair and coat with the thermal product, which they demonstrated. The work was carried out very methodically and completed the job before the commitment date. My house is as beautiful and neat as a newly constructed one. There is no heat inside the house — it is fantastic, I can sleep peacefully, and I can walk on the terrace barefoot in the afternoon, it is so cool. The dampness and leakage also stopped, which I observed during heavy rains. Excellent job team. Thank you for the great job done to our house.",
  signatories: [
    { name: "Mrs. Jagadamba", role: "Retd. Section Chief — BSNL, Bangalore" },
    { name: "Mrs. Kala", role: "Life Coach & Former HP National Trainer" },
  ],
};

/* ---------------------------------------------------------------- markets */

export const markets = [
  { name: "United Arab Emirates", flag: "/img/flags/uae.png" },
  { name: "Saudi Arabia", flag: "/img/flags/ksa.png" },
  { name: "Qatar", flag: "/img/flags/qatar.png" },
  { name: "Oman", flag: "/img/flags/oman.png" },
  { name: "Bahrain", flag: "/img/flags/bahrain.png" },
];

export const gccCommitments = [
  {
    n: "I",
    title: "First in the region to sign the Paris Agreement",
    body: "The UAE was the first country in the region to sign the Paris Agreement.",
  },
  {
    n: "II",
    title: "Net zero carbon emissions by 2050",
    body: "The first country in the region to commit to net zero carbon emissions by 2050.",
  },
  {
    n: "III",
    title: "Decarbonising oil & gas",
    body: "To lead on climate change, the government of the UAE is decarbonising its oil and gas sector.",
  },
  {
    n: "IV",
    title: "Renewables and transition",
    body: "Ramping up renewables, and transitioning its food and transportation systems.",
  },
];

/* --------------------------------------------------------------------- faq */

export const faqs = [
  {
    q: "How much temperature reduction should we actually expect?",
    a: "Our products provide best-in-class thermal resistant insulation that will reduce roof temperatures by 24°C to 30°C, based on environmental conditions. On metallic surfaces we measure a surface temperature reduction of about 24°C and an inside ambient reduction of about 10°C to 18°C.",
  },
  {
    q: "What surfaces can be coated?",
    a: "There are separate formulations for metal and for cement or concrete. On metal: containers, bus and train roof tops, industrial and farm sheds, oil field installations, bus shelters, train stations, temperature-controlled delivery trucks and water storage tanks. On concrete: buildings, homes, villas and mosques, on both rooftops and walls.",
  },
  {
    q: "How does the waterproofing differ from what the market provides?",
    a: "Most solutions lay a parchment or layer over the surface, and the crack still remains underneath. AQUAPLUG uses water as its carrier - the nano particulates accompany water into the crack and seal it from within, by impregnation and wicking, without disturbing the existing surface.",
  },
  {
    q: "How long before leakage stops?",
    a: "Leakage stops in 8 hours. The technology has been proven in waterproofing for the past 20 years.",
  },
  {
    q: "Is surface preparation really necessary?",
    a: "Good surface preparation is mandatory. SurfaKlean is the recommended agent across the whole product line - it removes micro dust and loose mortar, and is eco-friendly so it does not damage reinforcement.",
  },
  {
    q: "What does this mean for energy and carbon?",
    a: "Temperature reduction on the roof top is directly proportional to reduced air conditioning energy consumption. On a 50,000 sqft PEB industrial facility, the modelled saving is 244,800 kWh a year - AED 93,024 - and 208,080 kg of CO₂.",
  },
];

/* ------------------------------------------------------- scroll statement */

export const statement: { text: string; tone?: "plain" | "accent" | "italic" }[][] = [
  [
    { text: "The" },
    { text: "right", tone: "accent" },
    { text: "coating,", tone: "italic" },
  ],
  [
    { text: "On" },
    { text: "the" },
    { text: "right", tone: "accent" },
    { text: "surface,", tone: "italic" },
  ],
  [
    { text: "Measured" },
    { text: "the", tone: "accent" },
    { text: "right", tone: "accent" },
    { text: "way,", tone: "italic" },
  ],
  [{ text: "Changes" }, { text: "Everything.", tone: "italic" }],
];

/* ------------------------------------------------------------- philosophy */

export const philosophy = [
  {
    kicker: "Research",
    title: "Nanotechnology first",
    body: "Every product in the range is nanotechnology based. At one-billionth of a meter the ceramic composite forms a continuous film, not a layer of paint sitting on top of the problem.",
    image: "/img/bg/nano-spheres.webp",
    span: "wide" as const,
  },
  {
    kicker: "Evidence",
    title: "Measured, not claimed",
    body: "Surface and ambient temperatures are logged before the first coat and after the second. The delta handed over is an instrument reading.",
    image: "/img/proof/meter-readings.webp",
    span: "narrow" as const,
  },
  {
    kicker: "Durability",
    title: "Twenty years of proving",
    body: "Seven years of research on a technology already proven in the field for twenty years, reformulated for the Gulf temperature band.",
    image: "/img/bg/research-lab.webp",
    span: "narrow" as const,
  },
  {
    kicker: "Stewardship",
    title: "Decarbonising, continually",
    body: "Lower roof temperature is lower air-conditioning load, which is lower cost and lower carbon. The saving compounds every year the coating stays on.",
    image: "/img/bg/co2-dashboard.webp",
    span: "wide" as const,
  },
];

/* ------------------------------------------------------------- the lenses */

export const lenses = [
  {
    n: "I",
    title: "Substrate",
    body: "Metal, concrete, asbestos or glass — each fails differently under heat, and each takes a different formulation. The substrate decides the product before anything else.",
  },
  {
    n: "II",
    title: "Preparation",
    body: "Good surface preparation is mandatory. Micro dust and loose mortar are removed with SurfaKlean, which is eco-friendly and does not damage reinforcement.",
  },
  {
    n: "III",
    title: "Thermal load",
    body: "The temperature band the surface actually sits in — 63°C to 79°C across the bands observed in the UAE — sets the number of coats and the expected delta.",
  },
  {
    n: "IV",
    title: "Water path",
    body: "Where water enters, and whether it must be stopped before coating. AQUAPLUG travels with water into the crack and seals it from within.",
  },
];

/* ------------------------------------------------------------ chart data */

/**
 * Coated vs uncoated readings, all transcribed from the catalogue.
 * Two series only — colours validated against the #FAFAF9 surface.
 */
export const thermalReadings = [
  { label: "Container roof", sub: "10-ft container, UAE", uncoated: 70.7, coated: 46.3 },
  { label: "Inside ceiling", sub: "same container", uncoated: 46.1, coated: 30.8 },
  { label: "Miniature container", sub: "outer surface", uncoated: 69.7, coated: 36.5 },
  { label: "Industrial shed roof", sub: "multiple sheds", uncoated: 57.4, coated: 36.1 },
];

export const emissionsSplit = {
  total: "1,950 Mt",
  share: 3.94,
  parts: [
    { label: "Temperature control", value: 531, note: "energy expended to cool" },
    { label: "Humidity removal", value: 599, note: "energy expended to dehumidify" },
  ],
};

export const energyScenarios = [
  { label: "At 18°C reduction", kwh: 1252800, cost: 476064 },
  { label: "At 24°C reduction", kwh: 1008000, cost: 383040 },
];

/**
 * Instrument readings photographed in the catalogue's proof-of-concept pages.
 * The photographs themselves are not shown; the readings they carry are kept here.
 */
export const fieldLog = [
  {
    subject: "Container wall, paired thermal gun",
    uncoated: "71.9°C",
    coated: "45.8°C",
    delta: "−26.1°C",
  },
  {
    subject: "Container wall, second station",
    uncoated: "58.1°C",
    coated: "35.4°C",
    delta: "−22.7°C",
  },
  {
    subject: "Outer surface vs inside, paired meters",
    uncoated: "57.4°C",
    coated: "42.4°C",
    delta: "−15.0°C",
  },
];

export const method = [
  "Coated and uncoated test boxes are placed side by side under identical field conditions, so weather is held constant across the pair.",
  "Surface temperature is taken with a thermal gun after the first coat and again after the second, so the contribution of each layer is visible.",
  "Inside ambient is logged separately from surface temperature, because the figure that matters to a building is the one under the roof.",
];

/**
 * Reviews. The catalogue carries only the single joint letter on p41 (see
 * `testimonial`), which is reproduced verbatim as the first entry. The rest are
 * PLACEHOLDERS — replace with real client feedback before launch.
 */
export const reviews = [
  {
    quote:
      "There is no heat inside the house — it is fantastic, I can sleep peacefully, and I can walk on the terrace barefoot in the afternoon, it is so cool. The dampness and leakage also stopped, which I observed during heavy rains.",
    name: "Mrs. Jagadamba",
    role: "Retd. Section Chief — BSNL",
    stars: 5,
    source: "From the catalogue, p41",
  },
  // TODO — placeholder, replace with a real review before launch.
  {
    quote:
      "The sheds used to be unusable by midday. After the coating the roof reads more than twenty degrees lower and the floor staff notice it immediately.",
    name: "Facilities Manager",
    role: "Industrial park, Dubai",
    stars: 5,
    source: "Placeholder",
  },
  // TODO — placeholder, replace with a real review before launch.
  {
    quote:
      "We were quoted a full roof replacement. The survey came back with a coating specification instead, and the leak stopped inside a day.",
    name: "Building Owner",
    role: "Residential tower, Deira",
    stars: 5,
    source: "Placeholder",
  },
];

/** Slide 5 of the catalogue — the decarbonisation definition, in two halves. */
export const decarbonising = {
  definition:
    "Decarbonization is the process of reducing or eliminating carbon emissions from a particular process or sector of the economy.",
  business:
    "In a business context, decarbonizing means continually lowering carbon emissions in everything your business does.",
};
