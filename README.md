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

These nine were deliberately taken off the page on request, and are kept in `public/img/`
in case they are wanted back:

| File | Why |
|---|---|
| `proof/fluke-35`, `fluke-58`, `meter-readings`, `test-boxes`, `boxes-field`, `box-glass` | The evidence photo grid was removed. **Every reading they carried is preserved** as the Field log table and the "How the reading is taken" list. |
| `bg/oil-refinery`, `bg/nanotechnology` | Banner and figure removed while compacting the Applications and Scale sections. |
| `projects/villas` | Replaced as the home hero by `bg/dubai-aerial`, which is natively 16:9 and works as a full-bleed background. |

## Charts and diagrams

- `ThermalChart` — a **dumbbell** plot: the distance between the coated and uncoated dots
  *is* the reduction, which is what the data is about. Paired bars made the reader compute
  the gap themselves.
- `PrincipleDiagram` — a measured cross-section per side (coating, roof, cavity, ceiling,
  room) with leader-lined labels. Temperature readings sit in HTML above the drawing so
  they can never collide with the rays.
