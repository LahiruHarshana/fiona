# 29 — TASK 24 Inner Pages Cinematic Redesign Report

**Date:** 19 November 2026  
**Scope:** Inner pages only (`/apartments` refine, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/privacy`). Protected homepage cinematic stack, TASK 23 homepage content, final homepage CTA, premium Footer, navigation, SEO indexing controls, and `/retreat` (inspect only) were left in place.

---

## 1. Files modified

### Created

| File | Role |
| --- | --- |
| `components/luxury-motion/luxury.module.css` | Desktop clip-path reveals (left / right / up) |
| `components/luxury-motion/motion.ts` | Shared easing and headline split |
| `components/luxury-motion/CinematicReveal.tsx` | Viewport opacity + transform (once) |
| `components/luxury-motion/MaskedImageReveal.tsx` | Clip + desktop parallax / scale |
| `components/luxury-motion/StaggerText.tsx` | Line-by-line heading reveal |
| `components/luxury-motion/CinematicChapter.tsx` | Ivory / sage / forest / night sections |
| `components/luxury-motion/LuxurySectionTransition.tsx` | Hairline chapter divider |
| `components/luxury-motion/LuxuryMotif.tsx` | Light geometric decoration (not HeritageRosette) |
| `components/luxury-motion/index.ts` | Client barrel |
| `components/gallery/GalleryPhotoTile.tsx` | Masked gallery tile (first six images only) |
| `docs/fiona-upgrade/task-24/` | Before/after screenshots |

### Modified

| File | Change |
| --- | --- |
| `components/shared/PremiumPageHero.tsx` | Entry scale, scroll parallax, staggered H1 lines |
| `app/experiences/page.tsx` | Chapter journey; no HeritageRosette |
| `app/about/page.tsx` | Image/text chapters + forest philosophy |
| `app/explore-galle/page.tsx` | Magazine categories, sticky labels on large screens |
| `components/explore/DestinationCard.tsx` | Hairline editorial rows instead of boxed cards |
| `app/gallery/page.tsx` | Closing chapter uses luxury-motion |
| `components/gallery/GalleryExperience.tsx` | Asymmetric 12-column grid, underline filters |
| `app/contact/page.tsx` | Editorial contact + form; form remains usable immediately |
| `components/ContactForm.tsx` | Hairline loading fallback |
| `components/WhatsAppBookingForm.tsx` | Hairline panel (validation and WhatsApp send unchanged) |
| `app/privacy/page.tsx` | Restrained ivory draft header (no photographic cinematic) |

### Intentionally not rewritten

- `components/apartments/*` and `app/apartments/page.tsx` — TASK 22 cinematic apartments preserved.
- `components/SriLankanCinematicHome.tsx`, `CinematicHero`, `HeroLoader`, `ScrollCinema`, `LoadingScreen`, `app/template.tsx`.
- `components/home/*` (TASK 23) and the homepage plan-your-stay CTA.
- `components/Footer.tsx`, `components/Navigation.tsx`, `components/CinematicHeroNav.tsx`.
- `app/retreat/page.tsx` — inspected only; still 200 + noindex as previously configured.
- No GSAP, Lenis, maps API, booking backend, or MongoDB.

---

## 2. Shared motion components

| Primitive | Trigger | Behaviour | Reduced motion |
| --- | --- | --- | --- |
| `CinematicReveal` | `whileInView`, `once` | Up / down / left / right offset + opacity | Static |
| `MaskedImageReveal` | In-view CSS clip + `useScroll` | Desktop-only parallax and gentle scale | Clip and parallax off |
| `StaggerText` | In-view per line | Sentence split on `". "` | Immediate |
| `CinematicChapter` | Layout | Ivory / sage / forest / night rhythm | N/A |
| `LuxuryMotif` | Decorative | SVG, low opacity | N/A |
| `PremiumPageHero` | Mount + scroll | Image scale 1.08→1.02, 14% Y, line stagger | Transforms disabled |

Motion uses transform and opacity only. Clip-path animations run at `min-width: 1024px` and `prefers-reduced-motion: no-preference`. There is no global smooth-scroll provider.

---

## 3. Page-by-page redesign

### `/apartments`

Preserved TASK 22: two apartments, sticky desktop stories, confirmed amenities only, no prices. Hero remains `ApartmentsCinematicHero`. Inner-page `PremiumPageHero` changes do not apply here.

### `/experiences`

Six approved experiences. Garden / balcony / hospitality keep genuine Fiona photographs with masked reveals. Beach, food, and South Coast chapters are typography-led (forest / night) — no invented destination photos. Intro states independently operated coastal visits. Closing copy still says the enquiry does not reserve a stay.

### `/explore-galle`

Four categories, 15 attractions, five independently operated activities. Typography-led hero (no Fiona garden as a Galle destination). Numbered sticky category labels on large screens; hairline attraction lists; map section still waits for an owner-verified pin. No distances or coordinates invented.

### `/gallery`

25 genuine photographs, seven categories, filters, lightbox, arrows, Escape, focus trap, swipe unchanged. Grid is now 12-column editorial (featured 8-col, mixed 4/8 spans). Hover zoom; clip reveals limited to the first six tiles in view.

### `/about`

Our Story, Our Hospitality, Our Philosophy (“Comfort. Nature. Hospitality.”) preserved. Alternating masked photography; philosophy on forest green. No founder, award, or year claims added.

### `/contact`

WhatsApp-only form preserved (`94743842244`). Apartment radios, dates, guests, preview, copy, and “you must send the message” disclaimer remain. Contact details are not gated on animation. No booking API.

### `/privacy`

Still an owner-review draft with `robots: { index: false, follow: false, nocache: true }`. Quiet ivory header; no cinematic photography behind legal copy; draft banner retained.

---

## 4. Animation types and triggers

- Heroes: mount stagger + mild background parallax (inner `PremiumPageHero` only).
- Photo chapters: CSS clip on enter (lg+), scroll-linked Y/scale on desktop.
- Text: left/right/up reveals, `once: true` so copy is not trapped off-screen.
- Explore: staggered attraction rows; sticky labels only `lg:sticky`.
- Gallery: clip on tiles 0–5 only; remaining images use CSS hover scale.
- Privacy: no scroll-linked motion.

---

## 5. Image sources

All photographs come from existing `villaImages` / gallery catalogue (property garden, interiors, balcony, drone, night). Explore Galle and three experience chapters are text-led. No stock or destination photography was added.

---

## 6. Mobile behaviour

- Natural document scroll; sticky category labels and image parallax are desktop-only.
- Clip-path CSS is gated to `min-width: 1024px`.
- 320 / 375 / 768 / 1024 / 1440 screenshots captured; Playwright `scrollWidth` vs `clientWidth` showed **no horizontal overflow** on 320, 375, and 1440.
- 390 and 430 were not re-photographed in this pass; 375 and 320 cover the same single-column layout.

---

## 7. Accessibility / reduced motion

- `useReducedMotion` / `MotionConfig reducedMotion="user"` on Explore.
- Reduced-motion capture: `docs/fiona-upgrade/task-24/after/1440/experiences-reduced-motion.png` — chapters and copy visible without waiting for parallax.
- Semantic headings, category `tablist` and lightbox keyboard behaviour unchanged.
- Form errors remain visible (not animated away).
- Gallery lightbox still traps focus and restores the trigger.

---

## 8. Performance observations

- Inner-page JS (build): about 2.5 kB page chunks for experiences/about/explore; gallery 7.23 kB; apartments 7.59 kB (existing TASK 22 client stories). Homepage remains 176 B route + existing cinematic bundle.
- Masked gallery animation is capped at six tiles.
- Next/Image `sizes` set on heroes and chapter photos.
- No extra blur filters or Lenis.
- Lighthouse was **not** run; scores are not claimed.

---

## 9. Functional regression tests

| Check | Result |
| --- | --- |
| `/` `/apartments` `/experiences` `/explore-galle` `/gallery` `/about` `/contact` `/privacy` `/retreat` | HTTP 200 |
| `/villas` `/wellness` | HTTP 308 |
| Apartments | 2 profiles |
| Experiences | 6 items |
| Explore Galle attractions | 15 |
| Independently operated activities | 5 |
| Gallery photographs | 25 (`src: villaImages` count; UI “Showing 25 photographs”) |
| WhatsApp enquiry | Form + preview + `wa.me` send; no confirmation of booking |
| Booking backend / MongoDB | None |
| Privacy draft + noindex | Metadata robots noindex; site-wide robots still disallow `/` while indexing is off |
| Horizontal overflow (320/375/1440) | None measured |

---

## 10. TypeScript / build / audit

```
npx tsc --noEmit     # exit 0
npm run build        # Next.js 15.5.29, 16 static routes, success
npm audit --omit=dev # 0 vulnerabilities
```

---

## 11. Protected component regression

| Surface | Check |
| --- | --- |
| Homepage cinematic Hero | Screenshot `task-24/after/1440/home-hero-hero.png` still shows split Fiona, DISCOVER VILLA, Explore Now → `/villas` path unchanged in product rules |
| ScrollCinema / TASK 23 / final CTA | `HomepageBelowHero` and `SriLankanCinematicHome` composition not edited in this task |
| Footer | `components/Footer.tsx` not edited in this task |
| Navigation | Not restyled |
| LoadingScreen / template | Untouched |

---

## 12. Before / after screenshot references

**Before (prior tasks):**

- `docs/fiona-upgrade/task-24/before/experiences-hero.png` (TASK 20 pale-box era / earlier inner hero)
- `docs/fiona-upgrade/task-24/before/*-task-20.png` (TASK 20 premium heroes)
- `docs/fiona-upgrade/task-24/before/apartments-task-22.png`
- `docs/fiona-upgrade/task-24/before/homepage-cinematic-hero.png`

**After (this task):**

- `docs/fiona-upgrade/task-24/after/1440/` — heroes + mid-scroll for all inner pages, homepage hero, reduced-motion experiences
- `docs/fiona-upgrade/task-24/after/375/` and `320/` — mobile heroes
- `docs/fiona-upgrade/task-24/after/768/` and `1024/` — Explore Galle / contact mid

Visual difference vs TASK 20 boxed cards: magazine hairlines, chapter numbering in Inter (not Cormorant `01`), garden photography without beige frames, Explore Galle without a Fiona photo posing as Galle.

---

## 13. Remaining issues

- `/retreat`, `/villas`, and `/wellness` still import `HeritageRosette` from the protected cinematic file; they were out of redesign scope (`/villas` and `/wellness` 308 to apartments/experiences).
- 390 px and 430 px were not given dedicated screenshot folders; overflow was measured at 320/375/1440.
- Gallery masonry is CSS grid, not true masonry packing; some rows leave intentional negative space.
- Sticky Explore labels can overlap a tall last attraction on unusually short desktops; pinning is short (`lg:top-28`) and content remains in the document flow.
- WhatsApp still requires the guest to send the message manually (by design).
- Privacy remains a draft, unpublished to search engines.

No commit, push, or deploy was performed.
