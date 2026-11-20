# 01 — Hero Preservation Baseline

**Audit date:** 18 November 2026  
**Repository state:** `main` @ `a70aedf` (`first commit`), working tree clean. Previous upgrade work has been reverted.  
**Rule:** The original homepage Hero Section is a **protected project exception**. It takes precedence over conflicting PDF visual/copy requirements.

---

## 1. What “the Hero” is (actual code boundary)

The live homepage (`app/page.tsx`) renders `SriLankanCinematicHome`. That file contains **several** cinematic sections. Only the **first viewport block** is the protected Hero.

| Region | Function | Lines (approx.) | Status |
| --- | --- | --- | --- |
| **Protected Hero** | `CinematicHero` | 462–723 | **Do not modify** |
| **Protected Hero loader** | `HeroLoader` | 185–329 | **Do not modify** |
| **Protected helpers** | `hasHeroIntroPlayed`, `rememberHeroIntroPlayed`, `heroIntroStorageKey`, `bg`, `fi` (hero-used keys) | 31–74 | **Do not modify** |
| Homepage below-hero | `IntroSection` | 725–812 | Mutable later, with care |
| Long sticky film | `ScrollCinema` + `SceneLayer` | 331–460, 814–858 | **Cinematic continuation — do not restyle in early tasks**; not the first-viewport Hero, but high visual risk |
| Photo reels / apartments / CTA | `PhotoReelSection`, `ApartmentStory`, `OutdoorLivingBand`, `ClosingCTA` | 860–1156 | Mutable (homepage content below hero) |
| Shared ornaments | `LiyaVelaBorder`, `HeritageRosette`, `MakaraLineArt` | 1158–1206 | Shared with inner pages; do not change SVG geometry used by inner pages without checking those pages |

**Protected render path**

```
app/layout.tsx → LoadingScreen + Navigation + children + Footer
app/template.tsx → motion wrapper around the page
app/page.tsx → SriLankanCinematicHome
  └─ CinematicHero
       ├─ HeroLoader (session-gated intro)
       ├─ 3 full-bleed slides (images + copy)
       ├─ left blur panel + right dim overlay
       ├─ in-hero Follow Us / Villas / Retreat / Gallery / Contact row
       ├─ split “Fiona” wordmark (clip-path 50%)
       ├─ bottom-left kicker, dots, Explore Now
       └─ vertical “Mihiripanna” (desktop)
```

---

## 2. Source files (protected vs shared)

### Must not change (hero-specific)

- `components/SriLankanCinematicHome.tsx` — **`CinematicHero`, `HeroLoader`, intro session helpers, `heroSlides` array, hero-only JSX.** Future homepage work must not edit these regions. Prefer extracting below-hero sections into new files rather than rewriting this file in place.
- Hero slide assets listed in §5.

### Shared files that **affect the Hero** if edited

| File | Why it is coupled | Safe change pattern |
| --- | --- | --- |
| `app/layout.tsx` | Loads Cormorant + Inter CSS variables; wraps every page with `LoadingScreen` and `Navigation` | Metadata only. Do not change font loaders, `body` class, or chrome stacking without a hero regression test. |
| `app/template.tsx` | Opacity/y enter animation on **every** route including `/` | Leave unchanged. |
| `app/globals.css` | `--font-display`, `.film-grain` (used by `HeroLoader`), `html`/`body` background, heading `font-feature-settings` | Add **new scoped classes**. Do not retarget `h1`, `.font-display`, `.film-grain`, or global `html`/`body` colours in a way that restyles the hero. |
| `tailwind.config.ts` | `font-display`, `gold`, `olive`, `ivory` used on hero links/hovers | **Extend** with new token names. Do not rename or recolour existing `gold` / `fontFamily.display`. |
| `components/Navigation.tsx` | On `/`, header is **hidden until scroll** (`pointer-events-none -translate-y-full opacity-0`). This is part of the first-paint composition. | Keep homepage-at-top hidden. Do not pin a site header over the Hero. |
| `components/LoadingScreen.tsx` | ~3.5s overlay (`z-index: 9999`) before the Hero is seen | Do not change timing, z-index, or logo treatment in early tasks. |
| `lib/villaMedia.ts` | Guest/drone paths; Hero also uses `/Guest/4.jpeg` and `/fiona-images/*` | Do not rename those public paths. |
| `app/page.tsx` | Must keep rendering `SriLankanCinematicHome` (or an equivalent that still mounts `CinematicHero` first) | May later compose extra sections **after** the hero if extracted cleanly. |

### Unused hero-like files (do not mount)

- `components/HeroSlider.tsx` — Unsplash stock, five-star UI. **Not live.**
- `components/SplitBlurHero.tsx` — earlier split-wordmark experiment. **Not live.** The live split treatment is inside `CinematicHero`.

---

## 3. CSS dependencies

Hero-critical classes / values:

- `min-h-screen` / `max-sm:min-h-[100svh]`, `bg-[#111]`, `font-sans`, `font-display`
- `text-[17vw]` desktop wordmark, `max-sm:text-[32vw]`, `max-sm:-translate-y-12`
- `clipPath: inset(0 50% 0 0)` / `inset(0 0 0 50%)`
- `bg-fixed` desktop / `max-sm:bg-scroll`
- `backdrop-blur-[14px]`, `bg-black/10`, `bg-black/20`
- `hover:text-gold` on in-hero links
- `HeroLoader`: `bg-olive-900`, gold rings, `.film-grain`
- Loader CSS in `globals.css`: `.loader-*` (used by **layout** `LoadingScreen`, not `HeroLoader`)

---

## 4. Animation and motion dependencies

Package: `framer-motion` `^12.23.24`.

Hero uses:

- `AnimatePresence`, `motion.div` / `motion.h1`
- `useReducedMotion` — short-circuits intro (~300ms) and disables auto-advance
- Slide crossfade **1.5s** `easeInOut`
- Auto-advance interval **6000ms**
- `HeroLoader` duration **~2.05s** (0.25s if reduced motion)
- `sessionStorage` key `villa-fiona-hero-intro-played`
- Body/html `overflow: hidden` while intro is active

**Do not** add global Framer defaults, change `app/template.tsx` easing, or override `prefers-reduced-motion` handling.

`ScrollCinema` uses `useScroll` / `useSpring` / `useTransform` on a `h-[760vh]` sticky stack. That is **not** the first-viewport Hero, but it shares the same file and Framer APIs. Leave it untouched until a dedicated, approved task.

---

## 5. Image assets used by the protected Hero

From `CinematicHero` / `HeroLoader`:

| Role | Path |
| --- | --- |
| Loader day | `villaImages.drone[8]` → `/Drone/9.jpeg` |
| Loader night | `villaImages.drone[2]` → `/Drone/3.jpeg` |
| Loader logo | `/fiona-images/logo.png` |
| Slide 1 | `/fiona-images/707902450_122124969795184570_1085409261198412845_n.png` |
| Slide 2 | `/Guest/4.jpeg` |
| Slide 3 | `/fiona-images/715202033_122125886307184570_8249085672172725017_n.jpg` |

Do not delete, rename, or recompress these files in a way that changes visual crop. WebP conversion of **other** galleries is allowed later if these six paths stay byte-stable until a dedicated media task with visual diff.

---

## 6. Loading sequence (first visit)

1. `LoadingScreen` in `app/layout.tsx`: enter 2.1s → hold → exit; gone by ~3.5s (safety 5s). Dark olive, gold particles, `/images/logo.png`.
2. If `sessionStorage` has not recorded the hero intro: `HeroLoader` (~2.05s) zoom/rings, then clip-path wipe.
3. Hero slides fade in; autoplay every 6s.
4. Repeat visits in the same tab skip `HeroLoader`.

Layout loader + hero loader **stack**. Changing either changes the protected first impression.

---

## 7. Responsive behaviour (from source + captured screenshots)

**Desktop (captured):** split-blur composition; left half frosted, right half sharper photo; giant “Fiona” straddling the split; FOLLOW US dots top-left; VILLAS / RETREAT (and Gallery/Contact in DOM, may clip) top-right; bottom-left slide index, kicker, copy, EXPLORE NOW; no global header visible.

**Mobile CSS (source):** `32vw` wordmark, `-translate-y-12`, `bg-scroll` instead of `bg-fixed`, tighter bottom copy, vertical “Mihiripanna” hidden (`max-sm:hidden`), in-hero desktop link row `hidden md:flex`.

**Mobile screenshot limitation:** device metrics were set to 390×844 inside a 1280-wide Cursor browser canvas, so the capture is **letterboxed** (hero column on the left, empty canvas on the right). It is a valid CSS-width check, not a native-device photo.

Baselines saved at:

- `docs/fiona-upgrade/baselines/hero-baseline-desktop.png`
- `docs/fiona-upgrade/baselines/hero-baseline-mobile.png`

---

## 8. Important visual characteristics (do not “fix”)

- H1 is **“Fiona”**, not the PDF tagline.
- Wordmark is split: left half image-clipped, right half solid white.
- In-hero decorative nav (“Follow Us” non-links, Villas/Retreat/Gallery/Contact).
- Vertical text **“Mihiripanna”** (misspelling vs brief) is **inside the protected Hero** — do **not** correct it here. Treat as PROTECTED EXCEPTION.
- Slide copy uses “Purely Green Serenity”, “island luxury”, “Mihiripanna”.
- CTA **Explore Now** → `/villas` (legacy URL). Changing this destination is a **small functional** change that still moves a hero control — **requires explicit approval**; default is leave it.

---

## 9. Prohibited modifications

1. Edit `CinematicHero` or `HeroLoader` JSX, classNames, timings, or copy.
2. Change the “Fiona” wordmark, clip-path, `17vw`/`32vw` sizes, or split overlays.
3. Replace hero images or slide order.
4. Remove or restyle the in-hero Follow Us / Villas row.
5. Show the global `Navigation` header over the hero at first paint.
6. Change `LoadingScreen` duration/z-index as a “performance win” without a hero visual diff.
7. Change `app/template.tsx` motion.
8. Restyle global `h1` / `.font-display` / `.film-grain` / `gold` tokens.
9. Swap Cormorant Garamond or Inter in `app/layout.tsx`.
10. Mount `HeroSlider` or `SplitBlurHero`.
11. “Simplify” motion for Core Web Vitals by deleting the Hero.
12. Force PDF hero eyebrow/H1/CTAs onto this composition.

---

## 10. Shared-dependency risks

| Change | Hero risk |
| --- | --- |
| Always-visible site header | **Critical** — covers Follow Us / wordmark; this is why a previous header experiment was reverted |
| Global Warm Ivory / Forest Green tokens **replacing** `ivory`/`gold` | High — hover and loader colours shift |
| New button utility used inside the hero | High if applied here; Low if scoped to footer/pages |
| `next/image` migration of hero backgrounds | High — `bg-fixed` + clip-path text |
| Framer Motion major upgrade | High |
| Extracting `CinematicHero` to a new file **without** edits | Low if it is a move-only; still requires visual diff |

---

## 11. Tests

- Source inspection of `SriLankanCinematicHome.tsx` (completed).
- Desktop viewport screenshot after loaders (completed).
- Mobile-width emulation screenshot (completed, letterboxed canvas).
- Pixel-perfect native iOS/Android devices: **pending**.
- ScrollCinema visual baseline: **pending** (not the first-viewport Hero).
