# 20 — TASK 15 Performance, Lighthouse, Accessibility & Cross-Browser Verification

**Date:** 19 November 2026  
**Stack:** Next.js 15.5.29 · React 19.2.6  
**Decision:** **NOT READY FOR PRODUCTION**

Metrics below are **local Lighthouse 13.6.0 lab tests** against `http://127.0.0.1:3020` (production `next start`, indexing **off**). They are **not** field CrUX / RUM. **INP was not measured.** TBT is reported separately and must not be read as INP.

`https://example.test` is an RFC 2606 name used only to simulate production SEO locally. It is not Fiona’s hostname.

---

## 1. Files inspected

Reports `01`, `04`, `15`–`19`. Source: `app/layout.tsx`, `app/page.tsx`, seven approved pages, `app/robots.ts`, `app/sitemap.ts`, `next.config.ts`, `package.json`, `lib/site.ts`, `lib/seo.ts`, `lib/gallery.ts`, `lib/apartments.ts`, `lib/experiences.ts`, `lib/destinations.ts`, `components/Navigation.tsx`, `components/Footer.tsx`, `components/ContactForm.tsx`, `components/gallery/GalleryExperience.tsx`, `components/home/HomepageBelowHero.tsx`. Protected Hero files were read only as needed and **not edited**.

---

## 2. Files modified

| File | Change |
| --- | --- |
| `components/gallery/GalleryExperience.tsx` | Accessible name includes visible photo **title**; gallery count colour `#244D39/80` (was `#A3AA88`, Lighthouse 2.13:1) |
| `components/Footer.tsx` | Copyright/tagline strip `text-ivory/80` instead of `text-gold/60` on olive (Lighthouse 2.89:1) |
| `docs/fiona-upgrade/20-task-15-performance-browser-report.md` | This report |
| `docs/fiona-upgrade/17-production-launch-checklist.md` | Status lines that this task actually re-verified |

**Not modified:** `CinematicHero`, `HeroLoader`, `ScrollCinema`, `SriLankanCinematicHome.tsx`, `LoadingScreen.tsx`, `app/template.tsx`, Hero assets, fonts, homepage header hide rule, Explore Now `/villas`, `/retreat` href.

No Next 16 upgrade. No `npm audit fix --force`. No booking backend.

---

## 3. Testing environment

| Item | Value |
| --- | --- |
| OS | macOS (darwin 27) |
| Node | v24.19.0 |
| Lighthouse | 13.6.0 via `npx`, Chrome `/Applications/Google Chrome.app` headless |
| App | `npx tsc --noEmit` 0; `npm run build` 0; `npx next start -p 3020` unverified origin |
| Overflow matrix | Puppeteer-core + same Chrome, 7×7 viewports |
| Cursor browser | Chromium tab `http://127.0.0.1:3020` |
| Scenario B | Temporary `NEXT_PUBLIC_SITE_URL=https://example.test/` + `SEARCH_INDEXING_ENABLED=true` build, `next start -p 3022`; then **rebuilt with those variables unset** |

Firefox is **not installed**. Safari.app is installed but was **not driven**. No physical phone.

---

## 4. Lighthouse results

**Source:** lab only. Simulated mobile throttling on localhost inflates LCP (inner pages ~11 s). Homepage LCP/CLS are dominated by the **protected cinematic Hero** (full-viewport slides, loaders, ScrollCinema). Those issues are **protected exceptions** — not optimised in this task.

**SEO 0.66 on every URL** is expected: audit `is-crawlable` failed because robots/meta are `noindex`. That was **not** “fixed” by turning indexing on for Lighthouse.

Scores are category scores × 100.

### Mobile

| Route | Perf | A11y | BP | SEO | LCP | CLS | TBT | SI | FCP |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | **51** | 92 | 96 | 66 | 44.9 s | 0.863 | 0 ms | 2.4 s | 1.1 s |
| `/apartments` | 75 | 97 | 96 | 66 | 11.3 s | 0 | 0 ms | 2.4 s | 1.1 s |
| `/experiences` | 75 | 96 | 96 | 66 | 11.1 s | 0 | 10 ms | 2.2 s | 0.9 s |
| `/explore-galle` | 75 | 96 | 96 | 66 | 10.7 s | 0 | 10 ms | 2.2 s | 1.1 s |
| `/gallery` | 75 | 97 | 96 | 66 | 11.3 s | 0 | 0 ms | 2.3 s | 0.9 s |
| `/about` | 75 | 96 | 96 | 66 | 11.4 s | 0 | 0 ms | 2.2 s | 0.9 s |
| `/contact` | 75 | 96 | 96 | 66 | 10.7 s | 0 | 0 ms | 2.3 s | 0.9 s |

### Desktop

| Route | Perf | A11y | BP | SEO | LCP | CLS | TBT | SI | FCP |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | **41** | 92 | 100 | 66 | 8.2 s | 0.864 | 0 ms | 10.3 s | 0.3 s |
| `/apartments` | 85 | 97 | 100 | 66 | 2.2 s | 0 | 0 ms | 2.2 s | 0.3 s |
| `/experiences` | 86 | 96 | 100 | 66 | 2.0 s | 0 | 0 ms | 2.1 s | 0.2 s |
| `/explore-galle` | 87 | 96 | 100 | 66 | 1.9 s | 0 | 0 ms | 2.2 s | 0.3 s |
| `/gallery` | 86 | 97 | 100 | 66 | 2.1 s | 0 | 0 ms | 2.1 s | 0.3 s |
| `/about` | 85 | 96 | 100 | 66 | 2.1 s | 0 | 0 ms | 2.2 s | 0.2 s |
| `/contact` | 87 | 96 | 100 | 66 | 2.0 s | 0 | 0 ms | 2.2 s | 0.2 s |

Lighthouse JSON: `/tmp/fiona-lh15/` (not committed).

**INP:** not collected (no interaction trace / field data).

---

## 5. Performance metrics (other)

| Item | Result |
| --- | --- |
| `/` First Load JS (`next build`) | **173 kB** (shared 103 kB). Historical TASK 11 figure was 172 kB — bundle size, not a Lighthouse score. |
| `/gallery` First Load JS | **177 kB** |
| Homepage unused JS (LH mobile) | ~22 KiB estimated — not worth a speculative split of protected cinematic modules |
| Inner-page CLS | **0** in lab |
| Homepage CLS | **0.86** — Hero slideshow / split layout (**protected**) |
| Hero images | still raw cinematic `<img>` (**protected**) |

No speculative animation removal. No Hero asset recompression.

---

## 6. Mobile / desktop testing matrix

Horizontal overflow = `documentElement.scrollWidth > width + 1`. Chromium headless, all seven approved routes.

| Width | `/` | `/apartments` | `/experiences` | `/explore-galle` | `/gallery` | `/about` | `/contact` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 320 | none | none | none | none | none | none | none |
| 375 | none | none | none | none | none | none | none |
| 390 | none | none | none | none | none | none | none |
| 430 | none | none | none | none | none | none | none |
| 768 | none | none | none | none | none | none | none |
| 1024 | none | none | none | none | none | none | none |
| 1440 | none | none | none | none | none | none | none |

**Not tested at these widths:** native iOS Safari, Android Chrome, iPad. Drawer/lightbox wrapping was sampled in Cursor Chromium (apartments nav, gallery lightbox), not pixel-audited at every width.

---

## 7. Browser-engine testing

| Engine | Result |
| --- | --- |
| Chromium / Chrome | **Tested** — Lighthouse, Cursor browser, puppeteer overflow |
| Firefox | **NOT TESTED** (not installed) |
| WebKit / Safari | **NOT TESTED** (app present; not driven) |

---

## 8. Gallery interaction results

| Check | Result |
| --- | --- |
| All Photos | 25 photographs (live region + 25 open buttons) |
| Seven category filters | exterior 4, garden 3, green-garden 3, balcony-suite 4, kitchens 3, balcony 4, details 4 |
| Genuine property photos | Pass — villa archive only |
| Green Garden vs suite bedrooms | Suite filter: four photos, two distinct bedrooms (balcony-facing + second bedroom) |
| Lightbox open | Pass — Close focused, caption, `1 / 4` |
| Previous / Next controls | Present |
| ArrowRight | Pass (window listener; Cursor + prior TASK 11) |
| Escape | Pass — dialog gone, `body` overflow `""`, focus restored to thumbnail |
| Focus trap / Close first | Close focused on open |
| Body scroll lock | `overflow: hidden` while open |
| Touch swipe | Code: `touchend` delta > 56px. Headless Chrome `touchscreen` **did not** open the dialog (timeout). **Not physical-phone tested.** Do not claim hardware swipe. |

---

## 9. Accessibility findings

Automated Lighthouse a11y is **not** WCAG 2.2 AA.

**Fixed (mutable):**

- Gallery button accessible name now includes visible `title` (`label-content-name-mismatch` on 25 thumbs).
- Footer legal line contrast (gold/60 on olive-900).
- Gallery “Showing N photographs” contrast.

**Remaining (do not claim resolved):**

- Hero gold caption `#908152` on olive and **1.5×1.5px** slide dots — **protected**.
- Contact `fine-label` gold ~3.05:1; some olive-700 links ~4.46:1 (just under 4.5:1).
- Multiple Hero `h1` “Fiona” layers — **protected**.
- Reduced motion: mutable Reveal/PageHero already static; Hero motion **not** changed.
- No VoiceOver / NVDA session.

Keyboard: apartments drawer opens (`aria-expanded`), Escape returns to collapsed “Open navigation”. Homepage header at `scrollY = 0`: `opacity: 0`, `-translate-y-full`, `pointer-events: none`.

---

## 10. Contact-link verification

| Channel | Verified href |
| --- | --- |
| Email | `mailto:info@fionagreenserenity.com` |
| Phone | `tel:+94743842244` |
| WhatsApp | `https://wa.me/94743842244` |
| Instagram | `https://www.instagram.com/fiona_green_serenity/` |
| Facebook | `https://www.facebook.com/share/1A9wDDBvgC/` |

Form fields and **Send Enquiry** disabled. Notice: online enquiries unavailable. No fake success. Click-to-app on a real device **not tested**.

JSON-LD `LodgingBusiness` on unverified origin: name, Mihiripenna / Thalpe, Galle, LK, `+94743842244`, email, Instagram + Facebook. **No** ratings, prices, occupancy, geo, offers.

---

## 11. SEO regression results

### Scenario A — unverified origin (**current workspace `.next`**)

- `robots.txt`: `Disallow: /`
- Empty sitemap urlset
- Pages `noindex, nofollow, nocache`
- No localhost canonicals

### Scenario B — local simulation only (`example.test`, port 3022)

- `Allow: /`; `Host` + `Sitemap` on `https://example.test`
- Seven `<loc>` values, homepage **`https://example.test`** (no trailing slash)
- No `/villas`, `/wellness`, `/retreat`, admin, API
- Home `index, follow`; canonical + `og:url` `https://example.test`; `og:image` garden JPEG
- `/retreat` still `noindex, nofollow`

Workspace was **rebuilt without** those env vars. Indexing is **not** left on.

Redirects: `/villas` → `/apartments` **308**; `/wellness` → `/experiences` **308**. Explore Now remains `/villas`. `/retreat` remains **200**.

---

## 12. Security audit findings

`npm audit --omit=dev` exit **1**. **0 critical**, **2 high**, **1 moderate**.

| Package | Severity | Notes |
| --- | --- | --- |
| `postcss@8.4.31` (Next-vendored) | high | GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849. npm’s Next fix is **16.4.6**. **Rejected.** |
| `sharp@0.34.5` optional | high | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w. `next/image` may use it. No compatible 15.5 pin applied. |
| `next` | moderate | Reported via the postcss pin, not a new Next 15.5.29 critical. |

No compatible non-major fix for leftover highs. **Security release gate remains open.** Zero critical ≠ production-ready.

---

## 13. TypeScript / build results

| Command | Exit |
| --- | --- |
| `npx tsc --noEmit` | **0** (after gallery/footer edits) |
| `npm run build` (noindex, restored) | **0** — Next.js 15.5.29, 15 static pages |
| `npm audit --omit=dev` | **1** |

---

## 14. Hero preservation verification

Live first viewport (Cursor Chromium, `scrollY = 0`) compared **by eye** to `docs/fiona-upgrade/baselines/hero-baseline-desktop.png`. **No pixel-diff.**

Observed: split Fiona wordmark, Follow Us, Villas / Retreat, Explore Now, blur panel, slide **02 UNWIND** (6 s cycle — frame will not always match the baseline PNG). Global header hidden. Explore Now `href="/villas"`. Protected files unchanged.

---

## 15. Remaining launch blockers

1. Owner-confirmed HTTPS production hostname (BLOCKER).  
2. Two high + one moderate npm advisories without an accepted risk decision (HIGH).  
3. Lab homepage LCP/CLS fail — cinematic Hero **protected**.  
4. Physical devices, Safari, Firefox **not tested**.  
5. `/retreat` still reachable from Hero.  
6. Privacy page still absent (T18).  
7. Field INP / Search Console — N/A until a real origin.

---

## 16. Recommended next action

Do **not** start it here.

1. Owner confirms the live HTTPS hostname and DNS/TLS, then production-only origin + indexing gate (see report 19).  
2. Written accept/defer of leftover **postcss** / **sharp** risk, or a scheduled Next 16 spike.  
3. Real-device Hero + gallery swipe (roadmap T26).  
4. Optional: Privacy page (T18) before any enquiry storage.

**NOT READY FOR PRODUCTION.** Internal/`noindex` preview only.

No commit, push, or deploy was performed.
