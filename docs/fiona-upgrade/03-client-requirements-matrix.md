# 03 — Client Requirements Matrix

**Source:** *Fiona Green Serenity – Complete Website Content & Development Brief* (25 pages).  
**Codebase:** restored `main` @ `a70aedf`.  
**Hero policy:** PDF hero design/copy that conflicts with `CinematicHero` is **PROTECTED EXCEPTION**, not a defect to “fix” on the first viewport.

Statuses: IMPLEMENTED · PARTIALLY IMPLEMENTED · NOT IMPLEMENTED · INCORRECT · NEEDS OWNER CONFIRMATION · PROTECTED EXCEPTION

**Hero impact:** None / Low / Medium / High / Critical

---

## Brand, NAP, accuracy (PDF pp. 1–2, 22, 25)

| ID | Requirement | PDF | Current | Status | Files | Required change | Priority | Dependencies | Hero impact |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BR-01 | Brand Fiona Green Serenity (Villa FIONA) | 1–2 | Villa FIONA / Fiona Villa in chrome and metadata | INCORRECT (outside hero) | `layout.tsx`, `Navigation.tsx`, `Footer.tsx` | Central `lib/site.ts`; update **non-hero** chrome | Critical | — | Low if hero wordmark stays “Fiona” |
| BR-02 | Tagline: A Little Paradise. A World of Serenity. | 3, 5 | Absent; hero H1 is “Fiona” | PROTECTED EXCEPTION on hero; NOT IMPLEMENTED below | `CinematicHero` vs later homepage | Do **not** replace hero H1. Add tagline in footer / below-hero | High | Hero baseline | **Critical if forced onto hero** |
| BR-03 | Location Mihiripenna, Thalpe, Galle | 1–2 | Mihiripanna; no Thalpe | INCORRECT outside hero; **PROTECTED EXCEPTION** for vertical hero text “Mihiripanna” | Footer, contact, nav, `CinematicHero` L718 | Fix footer/contact/nav only | Critical | — | High if hero vertical text is edited |
| BR-04 | Email info@fionagreenserenity.com | 2 | stay@villafiona.com | INCORRECT | Footer, contact | Replace | Critical | — | None |
| BR-05 | Phone/WhatsApp +94 74 384 2244 | 2 | +94 77 123 4567 | INCORRECT | Nav, footer, contact | Replace; add wa.me | Critical | — | None |
| BR-06 | Instagram / Facebook URLs | 2 | Fake IG → `/gallery`; no Facebook | INCORRECT / NOT IMPLEMENTED | Footer | External links | High | Confirm FB share URL | None (do not change hero Follow Us dots) |
| BR-07 | Upper suite: two **separate** bedrooms | 2, 8, 25 | “two-bed room / two-bed feel” | INCORRECT | `villas/page.tsx`, `villaMedia.ts`, homepage albums, `cinemaScenes` 07–08 | Rewrite **non-hero** copy. `cinemaScenes` live in ScrollCinema (not first hero) — still high caution | Critical | Owner photos of bedroom 2 | Medium if `cinemaScenes` edited; None if only `/apartments` |
| BR-08 | No unverified distances | 2, 22 | “80m from the ocean” | INCORRECT | layout, footer, nav, contact | Remove; do not invent 2-minute walk | Critical | Owner pin | None |
| BR-09 | Direct enquiry, not instant book | 2, 16 | “Reserve”, “Book Now”; fake form success | INCORRECT | Nav, homepage ClosingCTA, ContactForm | Footer/contact/form first. Hero “Explore Now” left as-is | Critical | — | High if hero CTA copy changed |

---

## Navigation / sitemap (PDF p. 4)

| ID | Requirement | PDF | Current | Status | Files | Required change | Priority | Hero impact |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NAV-01 | Seven routes including `/apartments`, `/explore-galle`, `/about` | 4 | Missing three URLs | NOT IMPLEMENTED | `app/` | Add pages | Critical | None |
| NAV-02 | Desktop: logo left, nav, Book Your Stay | 4 | Hamburger + centered logo; hidden on home until scroll | INCORRECT vs PDF; **PROTECTED EXCEPTION** for home-at-top (header must stay off the hero) | `Navigation.tsx` | Implement PDF nav **off** `/` first paint: inner pages and/or post-scroll only | High | **Critical** if always-visible on `/` |
| NAV-03 | 301 `/villas` → `/apartments`; wellness → experiences | 4 | No redirects | NOT IMPLEMENTED | `next.config.ts` | After new pages exist | High | Low unless hero Explore Now 404s — keep `/villas` until redirect |
| NAV-04 | Footer structure p. 4 | 4 | Wrong NAP and links | INCORRECT | `Footer.tsx` | Rebuild footer content | High | None |

In-hero Villas/Retreat links are **PROTECTED EXCEPTION** (visual). They may keep legacy hrefs until an approved micro-change.

---

## Homepage (PDF pp. 5–7)

| ID | Requirement | PDF | Current | Status | Required change | Priority | Hero impact |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HOME-01 | PDF hero eyebrow, tagline H1, dual CTAs, genuine wide exterior | 5 | Split “Fiona” cinematic slider | **PROTECTED EXCEPTION** | Do not rebuild. Document conflict. | — | N/A |
| HOME-02 | Welcome, Why Choose, two apartments, experience, South Coast, reviews-or-hide, gallery preview, hospitality, final CTA | 5–7 | Intro, ScrollCinema, reels, albums, outdoor band, closing CTA — different copy/IA | PARTIALLY IMPLEMENTED structure / INCORRECT copy | Add or rewrite **sections below `CinematicHero`** without editing it | High | Low if appended; High if `SriLankanCinematicHome` is rewritten wholesale |
| HOME-03 | Genuine reviews or hide | 6 | Hidden | NOT IMPLEMENTED (correctly empty) | Owner-supplied reviews only | Medium | None |
| HOME-04 | No stock as Fiona | 5 | Live hero uses property/guest photos; unused HeroSlider has Unsplash | IMPLEMENTED on live hero | Do not mount HeroSlider | High | Critical if stock is wired in |

---

## Apartments (PDF pp. 8–9)

| ID | Requirement | Status | Notes | Hero impact |
| --- | --- | --- | --- | --- |
| APT-01 | `/apartments` H1 and two named units | NOT IMPLEMENTED | `/villas` is incorrect IA | None |
| APT-02 | Green Garden ground-floor + Scenic Balcony 2-Bed Suite | INCORRECT names on `/villas` | Kitchen/garden shown as units | None |
| APT-03 | Structured occupancy/beds | NEEDS OWNER CONFIRMATION | Do not invent | None |
| APT-04 | No prices | IMPLEMENTED | Keep | None |
| APT-05 | Enquire preselect | NOT IMPLEMENTED | After form exists | None |

---

## Experiences / Explore / Gallery / About (PDF pp. 10–14)

| ID | Requirement | Status | Hero impact |
| --- | --- | --- | --- |
| EXP-01 | Six experiences p. 10 | INCORRECT (four different cards) | None |
| EXP-02 | No spa/yoga/jacuzzi unless confirmed | IMPLEMENTED on `/experiences`; wellness page is a risk | None |
| GAL-01 | `/explore-galle` SEO page | NOT IMPLEMENTED | None |
| GAL-02 | Distances only after pin verify | NEEDS OWNER CONFIRMATION | None |
| GALLERY-01 | Categories, filters, lightbox | PARTIALLY IMPLEMENTED | None if `globals.css` gallery classes stay |
| ABOUT-01 | `/about` | NOT IMPLEMENTED (`/retreat` is not About) | None |

---

## Booking (PDF pp. 14–17)

| ID | Requirement | Status | Files | Hero impact |
| --- | --- | --- | --- | --- |
| BOOK-01 | Full enquiry fields + validation | PARTIALLY IMPLEMENTED | `ContactForm.tsx` | None |
| BOOK-02 | Must not fake success | INCORRECT | `ContactForm.tsx` | None |
| BOOK-03 | Email owner + guest ack | NOT IMPLEMENTED | — | None |
| BOOK-04 | Store + statuses + spam + privacy | NOT IMPLEMENTED | — | None |
| BOOK-05 | Disclaimer not a reservation | NOT IMPLEMENTED | — | None |
| BOOK-06 | No card capture | IMPLEMENTED | Keep | None |
| BOOK-07 | WhatsApp CTA p. 15 | NOT IMPLEMENTED | contact page | None |

---

## SEO / UI system (PDF pp. 18–21)

| ID | Requirement | Status | Hero-safe approach |
| --- | --- | --- | --- |
| SEO-01 | Per-page titles p. 18 | NOT IMPLEMENTED | Metadata in page files; layout default can change **text** without touching fonts |
| SEO-02 | Sitemap, robots, canonical, OG, GA4 | NOT IMPLEMENTED | New files; no hero CSS |
| UI-01 | PDF colour palette | INCORRECT vs gold/olive | **Add** new tokens; do not replace `gold` used by hero. Apply Forest/Ivory on footer and inner pages first. Full re-skin of hero = forbidden |
| UI-02 | Cormorant + Inter | PARTIALLY IMPLEMENTED | Keep layout fonts (hero depends on them) |
| UI-03 | Persistent booking CTA | Conflicts with hidden home header | Inner pages + footer; optional post-scroll header on `/` only |

---

## How global changes can avoid the Hero

- **Navigation:** keep `isHome && !scrolled` hide rule. Update labels inside the **drawer** and inner-page header once scrolled. Do not overlay the first viewport.
- **Fonts:** never swap `display`/`sans` variables.
- **CSS:** prefix new utilities (`.fgs-btn-primary`) instead of restyling `h1`.
- **Tailwind:** `extend.colors.forest` etc., leave `gold`/`ivory` values.
- **Homepage content:** new sections as siblings **after** `<CinematicHero />` or extracted components imported beneath it.
- **Ornaments:** move `LiyaVelaBorder` / `HeritageRosette` / `MakaraLineArt` to `components/ornaments.tsx` in a **move-only** task with visual check of inner pages — optional, not TASK 02.

---

## PROTECTED EXCEPTION register (PDF vs live Hero)

| PDF (p. 5) | Live Hero | Decision |
| --- | --- | --- |
| Eyebrow MIHIRIPENNA · GALLE · SRI LANKA | FOLLOW US + in-hero links | Keep live |
| H1 tagline | H1 “Fiona” split wordmark | Keep live |
| Hero body about Dalawella | Slide kickers Unwind / Experience | Keep live |
| Book Your Stay + Explore Our Apartments | Explore Now → `/villas` | Keep live unless later approved href-only change |
| Single wide exterior | 3-slide guest/villa photography | Keep live |
| Persistent header CTA | Header hidden at top of `/` | Keep live |
