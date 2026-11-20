# 04 — Hero-Safe Implementation Roadmap

**Principle:** Upgrade in place. Never edit `CinematicHero` / `HeroLoader`. Never show the global header on the homepage first viewport. Prefer isolated page files and scoped CSS.

Each task is sized for one Cursor Agent prompt.

**Hero regression risk:** Critical / High / Medium / Low / None

**Required testing (all tasks that touch CSS, layout, or homepage):** compare `/` first viewport to `docs/fiona-upgrade/baselines/hero-baseline-desktop.png`.

---

## Phase 0 — Preservation

### T00 — Hero freeze acknowledgement

- **Scope:** No code. Confirm protected regions in `01-hero-preservation-baseline.md`. Future prompts must quote: do not modify `CinematicHero`, `HeroLoader`, homepage header hide rule, `LoadingScreen`, `app/template.tsx`, layout fonts.
- **Files:** none
- **Dependencies:** none
- **Hero risk:** None
- **Acceptance:** Implementers treat baseline as binding.
- **Testing:** none
- **Deliverable:** (this document)

---

## Phase 1 — TASK 02 (recommended next)

Do **not** include navigation overhaul, design-token replacement, or homepage redesign.

### T01 — Central configuration

- **Title:** Add `lib/site.ts`
- **Scope:** Typed brand, tagline, location, email, E.164 phone, WhatsApp, Instagram, Facebook, approved routes, apartment ids `green-garden` / `balcony-suite`. No occupancy, prices, GPS.
- **Files:** `lib/site.ts` (new)
- **Dependencies:** none
- **Hero risk:** None
- **Acceptance:** Constants match PDF pp. 2 and 4.
- **Testing:** `tsc --noEmit`
- **Deliverable:** module only

### T02 — Stop fake enquiry success

- **Title:** Honest contact form (no backend)
- **Scope:** Smallest change to `ContactForm.tsx`: do not claim an enquiry was received. Disable submit or show “temporarily unavailable” plus email and WhatsApp from `lib/site.ts`. No API, no DB.
- **Files:** `components/ContactForm.tsx`
- **Dependencies:** T01
- **Hero risk:** None
- **Acceptance:** No success-on-noop. Direct contact alternatives visible.
- **Testing:** Open `/contact`; submit disabled or non-success.
- **Deliverable:** safe form

### T03 — Footer and contact-page NAP

- **Title:** Correct chrome contact details (not the hero)
- **Scope:** Footer and `app/contact/page.tsx` contactDetails only: Fiona Green Serenity, Mihiripenna Thalpe Galle, approved phone/email, IG, Facebook. Remove 80m and dummy phone. Do **not** edit `Navigation.tsx` homepage hide logic. Optional: drawer phone number only (not header visibility).
- **Files:** `components/Footer.tsx`, `app/contact/page.tsx`; optionally phone strings in `Navigation.tsx` **without** changing `headerClass`
- **Dependencies:** T01
- **Hero risk:** Low (footer is below fold). **High if Navigation visibility changes** — forbidden here.
- **Acceptance:** Footer grep-clean of `stay@villafiona`, `771234567`, `80m`.
- **Testing:** `/contact` and footer; then `/` first viewport vs baseline.
- **Deliverable:** accurate NAP outside hero

### T04 — Route foundations

- **Title:** `/apartments`, `/explore-galle`, `/about` stubs
- **Scope:** `PageHero` + approved H1 and intro paragraphs from PDF pp. 8, 11, 13. No invented attractions/prices. Leave `/villas` `/wellness` `/retreat` live. No redirects.
- **Files:** new `app/apartments/page.tsx`, `app/explore-galle/page.tsx`, `app/about/page.tsx`
- **Dependencies:** T01
- **Hero risk:** None (inner pages). `PageHero` imports ornaments from `SriLankanCinematicHome` — **do not edit that export file except if strictly necessary; import existing ornaments only.**
- **Acceptance:** Three URLs render; one H1 each from brief.
- **Testing:** `next build`; visit URLs.
- **Deliverable:** foundations

### T05 — Metadata text only

- **Title:** Default title/description
- **Scope:** `app/layout.tsx` `metadata` object only. Use PDF p. 18 title/description. `lang="en"` already set. **Do not** change font loaders, `body` className, or chrome. No `metadataBase` unless domain is documented. No GA4.
- **Files:** `app/layout.tsx` (metadata block)
- **Dependencies:** T01
- **Hero risk:** Low (title bar only)
- **Acceptance:** No 80m or Mihiripanna in default description.
- **Testing:** view-source title; `/` visual baseline
- **Deliverable:** metadata

**TASK 02 is complete when T01–T05 are done and the desktop hero still matches the baseline.**

---

## Phase 2 — Inner IA (after TASK 02)

### T06 — Drawer labels without revealing home header

- **Scope:** Replace `navigationItems` with the seven approved destinations. Keep `isHome && !scrolled` hide. Keep Reserve button on **non-home / scrolled** header; label may become Book Your Stay. Do not add a hero overlay.
- **Files:** `components/Navigation.tsx` (items + labels only)
- **Hero risk:** Medium — must screenshot `/` at scrollY=0
- **Acceptance:** Drawer lists approved pages; hero first paint unchanged

### T07 — Apartments page content

- **Scope:** Two named units; two separate bedrooms language; no occupancy/prices/Wi-Fi unless confirmed. CTAs to `/contact?apartment=`
- **Files:** `app/apartments/page.tsx`, labels in `lib/villaMedia.ts` (not path strings)
- **Hero risk:** None if media paths unchanged
- **Acceptance:** Kitchen is not a third apartment

### T08 — Experiences rewrite on `/experiences`

- **Hero risk:** None
- **Do not** advertise spa/yoga. Retire wellness **content** later via redirect task.

### T09 — About page fill

- **Files:** `app/about/page.tsx`
- **Hero risk:** None

### T10 — Contact form fields (still no API)

- **Scope:** PDF p. 14 fields, client validation, disclaimer, WhatsApp panel. Submit still blocked until T14.
- **Hero risk:** None

---

## Phase 3 — Homepage below hero

### T11 — Extract below-hero sections (move-only)

- **Scope:** Move `IntroSection` and later blocks to `components/home/` **without** moving `CinematicHero`/`HeroLoader`. `SriLankanCinematicHome` default export still starts with `<CinematicHero />`.
- **Hero risk:** High if the wrong functions move — diff the hero region (must be identical)
- **Acceptance:** Byte-level unchanged hero function bodies

### T12 — Below-hero approved sections

- **Scope:** Welcome, Why Choose, apartment teasers, destination teaser, gallery preview, hospitality, final CTA using PDF copy. **Do not** replace `CinematicHero`. **Do not** delete `ScrollCinema` in this task unless product explicitly agrees; default is **keep** ScrollCinema under the new sections or after them without restyling it.
- **Hero risk:** Medium (page weight); first viewport must match baseline
- **Acceptance:** Hero baseline; new sections not in the first screen

---

## Phase 4 — Enquiry backend

### T13 — Enquiry API + emails  
### T14 — Honeypot / rate limit  
### T15 — Persist enquiries  

Hero risk: None. No card fields. No fake success.

---

## Phase 5 — Destination, gallery, SEO

### T16 — Gallery filters/lightbox (`app/gallery/page.tsx` + existing gallery CSS only)  
### T17 — `/explore-galle` without unverified distances  
### T18 — Privacy page  
### T19 — Redirects `/villas` → `/apartments` (keep `/villas` working until then so hero Explore Now does not 404)  
### T20 — Per-page SEO, sitemap, robots (not layout fonts)  
### T21 — GA4 if ID supplied  

Hero risk: T19 is Medium (hero CTA target). Implement redirect, do not change hero href, **or** request approval to point Explore Now at `/apartments`.

---

## Phase 6 — Polish (hero-gated)

### T22 — Image optimization **excluding** the six hero assets  
### T23 — Loader performance: **blocked** until explicit approval (changes first impression)  
### T24 — PDF colour tokens on inner pages/footer only  
### T25 — Accessibility on forms/nav drawer; do not restyle hero focus  
### T26 — Full hero regression (desktop + mobile devices)

---

## Explicitly needing developer/owner approval

- Changing hero Explore Now href or label  
- Correcting “Mihiripanna” on the hero  
- Always-visible homepage header  
- Replacing gold/olive globally  
- Removing or shortening `LoadingScreen` / `HeroLoader`  
- Deleting `ScrollCinema`

---

## Mapping to priorities

1. Hero preservation — T00, baselines, every screenshot gate  
2. Misinformation + fake enquiry — T02, T03, T05  
3. Nav/contact (hero-safe) — T04, T06  
4. Homepage below hero — T11–T12  
5. Apartment accuracy — T07  
6. New pages depth — T08, T09, T16, T17  
7. Enquiry backend — T13–T15  
8. SEO — T20–T21  
9. Regression — T26  
