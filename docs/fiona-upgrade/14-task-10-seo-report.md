# 14 — TASK 10 Technical SEO Report (T19–T20)

**Date:** 19 November 2026  
**Scope:** Metadata, canonical strategy, sitemap, robots, Open Graph, verified JSON-LD, and safe redirects. No GA4. No TASK 11.

---

## 1. Files created / modified

**Created**

- `lib/seo.ts`
- `components/StructuredData.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `.env.example` (documents `NEXT_PUBLIC_SITE_URL` only)
- `docs/fiona-upgrade/14-task-10-seo-report.md`

**Modified**

- `app/layout.tsx` — metadata helper + JSON-LD script (fonts, body, loaders unchanged)
- `app/page.tsx` — homepage metadata export wrapping existing `SriLankanCinematicHome`
- `app/apartments/page.tsx`, `app/experiences/page.tsx`, `app/explore-galle/page.tsx`, `app/gallery/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx` — unique metadata
- `next.config.ts` — permanent redirects

**Not modified**

- `CinematicHero`, `HeroLoader`, `ScrollCinema`, `SriLankanCinematicHome.tsx`
- `LoadingScreen`, `app/template.tsx`, Navigation hide-until-scroll, Footer, fonts, Hero assets
- Legacy `app/villas/page.tsx`, `app/wellness/page.tsx`, `app/retreat/page.tsx` (files retained)
- Contact form (still disabled)

---

## 2. SEO metadata (rendered HTML titles)

| Path | Title | Description |
| --- | --- | --- |
| `/` | Fiona Green Serenity \| Stay Near Dalawella Beach, Galle | PDF homepage description |
| `/apartments` | Holiday Apartments in Galle \| Fiona Green Serenity | Two named apartments; enquire-directly |
| `/experiences` | Experiences Near Unawatuna & Galle \| Fiona | Garden/balcony + independent coastal visits |
| `/explore-galle` | Best Places to Visit in Galle \| Fiona Green Serenity | Beaches, heritage, nature; Mihiripenna base |
| `/gallery` | Fiona Green Serenity Villa Gallery | Genuine property photographs |
| `/about` | About Fiona Green Serenity \| Galle, Sri Lanka | Story and hospitality |
| `/contact` | Contact & Book Fiona Green Serenity \| Galle | WhatsApp/email; not instant booking |

Titles use `title.absolute` so the old `%s \| Fiona Green Serenity` template cannot duplicate the brand.

---

## 3. Canonical URL strategy

Production hostname is **not verified**. `getSiteOrigin()` reads `NEXT_PUBLIC_SITE_URL`, rejects localhost, and returns nothing if unset or invalid.

When unset:

- No `metadataBase`
- No `rel=canonical`
- No absolute `og:url` / OG image URLs

When a confirmed HTTPS origin is set at build/deploy time, canonical and social URLs are generated from that origin.

---

## 4. Sitemap

`app/sitemap.ts` lists the seven approved routes **only when origin is configured**. Local production returned an empty `<urlset>` (correct). Not production-ready until the domain is set.

---

## 5. Robots

Without origin: `User-Agent: *` / `Disallow: /` and HTML `noindex, nofollow, nocache`.

With origin: allow `/` and emit `Sitemap: {origin}/sitemap.xml`.

This avoids indexing localhost or a misconfigured preview as the live site.

---

## 6. Open Graph and social metadata

Every approved page sets `og:title`, `og:description`, `og:type=website`, `twitter:title` / `description`.

Share image path: `/Outdoor/Outdoor/1.jpeg` (garden/veranda). Absolute `og:image` is omitted until origin is set. Card type is `summary` without origin, `summary_large_image` with origin. Hero slide files are unused.

---

## 7. Structured data

`LodgingBusiness` JSON-LD in the root layout:

- name, PDF description, Mihiripenna / Thalpe / Galle / LK
- telephone `+94743842244`
- email `info@fionagreenserenity.com`
- sameAs Instagram and Facebook

Omitted: ratings, prices, occupancy, geo, check-in, amenities, offers, `url`/`image` until origin exists. Copy still says enquire directly.

---

## 8. Redirects (measured)

| Source | Status | Location | Follow |
| --- | --- | --- | --- |
| `/villas` | **308 Permanent Redirect** | `/apartments` | 1 hop → **200** `/apartments` |
| `/wellness` | **308 Permanent Redirect** | `/experiences` | — |
| `/retreat` | **200** (no redirect) | — | Legacy page kept |

No loop on `/villas` (`num_redirects=1`). Legacy page files were not deleted. Next.js 15 emits 308 for `permanent: true`.

`/retreat` is **not** redirected: roadmap T19 does not approve `/retreat` → `/about`. In-hero Retreat still loads the existing page.

---

## 9. Internal link corrections

Active Navigation and Footer already use the seven approved routes. No extra in-content `/villas` or `/wellness` links were found outside the protected Hero (and unused `HeroSlider` / `SplitBlurHero`, left untouched).

Protected in-Hero `Villas` and `Explore Now` remain `href="/villas"` and now resolve via 308.

---

## 10. Verified vs missing production configuration

**Verified:** brand, NAP, phone, email, Instagram, Facebook share URL, seven routes, PDF titles/homepage description.

**Missing / owner-deployment:**

- Production hostname → `NEXT_PUBLIC_SITE_URL`
- GA4 measurement ID
- Search Console property / sitemap submission
- `/retreat` redirect approval
- GBP URL

---

## 11–12. TypeScript / build

- `npx tsc --noEmit` — **pass**
- `npm run build` — **pass** (Next.js 15.5.18). `/robots.txt` and `/sitemap.xml` generated. `/villas` and `/wellness` still appear in the route table because page files remain; runtime 308 takes precedence.

---

## 13. Browser testing

Local `http://localhost:3011` (no `NEXT_PUBLIC_SITE_URL`).

- Seven pages render with expected titles
- `/villas` in browser lands on `/apartments`
- Gallery filters (Kitchens = 3 photos) and lightbox still work
- Gallery 390px: `scrollWidth === 390`
- Experiences/apartments/explore-galle still render
- Pixel visual-diff **not** run
- Hero Explore Now click was not executed in the browser tool; `href="/villas"` remains in source and 308 was measured with curl

---

## 14. Hero regression

At `scrollY = 0`: header `opacity-0`, `pointer-events-none`, `-translate-y-full`. Snapshot still shows split Fiona, Follow Us, Villas, Retreat, Explore Now, three slides. `SriLankanCinematicHome.tsx` was not edited. Visual-diff vs `hero-baseline-desktop.png` was **not** run.

---

## 15. Remaining owner / deployment requirements

1. Confirm live HTTPS hostname and set `NEXT_PUBLIC_SITE_URL` before indexing.
2. Rebuild/redeploy after that so sitemap, canonicals and OG images become absolute.
3. Supply GA4 ID and Search Console access (T21).
4. Decide whether `/retreat` should 308 to `/about`.
5. Privacy policy (T18) before form/consent work.
6. Do not submit the empty local sitemap to Google.

GA4 and Search Console were **not** installed. No measurement ID or verification token was invented.

---

## 16. Recommended TASK 11 scope

Roadmap **T18**: Privacy page from the brief (enquiry data use, no fake legal entity). Do not restyle the Hero. Do not enable the contact form. Do not add GA4 until an ID is supplied.
