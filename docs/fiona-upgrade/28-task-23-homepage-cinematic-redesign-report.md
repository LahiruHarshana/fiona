# 28 — TASK 23 Homepage Cinematic Content Redesign Report

**Date:** 19 November 2026  
**Scope:** The seven homepage content sections inside `HomepageBelowHero`. Protected: original Cinematic Hero, ScrollCinema, `LoadingScreen`, `app/template.tsx`, final **Your Tropical Escape Awaits.** CTA, `Footer.tsx`, and navigation.

---

## 1. Files created and modified

### Created

| File | Role |
| --- | --- |
| `components/home/HomeWelcome.tsx` | Editorial welcome |
| `components/home/HomeWhyChoose.tsx` | Feature list |
| `components/home/HomeApartments.tsx` | Two apartment chapters |
| `components/home/HomeExperience.tsx` | Full-bleed lifestyle |
| `components/home/HomeSouthCoast.tsx` | Dark text-led destination |
| `components/home/HomeGallery.tsx` | Asymmetric gallery |
| `components/home/HomeHospitality.tsx` | Night hospitality story |
| `components/home/HomePhoto.tsx` | Clip + parallax photograph |
| `components/home/HomeMotif.tsx` | Light geometric decoration |
| `components/home/homeMotion.ts` | Easing / headline split |
| `components/home/home.module.css` | Desktop clip-path reveals |
| `docs/fiona-upgrade/task-23/` | Screenshots |

### Modified

| File | Change |
| --- | --- |
| `components/home/HomepageBelowHero.tsx` | Composes the seven new sections; **plan-your-stay CTA JSX left as before** |

Unchanged: `components/SriLankanCinematicHome.tsx` (still `CinematicHero` → `HomepageBelowHero` → `ScrollCinema`), `components/Footer.tsx`, `lib/homepage.ts` content, SEO.

HeritageRosette is no longer imported from the protected cinematic file.

---

## 2. Existing design weaknesses

- Repeated 50/50 image + text columns with beige borders.
- Six identical bordered “Why Choose” cards.
- Apartment units as small photo + tag chips.
- Alternating full ivory / 5% green with little hierarchy.
- Rigid 2×3 gallery grid.
- South Coast as a short ivory text block with no cinematic pause.
- Motion limited to generic `Reveal` fades.

---

## 3. New section architecture

`HomepageBelowHero` remains the only homepage content wrapper (composition in `SriLankanCinematicHome` unchanged):

1. Welcome  
2. Why Choose Fiona  
3. Discover Our Apartments  
4. The Fiona Experience  
5. Discover Southern Sri Lanka  
6. Gallery Preview  
7. Hospitality  
8. **Protected** Plan Your Stay CTA  

Chapter markers `01`–`07` are presentation only. Copy still comes from `lib/homepage.ts`.

---

## 4. Each redesigned section

| Section | Treatment |
| --- | --- |
| Welcome | ~58% garden photograph, line-split heading, Discover Our Story → `/about` |
| Why Choose | Asymmetric heading + six hairline rows (same six titles/copy) |
| Apartments | Alternating cinematic chapters, highlight lines not chips, unit links to `/apartments#…`, Explore Our Apartments |
| Experience | Full-bleed balcony photo, left dark gradient, ivory type |
| South Coast | Forest green, typography only — **no destination photographs** |
| Gallery | Featured garden + five supporting images |
| Hospitality | Large night photograph + staggered heading |

---

## 5. Animation effects

| Effect | Where |
| --- | --- |
| Left/right/up clip-path (CSS, `lg+`, `prefers-reduced-motion` off) | Welcome, apartments, gallery featured, hospitality |
| Scroll parallax + scale 1.05→1 | `HomePhoto` and Experience, desktop only |
| Line-by-line heading | Welcome, Experience, Hospitality |
| Staggered list | Why Choose, gallery thumbs |
| Opposite-side text/image | Apartment 01 vs 02 |

No scroll hijack, no extra `vh` timeline, no GSAP/Lenis.

---

## 6. Scroll behaviour

Natural document scroll. Sticky is not used on the homepage stories (apartments page may still use it). Reverse scroll does not re-run `once: true` reveals; content stays visible.

Existing order is unchanged: after the protected CTA, **ScrollCinema** still plays, then the layout Footer.

---

## 7. Image selection

Unchanged `lib/homepage.ts` sources: outdoor[0], apartment rooms, balcony[0], kitchen stills, drone[4]. `next/image` via `HomePhoto` / `Image`, quality 82, responsive `sizes`. No destination stock.

---

## 8. Mobile adaptations

- Clip-path and parallax disabled below 1024px.
- Stacks: photo then type.
- Overflow `false` at 320, 375, 390, 430, 768, 1024, 1440.
- CTAs `max-sm:w-full`.

---

## 9. Reduced-motion handling

Playwright `reducedMotion: "reduce"`: welcome `h2` opacity **1**. CSS clip animations gated. Parallax skipped when `useReducedMotion()` or width &lt; 1024.

Protected Hero/ScrollCinema motion was not altered.

---

## 10. Before / after screenshots

**Before:** `docs/fiona-upgrade/task-23/before/` (TASK 18 welcome + cinematic hero; TASK 21 footer).

**After:** `docs/fiona-upgrade/task-23/after/<width>/`

Captured at 320, 375, 768, 1440 for hero, seven sections, CTA, footer locator. Extra hero/welcome at 390, 430, 1024. Reduced-motion welcome at 1440.

---

## 11. Performance observations

Homepage first-load JS **176 kB** (was ~175 kB). Transforms/opacity plus short CSS clip-path. FPS not measured. No 60fps claim.

---

## 12. TypeScript / build / audit

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build` | Next.js 15.5.29, exit 0 |
| `npm audit --omit=dev` | 0 vulnerabilities |

---

## 13. Protected Hero regression

`docs/fiona-upgrade/task-23/after/1440/hero.png`

Split **Fiona**, left blur, **01 DISCOVER VILLA**, Explore Now, seven-route cinematic bar. `SriLankanCinematicHome.tsx` was not edited in TASK 23.

---

## 14. Protected CTA and Footer regression

CTA capture shows **PLAN YOUR STAY**, **Your Tropical Escape Awaits.**, WhatsApp + Email buttons, `#203C30` background — same classes as before. ScrollCinema is visible *below* the CTA because that is the existing main order (`HomepageBelowHero` then `ScrollCinema`).

Footer source `components/Footer.tsx` was not edited. A `footer` screenshot at `block: start` after the CTA often shows **ScrollCinema** first because cinema is still between the CTA and the layout footer. That is composition, not a Footer restyle.

---

## 15. Remaining issues

1. Homepage content still sits **between** Cinematic Hero and ScrollCinema (pre-existing; file not changed).
2. Footer locator screenshots can land on ScrollCinema rather than the premium footer.
3. Gallery featured `lg:h-full` depends on grid row height; supporting images stay 4:3.
4. Chapter numbers are Inter so `01` does not read as `OI`.
5. Pixel-diff vs TASK 18 hero baseline was not run (nav already differs from TASK 19).
6. FPS / axe lab not run.

---

## Definition of done

The seven mutable homepage sections are editorial cinematic stories with genuine Fiona photography, approved copy, and restrained Framer Motion. The original cinematic Hero, ScrollCinema, closing CTA, and Footer source remain unchanged.

**TASK 23 complete. No commit, push, or deploy.**
