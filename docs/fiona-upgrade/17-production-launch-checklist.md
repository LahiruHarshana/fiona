# 17 — Production Launch Checklist

**Project:** Fiona Green Serenity (Villa FIONA)  
**Architecture:** Contact-only Next.js 15 static brochure (WhatsApp, email, telephone). No booking API, MongoDB, admin, payments, or enquiry POST.  
**Current verdict:** **NOT READY FOR PRODUCTION** — see `21-task-16-release-blocker-report.md` (19 Nov 2026).

Statuses used below: **Verified complete** · **Verified incomplete** · **Not tested** · **Owner confirmation required** · **BLOCKED**

---

## Severity key

- **BLOCKER** — must resolve before a public indexed launch  
- **HIGH** — launchable only with explicit owner/dev approval  
- **MEDIUM** — after launch  
- **LOW** — polish

---

## A. Domain, DNS, SSL

| Item | Severity | Status | Notes |
| --- | --- | --- | --- |
| Confirm production hostname | BLOCKER | Owner confirmation required | Do **not** invent `NEXT_PUBLIC_SITE_URL`. |
| HTTPS certificate | BLOCKER | Owner confirmation required | Let’s Encrypt / host-managed. |
| DNS A/AAAA or CNAME to host | BLOCKER | Owner confirmation required | |
| Apex + `www` canonical choice | HIGH | Owner confirmation required | Pick one origin string and use it everywhere. |
| HSTS at the edge | MEDIUM | Not tested | Do not set in Next until HTTPS is proven. |

---

## B. Environment

| Item | Severity | Status | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL=https://<confirmed-host>` no trailing slash | BLOCKER | Verified incomplete | Unset locally → noindex, empty sitemap, no localhost canonicals. |
| Rebuild after setting the variable | BLOCKER | Not tested | Value is compiled in. `next start` of an old build will not pick it up. |
| No other secrets required | — | Verified complete | `.env.example` documents origin only. |
| Node.js | HIGH | Verified complete locally | Local `v24.19.0`. Next 15 needs **≥ 18.18**. Pin the host to LTS (20 or 22 recommended) and smoke-test. |
| `npm ci` then `npm run build` then `npm start` (or host equivalent) | HIGH | Verified complete locally | `npx tsc --noEmit` exit 0; `npm run build` exit 0. |

---

## C. Indexing and SEO (blocked until origin)

| Item | Severity | Status | Notes |
| --- | --- | --- | --- |
| `robots.txt` allow + sitemap URL | BLOCKER | BLOCKED | Today: `Disallow: /` |
| `sitemap.xml` seven https URLs | BLOCKER | BLOCKED | Today: empty urlset |
| Canonical + OG image absolute URLs | BLOCKER | BLOCKED | |
| JSON-LD `url` / `image` | HIGH | BLOCKED until origin | NAP already present |
| Google Search Console property + sitemap submit | HIGH | Owner confirmation required | After robots allow |
| Google Analytics / GA4 | MEDIUM | Owner confirmation required | Not in codebase. Do not add an invented ID. |
| Social share preview (Facebook/WhatsApp) | HIGH | Not tested | Needs absolute `og:image` after origin |
| `/villas` → `/apartments` 308 | — | Verified complete | Keep; Hero Explore Now depends on it |
| `/wellness` → `/experiences` 308 | — | Verified complete | |
| `/retreat` redirect | HIGH | Owner confirmation required | Keep **200 + noindex** until owner approves a destination **and** Hero Retreat href together. Do not 404. TASK 16 recommendation: `/about` if approved. |

**Do not enable indexing on an unverified or staging hostname.**

---

## D. Security

| Item | Severity | Status | Notes |
| --- | --- | --- | --- |
| `npm audit --omit=dev` | HIGH | Verified complete (lockfile, TASK 16) | **0** findings after `sharp@0.35.5` and `postcss@8.5.23` overrides on Next **15.5.29**. Residual: not an official Next postcss pin. Do not `--force` onto Next 16. |
| Security headers | MEDIUM | Verified complete (app) | nosniff, referrer-policy, SAMEORIGIN, permissions-policy on `/:path*` |
| CSP | LOW | Not implemented | Risk to fonts/images/cinematic JS |
| Exposed secrets | — | Verified complete | none found |
| Third-party scripts | — | Verified complete | none (no GA) |
| `noopener` on external links | — | Verified complete | |

---

## E. Content and contact-only UX

| Item | Severity | Status | Notes |
| --- | --- | --- | --- |
| Seven approved pages | — | Verified complete | |
| Approved NAP | — | Verified complete | |
| Enquiry form disabled, no fake success | — | Verified complete | |
| WhatsApp / email / phone | — | Verified complete (hrefs) | Click-to-app on real devices **not tested** |
| No prices / occupancy / unverified amenities | — | Verified complete on approved pages | |
| Privacy page | MEDIUM | Owner confirmation required | `/privacy` **draft** shipped (always noindex, not in sitemap). Not a signed policy. Form stays disabled. |
| Guest photo rights | HIGH | Owner confirmation required | |
| Map pin | MEDIUM | Owner confirmation required | Page correctly omits map |

---

## F. Hero and cinematic

| Item | Severity | Status | Notes |
| --- | --- | --- | --- |
| First viewport vs baseline PNG | HIGH | Verified complete (visual, not pixel-diff) | Header hidden at `scrollY = 0` |
| Intro loader on a cold `sessionStorage` | HIGH | Not tested this session | |
| ScrollCinema on real devices | MEDIUM | Not tested | Do not shorten |
| Dual loaders vs LCP | HIGH | Protected exception | T23 still blocked |

---

## G. Quality gates before go-live

| Item | Severity | Status |
| --- | --- | --- |
| `npx tsc --noEmit` | — | Verified complete (0) |
| `npm run build` | — | Verified complete (0) |
| Lighthouse home / apartments / gallery / contact | HIGH | Verified complete (lab, TASK 15) | All seven routes, mobile + desktop Lighthouse 13.6.0 on localhost `next start`. SEO 66 with intentional `noindex`. Homepage perf 51/41 — Hero protected. **Not** field data. |
| Field INP | MEDIUM | **Not tested** |
| Safari iOS + Chrome Android | HIGH | **Not tested** | Safari.app launched locally; Computer Use lacked Accessibility/Screen Recording. Firefox not installed. |
| Viewports 430 / 1024 / 1440 all seven pages | MEDIUM | Verified complete (Chromium headless overflow, TASK 15) | 320–1440 × seven routes: no `scrollWidth` overflow. Native phones still not tested. |
| Keyboard gallery lightbox | HIGH | Verified complete (TASK 15 Chromium) | Open, Close focused, Escape restores, ArrowRight. Physical swipe **not tested**. |

---

## H. Hosting compatibility

Suitable: any Node host that can run `next start` or a static/standalone Next 15 output (Vercel, Node VPS, container).  

Not required: MongoDB, serverless enquiry functions, image CDN beyond Next optimizer.

After deploy smoke:

1. HTTPS loads `/` and the other six routes.  
2. `/villas` and `/wellness` 308.  
3. Hero still hides the header at top.  
4. WhatsApp/email/phone still correct.  
5. `robots.txt` matches the intended index/noindex policy.  
6. One genuine image on apartments + gallery.  
7. No console errors on home after loaders finish.

---

## I. Rollback

1. Keep the previous successful build artifact or git tag.  
2. Revert the host deployment to that artifact (do not `force-push` main).  
3. If `NEXT_PUBLIC_SITE_URL` was wrong, unset it, rebuild, and restore noindex.  
4. Do not “fix” a Hero regression by restyling `CinematicHero`.

---

## J. Issue register

### BLOCKER

- Production HTTPS origin not confirmed.  
- Indexing, canonicals, sitemap, OG images **must stay off** until that origin is set and rebuilt.

### HIGH

- Lab Lighthouse homepage LCP/CLS fail (protected Hero). Inner pages ~75 mobile / ~85 desktop with `noindex` SEO penalty.  
- `/retreat` still live from Hero (notice + noindex only; no 308 until owner + Hero href).  
- Real-device Safari/Firefox/phones and gallery swipe **not tested**.  
- Guest image rights.  
- Dual cinematic loaders (protected).  
- Privacy draft is not an approved legal policy.

### MEDIUM

- Next 15 postcss/sharp overrides vs upstream pins (audit currently 0).  
- Viewport overflow closed in Chromium lab; native devices still open.  
- Disabled form visual weight on contact.  
- PDF colour-token pass on inner pages (T24).  
- Search Console / GA4 after origin.

### LOW

- browserslist `caniuse-lite` stale warning.  
- Nav/footer logos still `<img>`.  
- CSP / HSTS at the edge.

---

## K. Decision

**NOT READY FOR PRODUCTION**

The seven approved pages are a coherent contact-only brochure with correct NAP, redirects, and a protected cinematic Hero. They are suitable for an **internal or passworded preview** that remains `noindex`.

They are **not** cleared for a public indexed launch until the owner confirms the HTTPS origin, a finished privacy position is agreed, `/retreat` is decided with the Hero link, and smoke tests run on that host (including robots/sitemap after rebuild). TASK 16 cleared the previous `npm audit --omit=dev` findings via compatible overrides; that is not a full production sign-off.
