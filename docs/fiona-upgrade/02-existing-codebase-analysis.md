# 02 — Existing Codebase Analysis

**Audit date:** 18 November 2026  
**Git:** `main` @ `a70aedf`, clean working tree (restored original implementation).  
**Method:** Current files only. Prior TASK 02/03 code is **not** present.

---

## 1. Stack

| Item | Value | Evidence |
| --- | --- | --- |
| App name | `villa-fiona` | `package.json` |
| Next.js | `^15.5.6` (build reported 15.5.18) | `package.json`, `npm run build` |
| React | `^19.0.0` | `package.json` |
| TypeScript | `^5.7.2`, `strict: true` | `tsconfig.json` |
| Tailwind | `^3.4.17` | `tailwind.config.ts` |
| Framer Motion | `^12.23.24` | `package.json` |
| Icons | `lucide-react` `^0.468.0` | `package.json` |
| Fonts | Cormorant Garamond + Inter via `next/font/google` | `app/layout.tsx` |
| Scripts | `dev`, `build`, `start` only (no lint/test) | `package.json` |

Architecture: App Router, file routes under `app/`, components in `components/`, media catalog `lib/villaMedia.ts`. No `src/` directory.

Verified `tsc --noEmit` pass. Verified `npm run build` pass. Routes generated: `/`, `/contact`, `/experiences`, `/gallery`, `/retreat`, `/villas`, `/wellness`.

---

## 2. App Router and pages

| Route | File | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` | `SriLankanCinematicHome` |
| `/villas` | `app/villas/page.tsx` | Four cards (two rooms + kitchen + garden) |
| `/experiences` | `app/experiences/page.tsx` | Four villa-space mood cards |
| `/wellness` | `app/wellness/page.tsx` | Rituals / “treatments” |
| `/retreat` | `app/retreat/page.tsx` | Values, not About copy |
| `/gallery` | `app/gallery/page.tsx` | Three looping cinema tracks |
| `/contact` | `app/contact/page.tsx` | Details + client-only form |

**Missing vs brief:** `/apartments`, `/explore-galle`, `/about`.

Layout: `app/layout.tsx` (LoadingScreen, Navigation, Footer).  
`app/template.tsx`: page enter motion.

No `app/api/**`, `middleware.ts`, `sitemap.ts`, `robots.ts`, `not-found.tsx`.

---

## 3. Backend, data, auth, admin

**None.** No Route Handlers, Server Actions, ORM, database, auth, or admin UI. `.gitignore` mentions `.env*` but no `.env.example` and no env usage in application TypeScript.

---

## 4. Contact / booking

`components/ContactForm.tsx`: name, email, free-text dates, message. `preventDefault` + `setSent(true)`. Success copy claims the enquiry was received. **Nothing is transmitted.**

`components/BookingBar.tsx`: GET to `/contact`; **not imported**.

---

## 5. Media

Static JPEGs under `public/` (Drone, Outdoor, Balcony, Guest, kitchens, apartment rooms, `images/`, `fiona-images/`, unused `generated/`). Indexed in `lib/villaMedia.ts`. `next/image` used only in `LoadingScreen.tsx`.

---

## 6. SEO

Site-wide metadata only (`app/layout.tsx`):

- Title: `Villa FIONA | Purely Green Serenity in Galle`
- Description includes **Mihiripanna**, **80m from the ocean**, “luxury retreat”

No per-page metadata, canonical, Open Graph, sitemap, robots, JSON-LD, GA4.

---

## 7. Styling / branding in code

Tailwind: ivory `#FDFBF7`, olive scale, gold `#CAAE69`, sage `#8B9472`.  
PDF palette (`#244D39`, `#203C30`, `#F4F0E7`, `#A3AA88`, `#D7C5A7`) is **not** in the theme.

Nav/footer brand: Villa FIONA; phone `+94 77 123 4567`; email `stay@villafiona.com`; Instagram handle linked to `/gallery`; location Mihiripanna; 80m ocean claim.

---

## 8. Deployment

`next.config.ts` is empty. No `vercel.json`, Dockerfile, CI, or README beyond `# fiona`. Production hostname unknown.

---

## 9. Dead components

`HeroSlider`, `SplitBlurHero`, `BookingBar`, `PageTransition` are not imported. Do not reconnect `HeroSlider` (stock photography).

---

## 10. Inner pages import homepage ornaments

`PageHero` and several pages import `MakaraLineArt` / `HeritageRosette` / `LiyaVelaBorder` **from** `SriLankanCinematicHome.tsx`. That file is therefore a **shared module**. Editing it for homepage content can break inner pages. Future work should extract ornaments and below-hero sections **out** of this file without touching `CinematicHero`.
