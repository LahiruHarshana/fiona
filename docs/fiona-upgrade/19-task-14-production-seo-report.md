# 19 — TASK 14 Production Domain, SEO Verification & Release Blocker Review

**Date:** 19 November 2026  
**Next.js:** 15.5.29 · **React:** 19.2.6  
**Decision:** **NOT READY FOR PRODUCTION**

`https://example.test` below is an RFC 2606 documentation name used only to simulate sitemap/robots locally. It is **not** Fiona’s hostname and was **not** treated as owner approval.

---

## 1. Files inspected and modified

**Inspected:** `14-task-10-seo-report.md`, `16-task-12-final-qa-report.md`, `17-production-launch-checklist.md`, `18-task-13-security-remediation-report.md`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`, `package.json`, `lib/site.ts`, `lib/seo.ts`, `components/StructuredData.tsx`, all approved `page.tsx` metadata, legacy `/retreat` `/villas` `/wellness`.

**Modified**

| File | Change |
| --- | --- |
| `lib/seo.ts` | HTTPS-only origin; trailing-slash normalized via `url.origin`; reject localhost, private IPs, credentials, common preview hosts; `isSearchIndexingEnabled()` |
| `app/robots.ts` | Allow/sitemap only when indexing is enabled |
| `app/sitemap.ts` | Empty unless indexing enabled; seven approved paths; homepage loc uses origin |
| `.env.example` | Documents origin + server-only `SEARCH_INDEXING_ENABLED` |
| `package.json` / lockfile | `overrides`: `nanoid@3.3.20`, `source-map-js@1.2.3` |

**Not modified:** cinematic Hero, ScrollCinema, `SriLankanCinematicHome.tsx`, loaders, `template.tsx`, fonts, Hero paths, contact-only architecture, `next.config.ts` redirects.

---

## 2. Production origin configuration

`NEXT_PUBLIC_SITE_URL` is a **public origin string**, not a secret. It is still not evidence of DNS/SSL ownership.

**Accepted:** `https://` host, no userinfo. Trailing slash on the env value is dropped (`url.origin`).

**Rejected:** missing value; `http:`; localhost / `.local` / `.localhost` / `.internal` / `::1`; RFC 1918 and loopback IPv4; `.vercel.app`, `.netlify.app`, `.pages.dev`, `.herokuapp.com`, `.railway.app`, `.onrender.com`.

**Indexing** (`isSearchIndexingEnabled`):

| Environment | Origin valid? | Indexed? |
| --- | --- | --- |
| Unset origin | no | no |
| Valid origin + `VERCEL_ENV=preview` or `development` | yes | **no** |
| Valid origin + `VERCEL_ENV=production` | yes | yes |
| Valid origin, no Vercel, `SEARCH_INDEXING_ENABLED` unset | yes | **no** (URL alone is not approval) |
| Valid origin, no Vercel, `SEARCH_INDEXING_ENABLED=true` | yes | yes (self-host gate) |

`SEARCH_INDEXING_ENABLED` is **not** `NEXT_PUBLIC_`.

### Owner action to verify the hostname

1. Confirm in writing the live **HTTPS** hostname (apex vs `www`).  
2. Point DNS at the host and obtain a valid certificate.  
3. Open the site in a browser on that hostname (not only env file).  
4. Set `NEXT_PUBLIC_SITE_URL` **only** on the production environment.  
5. On Vercel, rely on `VERCEL_ENV=production`. On other hosts, set `SEARCH_INDEXING_ENABLED=true` **only** on that production environment.  
6. Rebuild and redeploy.  
7. Fetch `https://<host>/robots.txt` and `https://<host>/sitemap.xml` on the live origin.

Until those steps are done, keep noindex.

---

## 3. Sitemap verification

Approved list only: `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`.

### Scenario A (current / unverified) — **verified**

`http://localhost:3015/sitemap.xml`: empty `<urlset>`. No localhost URLs.

### Scenario B (local simulation) — **verified as a test, not production**

Build: `NEXT_PUBLIC_SITE_URL='https://example.test/' SEARCH_INDEXING_ENABLED=true npm run build` then `next start -p 3016`.

Measured XML:

- Seven `<loc>` values, all `https://example.test`  
- No `/villas`, `/wellness`, `/retreat`, `/admin`, API  
- No `lastmod`  
- Homepage loc was `https://example.test/` (URL constructor). Sitemap code was then changed so `/` uses `origin` (`https://example.test`). That tweak was **not** re-served on 3016.

The workspace `.next` was **rebuilt without** those env vars so the tree is noindex again.

**Pending:** real-domain sitemap on a verified deployment.

---

## 4. Robots and noindex verification

### Scenario A — **verified current staging/local**

- `robots.txt`: `User-Agent: *` / `Disallow: /`  
- Seven pages: `noindex, nofollow, nocache`  
- `/retreat`: `noindex, nofollow`

### Scenario B — **verified simulated locally**

- `Allow: /`  
- `Host: https://example.test`  
- `Sitemap: https://example.test/sitemap.xml`  
- Home: `index, follow`  
- `/retreat` still `noindex, nofollow` (page-level metadata)

Preview: `VERCEL_ENV` other than `production` forces disallow even if origin is set (**code review**; not a live Vercel preview test).

**Do not treat Scenario B as live indexing.**

---

## 5. Canonical URLs

| Path | Scenario A | Scenario B (simulated) |
| --- | --- | --- |
| `/` | none | `https://example.test` |
| `/apartments` | none | `https://example.test/apartments` |
| `/experiences` | none | `https://example.test/experiences` |
| `/explore-galle` | none | `https://example.test/explore-galle` |
| `/gallery` | none | `https://example.test/gallery` |
| `/about` | none | `https://example.test/about` |
| `/contact` | none | `https://example.test/contact` |

No localhost canonicals in A. Production canonicals **pending** a real origin.

---

## 6. Open Graph metadata

Seven unique titles (absolute; no `%s | brand` suffix doubling). Descriptions remain the TASK 10 copy.

Scenario A: no `og:url` / absolute `og:image` (correct). Twitter card `summary`.

Scenario B home: `og:url=https://example.test`, `og:image=https://example.test/Outdoor/Outdoor/1.jpeg` (garden/veranda, genuine archive). `og:title` matches `<title>`.

**Missing approved social artwork:** no dedicated 1200×630 share graphic. The garden JPEG is a stand-in. Owner may supply a designed OG image later; do not invent one.

---

## 7. Structured data verification

`LodgingBusiness` JSON-LD (Scenario A, no `url`/`image`):

- name Fiona Green Serenity  
- address Mihiripenna / Thalpe, Galle / LK  
- telephone `+94743842244`  
- email `info@fionagreenserenity.com`  
- sameAs Instagram + Facebook share URL  

**Not present:** ratings, prices, occupancy, amenities, geo, offers.

Scenario B added `url` and `image` on the simulated origin only. Valid JSON object (script payload). Not submitted to Google’s rich-result tester against a live host.

---

## 8. Redirect behaviour

| Source | Status | Location |
| --- | --- | --- |
| `/villas` | **308** | `/apartments` |
| `/wellness` | **308** | `/experiences` |
| `/retreat` | **200** | no redirect |

Hero Explore Now remains `/villas` (protected). **Recommendation:** keep `/retreat` as 200 + noindex + honesty notice until the owner approves a destination **and** a Hero href change. Do not 308 `/retreat` → `/about` while Explore/Retreat still point at legacy URLs.

---

## 9. Remaining security advisories and risk assessment

`npm audit --omit=dev` after nanoid/source-map-js overrides: exit **1**, **0 critical**, **2 high**, **1 moderate**.

### Resolved in this task (compatible overrides, Next 15 kept)

| Package | Was | Now | Advisories |
| --- | --- | --- | --- |
| nanoid | 3.3.12 | **3.3.20** | GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8 |
| source-map-js | 1.2.1 | **1.2.3** | GHSA-68fv-2mgg-jv7q |

`npx tsc --noEmit` and `npm run build` still passed after the overrides.

### Unresolved — security release gate **open**

#### postcss 8.4.31 (high) — `node_modules/next/node_modules/postcss`

- GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849  
- **Conditions:** XSS in CSS stringify; sourceMappingURL file reads when building CSS with attacker-controlled maps.  
- **Used?** Next vendors this for CSS pipeline at build/runtime for styled-jsx. Not a public form field.  
- **Patched versions:** PostCSS `>8.5.22`; npm’s Next fix is **16.4.6** (major).  
- **Compatible 15.5 fix:** none from npm. Overriding Next’s pin is unsupported.  
- **Exposure:** mainly build-time / CSS toolchain, not guest PII. Still a **high** advisory.  
- **Mitigation:** wait for a 15.5 postcss bump, or plan a Next 16 project. Do not `--force`.  
- **Residual risk:** accepted only with an explicit technical decision.

#### next (moderate) — via the same postcss pin

- Range still reported as `9.3.4-canary.0` – `16.3.0-preview.10` **because of postcss**, not the November 2026 Next critical set (those were addressed in 15.5.29).  
- **Fix available:** `next@16.4.6` major. **Rejected.**

#### sharp 0.34.5 optional (high) — `node_modules/sharp`

- GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w (libvips / libheif / librsvg).  
- **Used?** Yes if Next image optimization runs (this site uses `next/image` off-Hero).  
- **Patched:** npm `sharp@0.35.5` (minor of sharp, not Next). Jumping 0.34 → 0.35 without Next support was **not** applied.  
- **Exposure:** malformed image processing on the optimizer, not booking data.  
- **Mitigation:** stay on Next-bundled sharp until 15.5 ships a newer optional; disable unusual SVG/AVIF inputs (site uses JPEG/WebP).  
- **Residual risk:** unresolved high.

**Gate:** remaining **high** findings mean this is **not** a clean security sign-off. Zero critical ≠ production-ready.

---

## 10. TypeScript / build results

| Command | Exit | Notes |
| --- | --- | --- |
| `npx tsc --noEmit` | **0** | After SEO + override changes |
| `npm run build` (unset origin) | **0** | Next.js 15.5.29; restored as workspace default |
| `npm audit --omit=dev` | **1** | 2 high + 1 moderate |
| Scenario B build | **0** | Temporary; not left as `.next` |

---

## 11. Outstanding deployment requirements

- Owner-confirmed HTTPS hostname and DNS/SSL  
- Production-only `NEXT_PUBLIC_SITE_URL`  
- Indexing gate (`VERCEL_ENV=production` or `SEARCH_INDEXING_ENABLED`)  
- Live robots/sitemap/canonical check on that host  
- Search Console after indexing is intentional  
- Technical decision on leftover postcss/sharp advisories  
- Optional OG artwork  
- Privacy page still absent (T18)  
- `/retreat` policy  
- Real-device Hero/Lighthouse (not this task)

---

## 12. Launch readiness decision

**NOT READY FOR PRODUCTION**

| Item | Status |
| --- | --- |
| Seven-page content / contact-only | Verified complete (prior tasks) |
| Hero protected | Verified this task (no source edits) |
| Scenario A noindex | **Verified current** |
| Scenario B sitemap/robots | **Verified simulated** (`example.test` only) |
| Real production origin | **Pending owner** |
| Deployment verification | **Pending** |
| Security gate (high advisories) | **Unresolved** |

---

## 13. Recommended next task

Do **not** start it here.

**TASK 15 (suggested):** Owner supplies the production hostname → configure host env only → rebuild/deploy → live robots/sitemap/OG smoke on that HTTPS origin → written accept/reject of residual postcss/sharp risk **or** a scheduled Next 16 spike. Optional parallel: Privacy page (roadmap T18) before any enquiry storage.

No commit, push, or deploy was performed.
