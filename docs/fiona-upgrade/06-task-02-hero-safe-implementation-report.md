# 06 — TASK 02 Hero-Safe Implementation Report

**Date:** 18 November 2026  
**Scope:** Roadmap T01–T05 only. TASK 03 not started.

---

## 1. Completed tasks

| ID | Result |
| --- | --- |
| T01 | `lib/site.ts` added |
| T02 | Fake enquiry success removed; form disabled |
| T03 | Footer + contact page NAP/social corrected. **Navigation.tsx not edited** |
| T04 | `/apartments`, `/explore-galle`, `/about` foundations |
| T05 | Layout metadata text only |

**Protected Hero code regions were left unchanged.** `git diff` shows no modifications to `components/SriLankanCinematicHome.tsx`, `components/Navigation.tsx`, `components/LoadingScreen.tsx`, `app/template.tsx`, `app/globals.css`, `tailwind.config.ts`, or `app/page.tsx`.

---

## 2. Files created

- `lib/site.ts`
- `app/apartments/page.tsx`
- `app/explore-galle/page.tsx`
- `app/about/page.tsx`
- `docs/fiona-upgrade/06-task-02-hero-safe-implementation-report.md`

## 3. Files modified

- `components/ContactForm.tsx`
- `components/Footer.tsx`
- `app/contact/page.tsx`
- `app/layout.tsx` (metadata object + `siteCopy` import only; fonts, body class, LoadingScreen, Navigation, Footer mounting unchanged)

---

## 4. Content corrected (outside the Hero)

- Brand: Fiona Green Serenity + tagline in footer
- Location: Mihiripenna, Thalpe, Galle, Sri Lanka
- Email: info@fionagreenserenity.com
- Phone: +94 74 384 2244 (`tel:+94743842244`)
- Instagram and Facebook official URLs
- Copyright: © 2026 Fiona Green Serenity. All Rights Reserved.
- Removed: `stay@villafiona.com`, dummy `+94 77 123 4567`, 80m ocean claim, `@villafiona.retreat` → `/gallery`

**Skipped (documented for TASK 03):** `components/Navigation.tsx` still shows `+94 77 123 4567` and “80m from the ocean” in the **drawer**. Editing Navigation was skipped to avoid any chance of changing homepage header visibility (`isHome && !scrolled` hide rule).

Hero vertical **“Mihiripanna”** and in-hero Follow Us / Villas / Retreat / Explore Now were **not** changed (protected exception).

---

## 5. Enquiry safety

`ENQUIRY_API_ENABLED = false`. Fields and Send Enquiry are disabled. Notice: online enquiries are temporarily unavailable; use WhatsApp or email. Buttons: Chat on WhatsApp (`https://wa.me/94743842244`), Send an Email. No success-on-noop. No API/DB/SMTP.

---

## 6. New page foundations

Approved H1s and intro copy from the brief. Two apartment names only on `/apartments` (no extra units, no rates/occupancy). Explore Galle has no invented distances. About uses approved story intro. Legacy `/villas`, `/wellness`, `/retreat` remain. No redirects. Hero Explore Now still goes to `/villas`.

---

## 7. Metadata

Default title: `Fiona Green Serenity | Stay Near Dalawella Beach, Galle`  
Template: `%s | Fiona Green Serenity`  
Description: PDF p. 18 homepage meta. No `metadataBase`, no GA4.

---

## 8. Hero regression verification

| Check | Result |
| --- | --- |
| `CinematicHero` / `HeroLoader` bodies | Unchanged (no git diff) |
| Slide assets and order | Unchanged |
| Intro `sessionStorage` key | Unchanged |
| Clip-path / blur panel | Unchanged |
| Follow Us / Villas / Retreat | Present in live first viewport |
| Explore Now → `/villas` | Unchanged |
| Homepage header hide at top | `Navigation.tsx` untouched |
| `LoadingScreen` / `template.tsx` / fonts / gold tokens | Unchanged |
| Desktop screenshot after loaders | Composition matches baseline: split “Fiona”, slide 02 UNWIND, no global header overlay |
| Pixel-perfect diff tooling | **Not run** |
| Mobile viewport screenshot | **Pending** (existing baseline is letterboxed; not re-captured as a native-width proof) |

Slideshow index can differ from the baseline photo depending on the 6s timer; the captured after-state happened to be the same UNWIND slide as the TASK 01 desktop baseline.

---

## 9. TypeScript

`npx tsc --noEmit` — **pass** (`TSC_OK`).

## 10. Build

`npm run build` — **pass** (Next.js 15.5.18). New routes included. 13 static pages generated.

## 11. Browser / HTTP

Local production on port 3002. HTTP **200** for `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/villas`, `/wellness`, `/retreat`.

Contact page: disabled form, honest notice, WhatsApp + email actions, approved NAP. Footer on `/` shows approved brand, tagline, location, phone, email, Instagram, Facebook, seven links.

No emails were sent (no backend).

---

## 12. Remaining issues

- Navigation drawer still has dummy phone and 80m copy
- Homepage below-hero still uses old apartment language and “Book Now”
- `/villas` still describes a two-bed room
- No enquiry API
- No PDF colour re-skin (intentionally not this task)
- Facebook share URL not click-tested as a live page

---

## 13. Recommended TASK 03

Roadmap **T06**: update `navigationItems` and drawer phone **without** changing `headerClass` / homepage hide-until-scroll. Then screenshot `/` at `scrollY = 0` against `docs/fiona-upgrade/baselines/hero-baseline-desktop.png`. Do not start a homepage redesign or booking API in TASK 03 unless explicitly requested.
