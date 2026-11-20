# 15 — TASK 11 Mobile UX, Performance & Accessibility

**Date:** 19 November 2026  
**Scope:** Mutable pages only. No booking backend. No TASK 12. Protected Hero, loaders, ScrollCinema, global fonts and homepage hide-until-scroll were not redesigned.

This is **not** a claim of full WCAG 2.2 AA conformance. Automated snapshots, production-build bundle figures and targeted keyboard checks were used. Lighthouse scores and real-user Core Web Vitals were **not** collected.

---

## 1. Files modified

**Created**

- `lib/focusTrap.ts`
- `components/PropertyImage.tsx`
- `docs/fiona-upgrade/15-task-11-performance-accessibility-report.md`

**Modified in this task**

- `components/Reveal.tsx` — reduced-motion static render for Reveal / Stagger / StaggerItem
- `components/Navigation.tsx` — drawer overlap, focus trap, Escape, restore focus, larger targets
- `components/PageHero.tsx` — reduced-motion parallax; inner-page `next/image` background
- `components/ContactForm.tsx` — honest unavailable copy, privacy sentence, disabled fieldset
- `app/contact/page.tsx` — `overflow-x-hidden`
- `app/globals.css` — `prefers-reduced-motion` sets `html { scroll-behavior: auto }` only (loader keyframes untouched)
- `components/gallery/GalleryExperience.tsx` — filter keyboard, lightbox trap, 44px controls
- `components/home/HomepageBelowHero.tsx` — `PropertyImage`; 44px CTAs
- `app/about/page.tsx` — `PropertyImage`
- `app/experiences/page.tsx` — `PropertyImage`
- `app/explore-galle/page.tsx` — 44px category chips
- `components/apartments/ApartmentGallery.tsx` — `next/image` + keyboard listbox
- `components/Footer.tsx` — 44px footer links

**Not modified (protected / SEO preserved)**

- `CinematicHero`, `HeroLoader`, `ScrollCinema`, `components/LoadingScreen.tsx`, `app/template.tsx`
- Hero slide assets and `lib/villaMedia.ts` paths
- Homepage header hide rule (`isHome && !scrolled && !menuOpen`)
- `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `components/StructuredData.tsx`, `next.config.ts` redirects
- Hero Explore Now href (`/villas`)

`SriLankanCinematicHome.tsx` still composes `CinematicHero` + `HomepageBelowHero` + `ScrollCinema` from TASK 07. TASK 11 did not edit that file.

---

## 2. Issues identified (audit)

### Performance (lab / inspect, not Lighthouse)

| Observation | Evidence | Action |
| --- | --- | --- |
| Homepage first-load JS is large for a marketing site | Production `next build`: `/` First Load JS **172 kB** (shared **102 kB**) | Documented. Splitting Hero/ScrollCinema would touch protected motion. **Not implemented.** |
| Below-fold property photos used raw `<img>` | Homepage, About, Experiences, apartment galleries | Wrapped with `next/image` / `PropertyImage` (`sizes`, lazy, quality 72) |
| Inner page heroes used CSS `background-image` (full original JPEG) | `PageHero` | `next/image` fill, `priority`, `sizes="100vw"`, quality 70 |
| Original outdoor JPEG is ~352 KB | `public/Outdoor/Outdoor/1.jpeg` **360 661 bytes** | Optimizer sample (browser-compatible Accept): WebP `w=1920&q=72` **248 832 bytes**. Originals were not recompressed on disk. |
| Hero slides still load as unprotected `<img>` | Protected region | **Recommendation only.** Changing this would alter Hero loading. |
| Layout loader + HeroLoader remain full cinematic sequences | Protected | **Blocked** (roadmap T23) until owner approval. |
| `NEXT_PUBLIC_SITE_URL` unset locally | `robots.txt` `Disallow: /`; empty sitemap | Correct for unverified origin. Not changed. |

No Lighthouse Performance / LCP / INP / CLS / TBT scores are reported. No CrUX / RUM.

### Responsive

- Inner pages already used `overflow-x-hidden` on `<main>` except contact (added).
- Gallery filter chips could be short of 44px; drawer close overlapped hamburger (TASK 03).
- Footer and some homepage CTAs were below a comfortable touch size.

### Accessibility

- TASK 05: `Reveal` ignored `prefers-reduced-motion`.
- Navigation: duplicate close control overlapped hamburger; no focus trap; Tab could leave the drawer.
- Gallery: filters not a roving tablist; lightbox Tab not trapped (Escape/arrows already existed).
- Disabled enquiry form could look submittable; no privacy-before-enable copy.

### Protected-region issues (documented, not fixed)

- Multiple `h1` “Fiona” layers in the cinematic Hero.
- Hero in-frame Follow Us / Villas / Retreat / Explore Now remain as designed.
- Cinematic heading “Mihiripanna” spelling vs approved Mihiripenna (owner confirmation still required).
- ScrollCinema 760vh sequence and gallery-cinema-track remain; track already disabled under reduced motion in CSS.

---

## 3. Changes implemented

1. **Navigation:** When the drawer is open, the header is `z-[60]` and the hamburger is the visible close control. The in-drawer X was removed so it cannot sit on top of the hamburger. Drawer padding `pt-24` / `sm:pt-28`, `overflow-x-hidden`, `aria-controls="site-navigation-drawer"`. Screen-reader “Close menu” is the first focusable in the drawer. Focus moves into the drawer on open; Escape closes; Tab is trapped; focus returns to the menu button. `aria-expanded` / `aria-current="page"` retained. Homepage `scrollY = 0` still hides the header when the menu is closed.
2. **Reduced motion (mutable only):** `Reveal` / `Stagger` / `StaggerItem` render static nodes. `PageHero` skips parallax `y`/`scale`. No global Framer `MotionConfig`.
3. **Images:** Non-hero photos use `next/image` with aspect boxes to limit CLS. Gallery already used Image; filters/lightbox a11y tightened.
4. **Contact:** WhatsApp / email remain the working path. Form stays disabled (`ENQUIRY_API_ENABLED=false`), `pointer-events-none` on the fieldset, `aria-describedby` the unavailable notice, privacy sentence before enablement.
5. **Touch:** `min-h-11` on nav links, gallery filters, lightbox buttons, footer links, homepage CTAs, Explore Galle chips.

---

## 4. Before / after measurements

| Metric | Before (this task) | After | Notes |
| --- | --- | --- | --- |
| `npx tsc --noEmit` | not re-run at start of this task | **exit 0** | |
| `npm run build` | TASK 10 previously succeeded | **exit 0**, Next.js 15.5.18 | See route table below |
| Lighthouse Performance | not run | **not run** | Do not invent |
| Field LCP / INP / CLS | none | **none** | No RUM |
| `/` First Load JS | not recorded this task | **172 kB** | Lab bundle from `next build` |
| Shared JS | — | **102 kB** | |
| `/gallery` First Load JS | — | **177 kB** | Largest approved page chunk |
| `Outdoor/1.jpeg` on disk | 360 661 B JPEG | **unchanged** | Not recompressed |
| Same file via `/_next/image` `w=1920&q=72` | n/a | **248 832 B WebP** | Requires image `Accept` header; curl without it can 400 |

### Production route sizes (`npm run build`)

| Route | Size | First Load JS |
| --- | --- | --- |
| `/` | 168 B | 172 kB |
| `/about` | 1.09 kB | 173 kB |
| `/apartments` | 1.8 kB | 174 kB |
| `/contact` | 2.19 kB | 174 kB |
| `/experiences` | 1.09 kB | 173 kB |
| `/explore-galle` | 1.31 kB | 173 kB |
| `/gallery` | 4.41 kB | 177 kB |

---

## 5. Image optimizations

- **Done:** `PropertyImage` (`fill`, `quality` 72, lazy unless `priority`) on homepage-below-hero, About, Experiences. Apartment main + thumbs. Inner `PageHero` uses Image quality 70, `alt=""` (decorative behind H1). Gallery thumbs quality 72; lightbox 88.
- **Not done:** Disk conversion (WebP/AVIF files), renaming, or touching `/Guest/4.jpeg`, `/Drone/3.jpeg`, `/Drone/9.jpeg` and other Hero/ScrollCinema loaders.
- **Note:** Some villa paths include `Room%2002`; Next encodes them in `/_next/image` query strings. Browser loads succeeded in the production session (`naturalWidth` > 0 for sampled apartment images).

---

## 6. Responsive fixes

- Contact `overflow-x-hidden`.
- Drawer `max-sm:w-[min(100vw,380px)]` without horizontal drawer scroll at 390px (`scrollWidth === clientWidth`).
- Cards already stacked via existing grids; CTAs `max-sm:w-full` plus `min-h-11`.

**Viewport overflow checks (production `http://localhost:3012`, Chrome MCP, `scrollWidth` vs `clientWidth`):**

| Width | Surfaces checked | Horizontal overflow |
| --- | --- | --- |
| 320 | `/gallery`, `/contact`, `/about`, `/experiences`, `/explore-galle` | none measured |
| 390 | `/` (home), `/apartments`, open drawer | none measured |
| 768 | `/apartments` | none measured |

**375 / 430 / 1024 / 1440:** not each emulated as a separate device profile. Layout is fluid between the measured widths. Home first viewport was also captured at the browser’s default desktop canvas (~1914px CSS).

---

## 7. Accessibility improvements

- Focus trap helper used by navigation drawer and gallery lightbox.
- Gallery: `role="tablist"` with roving `tabIndex`, Arrow/Home/End, `aria-live` count, dialog name from photo title, Close focused on open, Escape closes, focus returns to thumbnail, `body` overflow restored.
- Labels on contact fields; fieldset `disabled` + `aria-disabled`.
- Visible focus outlines retained on gallery thumbs (`outline-[#244D39]`).
- Reduced motion for mutable reveals and PageHero; `scroll-behavior: auto` when reduced motion is requested.

**Not claimed:** colour-contrast audit of every gold-on-olive Hero control; screen-reader testing with VoiceOver/NVDA; full WCAG 2.2 AA.

---

## 8. Gallery / navigation verification

| Check | Result |
| --- | --- |
| Drawer opens / closes via hamburger | Pass (`/apartments`) |
| Escape closes drawer; focus to Open navigation | Pass |
| Focus enters drawer (`Close menu` then links) | Pass |
| Drawer no horizontal overflow at 390px | Pass |
| Homepage header `opacity: 0`, `-translate-y-full`, `pointer-events: none` at `scrollY = 0` | Pass |
| Gallery lightbox dialog, Close focused | Pass |
| Escape closes lightbox; focus to originating thumbnail; `body` overflow `""` | Pass |
| Previous / Next present | Pass (click/keyboard arrows implemented; not every arrow press recorded) |
| Swipe | Code handles `touchend` delta > 56px. **No physical touch device used.** |
| Filter keyboard | Implemented; not separately recorded in the MCP session |

---

## 9. TypeScript

```text
npx tsc --noEmit
```

Exit code **0**.

---

## 10. Production build

```text
npm run build
```

Exit code **0**. Compiled successfully. 15 static pages generated. Redirects remain in `next.config.ts`.

Production server used for browser/curl: `npx next start -p 3012`.

---

## 11. Desktop / mobile tests

**HTTP (production):** all seven approved routes **200**. `/villas` **308** → `/apartments`. `/wellness` **308** → `/experiences`. `robots.txt` still `Disallow: /`. Sitemap urlset empty while origin is unset. Contact HTML contains `tel:+94743842244`, `https://wa.me/94743842244`, `mailto:info@fionagreenserenity.com`.

**Browser (Cursor browser, production 3012):**

- Home, Apartments, Experiences, Explore Galle, Gallery, About, Contact rendered.
- Contact: WhatsApp + Email links; form fields `disabled`; Send Enquiry disabled.
- No broken `document.images` on About / Experiences samples.
- No unverified occupancy/price claims added in this task.
- Hero Explore Now remains in the first viewport (unchanged).

**Not run:** Lighthouse; real phones; VoiceOver; INP field data.

---

## 12. Hero regression verification

Compared the live first viewport screenshot (production `/`, `scrollY = 0`) against `docs/fiona-upgrade/baselines/hero-baseline-desktop.png` **by eye**. No pixel-diff tooling.

**Observed on the live capture (slide 02 “UNWIND” during the 6s cycle):**

- Split Fiona wordmark (blurred left / sharp right)
- Follow Us (left)
- Villas / Retreat (right)
- Explore Now
- Blur panel + caption
- Global header **hidden** (`opacity: 0`, translated off-canvas)

Intro loader was not recaptured this session (`sessionStorage` may already have played). Slideshow timing means the visible slide will not always match the baseline frame.

**Protected files were not edited to “fix” this comparison.**

---

## 13. Remaining issues

1. No Lighthouse or CrUX numbers — homepage JS is still dominated by cinematic client components.
2. Hero / loader / ScrollCinema image and JS cost — **do not change without owner approval** (T23 / T26).
3. Disabled enquiry form still occupies vertical space on mobile (honest, but visually heavy).
4. Cinematic multiple H1s and Hero chrome a11y — protected.
5. `/retreat` is not redirected (TASK 10 decision; out of this task).
6. Production domain still unverified; indexing must stay off until `NEXT_PUBLIC_SITE_URL` is a confirmed https origin.
7. Physical swipe and multi-device Safari/Chrome were not executed.
8. Nav/footer logos remain `<img>` (small PNGs; avoided header composition change).

**Recommended contact-only layout (not implemented — would be content restructuring):** remove the disabled fieldset from the public page and keep WhatsApp, email, phone and a short “we confirm stays in person” note, plus a future Privacy link. Keep the form in code behind a flag until an API exists.

**Performance ideas not implemented because they hit the Hero:** code-split `CinematicHero`/`ScrollCinema`, shorten loaders, `next/image` on Hero slides, global font subsetting, `MotionConfig reducedMotion`.

---

## 14. Recommended TASK 12 scope

Do **not** start these here. Suggested next roadmap slice:

1. **T18 — Privacy page** (needed before enquiry data collection; already referenced in contact copy).
2. **T24 — PDF colour tokens** on inner pages/footer only (not Hero gold/olive).
3. **T26 — Hero regression** on real desktop + mobile devices, including intro loader with cleared `sessionStorage`.
4. Optional: Lighthouse CI on inner pages only; owner confirmation of production domain before enabling `robots` allow.
5. Optional: contact-only layout if the owner agrees the disabled form is confusing.

Enquiry API, database, admin dashboard and payments remain out of scope until the client reopens them.
