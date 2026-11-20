# 18 — TASK 13 Security Remediation Report

**Date:** 19 November 2026  
**Scope:** Next.js 15.5 maintenance-line security patch only. No Hero, design, booking, or domain changes.  
**Official source:** [November 2026 Security Release](https://nextjs.org/blog/november-2026-security-release) and [next.js v15.5.29](https://github.com/vercel/next.js/releases/tag/v15.5.29)

This report does **not** claim the application is fully secure. A passing build is not a security clearance.

---

## 1. Original dependency versions

Recorded before the upgrade (`npm ls next react react-dom` and lockfile):

| Package | Installed | Manifest |
| --- | --- | --- |
| `next` | **15.5.18** | `^15.5.6` |
| `react` | **19.2.6** | `^19.0.0` |
| `react-dom` | **19.2.6** | `^19.0.0` |
| `framer-motion` | 12.40.0 | `^12.23.24` |
| `lucide-react` | 0.468.0 | `^0.468.0` |

npm registry: latest **15.5** tag at the time of this task was **15.5.29** (no newer 15.5.x published). Next 16 was not used.

---

## 2. Original audit vulnerabilities

Command: `npm audit --omit=dev` (before upgrade)

| Count | Severity |
| --- | --- |
| 1 | **critical** |
| 4 | high |
| **5** | total |

| Package | Severity | npm range | Advisory IDs / GHSA |
| --- | --- | --- | --- |
| **next** | critical | `9.3.4-canary.0` – `16.3.0-preview.10` | GHSA-m99w-x7hq-7vfj, GHSA-89xv-2m56-2m9x, GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q, GHSA-4c39-4ccg-62r3, GHSA-p9j2-gv94-2wf4, GHSA-q8wf-6r8g-63ch, GHSA-955p-x3mx-jcvp, GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4, GHSA-4jqv-mc3x-m676, GHSA-mcj8-r9mp-w47p, GHSA-2464-fhr4-w9xw, GHSA-p3m5-59mp-jv5r; also via nested **postcss** and **sharp** |
| **nanoid** | high | `<=3.3.17` | GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8 |
| **postcss** | high | `<=8.5.22` | GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 |
| **sharp** | high | `<=0.35.5-rc.1` | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w |
| **source-map-js** | high | `1.0.0` – `1.2.1` | GHSA-68fv-2mgg-jv7q |

`npm audit fix --force` was **not** run.

---

## 3. Security advisories addressed

Patched Next.js line: **15.5.18 → 15.5.29**.

Vercel documents 15.5.29 as Maintenance LTS for the November 2026 release. GitHub release notes for `v15.5.29` list:

| Advisory | Topic | 15.x patched in |
| --- | --- | --- |
| GHSA-pc58-hwjq-p385 | Cross-client response injection via stale compressed framing (self-hosted) | 15.5.29 (`<=15.5.28` affected) |
| GHSA-f3mh-rxg3-f5g2 | HttpOnly cookie leak on Edge `x-middleware-set-cookie` | 15.5.29 |
| GHSA-7qx7-33qx-rqx2 | SVG rejection bypass in image optimization | 15.5.29 |

After the upgrade, `npm audit --omit=dev` **no longer reports `next` as critical**. The previous critical GHSA cluster on `next` (DoS, SSRF, cache confusion, Windows/SVG/AVIF RCE, etc.) is no longer attached to 15.5.29 in this audit database.

Cache-Components advisories in the same blog post (GHSA-mfr8-8qww-v76h, GHSA-vc7v-qv4w-wrv8, GHSA-rhh4-g77r-r9qj, shared-shell poisoning) are documented primarily against **Next 16 / Cache Components**. This site does not enable those features. They were not used as a reason to jump to 16.4.5.

---

## 4. Packages and versions changed

Command: `npm install next@15.5.29 --save` (lockfile updated; no `--force`).

| Package | Before | After |
| --- | --- | --- |
| `next` (direct) | 15.5.18 | **15.5.29** |
| `package.json` | `"next": "^15.5.6"` | `"next": "^15.5.29"` |
| `react` / `react-dom` | 19.2.6 | **19.2.6** (unchanged major) |
| nested `@next/swc-*` | 15.5.18 | 15.5.29 |
| nested `postcss` (under `next`) | 8.4.31 | **8.4.31** (still pinned by Next) |

Install log: `changed 3 packages`. React was not bumped to 20.

Files touched: `package.json`, `package-lock.json`, this report. No application source, Hero, or `next.config.ts` changes in this task.

---

## 5. Remaining audit findings

Command: `npm audit --omit=dev` **after** upgrade — exit **1**

| Count | Severity |
| --- | --- |
| 0 | critical |
| 4 | high |
| 1 | moderate |
| **5** | total |

| Package | Severity | Path | Advisories | Compatible fix without Next 16? |
| --- | --- | --- | --- | --- |
| **next** | moderate | `node_modules/next` | **via postcss only** (no longer the critical GHSA list) | npm proposes `next@16.4.6` (**semver major**). **Rejected** for this task. |
| **postcss** | high | `node_modules/next/node_modules/postcss@8.4.31` | GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 | Next 15.5.29 still depends on `postcss@8.4.31`. Overriding it is unsupported. `audit fix --force` would install Next **16**. |
| **nanoid** | high | `node_modules/nanoid@3.3.12` (PostCSS 8.4.31 dependency) | GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8 | Transitive; not independently upgraded. |
| **sharp** | high | `node_modules/sharp@0.34.5` (optional, Next image) | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w | Nested optional; `npm audit fix` not applied. |
| **source-map-js** | high | `node_modules/source-map-js@1.2.1` | GHSA-68fv-2mgg-jv7q | Transitive via PostCSS. |

Dev-only top-level `postcss@8.5.15` is used by Tailwind and is **outside** `--omit=dev` production tree, except where Next still vendors 8.4.31.

These remaining items are **not resolved**. They are not hidden.

---

## 6. TypeScript results

```text
npx tsc --noEmit
```

Exit code **0**.

---

## 7. Production build results

```text
npm run build
```

Exit code **0**. Compiler banner: **Next.js 15.5.29**. 15 static pages generated.

| Route | Size | First Load JS |
| --- | --- | --- |
| `/` | 168 B | 173 kB |
| `/apartments` | 1.8 kB | 174 kB |
| `/gallery` | 4.41 kB | 177 kB |
| `/contact` | 2.19 kB | 175 kB |
| shared | — | 103 kB |

Slight First Load JS change vs 15.5.18 (~172 kB → ~173 kB) is a compiler output delta, not a design change.

Production server: `npx next start -p 3014` (Next.js 15.5.29).

---

## 8. Page regression results

| Check | Result | Evidence |
| --- | --- | --- |
| `/` 200 + unique title + noindex | Pass | curl |
| `/apartments` 200 | Pass | curl + browser snapshot (two named units, two 6-photo galleries) |
| `/experiences` 200 + approved H1 | Pass | curl |
| `/explore-galle` 200 + approved H1 | Pass | curl |
| `/gallery` 200 + approved H1 | Pass | curl (filter count is client-rendered; not in HTML) |
| `/about` 200 + approved H1 | Pass | curl |
| `/contact` 200; WhatsApp / mailto / tel; form unavailable | Pass | curl |
| `/villas` 308 → `/apartments` | Pass | curl |
| `/wellness` 308 → `/experiences` | Pass | curl |
| `robots.txt` `Disallow: /` | Pass | curl |
| Security headers | Pass | nosniff, referrer-policy, SAMEORIGIN, permissions-policy |
| Home overflow at desktop | Pass | `scrollWidth` check, `vw≈1920` |
| Apartments overflow desktop | Pass | none |
| Navigation drawer open / `aria-expanded` / Escape | Pass | `/apartments` |
| Gallery lightbox | **Not re-opened** this session | HTTP page loads; TASK 11/12 previously verified |
| Horizontal overflow at 320–1440 all pages | **Not fully re-matrixed** | Desktop home + apartments only this task |

Contact-only architecture unchanged. `NEXT_PUBLIC_SITE_URL` still unset. No invented domain.

---

## 9. Hero preservation verification

Protected files were **not modified**.

Live first viewport on 15.5.29 (`scrollY = 0`), compared **by eye** to `docs/fiona-upgrade/baselines/hero-baseline-desktop.png` (no pixel-diff tool):

- Split Fiona wordmark
- Follow Us, Villas, Retreat, Explore Now
- Slide **01 DISCOVER VILLA** (timing-dependent)
- Blur panel
- Global header hidden (`opacity: 0`, translated off-canvas, `pointer-events: none`)
- Explore Now still `href="/villas"`

Intro loader not recaptured (`sessionStorage` may already have played).

---

## 10. Remaining production blockers

Unchanged from TASK 12 except Next.js critical advisories:

| Item | Status |
| --- | --- |
| Verified HTTPS `NEXT_PUBLIC_SITE_URL` | **BLOCKER** — still missing; indexing must stay off |
| `npm audit --omit=dev` remaining high/moderate (postcss 8.4.31 pin, nanoid, sharp, source-map-js) | **HIGH** — needs Next 16 or unsupported overrides; not done |
| Nested PostCSS/nanoid/sharp | **HIGH** — wait for a future 15.5 patch or a planned Next 16 project |
| Real-device Lighthouse / Safari | Not run this task |
| `/retreat` still reachable from protected Hero | HIGH (TASK 12 mitigation only) |
| Dual cinematic loaders | Protected exception |

**Verdict:** Next.js **critical** findings from TASK 12 are **remediated on 15.5.29**. The site is **still not fully audit-clean** and **still not READY FOR PRODUCTION** until the origin is confirmed and remaining transitive findings are accepted or patched by Vercel on the 15.5 line.

No commit, push, or deploy was performed.
