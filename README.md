# Webberbiz Trading LLC — website

Marketing site for Webberbiz Trading LLC, built to match the design language and
motion of [kaayaprimerealty.com](https://kaayaprimerealty.com/), with all content and
imagery taken from *Webberbiz — Product Presentation, May 2025* (45pp).

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — design tokens declared in `src/app/globals.css` under `@theme`
- **GSAP + ScrollTrigger** — reveals, split headings, counters, pinned sections
- **Lenis** — smooth scroll, slaved to ScrollTrigger so scrubbed animation stays in sync

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Structure

```
src/
  app/
    page.tsx            home — long scroll, all catalogue themes
    products/           the five formulations + applications
    technology/         nanotech scale, working principle, temperature dynamics
    projects/           eight case studies with measured deltas
    about/              the firm, R&D, decarbonisation, GCC
    contact/            survey request form
  components/
    motion.tsx          Reveal / SplitHeading / Counter primitives
    SmoothScroll.tsx    Lenis <-> ScrollTrigger bridge
    home/               home page sections
  lib/
    data.ts             ALL site copy and figures, transcribed from the catalogue
```

## Content

`src/lib/data.ts` is the single source of truth for copy. Every number in it —
the 24°C–30°C reduction, the 70.7°C/46.3°C container readings, the AED 93,024
energy saving, the 208,080 kg CO₂ figure, the project deltas and the two
testimonials — is transcribed from the catalogue.

## Before launch — outstanding items

These are the only things not derivable from the catalogue:

1. **Phone and email.** `company.phone` and `company.email` in `src/lib/data.ts` are
   placeholders (`+971 0 000 0000`, `info@webberbiz.example`). The postal address is real.
2. **Contact form endpoint.** `src/components/ContactForm.tsx` validates and shows a
   confirmation state but does not submit anywhere. Point `onSubmit` at your form
   handler or CRM.
3. **`metadataBase`** in `src/app/layout.tsx` is set to `https://webberbiz.example` —
   change to the production domain so Open Graph URLs resolve.

## Images

All 118 images in `public/img/` were extracted from the catalogue PDF — no stock
photography was added. Product pack shots, brand wordmarks, the 3D application
renders and the GCC flags keep their alpha channels as PNG; photographs are WebP.
