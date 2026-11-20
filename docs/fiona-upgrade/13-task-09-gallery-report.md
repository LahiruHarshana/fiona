# 13 — TASK 09 Gallery Report (T16)

**Date:** 19 November 2026  
**Scope:** Roadmap T16 only. No booking backend, enquiry-form enablement, redirects, or TASK 10.

---

## Files created / modified

**Created**

- `lib/gallery.ts`
- `components/gallery/GalleryExperience.tsx`
- `docs/fiona-upgrade/13-task-09-gallery-report.md`

**Modified**

- `app/gallery/page.tsx` — cinema-reel stub replaced with editorial gallery, filters, lightbox CTA

**Not modified**

- `CinematicHero`, `HeroLoader`, `ScrollCinema`, `SriLankanCinematicHome.tsx`
- `LoadingScreen`, `app/template.tsx`, Navigation, Footer, homepage
- `lib/villaMedia.ts` path strings and Hero assets
- `lib/apartments.ts`
- Global CSS / fonts (existing unused `.gallery-cinema-*` rules left in `globals.css`)
- Contact form

---

## Photo categories

Seven approved categories plus All Photos:

| Filter | Category | Count |
| --- | --- | --- |
| All Photos | — | 25 |
| Exterior | Villa Exterior & Architecture | 4 |
| Garden | Tropical Garden & Surroundings | 3 |
| Green Garden Apartment | A/C Luxury Green Garden Apartment | 3 |
| Balcony Suite | Scenic Balcony 2-Bed Suite — Both Bedrooms | 4 (2 + 2 distinct bedrooms) |
| Kitchens | Kitchens & Dining Spaces | 3 |
| Balcony | Balcony & Outdoor Living | 4 |
| Guest Comfort | Details & Guest Comfort | 4 |

Kitchens, balcony and garden are labelled as facilities of the stay, not extra apartments.

---

## Number of images selected

**25 curated photographs** from the existing archive (not the full ~102 files).

---

## Photo sources

Genuine `villaImages` paths only:

- Drone 1, 5
- Outdoor 1, 4, 8, 10, 15
- First apartment Room 02: 1, 3, 6
- Suite Room_01: 1, 2, 5, 10 (bedrooms); 12, 14 (details)
- Kitchens: Green Garden 1 and 4; suite kitchenette 1
- Balcony 1, 3, 6; suite open-kitchen 3 used as evening balcony
- Guest 1, 8 (not Guest 4 — Hero slide)

No stock, Unsplash, or generated villa photographs.

---

## Filters implemented

Client-side tabs (`role="tablist"`). Selected state via `aria-selected`. Short labels on small screens. No page reload. Suite filter showed only the four suite bedroom photographs.

---

## Lightbox features

- Click thumbnail to open (`role="dialog"`, `aria-modal`)
- Close button, backdrop click, Escape
- Previous / Next buttons
- ArrowLeft / ArrowRight (verified: 1/25 → 2/25 → 3/25)
- Counter and caption
- Focus moves to Close on open; restores originating thumbnail on close
- `document.body.style.overflow = hidden` while open; restored to empty on close
- Touch swipe handlers (desktop browser did not simulate swipe)
- `useReducedMotion` disables thumbnail hover zoom

No third-party gallery package.

---

## Image optimization

- `next/image` with `fill`, `sizes`, `quality` 70–72 for thumbs / hero, 88 in lightbox
- Lazy loading below the first two thumbnails
- Priority on hero + first grid images
- Next.js build emits WebP/AVIF variants at request time
- Hero-protected files were not renamed, deleted or re-encoded

---

## Accessibility

- One H1; descriptive alts
- Filter tabs with accessible names (full category names on `title` and desktop)
- Live region for photograph count
- Keyboard lightbox controls
- Focus restore verified
- Reduced-motion respected on hover scale

---

## Desktop / mobile tests

Local production `http://localhost:3010`.

| Check | Result |
| --- | --- |
| `/gallery` loads | Yes; title Photo Gallery \| Fiona Green Serenity |
| Approved H1 and intro | Yes |
| Seven categories + All Photos | Yes |
| All Photos | 25 photographs |
| Suite filter | 4 relevant images only |
| Lightbox open/close | Yes |
| Next control | 2/25 |
| Arrow keys | 3/25 |
| Escape | Closes; focus back on first thumbnail |
| Body scroll restored | Yes (`overflow` empty) |
| Broken image URLs | None (`naturalWidth === 0` count 0) |
| Overflow at 390px | `scrollWidth === clientWidth === 390` |
| `/explore-galle` | Still renders |
| Pixel visual-diff | **Not run** |
| Physical swipe | **Not executed** (handlers present) |

---

## TypeScript / build

- `npx tsc --noEmit` — **pass**
- `npm run build` — **pass** (Next.js 15.5.18)

---

## Hero regression results

Homepage at `scrollY = 0`: header `opacity-0`, `pointer-events-none`, `-translate-y-full`. Snapshot still includes split Fiona, Follow Us / Villas / Retreat / Explore Now, and below-hero + ScrollCinema. `SriLankanCinematicHome.tsx` was not edited. Pixel-perfect baseline comparison was **not** run with visual-diff tooling.

---

## Owner-dependent images

Recorded in `pendingPhotoVerification`:

- `Room_01/3.jpeg` looks like the Green Garden bedroom; omitted from the suite set
- Limited dedicated Green Garden bathroom stills
- Guest lifestyle photos may need image-release confirmation
- Hero files `/Guest/4.jpeg`, `/Drone/3.jpeg`, `/Drone/9.jpeg` unused here

---

## Remaining issues

- Full archive is still larger than the curated 25
- Swipe not device-tested
- Unused cinema-reel CSS remains in `globals.css`
- Contact form still disabled (correct)
- Privacy page, redirects and site-wide SEO not started

---

## Recommended TASK 10 scope

Roadmap **T18**: Privacy page from the brief. Do not restyle the Hero. Do not add a booking backend. Do not implement T19 redirects in the same task (Hero Explore Now still targets `/villas`).
