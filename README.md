# Webberbiz Trading LLC — website

Marketing site for Webberbiz Trading LLC. The design language, section architecture and
motion follow [kaayaprimerealty.com](https://kaayaprimerealty.com/); all content and
imagery come from *Webberbiz — Product Presentation, May 2025* (45pp).

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — tokens in `src/app/globals.css` under `@theme`
- **GSAP + ScrollTrigger** — scrubbed hero, word-reveal statement, scroll reveals
- **Lenis** — smooth scroll, slaved to ScrollTrigger

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Design system

Matched to the inspiration after inspecting its live computed styles:

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#fafaf9` | warm off-white ground |
| `--color-ink` | `#2f4f4d` | deep teal — display headings |
| `--color-ink-strong` | `#17201f` | near-black — sans headings |
| `--color-black` | `#0a0a0a` | primary pill buttons |
| `--font-display` | Cormorant Garamond | headings, numerals, stats |
| `--font-sans` | Jost | body, nav, labels |

The signature heading is two lines: **roman teal over grey serif italic** (`SectionHead`).

## Data visualisation

Charts use a palette validated against the `#fafaf9` surface (lightness band, chroma
floor, CVD separation, contrast — all pass):

- `--color-data-hot` `#d2691e` — uncoated
- `--color-data-cool` `#2f9c7f` — coated

Worst adjacent-pair separation is ΔE 12.1 (deuteranopia), and both series carry a legend
*and* direct value labels, so identity never depends on colour alone.

Three pieces present the catalogue's numbers:
- `ThermalChart` — coated vs uncoated across four measurement contexts, with hover
- `PrincipleDiagram` — the working-principle slide redrawn as SVG
- `Terminal` (home) — the energy model, cost, CO₂ and the emissions split

## Structure

```
src/
  app/
    page.tsx        home — hero, thinking, philosophy, statement, range, proof,
                    process, terminal, why GCC, lenses, applications, projects,
                    voices, FAQ, CTA
    products/  technology/  projects/  about/  contact/
  components/
    motion.tsx      Reveal / LineReveal / WordReveal / Counter
    ui.tsx          Pill / SectionHead / Eyebrow / Arrow
    home/           home page sections
  lib/data.ts       ALL copy and figures, transcribed from the catalogue
```

## Content

`src/lib/data.ts` is the single source of truth. Every number in it — the 24°C–30°C
reduction, the 70.7/46.3°C container readings, AED 93,024, 208,080 kg CO₂, the project
deltas and both testimonials — is transcribed from the catalogue.

## Images

**All 118 images in `public/img/` are used, and every one came from the catalogue PDF** —
no stock photography. Pack shots, brand wordmarks, the 3D application models and the GCC
flags keep their alpha as PNG; photographs are WebP.

## Before launch

1. **Phone and email** — `company.phone` / `company.email` in `src/lib/data.ts` are
   placeholders. The postal address is real.
2. **Form endpoint** — `src/components/ContactForm.tsx` validates and confirms but does
   not submit anywhere.
3. **`metadataBase`** in `src/app/layout.tsx` points at a placeholder domain.

## Data verification (audited against the PDF, page by page)

The catalogue was re-extracted page by page and every claim on the site checked
against it. Corrections applied:

| # | Issue found | Correction |
|---|---|---|
| 1 | **Fabricated testimonial.** The catalogue has ONE letter (p41) jointly signed by Mrs. Jagadamba and Mrs. Kala. The site had split it into two quotes, inventing "Excellent job team…" as a separate Kala testimonial. | Restored as a single quote with two signatories. |
| 2 | **Tin artwork swapped.** p2 shows the khaki tin (truck graphic) = *metal containers*; the blue tin (building graphic) = *all metal surfaces*. The site had these reversed. | Images corrected and products reordered to catalogue order. |
| 3 | **COOL G understated.** p3 pack reads "Blocks ultraviolet **and infrared** radiations". | Both radiation types now stated. |
| 4 | **Missing pack specs.** All four main products are marked 20 KG nett when packed; SurfaKlean is "used on metal, concrete, tiles and plastic". | Added as a spec list on each product. |
| 5 | **Mis-attributed stat.** 24.1°C belongs to the p42 revamp, not the p43 multiple-rooftops job, which states 20–24°C. | Stat corrected to 20–24°C. |
| 6 | **"Five formulations"** counted six products. | Copy now reads five in the range, plus COOL G coming soon. |
| 7 | Temperature bands labelled "Observed band A/B/C". | Relabelled "Site reading 1–3" (p11–p14 give three distinct bands: 63–79, 68–77, 66–72°C). |

Verified correct and unchanged: 70.7/46.3°C and 46.1/30.8°C (p18); 69.7/36.5°C, delta
20.9° (p34); 57.4→36.1°C (p35); 21.7°C madrasa with 12–14°C inside (p39); 23.2°C (p40);
19.2°C chicken farm (p44); the full energy table and AED 93,024 / 244,800 kWh / 208,080 kg
(p20); 1,950 Mt, 3.94%, 531/599 Mt split (p20); 8-hour leakage stop and 20-year record
(p28); all ten metal applications (p21) and eleven leakage areas (p28).

Two source typos are silently normalised: "Nono Technology" → nanotechnology, and
"Viking action" (p28) → wicking action, which p27 confirms as "Impregnation / Wicking Effect".

## Image integrity

Container aspect ratios are matched to the intrinsic ratio of the images they hold, so
nothing is stretched or severely cropped:

- **Heroes are full-bleed backgrounds** — home and every sub-page use the same treatment:
  the photograph fills the section behind the type, under a light scrim that keeps the
  deep-teal display face readable. No fixed-ratio plate, so no crop distortion.
- Project galleries are `16/9` (sources run 1.78–2.22)
- Model renders and pack shots use `object-contain`, never `cover`
- The distorted full-width UAE flag banner was removed (a square image forced into 21:9)

### Assets currently unused

Eleven assets are off the page as a direct result of requested removals and redesigns.
They are kept in `public/img/` in case they are wanted back:

| File | Why |
|---|---|
| `proof/fluke-35`, `fluke-40`, `fluke-58`, `boxes-field`, `box-glass` | The evidence photo grid was removed. **Every reading they carried is preserved** in the Field log table. |
| `bg/oil-refinery`, `bg/nanotechnology` | Banner and figure removed while compacting the Applications and Scale sections. |
| `bg/co2-sustainability` | Portrait image in a wide card slot; replaced by `bg/co2-dashboard`. |
| `bg/india-gate-smog`, `bg/decarbonized` | Dropped in the About rebuild, which leads on the firm rather than on stock emissions imagery. |
| `projects/villas` | Replaced as the home hero by `bg/dubai-aerial`, which is natively 16:9. |

## Charts and diagrams

- `ThermalChart` — a **dumbbell** plot: the distance between the coated and uncoated dots
  *is* the reduction, which is what the data is about. Paired bars made the reader compute
  the gap themselves.
- `PrincipleDiagram` — a measured cross-section per side (coating, roof, cavity, ceiling,
  room) with leader-lined labels. Temperature readings sit in HTML above the drawing so
  they can never collide with the rays.

## Navigation & the survey modal

- Nav is **About us · Products · Technology · Projects · Contact**. There is no Home item —
  the wordmark links home, as on the inspiration — and the old "Firm" label is now "About us".
- **`SurveyModal.tsx`** provides a `SurveyProvider` (mounted in `layout.tsx`) plus a
  `SurveyButton`. The hero and the closing CTA raise the survey form in place instead of
  routing to `/contact`; Escape closes it, focus is trapped and restored, and the body
  scroll is locked while it is up. The header and footer links still go to `/contact`,
  which remains the full page.
- `ContactForm` takes a `bare` prop so the same form serves both the page and the modal.

## Carousels

- **`Carousel.tsx`** — a continuously-moving strip of large image cards; pauses on hover,
  draggable, with arrow controls. Used for the application photographs.
- **`ExpandingPanels.tsx`** — the inspiration's "Our Principles" pattern: the active panel
  opens wide, goes dark and carries the photograph while the others collapse to slim cards
  showing only a numeral and label. Auto-advances until the reader interacts.

## Interaction components

| Component | Behaviour |
|---|---|
| `ScrollingRow` | Continuously translating row (duplicated track, seamless loop). Holds still while a pointer is over it — including touch, where `pointerdown`/`touchstart` park it, since there is no hover. Used by the product range and the applications row. |
| `ExpandingPanels` | The inspiration's principles pattern: the open panel widens, goes dark and carries the photograph; the rest collapse to slim cards. The photograph is **mounted only while open** so nothing ghosts through the crossfade. Auto-advances until the reader interacts. |
| `SurveyModal` | `SurveyProvider` + `SurveyButton`. Capped at `92svh` with the body scrolling and the header/footer pinned, so it never runs off-screen on a laptop or a phone. Escape closes, focus is trapped and restored, background scroll locked. |

### Philosophy cards

The left-hand fade on each card's photograph is a **CSS mask on the image itself**, not an
overlay gradient — an overlay left a visible seam where the two met. At rest the image is
greyscale at 25%; on hover it comes up to full colour at 80%, matching the inspiration.

## Product showcase (`/products` hero)

Modelled on a reference motion study, rebuilt in the site's own palette.

**Typography.** The display word uses **Poppins Bold with 0.12em tracking** — lighter and more spread than the first pass, matching
the reference's heavy geometric letterforms (read off frames extracted from the source
video). It is sized by **measuring the rendered word**, not by estimating per-character
width — Poppins is wider than a coefficient predicts and the word changes length every
slide. The measurement re-runs on `fonts.ready` and on resize, and targets 90% of the
viewport, so a ten-letter word fits a phone and a five-letter word fills a desktop.

**The word is the substrate, not the pack name** — three products are all called HEAT PLUG,
so the headline would have sat unchanged across three slides. Containers / Metal / Concrete
/ Water / Surface / Glass, each from the catalogue's own category line. The product name is
carried by its **brand wordmark image** (`brand/wordmark-*.png`) rather than set as text.

**Motion — a blur cross-dissolve, not a rotation.** Frame analysis of the reference video
(33fps, frames 126–135) shows the bottle never turns: it holds position and size while the
outgoing and incoming packs smear horizontally through each other for about 100ms, settling
by ~270ms. An earlier attempt rotated the flat pack shot on `rotationY`, which reads as a
turning sheet of paper rather than a turning tin — a real turn would need a rendered
turntable frame sequence, not a single flat PNG.

- Outgoing pack and letters blur out and slide against the travel direction; incoming ones
  blur in and slide with it, overlapping by ~100ms. Both slides stay mounted through the
  swap so they genuinely dissolve through one another.
- Orbiting objects fly in directionally; a grounding shadow stretches out beneath the pack.
- At rest every object drifts and rotates on its own clock, and follows the cursor with
  depth-weighted parallax — nearer objects travel further.

**Layout.** The pack sits *in flow between the two arrows*, with the word absolutely centred
behind it, so nothing can overlap by construction. Below `sm` the arrows move to the bottom
row beside the dots — flanking them would land them on the word's first and last letters.

Autoplay pauses on hover and on touch; `prefers-reduced-motion` disables all of it.

### Word colour, sampled from the pack

Each slide's display word takes a colour **derived from its own pack artwork**, not picked
by hand. A script bins every opaque, saturated, mid-tone pixel of the pack shot by hue,
takes the most populous bin as the dominant colour, then holds that hue while darkening it
and pulling saturation back — same family as the product, deliberately not the same colour.

A plain mean was tried first and failed: SURFAKLEAN's red and blue bands averaged into
purple. The hue histogram avoids that.

| Product | Pack dominant | Word |
|---|---|---|
| HEAT PLUG — containers | `#b6b47c` khaki | `#5c5b2d` olive |
| HEAT PLUG — all metal | `#4a7adc` blue | `#223967` deep blue |
| HEAT PLUG — concrete | `#d6a2a3` pink | `#5f2a2c` maroon |
| AQUAPLUG | `#a3cdce` teal | `#2d5b5c` deep teal |
| SURFAKLEAN | `#5285d3` blue | `#223d67` deep blue |
| COOL G | `#cabe57` green-gold | `#676022` olive gold |

The bloom behind the pack and the active progress bar both pick up the same colour.

### The breathing bug

The idle drift ran on load and then stopped for every subsequent product. Cause: the
floating objects were keyed `` `${product.slug}-${i}` ``, so React **unmounted and remounted
them on every slide change**, orphaning the infinite tweens that had been attached to the
old nodes.

Fixed by giving the positioned wrapper a **stable key** (`i`) and keying only the inner
image, so the animated node survives the swap. Verified by sampling the computed transform
on slides 1, 3 and 6 — all still moving. The pack's own hover float uses the same pattern.

## Home page sections added

| Section | Notes |
|---|---|
| `ImpactDiagram` | **Catalogue slide 15** rebuilt live — the four-quadrant diamond, the central "IMPACT of HIGH Temperature" hub, the four corner text blocks and their photographs, all with the deck's own wording. The deck's amber/orange/cyan/blue becomes four colours from this site's palette. Quadrants assemble out of the centre on scroll, the hub ring breathes, and hovering a quadrant dims the other three. |
| `Reviews` | Laid out to the supplied reference: centred header, star row, italic quote, avatar, name and role, dot pagination. **Only the active review is mounted** — crossfading two blocks of prose left them legibly overlapping. |
| `ProductShowcase` | Now also the home product section, replacing the scrolling range row. |

The home page's old "Client voices" block was removed — `Reviews` opens with the same
catalogue letter, so the two were showing the same quote twice. The full letter with both
signatories still runs on `/projects`.

### Reviews content

`reviews[0]` is the real catalogue letter (p41). **`reviews[1]` and `[2]` are placeholders**,
marked `TODO` in `src/lib/data.ts` with `source: "Placeholder"` — replace before launch.

## Other changes

- **`ThermalChart`** carries a field photograph behind the plot at 9% with a left-to-right
  wash, so the data stays dominant and nothing is cropped or distorted.
- **`Lenses`** is now a slide: one lens open at a time with an oversized numeral bled off
  the corner, a rail of the other three, and a progress bar. Auto-advances, holds on hover.
- **`Applications`** drops the two written lists. The models now open a **dialogue on hover**
  carrying that surface's measured figures; on touch the row scrolls horizontally and a tap
  opens the same panel.
- **`VideoHero`** backs the `/technology` hero with video instead of a still. The clip sits
  in a rounded plate with a hairline frame and **no scrim over the footage**, so it stays
  sharp rather than washed out. Muted + `playsInline` for autoplay policy;
  `prefers-reduced-motion` pauses it.

## Decarbonising journey (`DecarbonisingJourney`)

A pinned, four-frame journey backed by aerial footage. On the home page it takes the place
of `WhyGCC`; at the end of `/technology` it replaces the old "Decarbonising" block and opens
on frame 02 (`startFrame={1}`) so it reads as a conclusion rather than a second intro.

**Content** is catalogue slides 5 and 7, verbatim: the definition, the business-context line,
then the UAE block — first to sign the Paris Agreement, first to commit to net zero by 2050,
and the oil-and-gas / renewables / transport commitments.

### Why the video plays instead of being scrubbed

The obvious build is to drive `currentTime` from scroll. I measured seek latency on the
supplied encode first:

```
median 55ms · p90 95ms · max 104ms
```

A scrubbed frame needs to land inside ~16ms, so hard-scrubbing stuttered at roughly 10–18fps.
Re-encoding with dense keyframes would fix it but needs ffmpeg, which this machine lacks.

So the clip **loops and plays normally** — always smooth — and the *grade* is scrubbed
instead: a warm smog wash lifts and a clear cool light rises as the reader descends. The
polluted-to-clean journey still tracks the scroll, without a single seek.

If you want true scrubbing later, supply the clip re-encoded at GOP 1 and it is a small change.

### Footage

Four takes live in `public/video/zero-emission/` as `take-1..4.mp4` (8s, 1280×720, ~2MB each).
**take-3** is used — it has the strongest arc, ending on a bright clean city with river, solar
and turbines. The others are kept as alternates; swapping is a one-line change.

### The generator watermark

The clips carry a corner sparkle from the generator. Because `object-cover` crops differently
at every viewport ratio, that mark lands in a moving spot — so rather than a fixed patch, the
bottom-right carries a **proportional radial wash** (52% × 46% of the stage) with the Webberbiz
lockup sitting inside it. Verified by measuring luminance range in that region: **11** (min 24,
max 35), i.e. flat — the mark is not recoverable from the rendered frame.

Note this covers, and does not remove, the provider's visible mark; check that against the
generator's terms for commercial use, and be aware invisible watermarking (e.g. SynthID) may
persist in the file regardless.
