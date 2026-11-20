# 16 — TASK 12 Final QA Report

**Date:** 19 November 2026  
**Node:** v24.19.0  
**Next.js:** 15.5.18  
**Production sample:** `npx next start -p 3013`  
**Decision:** **NOT READY FOR PRODUCTION** (see §14)

This is a verification report with targeted mutable-page fixes only. It is not a claim of full WCAG 2.2 AA, Google ranking, or field Core Web Vitals.

---

## 1. Files inspected

**Approved pages:** `app/page.tsx`, `app/apartments/page.tsx`, `app/experiences/page.tsx`, `app/explore-galle/page.tsx`, `app/gallery/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`

**Chrome / content:** `components/Navigation.tsx`, `components/Footer.tsx`, `components/ContactForm.tsx`, `components/home/HomepageBelowHero.tsx`, `components/gallery/GalleryExperience.tsx`, `components/apartments/ApartmentGallery.tsx`, `components/PageHero.tsx`, `components/Reveal.tsx`, `components/StructuredData.tsx`, `components/PropertyImage.tsx`

**Data:** `lib/site.ts`, `lib/seo.ts`, `lib/apartments.ts`, `lib/experiences.ts`, `lib/destinations.ts`, `lib/gallery.ts`, `lib/homepage.ts`, `lib/about.ts`, `lib/villaMedia.ts` (paths not changed)

**SEO / config:** `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `next.config.ts`, `.env.example`

**Legacy (not in the seven-page sitemap):** `app/villas/page.tsx`, `app/wellness/page.tsx`, `app/retreat/page.tsx`

**Protected (read-only this task):** `CinematicHero` / `HeroLoader` / `ScrollCinema` inside `components/SriLankanCinematicHome.tsx`, `components/LoadingScreen.tsx`, `app/template.tsx`, Hero CSS in `app/globals.css`, font loaders in `app/layout.tsx`

**Reports read:** `01`, `03`, `04`, `05`, `11`–`15`

---

## 2. Files changed

| File | Change |
| --- | --- |
| `next.config.ts` | Added `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (camera/mic/geo off). Redirects unchanged. |
| `app/retreat/page.tsx` | `robots: noindex`; public notice that the page is older cinematic copy and that dining/spa/housekeeping extras are not confirmed. Hero Retreat link not changed. |
| `app/villas/page.tsx` | `robots: noindex` (URL still 308 → `/apartments`) |
| `app/wellness/page.tsx` | `robots: noindex` (URL still 308 → `/experiences`) |
| `docs/fiona-upgrade/16-task-12-final-qa-report.md` | This report |
| `docs/fiona-upgrade/17-production-launch-checklist.md` | Launch checklist |

No booking API, database, enquiry enablement, Hero, ScrollCinema, loaders, fonts, or `lib/villaMedia.ts` path changes.

---

## 3. Page-by-page QA results

### `/` Homepage — verified complete (mutable) / protected intact

- Cinematic first viewport present: split Fiona, Follow Us, Villas, Retreat, Explore Now, blur panel. Header at `scrollY = 0`: `opacity: 0`, translated off-canvas, `pointer-events: none`.
- Explore Now `href="/villas"` unchanged.
- Below-hero: Welcome, Why Choose, two apartments (Green Garden + Scenic Balcony with **two separate bedrooms**), experience, South Coast (no destination stock photos; distances withheld), gallery preview, hospitality, WhatsApp + email CTA (“does not take instant bookings”).
- ScrollCinema scenes 01–08 still in the accessibility tree after the below-hero block.
- No fabricated reviews.
- **Protected exception:** Hero copy still says Mihiripanna / island luxury; multiple `h1` “Fiona”. Not modified.

### `/apartments` — verified complete

- Exactly two units with approved names. Genuine photo galleries (6 each). “Not additional apartments” note. No prices, occupancy, Wi-Fi, parking. Contact CTA to `/contact`. Enquiry query-string is unused because the form is disabled.

### `/experiences` — verified complete

- Six items: Tropical Garden Living, Balcony Moments, Beachside Adventures, Local Food & Culture, Explore the South Coast, Personal Guest Hospitality.
- Page states Fiona does not run tours, meals or spa services.
- “Short walk” to Dalawella is qualitative brief copy, not a km figure. Owner should still confirm walk time before treating it as a fact.

### `/explore-galle` — verified complete

- Four categories. Fifteen destination cards. Five independent activities. Fiona photograph labelled as the house, not attractions. Map omitted pending pin. Turtle sightings not guaranteed. No guessed km.

### `/gallery` — verified complete

- All Photos + seven categories. Live region “Showing 25 photographs”. Filters and lightbox implementation from TASK 11. Physical swipe **not tested**.

### `/about` — verified complete

- H1 “Welcome to Fiona Green Serenity.” Our Story, Our Hospitality, Our Philosophy, “Comfort. Nature. Hospitality.” CTAs to contact and apartments. No awards or founding year.

### `/contact` — verified complete (contact-only)

- Email `info@fionagreenserenity.com`, tel `+94743842244`, WhatsApp `https://wa.me/94743842244`, Instagram and Facebook URLs as approved, location Mihiripenna, Thalpe, Galle, Sri Lanka.
- Form disabled; banner says online enquiries are unavailable. No fake success. Fields `disabled`.

### Legacy `/retreat` — verified incomplete (mitigated)

- Still **200** because the protected Hero Retreat link uses `/retreat`. Notice added; `noindex`. Unverified “seasonal dining” style copy remains in the older body.

---

## 4. Responsive test matrix

Chrome MCP device metrics. Overflow = `documentElement.scrollWidth > clientWidth + 1`.

| Width | `/` | `/apartments` | `/experiences` | `/explore-galle` | `/gallery` | `/about` | `/contact` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 320 | no overflow | no overflow; drawer opens | content rendered | no overflow | 25 photos, 8 tabs | content rendered | no overflow; form disabled |
| 375 | not re-emulated | not re-emulated | not re-emulated | not re-emulated | not re-emulated | not re-emulated | no overflow |
| 390 | not re-emulated this task (TASK 11: home + drawer OK) | TASK 11: no overflow | TASK 11 | TASK 11 | TASK 11 | TASK 11 | no overflow |
| 430 | **Not tested** this session (emulation set, measurement call rejected) | **Not tested** | **Not tested** | **Not tested** | **Not tested** | **Not tested** | **Not tested** |
| 768 | **Not tested** this session | TASK 11: no overflow | **Not tested** | **Not tested** | **Not tested** | **Not tested** | **Not tested** |
| 1024 | **Not tested** | **Not tested** | **Not tested** | **Not tested** | **Not tested** | **Not tested** | **Not tested** |
| 1440 | desktop canvas ~1920: no overflow; hero photographed | **Not tested** this session | **Not tested** | **Not tested** | **Not tested** | **Not tested** | **Not tested** |

Native phones, Safari, and iPad were **not tested**.

---

## 5. Functional test results

| Item | Result | Evidence |
| --- | --- | --- |
| Seven pages HTTP 200 | Pass | curl 3013 |
| `/villas` 308 → `/apartments` | Pass | curl |
| `/wellness` 308 → `/experiences` | Pass | curl |
| `/retreat` 200 | Pass (legacy) | curl |
| Homepage header hidden at top | Pass | computed style |
| Explore Now still `/villas` | Pass | DOM |
| Mobile drawer open, `aria-expanded`, Escape restores | Pass | `/apartments` 320 |
| Gallery 25 photos + 8 filters | Pass | snapshot |
| Lightbox Escape / trap | Pass in TASK 11; not re-run every key this session | TASK 11 report |
| Physical swipe | **Not tested** | — |
| WhatsApp / email / phone / social hrefs | Pass | curl contact HTML |
| Enquiry submit | Disabled; no success toast | snapshot |
| Hero Explore Now click-through | **Not clicked** this session; 308 measured | curl |

---

## 6. Content accuracy findings

**Match (non-hero):** Fiona Green Serenity, Villa FIONA (footer/JSON-LD alternative not forced onto Hero H1), tagline in footer, Mihiripenna Thalpe Galle, approved email/phone/WhatsApp/Instagram/Facebook.

**Correctly omitted:** prices, occupancy, bed sizes, Wi-Fi, parking, hot water, complimentary meals, welcome drinks, ratings, guaranteed turtles, km distances, map pin.

**Protected mismatches (do not “fix” on Hero):** Mihiripanna spelling, Explore Now / Villas / Retreat labels and hrefs.

**Residual public copy:**

- “Short walk” to Dalawella (homepage + experiences).
- `/retreat` older cinematic language (notice added).
- Nav label “Book Your Stay” goes to `/contact` (PDF nav wording, not a live booking engine).

---

## 7. SEO results

| Check | Result |
| --- | --- |
| Unique titles | Pass (seven distinct titles) |
| Meta descriptions | Present via `pageMetadata` |
| Canonical / OG image absolute URLs | **Omitted** while origin unset (correct) |
| robots meta | `noindex, nofollow, nocache` locally |
| `robots.txt` | `Disallow: /` |
| `sitemap.xml` | empty urlset |
| JSON-LD LodgingBusiness | name, NAP, telephone, email, sameAs; no ratings |
| Production indexing | **BLOCKED** until verified `NEXT_PUBLIC_SITE_URL` |

How to enable production SEO (do not invent the host):

1. Owner confirms the live **https** origin with no trailing slash.  
2. Set `NEXT_PUBLIC_SITE_URL` on the host (see `.env.example`). Never localhost.  
3. Rebuild and restart (the value is inlined at build time).  
4. Confirm `robots.txt` allows `/` and lists sitemap; sitemap lists seven https URLs; each page has matching canonical + `og:image`; JSON-LD `url` is the origin.  
5. Then Search Console / indexing. Until then keep noindex.

---

## 8. Security findings

### Commands

| Command | Exit | Findings | Remediation |
| --- | --- | --- | --- |
| `npx tsc --noEmit` | **0** | none | none |
| `npm run build` | **0** | 15 static routes | none |
| `npm audit --omit=dev` | **1** | 5 issues: 4 high, 1 **critical** (`next`, nested `nanoid`, `postcss`, `sharp`, `source-map-js`) | **Not** run `npm audit fix` (could bump Next across a major line). Documented. |

### Other

- No `.env` secrets in the repo; `.env.example` documents origin only.
- No MongoDB, Stripe, GA, or auth.
- JSON-LD uses `JSON.stringify` with `<` escaped.
- External links use `rel="noopener noreferrer"`.
- Headers now present on `/` (curl): nosniff, referrer-policy, SAMEORIGIN, permissions-policy.
- HSTS **not** set in-app (belongs on the HTTPS terminator after the real domain exists).
- CSP **not** added (risk of breaking `next/image`, fonts, cinematic scripts).
- Legacy `/villas` `/wellness` `/retreat` noindex.
- Windows-specific Next RCE in the advisory set is less relevant if the host is Linux; image-optimizer SVG/AVIF issues still matter if those formats are enabled later. Site currently serves JPEG/WebP.

---

## 9. Performance measurements

**Lighthouse:** **not run**. Chrome.app exists; `lighthouse` CLI was not already installed; `npx lighthouse` hung on install and was not completed. **No scores invented.**

**Lab bundle (`next build`, not field CWV):**

| Route | First Load JS |
| --- | --- |
| `/` | 172 kB |
| `/apartments` | 174 kB |
| `/gallery` | 177 kB |
| `/contact` | 174 kB |
| Shared | 102 kB |

**Field INP / CrUX:** none.

**Protected performance exceptions:** layout `LoadingScreen` + `HeroLoader`, raw Hero `<img>` slides, 760vh ScrollCinema, cinematic JS. Do not shorten for Lighthouse.

---

## 10. Accessibility findings

**Mutable (partial pass, not a conformance claim):**

- Contact fields labelled; form disabled and described.
- Nav drawer: expanded/controls, trap, Escape, restore (re-checked 320).
- Gallery tabs + 25 named thumbnails.
- Reveal reduced-motion from TASK 11.
- About/experiences heading order on inner pages is H1 then H2.

**Protected / remaining:**

- Multiple Hero `h1` Fiona.
- Gold-on-dark Hero controls not contrast-audited this task.
- No VoiceOver/NVDA.
- No axe-core / Lighthouse a11y score.
- Disabled form still in the accessibility tree (honest unavailable, but noisy on mobile).

---

## 11. Hero regression verification

Live production screenshot at `scrollY = 0` compared **by eye** to `docs/fiona-upgrade/baselines/hero-baseline-desktop.png`. No pixel-diff tool.

Observed: split Fiona, Follow Us, Villas, Retreat, Explore Now, blur, slide 02 UNWIND, global header hidden. Intro loader not recaptured (`sessionStorage` may already have played). Slideshow timing means the slide will not always match the baseline frame.

`SriLankanCinematicHome` cinematic regions, `LoadingScreen`, `template.tsx`, fonts: **not edited**.

---

## 12. Outstanding bugs

1. `npm audit` critical/high on `next@15.5.18` and nested image/CSS tooling.  
2. `/retreat` still public via protected Hero.  
3. Disabled enquiry form occupies contact layout.  
4. Viewport matrix incomplete at 430/768/1024/1440 for every page.  
5. Dual cinematic loaders (owner-blocked to change).  
6. `caniuse-lite` stale browserslist warning at build (low).

---

## 13. Owner-dependent blockers

- Production HTTPS hostname → `NEXT_PUBLIC_SITE_URL`
- Whether to index after that origin is live
- Map pin / Dalawella walk time / occupancy / amenities / privacy legal name
- GA4 / Search Console
- Facebook URL stability
- Approval to redirect `/retreat` → `/about` (would leave Hero href 404 unless Hero is also changed — **do not change Hero**)
- Next.js patch version after reviewing `npm audit` without a blind major upgrade
- Image rights for guest-visible photos

---

## 14. Final release readiness assessment

**NOT READY FOR PRODUCTION** as a public, indexable launch.

Reasons from this session:

1. **BLOCKER:** No verified production origin; canonical/OG/sitemap/indexing cannot be completed without inventing a domain.  
2. **HIGH:** `npm audit --omit=dev` reports a **critical** Next.js advisory set; `npm audit fix` was not applied.  
3. **HIGH:** Lighthouse / field CWV not measured.  
4. **HIGH:** `/retreat` remains a live URL with older copy (mitigated, not removed).  
5. Content and contact-only architecture for the **seven approved pages** are otherwise in good shape for a **noindex preview** after the owner names the host and a maintainer reviews the Next patch.

A preview/staging deploy that stays `Disallow: /` is a reasonable next operational step; it is not the same as production launch.
