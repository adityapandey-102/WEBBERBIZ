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
