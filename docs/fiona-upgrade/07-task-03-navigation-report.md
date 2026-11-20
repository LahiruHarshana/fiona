# 07 — TASK 03 Navigation Report (T06)

**Date:** 18 November 2026  
**Scope:** T06 only. TASK 04 not started.

---

## 1. Files modified

- `components/Navigation.tsx` only

Unchanged: `CinematicHero` / `HeroLoader` (`components/SriLankanCinematicHome.tsx`), `LoadingScreen`, `app/template.tsx`, `ScrollCinema`, `app/globals.css`, `tailwind.config.ts`, `app/page.tsx`, `lib/site.ts`. `git diff` on the Hero file is empty.

`headerClass` hide rule is unchanged:

`isHome && !scrolled && !menuOpen` → `pointer-events-none -translate-y-full border-transparent opacity-0`

Scroll thresholds remain `> 72` (reveal) and `> 420` (hide-on-scroll-down).

---

## 2. Navigation links updated

Global drawer now uses `navigationItems` from `lib/site.ts`:

| Label | Path |
| --- | --- |
| Home | `/` |
| Our Apartments | `/apartments` |
| Experiences | `/experiences` |
| Explore Galle | `/explore-galle` |
| Gallery | `/gallery` |
| About Fiona | `/about` |
| Contact | `/contact` |

Removed from **global** navigation only: The Retreat, Stay submenu (Garden Villas, Wellness Hideaway, Private Dining). Legacy `/villas`, `/wellness`, `/retreat` still exist. In-hero Follow Us / Villas / Retreat / Explore Now were not edited.

---

## 3. Contact information corrected

Removed dummy `+94 77 123 4567`, `tel:+94771234567`, and “Purely green serenity, 80m from the ocean.”

Drawer now shows `brand.name`, `brand.location` (Mihiripenna, Thalpe, Galle, Sri Lanka), Phone / WhatsApp `+94 74 384 2244`, and `brand.tagline`. Instagram was not present in this component. `stay@villafiona.com` was not in Navigation.

---

## 4. Booking CTA

Header label **Reserve** → **Book Your Stay**. Destination remains `/contact`. Still `hidden sm:inline-flex` (desktop/tablet only). Does not confirm a reservation. Enquiry form remains disabled.

---

## 5. Hero protection verification

| Check | Result |
| --- | --- |
| `CinematicHero` / `HeroLoader` | Unchanged (`git diff` empty) |
| Homepage header at `scrollY = 0` | `opacity: 0`, `pointer-events: none`, translated off-screen (desktop and 390px) |
| Header after scroll (`scrollY ≈ 400`) | `opacity: 1`, `translate-y-0`, olive bar classes |
| Follow Us / Villas / Retreat / split Fiona / Explore Now | Present in first-viewport screenshot |
| Desktop screenshot vs `docs/fiona-upgrade/baselines/hero-baseline-desktop.png` | Same composition (split wordmark, blur panel, in-hero chrome). Slide index was **01 DISCOVER VILLA**, not baseline **02 UNWIND** — expected slideshow, not a regression |
| Pixel-perfect tooling | **Not run** |

Small a11y additions (no visual restyle of the Hero): `aria-current="page"` on active drawer links; `aria-controls="site-navigation-drawer"` + drawer `id`. Escape already closed the menu and still does.

---

## 6. TypeScript

`npx tsc --noEmit` — **pass**.

## 7. Build

`npm run build` — **pass** (Next.js 15.5.18, 13 static routes including legacy).

## 8. Desktop / mobile tests

Local production: `http://localhost:3003`.

HTTP **200**: `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/villas`, `/wellness`, `/retreat`.

Desktop:

- Drawer lists all seven destinations; Our Apartments marked `aria-current="page"` on `/apartments`.
- Escape closed the drawer (menu button returned to collapsed).
- Header CTA href `/contact` verified in DOM. Automated click on the CTA did not change the URL in this browser session (likely viewport/click targeting). `/contact` loaded correctly by navigation.

Mobile CSS viewport **390×844**:

- `document.documentElement.scrollWidth === 390` (no horizontal overflow) on homepage and apartments with drawer open.
- Drawer width 380px; all seven links visible; phone and tagline wrap.
- Header hidden at homepage `scrollY = 0`.
- Header screenshot of the 390px page is letterboxed in the 1280-wide capture canvas; overflow was measured in CSS pixels, not from that letterbox.

Focus trap / roving tabindex: **not added** (would change menu interaction). Existing overlay click and Escape remain.

---

## 9. Remaining issues

- Header hamburger and drawer close button still overlap when the menu is open (pre-existing layout; not redesigned here).
- Longer official name/location wrap onto extra lines in the drawer.
- Homepage below-hero still uses old “Book Now” / villa language.
- No enquiry API.
- Automated header CTA click-through was not observed; href is correct.

---

## 10. Recommended TASK 04 scope

Roadmap **T07**: fill `/apartments` with the two named units only, two-bedroom language, genuine images, CTAs to `/contact?apartment=`. Do not invent occupancy, rates, or amenities. Do not restyle the Hero. Do not implement booking backend.
