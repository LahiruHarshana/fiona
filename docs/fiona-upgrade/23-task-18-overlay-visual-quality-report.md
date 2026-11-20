# 23 — TASK 18 Overlay & Photographic Quality Report

**Date:** 19 November 2026  
**Scope:** Reduce excessive white/ivory washes on mutable photographic sections. Protected Cinematic Hero and ScrollCinema were not edited.

---

## 1. Files inspected

- `components/PageHero.tsx`
- `app/retreat/page.tsx`, `app/apartments/page.tsx`, `app/experiences/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/explore-galle/page.tsx`, `app/villas/page.tsx`, `app/wellness/page.tsx`
- `app/gallery/page.tsx`, `components/gallery/GalleryExperience.tsx`
- `components/home/HomepageBelowHero.tsx`, `components/PropertyImage.tsx`, `components/apartments/ApartmentGallery.tsx`
- `components/Navigation.tsx`, `components/Footer.tsx`, `app/globals.css`
- `components/SriLankanCinematicHome.tsx` (read-only for this task)
- `next.config.ts` redirects

---

## 2. Files modified

| File | Change |
| --- | --- |
| `components/PageHero.tsx` | Replaced full-bleed ivory overlay with a directional wash + localized text scrim; raised Next Image quality 70 → 85 |
| `app/gallery/page.tsx` | Removed `opacity-40` on the hero photograph; reduced olive/cream overlay strength |
| `components/PropertyImage.tsx` | Default encode quality 72 → 82 (no CSS filter) |
| `components/apartments/ApartmentGallery.tsx` | Main photograph quality 72 → 82 |
| `components/gallery/GalleryExperience.tsx` | Grid photograph quality 72 → 82 |

`components/SriLankanCinematicHome.tsx` was **not** edited in TASK 18.

---

## 3. Sections with excessive white overlays

| Surface | Cause | Action |
| --- | --- | --- |
| Shared inner `PageHero` (`/retreat`, `/apartments`, `/experiences`, `/about`, `/contact`, `/privacy`, `/explore-galle`, plus legacy `/villas` and `/wellness` if reached) | Full-viewport ivory gradient at 0.92 / 0.55 / **1.00** plus `bg-ivory` | Corrected |
| `/gallery` hero | Image `opacity-40` **and** olive gradient fading to solid cream `rgba(244,240,231,1)` | Corrected |
| Homepage below-Hero photographs | No overlay on the images; cream is the section background | No overlay CSS change |
| Apartment galleries / gallery grid | Unselected thumbs use `opacity-80` (selection only); caption uses a **localized** bottom gradient | Left in place |
| Protected Cinematic Hero / ScrollCinema | Dark blur, split type, film overlays — intentional cinematic treatment | Documented, not changed |

---

## 4. Root causes identified

The `/retreat` screenshot was not caused by Navigation, mix-blend decorative ornaments, or a bad photograph.

**Primary cause (shared):** `PageHero` stacked:

1. Section `bg-ivory`
2. Full-cover photo
3. An inset overlay with  
   `linear-gradient(180deg, rgba(253,251,247,0.92) 0%, rgba(253,251,247,0.55) 40%, rgba(253,251,247,1) 100%)`

The bottom stop at **alpha 1.0** painted solid ivory over the lower photograph. Combined with 0.92 at the top, almost the entire hero looked overexposed.

**Gallery:** the photograph was first faded to 40%, then covered with a 0.55 olive wash that finished as **solid cream**. Two stacked treatments.

Framer Motion `opacity` 1 → 0.4 on the overlay was **not** the wash at rest; at `scrollY=0` the overlay was fully opaque.

---

## 5. Before / after CSS

### PageHero overlay

**Before**

```css
background: linear-gradient(
  180deg,
  rgba(253,251,247,0.92) 0%,
  rgba(253,251,247,0.55) 40%,
  rgba(253,251,247,1) 100%
);
```

Section: `bg-ivory`. Image `quality={70}`.

**After**

- Section fallback: `bg-[#243328]` so unloaded frames are not ivory.
- Photo wash (right side of the image stays almost clear):

```css
linear-gradient(105deg, rgba(253,251,247,0.36) 0%, rgba(253,251,247,0.14) 30%, rgba(253,251,247,0.04) 52%, rgba(253,251,247,0) 70%)
```

- Edge blend (nav + page join only):

```css
linear-gradient(180deg, rgba(32,60,48,0.16) 0%, rgba(32,60,48,0.03) 20%, rgba(253,251,247,0) 50%, rgba(253,251,247,0.36) 100%)
```

- Text column scrim: `from-[#FDFBF7]/80 via-[#FDFBF7]/45 to-transparent` (`/88` and `/55` on small screens).
- Image `quality={85}`.
- Overlay motion now 1 → 0.55 (was 1 → 0.4).

### Gallery hero

**Before:** `className="object-cover opacity-40"` plus  
`linear-gradient(180deg, rgba(32,60,48,0.55) 0%, rgba(32,60,48,0.35) 45%, rgba(244,240,231,1) 100%)`.

**After:** `object-cover` at full opacity, `quality={85}`,  
`linear-gradient(180deg, rgba(32,60,48,0.28) 0%, rgba(32,60,48,0.16) 36%, rgba(32,60,48,0.42) 68%, rgba(244,240,231,0.94) 100%)`.

---

## 6. Screenshot paths

Automation screenshots used a **left-cropped** canvas, not a full 1440 px frame. They are directional comparisons, not pixel-perfect 1440 proofs.

**Before**

- `docs/fiona-upgrade/task-18/before/retreat-hero.png`
- `docs/fiona-upgrade/task-18/before/apartments-hero.png`
- `docs/fiona-upgrade/task-18/before/experiences-hero.png` — invalid (loader/black frame)

About, gallery, and homepage-below-Hero **before** frames were not stored; they shared the same `PageHero` overlay as retreat/apartments (gallery had the separate `opacity-40` stack).

**After**

- `docs/fiona-upgrade/task-18/after/retreat-hero.png`
- `docs/fiona-upgrade/task-18/after/apartments-hero.png`
- `docs/fiona-upgrade/task-18/after/experiences-hero.png`
- `docs/fiona-upgrade/task-18/after/about-hero.png`
- `docs/fiona-upgrade/task-18/after/gallery-hero.png`
- `docs/fiona-upgrade/task-18/after/homepage-welcome.png`
- `docs/fiona-upgrade/task-18/after/homepage-cinematic-hero.png` — left cinematic panel only; not a baseline match

Protected Hero baseline remains `docs/fiona-upgrade/baselines/hero-baseline-desktop.png`. That file was not overwritten.

---

## 7. Image clarity improvements

- Retreat / About: timber doors, tiles, and planting read as colour rather than mist.
- Apartments: garden greens and the courtyard wall keep natural contrast.
- Experiences: warm interior timber and bedding remain visible behind type.
- Gallery hero: lawn, door, and planting are visible under cream type instead of a 40% ghost image.
- Homepage Welcome photograph had **no** overlay; it already showed full colour. No wash was added.

No saturation, contrast, or brightness filters were applied to photographs.

---

## 8. Text contrast verification

- Inner heroes: olive headings (`text-olive-900`) sit on a localized ivory scrim, not on raw photo.
- Body copy uses `text-olive-900/90`.
- Gallery hero: cream type (`#F4F0E7`) over a darker olive gradient in the lower third. Large heading is readable; small body copy on bright grass remains the tightest contrast pair and may need a slightly stronger left scrim if the owner wants AA claimed for that line.
- Buttons and gold eyebrows were unchanged.

This is **not** a full WCAG 2.2 AA audit.

---

## 9. Mobile responsiveness

PageHero small-screen scrim is stronger (`from-[#FDFBF7]/88`) because type is full-width. Gradients are CSS, so they scale. Horizontal overflow was not introduced. Formal pass at 320 / 375 / 390 / 430 / 768 / 1024 / 1440 was **not** completed as a measured matrix in this task; 1440 CSS viewport was used in DevTools, while captured PNGs were left-cropped.

Reduced-motion still skips parallax (`y` / scale) and keeps overlay opacity at 1.

---

## 10. TypeScript

```text
npx tsc --noEmit
```

Exit 0.

---

## 11. Production build

```text
npm run build
```

Compiled successfully. Static routes include `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/privacy`, `/retreat`, `/villas`, `/wellness`.

---

## 12. Security audit

```text
npm audit --omit=dev
```

**0 vulnerabilities.** No new dependencies.

---

## 13. Hero regression verification

- `SriLankanCinematicHome.tsx` was not modified in TASK 18.
- Homepage DOM still exposes split `Fiona` headings, Follow Us, Villas / Retreat / Gallery / Contact, Explore Now, and slide controls.
- Global header at `scrollY=0` remains `opacity: 0` and translated off-screen (`top: -96`).
- A cropped after PNG of the homepage is **not** a valid pixel comparison with `hero-baseline-desktop.png` (it shows the intentional dark left panel / loader timing). Visual regression of the protected Hero is inferred from **no source change**, not from a matched screenshot overlay.

---

## 14. Other verification

| Check | Result |
| --- | --- |
| `/villas` | `308` → `/apartments` |
| `/wellness` | `308` → `/experiences` |
| `/retreat` | Still a 200 page; `robots: { index: false, follow: false }` unchanged |
| Gallery | 25 photographs; seven category tabs; Tropical Garden filter showed 3 photos; lightbox opened with Close / Previous / Next and `1 / 3`; Escape closed it |
| Apartment facts | Unchanged (two units; suite has two separate bedrooms) |
| Production indexing | Unchanged; still off until owner HTTPS origin |
| SEO copy / metadata APIs | Not rewritten |

---

## 15. Remaining issues requiring owner approval

1. **Protected Cinematic Hero / ScrollCinema** still use dark blur, dimming, and split-photo treatments. If those feel “washed” or too dark, that is a separate cinematic decision — not changed here.
2. **Gallery hero body copy** on bright lawn may need a slightly stronger type scrim if AA is required for that paragraph.
3. **Matched 1440 desktop PNG comparisons** against `hero-baseline-desktop.png` should be recaptured in a full-width browser if the owner needs pixel proof.
4. **Next.js “1 issue” overlay** appeared in the automation browser during HMR after `next build` collided with `next dev`. It is a local tooling artefact, not a shipped overlay.

---

## Definition of done

Excessive ivory/white washes on mutable inner heroes and the gallery hero have been reduced. Photographs show garden, timber, and interiors more clearly. Type remains on a localized scrim. The original Cinematic Hero source is unchanged. TASK 18 stops here.
