# 08 — TASK 04 Apartments Report (T07)

**Date:** 18 November 2026  
**Scope:** T07 only. TASK 05 not started.

---

## Files created or modified

**Created**

- `lib/apartments.ts`
- `components/apartments/ApartmentGallery.tsx`
- `components/apartments/ApartmentFacilities.tsx`
- `docs/fiona-upgrade/08-task-04-apartments-report.md`

**Modified**

- `app/apartments/page.tsx`

**Not modified (protected / out of scope)**

- `components/SriLankanCinematicHome.tsx` (`CinematicHero`, `HeroLoader`, `ScrollCinema`)
- `components/LoadingScreen.tsx`
- `app/template.tsx`
- `components/Navigation.tsx`
- `app/globals.css`
- `tailwind.config.ts`
- `lib/villaMedia.ts` (paths and homepage album titles left unchanged so below-hero homepage copy does not shift)
- `app/contact` / `ContactForm.tsx`
- `app/villas/page.tsx`

Forest Green `#244D39`, Deep Green `#203C30`, Warm Ivory `#F4F0E7`, Sage `#A3AA88`, and Natural Beige `#D7C5A7` are used as **page-scoped** Tailwind arbitrary values on `/apartments` only.

---

## Page sections implemented

1. Existing `PageHero` with approved H1 and page-8 intro paragraph, using a genuine garden photograph (`villaImages.outdoor[0]`).
2. Short note that Fiona offers **exactly two** apartments (kitchen/garden/balcony photos are not extra units).
3. Apartment 01 — A/C Luxury Green Garden Apartment (`#green-garden`).
4. Apartment 02 — Scenic Balcony 2-Bed Suite (`#balcony-suite`).
5. Stay Your Way — enquiry-first availability copy and Check Availability → `/contact`.

Each apartment block includes: approved name, floor, bedrooms, bathroom, kitchen, setting, PDF description, ideal-for line, Lucide facilities, photo gallery, enquiry CTA.

---

## Apartment details used

| Field | Green Garden | Scenic Balcony Suite |
| --- | --- | --- |
| Floor | Ground floor | Upper floor |
| Bedrooms | One air-conditioned bedroom | **Two separate bedrooms** |
| Bathroom | Private bathroom | Private bathroom |
| Kitchen | Fully equipped private kitchen | Private kitchenette |
| Setting | Direct garden frontage | Open balcony, bar counter, garden and treetop views |
| Ideal for | Couples and independent travellers… | Families, friends and guests who prefer additional space |
| Copy | PDF p. 8, unaltered | PDF p. 8, unaltered |

Occupancy, bed sizes, rates, Wi-Fi, parking, and hot water are **not** displayed.

---

## Image albums selected

Existing `villaImages` paths only. No renames, no Hero assets touched.

**Green Garden:** `firstApartmentRoom` 1, 3, 6; `kitchenFirst` 1, 4; `outdoor` 1 (garden frontage).

**Scenic Balcony Suite:** `secondApartmentRoom` 1 (bedroom opening to balcony), 5 and 10 (second distinct bedroom), `kitchenSecond` 1, `balcony` 1 and 6.

The suite folder is named `Room_01` but contains **two visually distinct bedrooms**. Those photographs are used honestly. Dedicated bathroom stills are limited; that is noted on the suite.

---

## Facilities included and excluded

**Included (confirmed):** ground/upper floor, air conditioning, bedroom(s), private bathroom, kitchen/kitchenette, garden frontage or balcony, bar counter, garden/treetop views.

**Excluded:** Wi-Fi, parking, hot water, airport pickup, breakfast, pool, jacuzzi, spa, extra beds, occupancy, prices.

`withheldFacilities` in `lib/apartments.ts` is structured for later owner-approved additions.

---

## Enquiry CTA destinations

- Enquire About This Apartment → `/contact?apartment=green-garden`
- Enquire About This Suite → `/contact?apartment=balcony-suite`
- Check Availability → `/contact`

Query-parameter **preselection on the form is not implemented** (later booking-form task). `/contact?apartment=green-garden` loads; the form remains disabled with WhatsApp/email alternatives. No success confirmation.

---

## Outstanding owner confirmations

- Dedicated bathroom photography (and a clearly labelled second-bedroom album if they prefer a split archive).
- Occupancy, bed configuration, Wi-Fi, parking, hot water.
- Approved rates/currency.
- Whether kitchenette appliance list should be itemised.

---

## TypeScript

`npx tsc --noEmit` — **pass** (also via `next build` type check).

## Production build

`npm run build` — **pass** (Next.js 15.5.18). `/apartments` remains a static route.

---

## Desktop / mobile tests

Local production: `http://localhost:3005`.

- `/apartments` loads; H1 and both section headlines match the brief.
- Exactly two units; suite copy includes “two separate bedrooms”.
- No Wi-Fi / parking / hot water / occupancy / prices in page text.
- Gallery thumbnails change the featured image; keyboard ArrowRight advances selection.
- CTA hrefs verified in the DOM; contact URL with `?apartment=green-garden` returns the disabled form.
- HTTP **200** for `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/villas`, `/wellness`, `/retreat`.
- At CSS width **390px**, `document.documentElement.scrollWidth === 390`. Decorative SVGs are clipped with `overflow-x-hidden` on the apartments `main`. The capture canvas letterboxes a 390px layout; overflow was measured in CSS pixels.
- Pixel-perfect visual diff tooling was **not** used.

---

## Hero regression verification

| Check | Result |
| --- | --- |
| Hero source files | Unchanged |
| Homepage `scrollY = 0` header | `opacity: 0`, `pointer-events: none` |
| Follow Us / Villas / Retreat / split Fiona / Explore Now | Present |
| Desktop first viewport | Composition matches the protected Hero; captured slide was **03 EXPERIENCE** (slideshow, not a regression vs baseline **02 UNWIND**) |

---

## Recommended TASK 05 scope

Roadmap **T08**: rewrite `/experiences` to the six approved experiences from PDF p. 10. Do not advertise spa, yoga, jacuzzi, or unconfirmed tours. Do not restyle the Hero. Do not enable the booking API.
