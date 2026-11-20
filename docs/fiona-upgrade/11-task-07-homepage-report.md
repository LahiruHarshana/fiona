# 11 — TASK 07 Homepage Below-Hero Report (T11–T12)

**Date:** 19 November 2026  
**Scope:** T11–T12 only, no booking backend. TASK 08 not started.

---

## Files created / modified

**Created**

- `lib/homepage.ts`
- `components/home/HomepageBelowHero.tsx`
- `docs/fiona-upgrade/11-task-07-homepage-report.md`

**Modified**

- `components/SriLankanCinematicHome.tsx` — **default export composition only**: after `CinematicHero`, render `HomepageBelowHero`, then `ScrollCinema`. One import added.

**Not modified**

- `CinematicHero`, `HeroLoader`, `ScrollCinema`, `SceneLayer`, hero helpers, `heroSlides`
- `LoadingScreen`, `app/template.tsx`, Navigation, Footer, global CSS, Tailwind tokens
- Contact form (still disabled)

`git diff` on `SriLankanCinematicHome.tsx` is limited to the import and the five-line composition change.

---

## Homepage sections implemented

Below the protected Hero:

1. Welcome — Where Tropical Nature Meets the Comfort of Home.
2. Why Choose Fiona? — six approved feature cards.
3. Discover Our Apartments — two units; suite has **two separate bedrooms**.
4. The Fiona Experience — garden, kitchen, balcony, local recommendations (no king coconut).
5. Discover Southern Sri Lanka — Dalawella, Unawatuna, Galle Fort; text-led; `/explore-galle`.
6. Reviews — **omitted** (no verified Airbnb/Booking.com reviews).
7. Gallery preview — six genuine photographs; `/gallery`.
8. Hospitality — personal hosting (no airport pickup, no welcome drinks).
9. Final CTA — WhatsApp and email.

---

## Existing sections preserved

- `CinematicHero` and `HeroLoader` unchanged.
- `ScrollCinema` still mounts after the new marketing block, unstyled.
- `IntroSection`, `PhotoReelSection`, `ApartmentStory`, `OutdoorLivingBand`, `ClosingCTA` remain in the file but are **no longer mounted**, to avoid duplicate/incorrect apartment language in the marketing flow. They were not deleted, to keep the Hero/ScrollCinema regions untouched.

---

## Approved content used

PDF pp. 5–7 copy for Welcome, Why Choose, apartment teasers and highlights, South Coast, gallery heading, closing heading. Experience and hospitality paragraphs omit unconfirmed king coconut and airport transfer lines.

---

## CTA destinations

| Label | Destination |
| --- | --- |
| Discover Our Story | `/about` |
| Explore Apartment / Suite | `/apartments#green-garden` / `#balcony-suite` |
| Explore Our Apartments | `/apartments` |
| Explore Southern Sri Lanka | `/explore-galle` |
| View Our Gallery | `/gallery` |
| Contact Fiona on WhatsApp | `https://wa.me/94743842244` |
| Email Fiona | `mailto:info@fionagreenserenity.com` |

Hero Explore Now still goes to `/villas`. The website does not claim online enquiry submission.

---

## Image sources

Genuine `villaImages` only: outdoor garden/veranda, balcony, kitchens, Green Garden bedroom, suite bedroom, drone evening exterior. No destination, Unsplash, or generated images.

---

## Owner-dependent content withheld

Verified guest reviews, star ratings, km/minutes, king coconut welcome drinks, airport transfers as a service, prices, occupancy.

---

## TypeScript / build

- `npx tsc --noEmit` — **pass**
- `npm run build` — **pass** (Next.js 15.5.18)

---

## Desktop / mobile

Local production `http://localhost:3008`.

- First viewport is still the cinematic Hero.
- New sections appear below it; ScrollCinema follows.
- Exactly two apartments in the marketing block; two separate bedrooms listed.
- WhatsApp and mailto hrefs verified.
- No fake reviews; no king coconut or airport transfer in new copy.
- 390px: `document.documentElement.scrollWidth === 390`.
- HTTP 200 for approved and legacy routes.
- Pixel-perfect visual-diff tooling was **not** run.

---

## Hero regression

Header at `scrollY = 0`: `opacity: 0`, `pointer-events: none`. Follow Us, Villas, Retreat, split Fiona, Explore Now present. Desktop capture showed slide **02 UNWIND**, matching the TASK 01 baseline composition.

---

## Remaining issues

- `ScrollCinema` still uses older “two-bed comfort” language (left unchanged by design).
- Unused below-hero functions remain in `SriLankanCinematicHome.tsx`.
- `/contact` form is still disabled (correct for no-backend scope).
- Explore Galle and gallery filter/lightbox remain later tasks.

---

## Recommended TASK 08 scope

Roadmap **T17**: fill `/explore-galle` from the brief without unverified distances or fake destination photos. Do not restyle the Hero. Do not add a booking backend.
