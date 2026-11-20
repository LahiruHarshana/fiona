# 09 — TASK 05 Experiences Report (T08)

**Date:** 18 November 2026  
**Scope:** T08 only. TASK 06 not started.

---

## Files created and modified

**Created**

- `lib/experiences.ts`
- `docs/fiona-upgrade/09-task-05-experiences-report.md`

**Modified**

- `app/experiences/page.tsx`

**Not modified**

- `components/SriLankanCinematicHome.tsx` (CinematicHero, HeroLoader, ScrollCinema)
- `LoadingScreen`, `app/template.tsx`, Navigation, Footer
- `app/globals.css`, `tailwind.config.ts`
- Hero image paths
- `/wellness`, `/retreat`, contact form

Page-scoped colours: Forest `#244D39`, Deep Green `#203C30`, Warm Ivory `#F4F0E7`, Sage `#A3AA88`, Beige `#D7C5A7`.

---

## Six experience sections

| # | Name | H2 | Layout |
| --- | --- | --- | --- |
| 01 | Tropical Garden Living | Find Your Peace in the Green. | Photo + copy |
| 02 | Balcony Moments | Slow Mornings and Beautiful Evenings. | Photo + copy |
| 03 | Beachside Adventures | Discover the Beauty of Dalawella. | Text-led |
| 04 | Local Food & Culture | Taste the Flavours of Sri Lanka. | Text-led |
| 05 | Explore the South Coast | Make Every Day an Adventure. | Text-led + `/explore-galle` |
| 06 | Personal Guest Hospitality | A Warm Welcome, the Sri Lankan Way. | Photo + copy |

H1: **Experience the Beauty of Staying at Fiona.** plus the approved page-10 introduction.

---

## Content used from the brief

PDF p. 10 copy is used for the H1, intro, and experiences 01–05. Experience 06 omits airport pickup: “Enjoy a thoughtful welcome and personal local guidance during your stay. We are happy to help with local shopping recommendations and travel arrangements.” Morning coffee on the balcony is not described as included breakfast.

Independent labels: Independent coastal visit / Independently operated dining / Independent exploration. Intro states Fiona does not run tours, meals or spa services. Swimming safety is the approved caution only; wildlife is not guaranteed.

---

## Photo sources

| Use | Source | Category |
| --- | --- | --- |
| Page hero | `villaImages.outdoor[7]` | Genuine garden/veranda at night |
| Garden living | `villaImages.outdoor[0]` | Garden frontage |
| Balcony moments | `villaImages.balcony[0]` | Open balcony |
| Hospitality | `villaImages.drone[4]` | Property evening lights |

No Dalawella, Unawatuna or Galle Fort photographs exist in `public/` with verified licence. Those sections are text-led. Unsplash, `public/generated/`, and villa photos labelled as beaches/forts were not used.

---

## Owner-dependent content withheld

Airport pickup terms, king coconut welcome drinks, spa, yoga, Fiona-operated tours, complimentary meals, horse riding, jacuzzi, pool, guaranteed turtles or swimming safety, walking minutes/km, licensed destination photography.

---

## CTA destinations

- Enquire About Your Stay → `/contact`
- Explore Galle → `/explore-galle` (section 05 and closing)

Enquiry-first copy. Contact form remains disabled.

---

## TypeScript / build

- `npx tsc --noEmit` — **pass**
- `npm run build` — **pass** (Next.js 15.5.18)

---

## Browser / mobile

Local production `http://localhost:3006`.

- `/experiences` loads with correct H1 and six headlines.
- Images load; no Unsplash.
- Banned-service scan: spa treatments, yoga, jacuzzi, pool, airport pickup, complimentary — not present.
- `/contact` and `/explore-galle` open.
- At 390px CSS width, `document.documentElement.scrollWidth === 390`.
- HTTP 200 for `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/villas`, `/wellness`, `/retreat`.
- Pixel-perfect visual-diff tooling was **not** run.

---

## Hero regression

Hero source files unchanged. Homepage at `scrollY = 0`: header `opacity: 0`, `pointer-events: none`. Follow Us, Villas, Retreat, split Fiona, Explore Now present. Desktop capture showed slide **02 UNWIND**, matching the TASK 01 baseline composition. Slideshow timing can differ on other visits.

---

## Remaining issues

- `/wellness` still exists with old content (redirect later).
- Explore Galle remains a foundation page.
- Destination photography still needed from the owner.
- Shared `Reveal` does not read `prefers-reduced-motion` (pre-existing).

---

## Recommended TASK 06 scope

Roadmap **T09**: fill `/about` from PDF p. 13. Do not restyle the Hero. Do not enable booking. Do not rewrite `/wellness` except if explicitly in scope.
