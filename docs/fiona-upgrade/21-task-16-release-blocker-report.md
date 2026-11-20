# 21 — TASK 16 Pre-Launch Blocker Resolution

**Date:** 19 November 2026  
**Stack:** Next.js 15.5.29 · React 19.2.6  
**Decision:** **NOT READY FOR PRODUCTION**

Indexing stayed **off**. No Next.js 16 upgrade. No `npm audit fix --force`. Protected `CinematicHero`, `HeroLoader`, `ScrollCinema`, loaders, `app/template.tsx`, Hero assets and Explore Now `/villas` were **not edited**.

---

## 1. Files inspected and modified

**Inspected:** `17-production-launch-checklist.md`, `19-task-14-production-seo-report.md`, `20-task-15-performance-browser-report.md`, `01-hero-preservation-baseline.md`, `18-task-13-security-remediation-report.md`, `app/retreat/page.tsx`, `lib/seo.ts`, `app/robots.ts`, `package.json`, contact/footer.

**Modified**

| File | Change |
| --- | --- |
| `package.json` / lockfile | `sharp@0.35.5` override; `postcss@8.4.31` → **8.5.23** (Next nested + direct devDependency) |
| `lib/privacy.ts` | Draft privacy copy (owner/legal review; no invented legal facts) |
| `app/privacy/page.tsx` | Draft page, **always noindex**, not in the seven-route sitemap |
| `lib/site.ts` | `routes.privacy` |
| `components/Footer.tsx` | “Privacy (draft)” link |
| `components/ContactForm.tsx` | Points at the draft; form stays disabled |
| `docs/fiona-upgrade/21-task-16-release-blocker-report.md` | This report |
| `docs/fiona-upgrade/17-production-launch-checklist.md` | Status updates from this task |

`CinematicHero` / `ScrollCinema` source was not changed in this task. An existing working-tree composition (`HomepageBelowHero` between Hero and ScrollCinema from TASK 07) remains.

---

## 2. Security advisories

`npm audit --omit=dev` **before this task:** 2 high + 1 moderate (postcss 8.4.31 under Next, optional sharp 0.34.5, next via postcss).

### Applied (compatible, Next 15 kept)

| Advisory set | Package | Action | Evidence |
| --- | --- | --- | --- |
| GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w | `sharp` 0.34.5 → **0.35.5** | npm override (not Next 16) | `npm ls` shows `sharp@0.35.5`; `/_next/image` WebP **200** (49 322 B) |
| GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 | Next-vendored `postcss` 8.4.31 → **8.5.23** | override `postcss@8.4.31`; direct `postcss` 8.5.23 | `next@15.5.29` now resolves `postcss@8.5.23`; `npm run build` **0** |

`npm audit --omit=dev` **after:** **0 vulnerabilities**.

### Residual risk (do not hide)

- Vercel still ships Next 15.5.29 with a **nested postcss 8.4.31 pin**. The 8.5.23 override is a same-major CSS toolchain bump that compiled this site; it is **not** an official Next 15 security release.
- `sharp` 0.35.5 is newer than Next’s optional 0.34.x pin. Image optimization returned WebP in this lab; a future Next patch could disagree with 0.35.
- Conditions of the PostCSS advisories (attacker-controlled CSS / sourceMappingURL) are mainly **build-time**. Sharp issues are **image-optimizer** native libs.
- Re-run `npm audit --omit=dev` after any Next bump. Do not use `--force`.

**Security gate vs production:** the previous high/moderate *audit findings* are **cleared in the current lockfile**. That is **not** a full security sign-off and does **not** make the site production-ready (origin, legal, devices).

---

## 3. Privacy policy

A public **draft** exists at `/privacy`.

- Always `noindex, nofollow, nocache` (even if a production origin is later verified).
- **Not** one of the seven sitemap routes.
- States only verified site behaviour: contact-only, form disabled, no enquiry POST, no GA in the codebase, WhatsApp/email/social are third parties.
- Does **not** invent a legal entity, company number, DPO, cookie inventory, hoster name, or retention schedule.
- Guest-in-photo permission remains **owner confirmation required**.
- Contact copy now links to the draft and says it is not a finished policy.

**Owner action:** review with qualified advice; confirm the legal person; then either approve a finished policy (and allow indexing of `/privacy` only if that is intended) or keep the draft noindex.

---

## 4. `/retreat` recommendation

| Fact | Status |
| --- | --- |
| Hero Retreat href | `/retreat` — **must not change** without owner + Hero-protection approval |
| HTTP | **200** |
| Robots | `noindex, nofollow` |
| Honesty notice | Present; points to `/about` and `/apartments`; unverified dining/spa extras flagged |

**Recommendation (not implemented):** keep `/retreat` as a **200 + noindex** legacy page until the owner approves **one** destination **and** a matching Hero Retreat href change in the same change set. Do **not** add a 308 while Explore/Retreat still point at legacy URLs. Preferred destination if approved later: **`/about`**. Do not 404 `/retreat`.

---

## 5. Browser / mobile attempts

| Engine | Result |
| --- | --- |
| Chromium (Cursor + production 3030) | **Tested.** Seven pages 200; gallery lightbox open (Close focused, `1 / 25`); footer Privacy draft; homepage header `opacity: 0` / `pointer-events: none` at `scrollY = 0`; Explore Now `/villas`; Villas + Retreat in Hero; LoadingScreen still plays; ScrollCinema scenes still in the homepage tree. |
| Gallery swipe | Handler is `touchend` delta > 56px. Chromium lightbox **click** works. Synthetic `TouchEvent` was not re-run after navigation closed the dialog. **Physical phone swipe NOT TESTED.** |
| Safari / WebKit | Safari.app **launched** to `http://127.0.0.1:3030/gallery`. Computer Use could not drive the UI (Accessibility / Screen Recording not granted). Interaction **NOT TESTED**. |
| Firefox | **NOT TESTED** (not installed). |
| Native iOS / Android | **NOT TESTED**. |

---

## 6. SEO gate (unchanged policy)

Unverified origin, production `next start`:

- `robots.txt` `Disallow: /`
- Empty sitemap (no `/privacy`, no localhost URLs)
- Seven approved pages `noindex, nofollow, nocache`
- `/privacy` noindex
- `/villas` → `/apartments` **308**
- `/wellness` → `/experiences` **308**

No production hostname was invented. Indexing was not enabled.

---

## 7. Functional regression

| Check | Result |
| --- | --- |
| `/` `/apartments` `/experiences` `/explore-galle` `/gallery` `/about` `/contact` | 200 |
| Contact WhatsApp / mailto / tel | Verified hrefs |
| Enquiry form | Disabled |
| Gallery 25 photos | Verified |
| `npx tsc --noEmit` | **0** |
| `npm run build` | **0** (16 static pages including `/privacy`) |
| `npm audit --omit=dev` | **0** findings |
| Hero / ScrollCinema code this task | Unchanged |

---

## 8. Resolved vs unresolved

### Resolved in TASK 16

- Production npm audit high/moderate findings via compatible overrides (with residual pin risk above).
- Privacy **draft** page for owner review (not a signed policy).
- `/retreat` recommendation recorded; Hero link untouched.
- Footer/contact pointer to the draft.
- Next/image still serves WebP after sharp 0.35.5.

### Unresolved blockers / highs

| Item | Severity |
| --- | --- |
| Owner-confirmed HTTPS production hostname | **BLOCKER** |
| Indexing / canonicals / live robots on that host | **BLOCKED** until origin |
| Unsigned privacy policy (draft only) | **HIGH** before collecting any form data; **MEDIUM** while form stays disabled |
| `/retreat` still live from Hero | **HIGH** until owner decision |
| Safari interaction, Firefox, physical swipe | **HIGH / MEDIUM** — not tested |
| Guest photograph permissions | **HIGH** — owner |
| Homepage LCP/CLS (protected Hero) | **HIGH** — protected exception |
| Postcss/sharp overrides vs official Next pins | **MEDIUM** residual |

---

## 9. Production readiness

**NOT READY FOR PRODUCTION.**

The brochure remains suitable for an internal or passworded **noindex** preview. It is **not** cleared for a public indexed launch until the owner confirms the hostname, a finished privacy position is agreed, `/retreat` is decided together with the Hero link, and smoke tests run on the real HTTPS origin.

---

## 10. Recommended next action

Do **not** start a further implementation task here.

1. Owner supplies the live HTTPS hostname and DNS/TLS.  
2. Owner/counsel marks the privacy draft approved or rewritten.  
3. Owner chooses `/retreat` keep-as-legacy vs Hero+redirect together.  
4. Enable Computer Use (or a physical iPhone/Safari) for swipe and WebKit QA.  
5. Deploy only as **noindex** until step 1 is proven on the live host.

No commit, push, or deploy was performed.
