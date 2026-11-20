# 30 — TASK 25 Colour Harmonization Report

**Date:** 20 November 2026  
**Scope:** Colour system only. Layouts, copy, photography, cinematic motion, WhatsApp booking, SEO, and protected chrome were not redesigned.

---

## 1. Current colour inventory (before)

| Colour | Typical role | Where |
| --- | --- | --- |
| `#F4F0E7` Warm Ivory | Light page / editorial | Most inner mains, homepage content wrapper |
| `#FDFBF7` Cream | html/body, form fills, Tailwind `ivory` | Layout body, WhatsApp radios/preview, PageHero wash |
| `#203C30` Deep Forest | Dark CTAs, photo wells | Night chapters, lightbox, apartments CTA |
| `#244D39` Forest | Second dark section, mint washes, buttons | `CinematicChapter` `forest`, `bg-[#244D39]/6`, primary buttons |
| `#A3AA88` Sage | Light eyebrows, dark CTA labels, icons | Nearly every chapter number and “Plan your stay” |
| `#D7C5A7` Champagne | Borders, dark eyebrows (inconsistent) | Hairlines, some dark labels |
| `#CAAE69` / gold tokens | Hero olive-gold system | Protected Hero, nav gold, `::selection` |
| `#393D30` / olive-900 | Legacy text | Retreat/villas/wellness, `display-heading` |
| `#7C856B` olive-500 | Layout body text | `app/layout.tsx` — **not changed** |

### Identified inconsistencies

1. **About philosophy `#244D39` next to closing CTA `#203C30`** — two dark greens that read as a mismatch, not a designed step.
2. **Sage-tinted ivory** (`#244D39/6`, `#A3AA88/18`) beside Warm Ivory — extra cream-green family.
3. **Eyebrows `#A3AA88` on `#F4F0E7`** — **2.13:1**, fails WCAG AA for small text.
4. **Form surfaces `#FDFBF7`** on ivory pages — a second off-white.
5. **Dark CTA eyebrows** mixed sage vs champagne.
6. **Primary buttons** already Forest `#244D39` on light (kept; that is the approved brand role).

---

## 2. Approved semantic palette

| Token | Hex | Role |
| --- | --- | --- |
| `--fiona-bg-primary` | `#F4F0E7` | Dominant light surface |
| `--fiona-bg-dark` | `#203C30` | Only reusable dark green |
| `--fiona-brand-primary` | `#244D39` | Light headings accents, eyebrows, buttons, focus |
| `--fiona-accent` | `#D7C5A7` | Dividers, dark eyebrows, borders |
| `--fiona-accent-secondary` | `#A3AA88` | Decorative icons only |
| `--fiona-text-on-dark` | `#F4F0E7` | Headings/body on dark |
| `--fiona-text-on-light` | `#203C30` | Headings/body on light |

Existing Tailwind `ivory` / `olive` / `gold` were **not remapped**, so the cinematic Hero’s olive-gold system is unchanged.

---

## 3. Tokens introduced or reused

**Added** in `app/globals.css` `:root` and Tailwind `theme.extend.colors.fiona.*` (`fiona-ivory`, `fiona-dark`, `fiona-brand`, `fiona-accent`, `fiona-sage`).

Hero, ScrollCinema, Footer, Navigation, and `HomepageBelowHero` CTA still use their previous HEX / olive-gold classes.

---

## 4. Files modified

| File | Change |
| --- | --- |
| `app/globals.css` | `--fiona-*` variables |
| `tailwind.config.ts` | `fiona` colour map (olive/gold/ivory tokens intact) |
| `components/luxury-motion/CinematicChapter.tsx` | Dark = `#203C30` only; sage = ivory + champagne hairline |
| `app/about/page.tsx` | Philosophy on ivory; CTA remains Deep Forest |
| `app/experiences/page.tsx` | No second dark green; beach & South Coast night, others ivory |
| `app/explore-galle/page.tsx` | Adventure uses `night`; labels/body contrast |
| `app/gallery/page.tsx`, `GalleryExperience.tsx` | Dark CTA eyebrow champagne; body contrast |
| `app/contact/page.tsx`, `WhatsAppBookingForm.tsx` | Form fills ivory; brand eyebrows |
| `app/privacy/page.tsx` | Draft type contrast |
| `components/home/Home*.tsx` except `HomepageBelowHero` | Mint wash removed; eyebrows brand; body `/90` |
| `components/apartments/*` | Mint wash → ivory + hairline; CTA eyebrow champagne; primary dark button ivory fill |
| `components/explore/DestinationCard.tsx` | Brand labels |
| `components/luxury-motion/LuxurySectionTransition.tsx` | Brand label |

**Unchanged:** `CinematicHero` / `SriLankanCinematicHome.tsx`, `ScrollCinema`, `Footer.tsx`, `Navigation.tsx`, `HomepageBelowHero.tsx` (including **Your Tropical Escape Awaits.**), `LoadingScreen`, `app/template.tsx`, `app/layout.tsx`.

---

## 5. Page-by-page changes

### Homepage (mutable)

Welcome / Why Choose / Gallery / Hospitality stay ivory. Discover Apartments dropped `#244D39/6` mint for ivory + champagne rules. South Coast / Experience remain Deep Forest. Protected CTA untouched (still sage eyebrow `#A3AA88` on `#203C30`, 4.95:1 AA).

### Apartments

Stories share ivory; suite chapter uses a champagne rule instead of a mint wash. Facility icons remain sage. Stay CTA: champagne eyebrow, ivory primary button on dark.

### Experiences

Photo chapters ivory. Text-led Beach and South Coast Deep Forest. Food/culture stays ivory so three dark greens no longer stack.

### Explore Galle

Alternating sage tone is now ivory + hairline (same family). Adventure + closing CTA share `#203C30`.

### Gallery / Contact / Privacy

Filter and lightbox colours unchanged in structure. Form radios/preview `#FDFBF7` → `#F4F0E7`. Privacy remains draft + noindex.

### About (priority)

**Before:** Our Philosophy `bg-[#244D39]` immediately above CTA `bg-[#203C30]`.  
**After:** Philosophy Warm Ivory (`#F4F0E7`) with Deep Forest type and a champagne rule; CTA `#203C30`. Separation is contrast, not a second green.

### `/retreat`

Still olive/gold legacy. No colour rewrite (inspect only).

---

## 6. Before / after screenshots

| | Path |
| --- | --- |
| Before About (TASK 24) | `docs/fiona-upgrade/task-25/before/about-mid-task-24.png` |
| After philosophy → CTA | `docs/fiona-upgrade/task-25/after/1440/about-philosophy.png` |
| After mobile | `docs/fiona-upgrade/task-25/after/375/about-philosophy.png` |
| Homepage Hero (unchanged) | `docs/fiona-upgrade/task-25/after/1440/home-hero.png` |
| Also captured | welcome, apartments, experiences, explore, gallery, contact, privacy at 1440 and 375 |

---

## 7. Contrast measurements

Relative luminance formula (WCAG 2).

| Pair | Ratio | Notes |
| --- | --- | --- |
| `#203C30` on `#F4F0E7` | **10.55** | Headings/body on light — AAA |
| `#F4F0E7` on `#203C30` | **10.55** | Headings/body on dark — AAA |
| `#244D39` on `#F4F0E7` | **8.41** | Light eyebrows / buttons — AAA |
| `#F4F0E7` on `#244D39` | **8.41** | Button label — AAA |
| `#D7C5A7` on `#203C30` | **7.10** | Dark eyebrows — AAA |
| `#A3AA88` on `#F4F0E7` | **2.13** | **Failed** — no longer used for text |
| `#A3AA88` on `#203C30` | **4.95** | AA; leftover on protected homepage CTA only |
| `#D7C5A7` on `#F4F0E7` | **1.49** | Decorative lines only, not text |
| `#7C856B` on `#FDFBF7` | **3.75** | Layout `text-olive-500` — not edited (would affect global/nav inheritance) |

Body copy uses `/90` opacity on the same pairs; still well above 4.5:1 for ~16px text.

---

## 8. Animation regression

No motion files rewritten except colour classes. Clip-path, parallax, sticky apartments, gallery lightbox, and reduced-motion gates unchanged. Background colours are static (no per-frame colour animation).

---

## 9. Mobile

375 and 1440 captures; `scrollWidth === clientWidth` on `/privacy` after a full page tour. Philosophy/CTA split is the same on 375. 390/430/768/1024 share the same token surfaces (no breakpoint colour forks).

---

## 10. TypeScript / build / audit

```
npx tsc --noEmit     # exit 0 (via next lint/types)
npm run build        # Next.js 15.5.29, success
npm audit --omit=dev # 0 vulnerabilities
```

---

## 11. Protected preservation

| Surface | Evidence |
| --- | --- |
| Cinematic Hero | `task-25/after/1440/home-hero.png` still split Fiona / DISCOVER VILLA / gold Home |
| ScrollCinema / Footer / Nav | Source files not in this diff |
| Final homepage CTA | `HomepageBelowHero.tsx` not edited |
| Indexing / privacy noindex | Unchanged |

---

## 12. Remaining issues

- Layout `body` is still Tailwind `ivory` (`#FDFBF7`) + `text-olive-500`. Changing it would retint global inheritance; left for a later owner-approved chrome pass.
- Protected homepage CTA still uses sage eyebrow (4.95:1 AA, slightly off the champagne dark-eyebrow rule).
- Sage remains on decorative icons (2.13:1) — not used as text.
- `/retreat`, `/villas`, `/wellness` still olive/gold.
- Champagne is not AA as text on ivory and is not used that way.

No commit, push, or deploy.
