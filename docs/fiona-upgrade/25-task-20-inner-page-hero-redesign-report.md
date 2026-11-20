# 25 — TASK 20 Inner-Page Hero Redesign Report

**Date:** 19 November 2026  
**Scope:** Premium dark cinematic Heroes on approved inner pages only. Homepage `CinematicHero`, `HeroLoader`, `ScrollCinema`, slideshow, split Fiona wordmark, blur masks, and intro timing were not redesigned.

---

## 1. Files created and modified

### Created

| File | Role |
| --- | --- |
| `components/shared/PremiumPageHero.tsx` | Reusable inner-page Hero: full-bleed photograph (optional), single dark green/charcoal gradient, ivory type, gold eyebrow. No pale text card. |
| `docs/fiona-upgrade/task-20/` | Before/after screenshots and capture helper |
| `docs/fiona-upgrade/25-task-20-inner-page-hero-redesign-report.md` | This report |

### Migrated to `PremiumPageHero` (inner pages only)

| File | Image / treatment |
| --- | --- |
| `app/apartments/page.tsx` | `villaImages.outdoor[0]`, overlay `garden` |
| `app/experiences/page.tsx` | `villaImages.outdoor[7]`, overlay `interior` |
| `app/explore-galle/page.tsx` | **No photograph** — dark text-led Hero (does not present a Fiona garden as a Galle destination) |
| `app/gallery/page.tsx` | `villaImages.outdoor[0]`, overlay `garden`, explicit `imageAlt` |
| `app/about/page.tsx` | `villaImages.outdoor[2]`, overlay `garden` |
| `app/contact/page.tsx` | `villaImages.outdoor[12]`, overlay `night` |
| `app/retreat/page.tsx` | `villaImages.outdoor[2]`, overlay `garden`; honesty notice and `robots: { index: false, follow: false }` unchanged |

### Intentionally not migrated

| File | Reason |
| --- | --- |
| `app/privacy/page.tsx` | Draft legal page; no photographic Hero that needed this treatment. Still uses ivory `PageHero`. |
| `app/villas/page.tsx`, `app/wellness/page.tsx` | Legacy 308 destinations; still `PageHero`. Live visitors never stay on these URLs. |
| `components/PageHero.tsx` | Left as the ivory-scrim implementation for privacy / legacy routes. |
| `components/SriLankanCinematicHome.tsx` | **Not edited in TASK 20.** `CinematicHero`, `HeroLoader`, and `ScrollCinema` remain as after TASK 19 (Hero nav swap only). |

No new npm packages. No image asset replacements.

---

## 2. Existing Hero overlay problems

Owner screenshot of `/apartments` showed:

- A large, pale, semi-transparent rectangle behind the heading and copy.
- Dark olive headings over a washed photograph.
- Ivory / cream covering architectural and garden detail.
- A treatment that did not match the homepage cinematic first viewport.

TASK 18 had already reduced a **full-bleed ivory wash at alpha 1.0**, but it replaced that with a **left-to-right ivory text scrim** (`from-[#FDFBF7]/80`). The pale box remained the dominant inner-page Hero language.

`/gallery` previously used a custom cream-fade Hero (image `opacity-40` in an earlier revision). `/explore-galle` previously used a Fiona garden photograph in `PageHero`, which risked reading as a destination photograph.

---

## 3. Root causes of excessive white backgrounds

Shared `PageHero` stacked:

1. Section colour (`bg-[#243328]` after TASK 18; historically `bg-ivory`).
2. Full-cover photo.
3. Ivory directional wash.
4. A **gradient card** on the copy block:  
   `bg-gradient-to-r from-[#FDFBF7]/80 via-[#FDFBF7]/45 to-transparent`.

Headings used `text-olive-900` on that pale panel. The panel is what the owner identified as dated.

The original (pre-TASK 18) overlay finished at **solid ivory**:

```css
linear-gradient(
  180deg,
  rgba(253, 251, 247, 0.92) 0%,
  rgba(253, 251, 247, 0.55) 40%,
  rgba(253, 251, 247, 1) 100%
);
```

Inner pages all consumed that one component, so the wash was systemic. Homepage cinematic overlays live in a different component and were not the cause.

---

## 4. Updated Hero implementation

`PremiumPageHero` is client-only (Framer Motion parallax + `prefers-reduced-motion`). Pages pass approved eyebrow, H1, copy, optional image, object-position, and overlay tone.

Behaviour:

- Full-width `next/image` (`fill`, `priority`, `sizes="100vw"`, `quality={85}`).
- **One** overlay layer (no stacked dark veils, no blur/brightness filters).
- No ivory rectangle; type sits on the gradient.
- `pt-24` / `max-sm:pt-20` so copy clears the transparent global nav.
- Height follows content (`min-h` ~44–54svh plus padding), not a forced identical crop on every route.
- Parallax `y` 0–18% is disabled when `useReducedMotion()` is true.
- `/explore-galle` omits `image`, using a deep green field plus a soft gold radial — not a property photo.

`CinematicHero` was not refactored. Inner pages do not import it.

---

## 5. Old versus new overlay styles

### Old (`PageHero` after TASK 18 — still used on `/privacy`)

```css
/* photo wash */
linear-gradient(105deg, rgba(253,251,247,0.36) 0%, rgba(253,251,247,0.14) 30%,
  rgba(253,251,247,0.04) 52%, rgba(253,251,247,0) 70%);

/* plus edge blend to ivory */

/* plus text card */
background-image: linear-gradient(to right, #FDFBF7 / 80%, #FDFBF7 / 45%, transparent);
```

Typography: olive-900 heading and body on the pale card.

### New (`PremiumPageHero`)

Garden (apartments, gallery, about, retreat):

```css
linear-gradient(105deg,
  rgba(13, 28, 22, 0.70) 0%,
  rgba(13, 28, 22, 0.42) 46%,
  rgba(13, 28, 22, 0.22) 100%);
```

Interior (experiences): 0.74 / 0.48 / 0.28 — slightly stronger for a brighter room.  
Night (contact): 0.58 / 0.34 / 0.18 — lighter so evening lamps stay visible.

Text-led Explore Galle:

```css
radial-gradient(120% 80% at 18% 40%, rgba(202, 174, 105, 0.12), transparent 42%),
linear-gradient(180deg, rgba(13, 28, 22, 1) 0%, rgba(24, 42, 34, 1) 100%);
```

Section base is `#0D1C16` so unloaded images do not flash ivory.

---

## 6. Typography and colours

| Role | Font | Colour | Notes |
| --- | --- | --- | --- |
| Eyebrow | Inter, 12px, uppercase, tracking `0.24em` | `#D7C5A7` | Soft gold; existing tracking language |
| H1 | Cormorant Garamond (`font-display`) | `#F4F0E7` | `text-5xl` / `sm:text-7xl`; `max-sm:text-[2.7rem]` |
| Description | Inter light, `text-lg` / `max-sm:text-base` | `#F4F0E7` at 90% | `max-w-2xl`, `leading-8` |

Approved copy was not rewritten. Apartments H1 remains **Comfortable Stays, Surrounded by Nature.** Other H1s remain the strings in `lib/apartments.ts`, `lib/experiences.ts`, `lib/destinations.ts`, `lib/gallery.ts`, `lib/about.ts`, and the existing contact/retreat page files.

---

## 7. Desktop / mobile screenshots

Playwright + system Chrome against `http://127.0.0.1:3002` after `LoadingScreen` detached (global loader is ~3.5s; it is not `HeroLoader`).

**Before** (TASK 18 automation, left-cropped; pale panel visible):

- `docs/fiona-upgrade/task-20/before/apartments-hero.png`
- `docs/fiona-upgrade/task-20/before/experiences-hero.png`
- `docs/fiona-upgrade/task-20/before/retreat-hero.png`
- Intermediate ivory-scrim: `before/apartments-hero-task-18-scrim.png`

**After** (full CSS viewports, `scrollY = 0`):

| Viewport | Folder |
| --- | --- |
| 320, 375, 390, 430, 768, 1024, 1440 | `docs/fiona-upgrade/task-20/after/<width>/<page>-hero.png` |

Pages: apartments, experiences, explore-galle, gallery, about, contact, retreat.

Homepage capture: `docs/fiona-upgrade/task-20/homepage/cinematic-hero-1440.png`.

### Visual checks (from the after set)

| Check | Result |
| --- | --- |
| White / ivory text panels removed | Yes — no pale rectangle on the seven routes |
| Photographs remain visible | Yes — veranda, garden, night façade readable; overlay stronger on the left |
| Dark gradients subtle | Garden/interior/night tones; Explore Galle is intentionally solid dark (no destination photo) |
| Ivory type readable | Yes at 1440 / 1024 / 768 / 375; 320 heading fully visible |
| H1 vs navigation | `pt-24` clears the bar; gold active item unchanged |
| Crops | `object-position: center 42%`; architecture and planting remain in frame |
| Page body below Hero | Cream editorial sections unchanged |
| Horizontal overflow | None observed in 320–1440 captures |
| Unrelated UI | Gallery filters, WhatsApp form, retreat honesty notice still present |

On 320×640 the apartments **viewport** crops the last lines of the long intro because the Hero is taller than 640px. That is scrollable content, not clipped overflow.

---

## 8. Accessibility checks

| Item | Method | Result |
| --- | --- | --- |
| H1 `#F4F0E7` on left overlay (~70% `#0D1C16`) | Calculated vs `#0D1C16` ≈ 13.8:1; vs 70% mix over white still > 4.5:1 | AA for large and body text on the text column |
| Body at 90% ivory | Same column | AA |
| Eyebrow `#D7C5A7` on `#0D1C16` | ≈ 9.5:1 | AA for small text |
| Right side of photo (22% overlay) | Text is not placed there | Photograph remains lighter by design |
| Focus | Global nav / MENU / footer unchanged | Not restyled |
| `prefers-reduced-motion` | Parallax and enter-y disabled | Honoured |
| Explore Galle | Solid dark field, no photo guesswork | High contrast |
| Screen reader | `imageAlt` on gallery; other Heroes keep decorative `alt=""` as before unless passed | Gallery now has a property-accurate alt |

Automated axe was not re-run for this visual-only task. Contrast is from colour math plus screenshot inspection, not a full WCAG audit suite.

---

## 9. Responsive testing

| Width | Apartments | Notes |
| --- | --- | --- |
| 320 | Captured | Heading wraps cleanly; intro continues below the fold |
| 375 | Captured | Full intro + honesty line in one screen |
| 390 | Captured | Same treatment |
| 430 | Captured | Same treatment |
| 768 | Captured | Compact MENU; photo crop holds veranda + lawn |
| 1024 | Captured | Compact MENU (below 1180 / overflow rule from TASK 19) |
| 1440 | Captured | Seven-link bar; gold **Apartments** |

The same seven widths were captured for experiences, explore-galle, gallery, about, contact, and retreat.

---

## 10. Original homepage Hero preservation

| Protected surface | TASK 20 change? |
| --- | --- |
| `CinematicHero` | No |
| `HeroLoader` | No |
| `ScrollCinema` | No |
| Split Fiona wordmark | No |
| Slideshow assets / timing | No |
| Blur / clip-path | No |
| Intro loader | No (`HeroLoader` untouched; site-wide `LoadingScreen` already existed) |
| First-viewport hide of global `Navigation` | No change in this task |
| Explore Now `href="/villas"` | Unchanged |

Live 1440 homepage screenshot after loader: split **Fiona**, left blur panel, **01 DISCOVER VILLA**, **Explore Now**, seven-route cinematic bar from TASK 19.

That capture is **not** a pixel match of `docs/fiona-upgrade/baselines/hero-baseline-desktop.png` (baseline still shows Villas / Retreat and a different slide). The delta is TASK 19 navigation, not a TASK 20 dark inner overlay on the homepage.

`git diff` for `components/SriLankanCinematicHome.tsx` remains the TASK 19 nav substitution only (four-link bar → `<CinematicHeroNav />`).

---

## 11. TypeScript / build / audit / HTTP

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 (after `PremiumPageHero` migration) |
| `npm run build` | Exit 0 — Next.js 15.5.29, 16 static routes |
| `npm audit --omit=dev` | **0 vulnerabilities** |

| Route | Status |
| --- | --- |
| `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/retreat`, `/privacy` | **200** |
| `/villas` | **308** → `/apartments` |
| `/wellness` | **308** → `/experiences` |
| `/retreat` | 200 + `<meta name="robots" content="noindex, nofollow"/>` |
| `/robots.txt` | `User-Agent: *` / `Disallow: /` (indexing still off) |
| Contact HTML | `wa.me/94743842244` present |

Gallery filter buttons remain in the 1440 gallery after-shot. Apartment profile sections remain below the Hero. WhatsApp enquiry copy on `/contact` is unchanged.

Production indexing was not enabled.

---

## 12. Remaining issues

1. **`PageHero` ivory scrim** still exists for `/privacy` and the unused 308 bodies of `/villas` and `/wellness`. That is intentional.
2. **Global `LoadingScreen`** still covers every route for ~3.5s (including inner pages). It is not the homepage `HeroLoader` and was not in TASK 20 scope. Screenshot automation must wait for `.loader-root` to detach.
3. **Hero height vs long copy** on 320px: the apartments intro is taller than a short phone viewport; users scroll. Spec forbids forcing a giant empty Hero, so this is accepted.
4. **Cursor / Playwright “N” badge** appears in captures; it is not a second navigation bar in production layout.
5. **Homepage baseline PNG** still documents the pre-TASK-19 four-link Hero chrome. Do not treat that as a TASK 20 regression.
6. **Dev server after `next build`:** `.next` asset hashes 404 until `next dev` is restarted (observed on port 3001). Visual proof used a fresh server on **3002**.
7. No Lighthouse / axe CI run in this task.

---

## Definition of done

Approved inner-page Heroes use ivory/white type over a single restrained dark cinematic overlay (or a dark text-led field on Explore Galle). Pale rectangular text boxes are gone. Fiona photographs stay visible. Navigation, copy, SEO, redirects, retreat `noindex`, and the original homepage cinematic Hero were not redesigned.

**TASK 20 complete. No commit, push, or deploy.**
