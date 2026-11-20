# 27 — TASK 22 Cinematic Apartments Page Report

**Date:** 19 November 2026  
**Scope:** `/apartments` only. Homepage `CinematicHero`, `HeroLoader`, `ScrollCinema`, `LoadingScreen`, `app/template.tsx`, Navigation, Footer, and `components/SriLankanCinematicHome.tsx` were not edited.

---

## 1. Files created

| File | Role |
| --- | --- |
| `components/apartments/ApartmentsCinematicHero.tsx` | Page-only cinematic Hero (scale settle, mask, parallax) |
| `components/apartments/ApartmentsIntro.tsx` | “Two distinctive ways to stay” + chapter markers |
| `components/apartments/ApartmentStory.tsx` | Alternating 01/02 cinematic stories, sticky photo on `lg+` |
| `components/apartments/ApartmentStayCta.tsx` | Dark forest Stay Your Way close |
| `components/apartments/ApartmentsMotif.tsx` | Light geometric decoration (not HeritageRosette) |
| `components/apartments/apartmentsMotion.ts` | Shared easing |
| `components/apartments/apartments.module.css` | Desktop clip-path reveals |
| `docs/fiona-upgrade/task-22/` | Before/after screenshots |

---

## 2. Files modified

| File | Change |
| --- | --- |
| `app/apartments/page.tsx` | Composes the new sections; metadata still `pageMetadata("apartments")` |
| `components/apartments/ApartmentGallery.tsx` | Larger 3:2 stage, ringed active thumb, keyboard listbox retained |
| `components/apartments/ApartmentFacilities.tsx` | Divider rows instead of bordered cards |

Not modified: `lib/apartments.ts` (facts, copy, photo paths), `lib/seo.ts`, `PremiumPageHero` (other routes), cinematic homepage source.

---

## 3. Design architecture

Server page → client islands only where motion is required.

- Hero uses a dedicated apartments component so other inner pages keep `PremiumPageHero`.
- Stories use a 58/42 grid on large screens, stacked on small screens.
- Sticky photo (`lg:sticky top-28`) lasts only as long as the apartment copy; no extra `vh` timeline and no scroll lock.
- Parallax/scale run at `min-width: 1024px` and are off when `prefers-reduced-motion`.
- Clip-path wipe is CSS, desktop-only, triggered when the photo enters view.

---

## 4. New page sections

1. Cinematic Hero — H1 **Comfortable Stays, Surrounded by Nature.**, garden photograph `villaImages.outdoor[0]`, dark overlay, ivory type.
2. Editorial intro — exactly two stays; chapter links to `#green-garden` and `#balcony-suite`.
3. Apartment 01 — photo left, copy right, `01 / 02`.
4. Apartment 02 — copy left, balcony photo right, `02 / 02`.
5. Stay Your Way — `#203C30`, **Enquire About Your Stay** → `/contact`, WhatsApp → `wa.me/94743842244`.

---

## 5. Animation effects and triggers

| Effect | Trigger |
| --- | --- |
| Hero image 1.08 → 1 | Mount |
| Eyebrow / H1 mask / copy stagger | Mount, delayed |
| Hero photo vs text parallax | `useScroll` on the Hero |
| Intro fade-up | `whileInView` |
| Story photo clip-path left/right | In-view + CSS `@media (min-width: 1024px)` |
| Story text from opposite side | `whileInView` |
| Headline line stagger | `whileInView` |
| Photo scale 1.04 → 1 and y parallax | Scroll through the story, desktop only |
| Short sticky photo | CSS sticky, `lg+` only |
| CTA heading reveal | `whileInView`; motif drift if motion allowed |

No 760vh timeline, no body scroll lock, no GSAP/Lenis.

---

## 6. Gallery improvements

- Main frame `aspect-[3/2]`, quality 82, `sizes` 42vw / 100vw.
- Thumbnails 3× / 6× grid, gold-green ring when selected, `min-h-11`.
- Arrow / Home / End keys unchanged.
- Green Garden still uses only its approved set; suite still shows two distinct bedrooms plus kitchenette and balcony. Bathroom stills are not invented. `photoNote` retained.

---

## 7. Facility presentation

Icon + label on hairline rows, two columns from `sm`. Same verified labels. No Wi-Fi, parking, pool, spa, breakfast, occupancy, or prices.

---

## 8. Mobile adaptations

- No sticky pin below `lg`.
- No clip-path or parallax below 1024px.
- Photo stacks above copy (`aspect-[4/3]` full width).
- CTAs full-width on small screens.
- Overflow `scrollWidth > innerWidth` was **false** at 320, 375, 390, 430, 768, 1024, 1440.

---

## 9. Reduced-motion behaviour

Playwright `reducedMotion: "reduce"`: H1 **Comfortable Stays, Surrounded by Nature.** at opacity **1**. Parallax, clip-path animation, hero scale, and CTA motif motion are skipped. Galleries and links remain.

---

## 10. Performance observations

- Apartments route first-load JS in the production build: **7.96 kB** page + **164 kB** first load (was ~1.9 kB page before extra motion islands).
- Transforms/opacity preferred; clip-path is a short CSS animation on desktop only.
- Story and gallery images use `next/image`. Hero is `priority`; below-fold gallery images are not.
- FPS was **not** measured. No 60fps claim.

---

## 11. TypeScript / build / audit

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Next.js 15.5.29, exit 0 |
| `npm audit --omit=dev` | 0 vulnerabilities |

`/apartments` 200. `/villas` still 308 → `/apartments`. `robots.txt` still `Disallow: /`. Metadata title remains **Holiday Apartments in Galle | Fiona Green Serenity**.

---

## 12. Hero regression verification

`docs/fiona-upgrade/task-22/homepage-hero-1440.png`

Split Fiona, left blur, **01 DISCOVER VILLA**, Explore Now, seven-route cinematic bar. Homepage cinematic source was not opened for edit in this task.

---

## 13. Before / after screenshot paths

**Before** (TASK 20 inner Hero, used as the last apartments baseline):

- `docs/fiona-upgrade/task-22/before/apartments-hero-1440.png`
- `docs/fiona-upgrade/task-22/before/apartments-hero-375.png`

**After:**

`docs/fiona-upgrade/task-22/after/<width>/{hero,apartment-01,apartment-02,cta}.png`

Widths: 320, 375, 390, 430, 768, 1024, 1440.

Also: `after/1440/hero-reduced-motion.png`, `homepage-hero-1440.png`.

---

## 14. Remaining issues

1. Clip-path is CSS-triggered on view, not a scroll-scrubbed wipe. Reverse scrolling does not re-clip (`once: true`).
2. Sticky photo only on `lg+`; tablet 768 stacks like mobile.
3. Chapter numbers use Inter so `01` does not read as `OI` in Cormorant.
4. Closing primary label is **Enquire About Your Stay** as specified; `stayYourWay.ctaLabel` in `lib/apartments.ts` remains “Check Availability” and was not rewritten.
5. Gallery cross-fade is a `key` swap, not a dual-layer dissolve.
6. Page-error `SyntaxError` seen once at 320 before the lookbehind regex was removed; later 320 captures reported **errors none**.
7. FPS and formal WCAG lab tests were not run.

---

## Definition of done

`/apartments` is an editorial cinematic story of **exactly two** verified apartments, with dark photographic Hero, alternating layouts, functional galleries, divider facilities, and a WhatsApp-friendly close. Facts and photo paths are unchanged. The original homepage cinematic Hero and ScrollCinema are unchanged.

**TASK 22 complete. No commit, push, or deploy.**
