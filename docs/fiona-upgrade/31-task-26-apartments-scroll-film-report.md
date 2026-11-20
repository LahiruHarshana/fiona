# TASK 26 — Apartments scroll film

Date: 20 November 2026  
Scope: `/apartments` only. Homepage cinematic stack, global Navigation, premium Footer, other public pages, and production indexing were not modified.

## 1. Files created or modified

### Created

| File | Role |
| --- | --- |
| `components/apartments/CinematicIntro.tsx` | Prologue: full-viewport photograph, load settle, scroll parallax |
| `components/apartments/ScrollFilmScene.tsx` | Sticky film runway (`lg:min-h-[240vh]` / balcony `250vh`) |
| `components/apartments/GardenStory.tsx` | Chapter 01 film + ivory article + gallery + enquiry |
| `components/apartments/BalconyStory.tsx` | Chapter 02 film + ivory article + gallery + enquiry |
| `components/apartments/FilmInterlude.tsx` | Slow-living photographic bridge |
| `components/apartments/ApartmentsFinale.tsx` | Stay Your Way + Contact / WhatsApp |
| `components/apartments/ApartmentFilmGallery.tsx` | Independent 3:2 gallery, keyboard listbox, crossfade |
| `components/apartments/motion/useSceneProgress.ts` | Desktop cinema gate + spring-smoothed `useScroll` |
| `components/apartments/motion/CinematicText.tsx` | Masked line split helper used by the prologue |

`ParallaxLayer.tsx` and `MaskedReveal.tsx` were not added as separate files. Parallax, clip-path wipes, and opacity crossfades live on the chapter stages so the motion graph stays local.

### Modified

- `app/apartments/page.tsx` — composes the film sequence. `metadata = pageMetadata("apartments")` unchanged.

### Unchanged (verified)

- `lib/apartments.ts` — two profiles, copy, facilities, enquiry hrefs, photo sets
- `lib/villaMedia.ts`, `lib/seo.ts`
- `components/SriLankanCinematicHome.tsx` (`CinematicHero`, `HeroLoader`, `ScrollCinema`)
- `components/LoadingScreen.tsx`, `app/template.tsx`
- Global Navigation and premium Footer
- Other public routes

Legacy apartment modules (`ApartmentsCinematicHero`, `ApartmentStory`, `ApartmentGallery`, `ApartmentsIntro`, `ApartmentStayCta`) remain on disk but are no longer composed on `/apartments`.

## 2. Storyboard and chapter structure

Narrative on the live page:

1. **Prologue** — *Comfortable Stays, Surrounded by Nature.* / THE FIONA COLLECTION  
2. **A different way to stay** — exactly two apartment-style stays; kitchen / garden / balcony photographs are not extra units; chapter anchors `#green-garden` and `#balcony-suite`  
3. **Chapter 01 film** — *Wake Up to a Little More Green.* (`01 / 02`)  
4. **Living in the Green** — Green Garden article, facilities, gallery, enquire  
5. **Interlude** — *A Little More Space to Slow Down.*  
6. **Chapter 02 film** — *Space to Relax. A Balcony to Enjoy.* (`02 / 02`)  
7. **Two Bedrooms, One Beautiful Stay** — suite article, two-bedroom note, gallery, enquire  
8. **Epilogue** — *Stay Your Way* → `/contact` and WhatsApp `94743842244`  
9. Unchanged premium Footer

Accommodation units remain exactly two: A/C Luxury Green Garden Apartment and Scenic Balcony 2-Bed Suite.

## 3. Scroll progress mapping

Primary scenes use `useScroll({ offset: ["start start", "end end"] })` on the runway, then `useSpring` (`stiffness: 90`, `damping: 30`, `mass: 0.35`). Transforms bind to MotionValues. Scroll position is not stored in React state.

### Prologue (`CinematicIntro`)

| Progress | Elements | Values |
| --- | --- | --- |
| Mount | Photograph | scale `1.08 → 1` (1.7s, `cubic-bezier(0.22, 1, 0.36, 1)`) |
| Mount | Eyebrow / H1 / copy / SCROLL TO EXPLORE | staggered opacity / masked `translateY` |
| `0–1` (section start → end-start) | Photo `y` / scale | `0% → 16%`, `1 → 1.08` |
| `0–1` | Heading `y` | `0% → -12%` |

### Garden film (`240vh` desktop runway, sticky `100vh` stage)

| Normalized `p` | Beat | Mapping |
| --- | --- | --- |
| `0–0.14` | Arrival | `clip-path` `inset(0% 16% 0% 0%)` → full (percent units so Framer can interpolate) |
| `0–0.34` | Garden still | Layer 0 remains visible as the base plate |
| `0.16–0.64` | Room | Layer 1 bedroom crossfade |
| `0.50–0.94` | Kitchen | Layer 2 |
| `0.78–1` | Garden return | Layer 3 |
| `0–1` | Camera | scale `1.07 → 1.02 → 1`, `y` `6% → -6%` |
| `0–1` | Title | `textY` `18 → 0 → -28`, opacity holds then exits `0.94` |
| `0.28–0.86` | Amenity labels | floor / bedroom / kitchen / garden frontage |

### Balcony film (`250vh` desktop runway)

| Normalized `p` | Beat | Mapping |
| --- | --- | --- |
| `0–0.18` | Arrival from the right | clip `inset(0% 0% 0% 14%)` → full; layer 0 `x` `8% → 0%`; scale `1.06 → 1` |
| `0.18–0.62` | Bedroom one | Layer 1 |
| `0.48–0.86` | Bedroom two | Layer 2 — same suite, not a second bookable unit |
| `0.74–1` | Balcony return | Layer 3 |
| `0–1` | Title from the left | `textX` `-6% → 0% → -4%` |

### Interlude

`useScroll` `start end` → `end start`. Image `y` `10% → -10%`, scale `1.06 → 1`, vertical clip `22% → 0%`. Short section, not pinned.

### Epilogue

No pin. Heading and CTAs use `whileInView` once. Heading is not clipped in an overflow mask (copy stays in the tree if the animation has not run).

## 4. Animation architecture

- One apartment-only system: `useDesktopCinema` (`min-width: 1024px` and not `prefers-reduced-motion`) plus `ScrollFilmScene`.
- GPU properties only: `transform`, `opacity`, `clip-path`.
- Easing: `apartmentsEase` `[0.22, 1, 0.36, 1]`. Springs are overdamped enough to avoid bounce.
- No wheel hijack, no `overflow: hidden` on `html`/`body`, no global overflow trap. `overflow-x-hidden` was **not** applied on `<main>` because it breaks `position: sticky`.
- Galleries sit **after** the sticky runway so thumbnail interaction does not fight the film timeline.
- Layer 0 stays at opacity `1` so a crossfade never leaves a blank ivory stage.

## 5. Image sequence mapping

All stills are from `villaImages`. No generated video, no colour grading of files, no mixed apartment folders.

| Scene | Sources |
| --- | --- |
| Prologue | `outdoor[0]` |
| Garden film | `outdoor[0]`, `firstApartmentRoom[0]`, `kitchenFirst[0]`, `firstApartmentRoom[5]` |
| Garden gallery | existing `apartmentProfiles[0].photos` |
| Interlude | `outdoor[2]` |
| Balcony film | `balcony[0]`, `secondApartmentRoom[0]`, `secondApartmentRoom[4]`, `balcony[5]` |
| Balcony gallery | existing `apartmentProfiles[1].photos` (two distinct bedrooms + kitchenette + balcony) |

`sizes`: prologue and film `100vw`; galleries `(min-width: 1024px) 46vw, 100vw`. Priority only on the prologue and the first garden still. Off-screen gallery images are not `priority`.

## 6. Sticky scene durations

| Scene | Desktop | Mobile (`<1024px`) / reduced motion |
| --- | --- | --- |
| Garden | `lg:min-h-[240vh]`, sticky `100vh` (~140vh of pin) | `min-h-[70svh]`, normal flow |
| Balcony | `lg:min-h-[250vh]`, sticky `100vh` | same fallback |
| Interlude / finale | not pinned | not pinned |

Pin length is well under 500vh. Sticky is CSS `position: sticky`, not scroll-jacking.

## 7. Mobile fallback

Below `1024px`: no extra runway height, no sticky pin, no clip wipes, no parallax. Headlines, verified copy, facilities, galleries, and enquiry links remain. Playwright overflow delta was `0` at `320 / 375 / 390 / 430 / 768 / 1024 / 1440`.

## 8. Reduced-motion handling

`useReducedMotion` and `motion-reduce:lg:min-h-0` / `motion-reduce:lg:relative`:

- No sticky cinema
- No parallax, zoom, or clip wipes
- Layer 0 photograph and all copy visible immediately
- Gallery still works (crossfade duration `0`)
- CTAs remain in document order

Captured: `docs/fiona-upgrade/task-26/after/1440/reduced-motion.png` and `reduced-motion-chapter.png`.

## 9. Accessibility verification

- One `h1` in the prologue; chapter films use `h2`; articles use `h3`
- Descriptive `alt` on film layers and gallery stills
- Gallery `role="listbox"` with arrow / Home / End keys, `aria-activedescendant`, visible selected thumb
- Enquiry and finale links are real `Link`s with focus rings and `min-h-11`
- Forest / ivory contrast on copy; champagne labels on photographic overlays
- Deep links `#green-garden` / `#balcony-suite` and `?apartment=` enquiry hrefs preserved
- Important copy is not left at `opacity: 0` after the scene; articles repeat the verified description for screen readers and reduced motion

## 10. Performance observations

- `/apartments` first-load JS **168 kB**; homepage remains **177 kB** (unchanged route size)
- No new dependencies, no WebGL
- Film layers share four photographs per chapter rather than the full archive
- Scroll uses MotionValues, not `setState` per frame
- Two `useScroll` film targets plus prologue and interlude; observers are Framer-owned and cleaned up with the components
- No full-screen `backdrop-filter`

## 11. Before / after screenshots

Before (TASK 22 stills):

- `docs/fiona-upgrade/task-26/before/apartments-hero-task-22.png`
- `docs/fiona-upgrade/task-26/before/apartment-01-task-22.png`

After, 1440×900 production (`next start` on the TASK 26 build):

- `after/1440/prologue.png`
- `after/1440/two-stays.png`
- `after/1440/chapter-01.png` — garden arrival with reversible clip edge
- `after/1440/chapter-01-mid.png` — bedroom still on the pinned stage
- `after/1440/garden-article.png` — gallery + enquire
- `after/1440/interlude.png`
- `after/1440/chapter-02.png` — balcony arrival
- `after/1440/chapter-02-mid.png` — bedroom opening to the balcony
- `after/1440/epilogue.png` — Stay Your Way + CTAs above the existing Footer
- `after/1440/homepage-hero.png` — split Fiona wordmark unchanged
- `after/1440/reduced-motion.png`, `reduced-motion-chapter.png`

After, 375×812:

- `after/375/prologue.png`, `chapter-01.png`, `chapter-02.png`, `garden-article.png`, `interlude.png`, `epilogue.png`, `homepage-hero.png`

No screen recording was captured (Playwright stills only). Smoothness was judged from production stills at arrival and mid-pin, not from a live GPU trace.

## 12. TypeScript / build / audit

```text
npx tsc --noEmit     # exit 0
npm run build        # exit 0, Next.js 15.5.29
npm audit --omit=dev # 0 vulnerabilities
```

`/apartments` static, **8.34 kB** route JS, **168 kB** first load.

## 13. Original Hero regression verification

After touring `/apartments`, `/` was loaded at 1440 and 375. The split Fiona wordmark, DISCOVER VILLA / EXPLORE NOW, and first-viewport photography match the protected homepage hero. `git diff` on `components/SriLankanCinematicHome.tsx`, Footer, Navigation, `app/template.tsx`, and `app/page.tsx` is empty.

## 14. Remaining issues

- Chapter arrival still shows a **narrow forest strip** from the opening clip (`16%` / `14%`). That is the wipe, not a missing photograph. Mid-pin frames fill the viewport.
- Playwright mid-chapter stills are single frames; they do not prove 60 fps. Reverse-scroll behaviour follows MotionValues and is implemented, but was not recorded as video.
- Legacy unused apartment components were left in place to avoid unrelated diffs.
- `CinematicText` is available; the prologue uses `splitLines` directly.
- Horizontal overflow is no longer clipped on `<main>`. Widths tested at 320–1440 reported `scrollWidth === innerWidth`. If a future decoration overflows, clip the offender locally rather than restoring overflow on `main`.
- Cursor in-browser click-through was not used; verification was Playwright against `next start`.
- Not committed, not pushed, not deployed (per TASK 26).
