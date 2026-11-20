# 05 — Risks and Owner Confirmations

**Codebase:** restored original (`a70aedf`). This file does not reuse reverted TASK 02 conclusions as if they were still in the tree.

---

## 1. Technical risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Editing `SriLankanCinematicHome.tsx` for homepage copy | Accidental Hero regression | Extract below-hero sections first; forbid edits inside `CinematicHero` |
| Always-visible header (failed in a previous, reverted attempt) | Covers Follow Us / wordmark | Keep homepage hide-until-scroll |
| Replacing Tailwind `gold` / `ivory` / fonts | Hero hovers, loader, wordmark | Extend tokens; apply Forest/Ivory off-hero |
| `next/image` on `bg-fixed` + clip-path text | Broken split wordmark | Exclude hero backgrounds |
| Dual loaders (layout + HeroLoader) | Slow LCP | Do not “fix” without approval + visual diff |
| Fake enquiry success | Lost bookings | T02 first |
| Redirecting `/villas` before a replacement | Hero Explore Now 404 | Redirect after `/apartments` exists, keep `/villas` as source |
| Inner pages import ornaments from the homepage module | Refactors break `/villas` etc. | Move-only extract of SVGs |
| Unused `HeroSlider` Unsplash | Stock presented as Fiona if remounted | Do not import |
| `Room_01` only for upper suite | Cannot prove two bedrooms in photos | Owner assets; do not duplicate one room as two |

---

## 2. Business / content risks

- Dummy phone and email if the site is public.  
- 80m ocean claim is not in the website brief.  
- Upper unit described as one two-bed room vs owner-confirmed two bedrooms.  
- Wellness “treatments” / linen turn-down not in approved facilities.  
- Hero copy (“island luxury”, Mihiripanna) remains as a **protected exception** — do not treat as a content bug on the first viewport.  
- Explore Galle distances in the operations dossier must be re-verified.

---

## 3. Confirmed in the brief (do not re-ask)

- Two separate bedrooms in the upper suite.  
- Email `info@fionagreenserenity.com`.  
- WhatsApp/phone `+94 74 384 2244`.  
- Enquiry-first booking.  
- Brand + tagline (tagline is **below-hero / chrome**, not hero H1).  
- Instagram and Facebook URLs as supplied.

---

## 4. Owner must confirm before publishing the claim

Occupancy, bed sizes, Wi-Fi, parking, hot water, king coconut, airport pickup terms, check-in/out, payment/cancellation, house rules, map pin, Dalawella walk, attraction km, genuine reviews, second-bedroom photos, privacy legal name, GA4, Search Console, production domain, GBP URL, Facebook URL stability, image rights for guest-visible photos.

Until then: omit those facts. Do not invent them.

---

## 5. Assumptions

- PDF on disk at `~/Downloads/Fiona_Green_Serenity_Complete_Website_Content_and_Development_Brief.pdf` is the approved 25-page brief (ReportLab, 25 pages — previously extracted in full).  
- Protected Hero = `CinematicHero` + `HeroLoader`, not the entire 760vh `ScrollCinema`. ScrollCinema is still high-caution.  
- Production hostname is unknown.  
- Mobile baseline screenshot is letterboxed in a 1280px automation canvas.

---

## 6. Tests this audit ran

| Test | Result |
| --- | --- |
| `git status` / `main` @ `a70aedf` | Clean |
| Source inspection | Completed |
| `npx tsc --noEmit` | Pass |
| `npm run build` | Pass (Next.js 15.5.18, 10 routes) |
| `npm run lint` | No script |
| Desktop hero screenshot | Saved `docs/fiona-upgrade/baselines/hero-baseline-desktop.png` |
| Mobile-width screenshot | Saved `docs/fiona-upgrade/baselines/hero-baseline-mobile.png` (letterboxed) |
| Native device / ScrollCinema screenshots | Pending |
| Enquiry email | Not implemented; not tested |

No application issues were fixed during this task.
