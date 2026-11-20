# 26 — TASK 21 Premium Footer Redesign Report

**Date:** 19 November 2026  
**Scope:** Footer only. Homepage `CinematicHero`, `HeroLoader`, `ScrollCinema`, `LoadingScreen`, `app/template.tsx`, and `components/SriLankanCinematicHome.tsx` were not edited.

---

## 1. Files modified

| File | Change |
| --- | --- |
| `components/Footer.tsx` | Replaced the three-column olive footer with a dark forest pre-footer CTA, four-column boutique grid, social/connect column, and a draft-labelled copyright bar |
| `docs/fiona-upgrade/task-21/` | After screenshots and capture helper |
| `docs/fiona-upgrade/26-task-21-premium-footer-report.md` | This report |

Unchanged: `lib/site.ts` (routes, contact, copyright), `components/Navigation.tsx`, cinematic Hero source, SEO/robots/sitemap, WhatsApp booking form.

Logo asset remains `public/images/logo.png`.

---

## 2. Original footer issues

The previous footer (`bg-olive-900` `#393D30`) was functional but dated:

- Contact and social links were mixed in one column.
- Navigation was a two-column dump, including Privacy (draft) in the same list as Explore.
- No hospitality CTA.
- Gold/ivory type on olive was acceptable, but hierarchy was flat.
- It did not match the cinematic homepage or the TASK 20 inner-page Heroes.

Before reference: owner screenshot of that three-column layout (logo, stacked contact, nav grid, duplicated tagline in the bottom bar).

---

## 3. New layout structure

`<footer>` on `#203C30` with ivory type and beige/gold accents.

1. **Pre-footer CTA** (hairline below)  
   Eyebrow: YOUR LITTLE PARADISE AWAITS  
   Heading: Where Every Stay Feels Special.  
   Copy: Escape to tropical tranquility…  
   Primary: Enquire on WhatsApp → `https://wa.me/94743842244`  
   Secondary: Explore Our Apartments → `/apartments`  
   No instant-booking language.

2. **Brand** — genuine `logo.png`, name, tagline, approved `aboutIntro.copy`.

3. **Explore** — `footerNavigation` from `lib/site.ts` (Home, Apartments, Experiences, Explore Galle, Gallery, About, Contact).

4. **Contact** — location (plain text), phone `tel:+94743842244`, email `mailto:info@fionagreenserenity.com`.

5. **Connect** — Instagram, Facebook, WhatsApp (approved URLs only).

6. **Copyright bar** — `siteCopy.copyright` (© 2026), **Privacy (draft)** → `/privacy`, optional right-side tagline from `sm` up.

Privacy lives only in the copyright bar, not in Explore.

---

## 4. Visual design improvements

- Dark forest instead of a light or SaaS footer.
- Cormorant heading + Inter labels/links; uppercase tracking on section labels (`#D7C5A7`).
- Hairline dividers at `#D7C5A7` / 15%.
- Gold-outline WhatsApp CTA; text secondary CTA.
- Lucide icons at 16px in beige.
- Hover to `#D7C5A7`; `focus-visible` gold outline.
- Very light geometric motif (circles) at ~7% opacity, `pointer-events-none`, hidden on the smallest screens.
- No glassmorphism, no newsletter, no stock photography.

---

## 5. Contact links

| Item | Destination |
| --- | --- |
| Enquire on WhatsApp / Connect WhatsApp | `https://wa.me/94743842244` |
| Phone / WhatsApp display | `tel:+94743842244` |
| Email | `mailto:info@fionagreenserenity.com` |
| Instagram | `https://www.instagram.com/fiona_green_serenity/` |
| Facebook | `https://www.facebook.com/share/1A9wDDBvgC/` |
| Explore Our Apartments | `/apartments` |
| Privacy (draft) | `/privacy` |

External links use `target="_blank"` and `rel="noopener noreferrer"`.

---

## 6. Mobile responsive verification

Playwright + system Chrome against `http://127.0.0.1:3003` after `LoadingScreen` detached. Footer-element screenshots:

`docs/fiona-upgrade/task-21/after/<width>/apartments-footer.png`

| Width | Overflow (`scrollWidth > innerWidth`) | Notes |
| --- | --- | --- |
| 320 | false | Columns stack; CTA + Explore wrap; copyright wraps |
| 375 | false | Same stack |
| 390 | false | Same |
| 430 | false | Same |
| 768 | false | Two-column grid; CTA inline |
| 1024 | false | Four columns begin to read as a row |
| 1440 | false | Full four-column + CTA row |

Also captured homepage footer at 375 and 1440. No text clipping inside the footer flow. No horizontal overflow measured.

**Capture note:** full-element footer screenshots paint the **fixed global header** across the top of the captured footer (hamburger / Follow Us). That overlay sits in the viewport, not in footer markup. Document flow does not insert a second nav into the footer.

---

## 7. Accessibility checks

| Item | Result |
| --- | --- |
| Semantic `<footer>` | Yes |
| Explore `<nav aria-label="Footer">` | Yes |
| CTA heading `h2` | Yes |
| Social/icon names | Visible text (Instagram, Facebook, WhatsApp), icons `aria-hidden` |
| Keyboard focus | Gold `focus-visible` outline on links |
| Ivory `#F4F0E7` on `#203C30` | High contrast (well above 4.5:1) |
| Beige labels `#D7C5A7` on `#203C30` | Comfortable for small caps; not neon gold body copy |
| External attributes | Present |
| Decorative motif | `aria-hidden` |
| Reduced motion | CSS colour transitions only; no motion requirement |
| Buttons vs links | Anchors only |

No axe/Lighthouse run in this task.

---

## 8. TypeScript results

`npx tsc --noEmit` — exit 0.

---

## 9. Production build results

`npm run build` — Next.js 15.5.29, compiled and generated 16 static routes, exit 0.

---

## 10. Security audit results

`npm audit --omit=dev` — **0 vulnerabilities**.

HTTP smoke:

- `/apartments` 200  
- `/villas` 308 → `/apartments`  
- `robots.txt` still `Disallow: /`  
- Footer HTML includes `wa.me/94743842244`, Instagram, Facebook, `/privacy`, and **Privacy (draft)**

---

## 11. Cinematic Hero regression verification

TASK 21 did not edit `components/SriLankanCinematicHome.tsx`, `LoadingScreen`, or `app/template.tsx`. (`SriLankanCinematicHome.tsx` still shows the earlier TASK 19 nav swap only.)

1440 homepage first viewport after loader:

`docs/fiona-upgrade/task-21/homepage-hero-1440.png`

Split **Fiona**, left blur panel, **01 DISCOVER VILLA**, **Explore Now**, seven-route cinematic bar. No inner-page dark Hero overlay and no footer chrome in the first viewport.

---

## 12. Remaining issues

1. **Fixed global navigation** still covers the top of the viewport on inner pages when the user has scrolled. Full-footer screenshots therefore show Follow Us across the CTA. Navigation was not redesigned (out of scope).
2. **Logo `mix-blend-screen`** is strong on desktop gold-on-forest; at 320px the mark is smaller and easier to miss under capture chrome.
3. **Tagline** appears in the brand column and again on the right of the copyright bar from `sm` up, as specified.
4. **Privacy** remains labelled **(draft)**.
5. Cursor/Playwright **N** badge appears in some captures; it is not a second site nav.
6. No automated visual-diff against the owner’s before PNG.

---

## Definition of done

The footer is a dark, boutique hospitality block: CTA, brand, seven approved routes, verified contact, three social destinations, and a draft privacy link. It is responsive in 320–1440 captures, typechecks, builds, and audits clean. The original cinematic homepage Hero was not changed.

**TASK 21 complete. No commit, push, or deploy.**
