# 10 — TASK 06 About Fiona Report (T09)

**Date:** 18 November 2026  
**Scope:** T09 only. TASK 07 not started.

---

## 1. Files created / modified

**Created**

- `lib/about.ts`
- `docs/fiona-upgrade/10-task-06-about-report.md`

**Modified**

- `app/about/page.tsx`

**Not modified**

- `components/SriLankanCinematicHome.tsx` (`CinematicHero`, `HeroLoader`, `ScrollCinema`)
- `LoadingScreen`, `app/template.tsx`, Navigation, Footer
- `app/globals.css`, `tailwind.config.ts`
- `/retreat`, contact form, Hero assets

---

## 2. Approved About sections

| Section | Heading | Notes |
| --- | --- | --- |
| Hero | Welcome to Fiona Green Serenity. | Approved intro from PDF p. 13 |
| 01 | Our Story | Full approved paragraph |
| 02 | Our Hospitality | Full approved paragraph |
| 03 | Our Philosophy | Subheading **Comfort. Nature. Hospitality.** plus approved values copy |
| CTA | Come as a Guest. Leave with Beautiful Memories. | Enquiry-first note added |

One H1 only.

---

## 3. Image sources

| Use | Path | Category |
| --- | --- | --- |
| Page hero | `villaImages.outdoor[2]` | Property exterior / garden |
| Our Story | `villaImages.outdoor[0]` | Garden frontage |
| Our Hospitality | `villaImages.outdoor[7]` | Evening veranda |

Genuine Fiona JPEGs only. No Unsplash, generated, or destination photos.

---

## 4. UI/UX

Editorial image-and-text for Story and Hospitality; typography-led Philosophy; deep-green closing band. Page-scoped Forest / Deep Green / Warm Ivory / Sage / Beige. `overflow-x-hidden` on `main`. Existing `PageHero`, `Reveal`, ornaments. No new packages.

---

## 5. CTA destinations

- Enquire About Your Stay → `/contact`
- Explore Our Apartments → `/apartments`

Copy states the host confirms availability and an enquiry does not reserve a stay. Contact form remains disabled.

---

## 6. TypeScript

`npx tsc --noEmit` — **pass**.

## 7. Build

`npm run build` — **pass** (Next.js 15.5.18).

---

## 8. Browser / mobile

Local production `http://localhost:3007`.

- `/about` H1, three sections, philosophy subheading, and closing CTA verified.
- Photographs load.
- `/contact` and `/apartments` load.
- 390px: `document.documentElement.scrollWidth === 390`.
- HTTP 200 for `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/villas`, `/wellness`, `/retreat`.
- No founding year, awards, airport pickup, or complimentary breakfast/welcome-drink claims.
- Pixel-perfect visual-diff tooling was **not** run.

---

## 9. Hero regression

Hero source files unchanged. Homepage `scrollY = 0`: header `opacity: 0`, `pointer-events: none`. Follow Us, Villas, Retreat, split Fiona, Explore Now present. Desktop capture showed slide **02 UNWIND**, matching the TASK 01 baseline composition.

---

## 10. Owner-dependent details withheld

Founding year, founder names, awards, ratings, complimentary airport pickup, breakfast, welcome drinks, guest reviews.

PDF hospitality line “arranging transportation” is kept as host assistance, not as an included transfer.

---

## 11. Remaining issues

- `/retreat` still exists as a separate page.
- Shared `Reveal` still ignores `prefers-reduced-motion`.
- Contact form fields from PDF p. 14 are not yet implemented.

---

## 12. Recommended TASK 07 scope

Roadmap **T10**: contact form fields from PDF p. 14, client validation, disclaimer, WhatsApp panel. Keep submit blocked until the backend task. Do not restyle the Hero.
