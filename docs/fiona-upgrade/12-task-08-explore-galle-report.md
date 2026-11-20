# 12 — TASK 08 Explore Galle Report (T17)

**Date:** 19 November 2026  
**Scope:** Roadmap T17 only. No booking backend, MongoDB, admin, contact-form enablement, paid maps, redirects, or TASK 09.

---

## Files created / modified

**Created**

- `lib/destinations.ts`
- `components/explore/DestinationCard.tsx`
- `components/explore/ExploreMotion.tsx`
- `docs/fiona-upgrade/12-task-08-explore-galle-report.md`

**Modified**

- `app/explore-galle/page.tsx` — foundation stub replaced with the destination guide

**Not modified**

- `CinematicHero`, `HeroLoader`, `ScrollCinema`
- `components/SriLankanCinematicHome.tsx`
- `components/LoadingScreen.tsx`
- `app/template.tsx`
- Homepage, Navigation, Footer, global CSS, fonts, hero assets
- Contact form (`ENQUIRY_API_ENABLED` still false)
- Legacy `/villas`, `/wellness`, `/retreat`

---

## Attraction data added

Typed in `lib/destinations.ts`. Optional `image`, `imageAlt`, `mapUrl` left empty (no licensed destination photos; no verified pins).

### Beaches & Coastal Destinations (7)

1. Dalawella Turtle Beach — swimming/turtle sightings not guaranteed; PDF two-minute walk **omitted**
2. Unawatuna Beach — independently operated; PDF 5 km **omitted**
3. Jungle Beach — Rumassala
4. Koggala Beach
5. Weligama Beach
6. Mirissa Beach — seasonal whale watching noted; independently operated
7. Hikkaduwa Beach — independently operated

### Culture & Heritage (4)

1. Galle Fort — UNESCO visitor link only; PDF 9 km **omitted**
2. Old Dutch Hospital
3. Japanese Peace Pagoda — Rumassala
4. Martin Wickramasinghe Folk Museum

Culture copy states these are regional historic places, not Fiona facilities.

### Nature & Local Experiences (4)

1. Koggala Lake & Madol Duwa — independently operated; operator confirmation required
2. Traditional Stilt Fishing — not on demand; independently operated
3. Handunugoda Tea Estate — independently operated; access not guaranteed
4. Rumassala Nature Area

### Adventure & Activities (5, not counted in the 15 named attractions)

- Surfing (seasonal, independently operated)
- Snorkelling
- Diving
- Seasonal whale watching
- Boat excursions

Disclaimer: “Activities are independently operated and subject to local weather, sea conditions, seasonal availability and operator arrangements. Fiona Green Serenity does not operate these activities.” No prices.

---

## Categories implemented

In-page navigation: Beaches, Culture, Nature, Adventure (`#beaches`, `#culture`, `#nature`, `#adventure`). Category chips wrap on small screens.

---

## Image sources

- Page hero uses genuine Fiona outdoor photograph `villaImages.outdoor[0]` (`/Outdoor/Outdoor/1.jpeg`).
- Copy states this is the accommodation, **not** Galle Fort, Dalawella Beach, or any attraction.
- No Unsplash, generated, or mislabelled destination photographs.
- Attraction cards are **text-led**.

---

## Map implementation status

**Live map omitted.** Owner-verified villa pin and attraction coordinates are not in the repository. The map section is a non-misleading placeholder: no markers, no guessed coordinates, no paid map API, no API keys.

---

## Content withheld pending verification

- Distances and travel times (including Dalawella walk, Unawatuna 5 km, Galle Fort 9 km)
- Property GPS / map pin
- Attraction map URLs other than the UNESCO Galle Fort listing
- Opening hours
- Pricing
- Safe-swimming guarantees
- Turtle / whale / wildlife sightings
- Boat trips, fishing demonstrations, tea-estate visitor access, tour operators as Fiona services
- Licensed destination photography

Official URL used: [UNESCO Old Town of Galle and its Fortifications](https://whc.unesco.org/en/list/451/).

---

## CTA destinations

| Label | Destination |
| --- | --- |
| Explore Our Apartments | `/apartments` |
| Contact Fiona on WhatsApp | `https://wa.me/94743842244` |

Closing heading: **Make Fiona Your Base for Exploring the South Coast.** Copy from PDF p. 12. Page states the site does not take instant bookings.

---

## SEO improvements

- Title: **Best Places to Visit in Galle \| Fiona Green Serenity** (`title` + layout template)
- Meta description based on actual page content (beaches, heritage, nature, independent activities; Mihiripenna, Thalpe)
- One H1; H2 per category + map + closing; H3 per attraction
- Semantic `<nav aria-label="Destination categories">`
- Descriptive UNESCO link text (“Official visitor information”)
- No fake structured data, ratings, prices, or coordinates
- Site-wide sitemap/robots/GA4 left for T20–T21

---

## TypeScript / build

- `npx tsc --noEmit` — **pass**
- `npm run build` — **pass** (Next.js 15.5.18)

---

## Desktop / mobile verification

Local production `http://localhost:3009`.

| Check | Result |
| --- | --- |
| `/explore-galle` loads | Yes; title correct |
| Four destination categories | Yes |
| 15 named attractions | Yes |
| Adventure activities | Five items + disclaimer |
| Unverified distances | None in destination data |
| Invented photos / coordinates | None |
| Internal apartments href | `/apartments` (route loads) |
| WhatsApp href | `https://wa.me/94743842244` |
| UNESCO href | `https://whc.unesco.org/en/list/451/` |
| Horizontal overflow at 390px | `scrollWidth === clientWidth === 390` |
| Category nav desktop | `#culture` |
| Category nav mobile | `#adventure` |
| Other routes | `/apartments`, `/experiences`, `/about`, `/contact` render; contact form still disabled |
| Pixel visual-diff | **Not run** |

Reduced motion: page wrapped in Framer `MotionConfig reducedMotion="user"`.

---

## Hero regression results

Homepage at `scrollY = 0`:

- Header: `opacity: 0`, `pointer-events: none`, `-translate-y-full`
- Split “Fiona” typography, Follow Us, Villas, Retreat, Explore Now present
- Screenshot captured slide **02 UNWIND** (slideshow index vs baseline is not treated as a regression)
- `SriLankanCinematicHome` composition unchanged in this task

---

## Remaining issues

- Live map blocked until owner confirms the official pin
- Licensed destination photographs still absent
- Apartments CTA click in the browser tool sometimes focused the link without navigation; `href` is correct and `/apartments` was verified by direct load
- Contact form remains disabled (correct)
- Gallery filters/lightbox not started (TASK 09 / T16)

---

## Recommended TASK 09 scope

Roadmap **T16**: gallery filters and lightbox on `app/gallery/page.tsx` (and existing gallery CSS only). Do not restyle the Hero. Do not add a booking backend. Do not implement T18–T21 (privacy, redirects, site-wide SEO, GA4) in the same task.
