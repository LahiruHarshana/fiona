# 24 — TASK 19 Cinematic Hero Navigation Report

**Date:** 19 November 2026  
**Scope:** Replace obsolete Hero nav destinations with the seven approved public routes, and add a compact cinematic MENU when seven links do not fit. No Hero redesign, slideshow, blur, loader, or ScrollCinema changes.

---

## 1. Files modified

| File | Role |
| --- | --- |
| `components/CinematicHeroNav.tsx` | **Created.** Hero-only navigation: Follow Us + seven routes or MENU panel |
| `components/SriLankanCinematicHome.tsx` | Navigation layer only: import + `<CinematicHeroNav />` in place of the four-link bar |
| `components/Navigation.tsx` | Label/destination alignment with the seven routes; `inert`/`aria-hidden` while the homepage Hero is in the first viewport so the two bars do not compete |

Unchanged on purpose: `HeroLoader`, `ScrollCinema`, slide images, split Fiona type, Explore Now (`href="/villas"`), `app/template.tsx`, fonts, WhatsApp booking, indexing.

Routes come from `footerNavigation` in `lib/site.ts` (same seven public destinations as `routes` / `navigationItems`).

---

## 2. Old Hero navigation labels and routes

| Label | Route |
| --- | --- |
| Villas | `/villas` |
| Retreat | `/retreat` |
| Gallery | `/gallery` |
| Contact | `/contact` |

Shown from `md:` with `gap-12`. Follow Us + four decorative circles on the left. Social circles were not URLs.

---

## 3. New Hero navigation labels and routes

| Label | Route |
| --- | --- |
| Home | `/` |
| Apartments | `/apartments` |
| Experiences | `/experiences` |
| Explore Galle | `/explore-galle` |
| Gallery | `/gallery` |
| About | `/about` |
| Contact | `/contact` |

`/villas`, `/retreat`, and `/wellness` are not visible nav items. The `/villas` and `/wellness` redirects remain.

Explore Now is still `/villas` (unchanged CTA).

---

## 4. Screenshot comparison

Automation screenshots crop the left Hero panel (blurred photograph + Follow Us). They do **not** show the right-hand link row.

- `docs/fiona-upgrade/task-19/hero-nav-desktop-left.png` — Follow Us + four circles, original transparent bar, split-left blur, Discover Villa controls. Links sit off-crop to the right.

DOM at **1440×900** (authoritative for this task):

```
Home:/ (aria-current=page)
Apartments:/apartments
Experiences:/experiences
Explore Galle:/explore-galle
Gallery:/gallery
About:/about
Contact:/contact
Explore Now → /villas
```

This is not a pixel-diff against `docs/fiona-upgrade/baselines/hero-baseline-desktop.png`.

---

## 5. Design preservation

Kept from the original bar:

- `absolute inset-x-0 top-0`, `px-10 py-8`, `max-sm:px-5 max-sm:py-6`
- `text-[11px] font-bold uppercase tracking-widest text-white/90` (`max-sm:text-[10px]`)
- Follow Us + four `h-4 w-4 rounded-full border border-white/50` circles
- Link hover `hover:text-gold`
- Active colour `text-gold` (same token as before)
- No solid white background, no new sticky header, no extra Hero height

Desktop link gap remains `gap-12` when the seven labels fit. Compact MENU uses a dark `#111/92` cinematic drawer, not a white sheet.

---

## 6. Desktop layout verification

At `innerWidth = 1440`:

- All seven links visible in `[aria-label="Cinematic navigation"]`
- Home has `aria-current="page"`
- `document.documentElement.scrollWidth` 1434 (no horizontal overflow)
- Follow Us remains on the left
- Global `<header>`: `opacity: 0`, `pointer-events: none`, `inert`, `aria-hidden="true"`

Fit logic: a hidden measuring row with original `gap-12` is compared to leftover width after Follow Us. If `innerWidth < 1180` **or** the row overflows, MENU is used instead of wrapping.

---

## 7. Mobile / tablet menu

| Width | Overflow | Hero control | Seven routes |
| --- | --- | --- | --- |
| 320 | 320 | MENU | In panel |
| 768 | 768 | MENU | In panel (Escape closed it) |
| 1024 | 1018 | MENU | In panel |
| 1440 | 1434 | Seven links | In the bar |

Panel (`#cinematic-hero-menu`):

- Dark translucent overlay `bg-black/55`
- Right drawer `bg-[#111]/92` + `backdrop-blur-md` + `border-white/10`
- Follow Us + four circles inside the panel (circles hide in the bar below 400px)
- Close control + seven `min-h-11` links
- `aria-expanded` / `aria-controls="cinematic-hero-menu"`
- Focus moves into the panel; Tab is trapped; Escape closes; trigger is refocused
- Body `overflow: hidden` while open
- Reduced-motion: overlay/panel motion duration 0

---

## 8. Accessibility

- Active item: `aria-current="page"` (root uses exact `/` match)
- MENU: `aria-label`, `aria-expanded`, `aria-controls`, ~44px hit area (`min-h-11 min-w-11`)
- Overlay is not in the tab sequence (div, not a second button)
- Global header is `inert` + `aria-hidden` at homepage `scrollY = 0` so its controls are not a second tab stop on the Hero
- Social circles in the Hero remain decorative (original empty rings; no invented URLs)

Not a full WCAG 2.2 AA audit. Keyboard and Escape were checked on the compact menu at 768px.

---

## 9. Global navigation conflict

At homepage top:

- Only the cinematic bar is meant to be used
- Global header stays translated off-screen, non-interactive, inert

After scroll:

- Global header still appears (olive bar, Follow Us, seven approved labels from `xl`)
- Hamburger remains below `xl` so seven labels are not forced to wrap
- Villas / Retreat removed from the scrolled bar and from the drawer

The two menus do not share open state. Hero MENU locks body only while it is open, typically at the top of the homepage.

---

## 10. Cinematic Hero regression

| Item | Result |
| --- | --- |
| Split Fiona headings | Present (four `h1` Fiona nodes) |
| Slideshow controls | Previous / Next / slide 1–3 |
| Explore Now | Still `/villas` |
| HeroLoader / intro timing | Not edited |
| Blur / dim layers | Not edited |
| ScrollCinema | Not edited |
| Section order | CinematicHero → HomepageBelowHero → ScrollCinema (pre-existing) |
| Global header at scroll 0 | Hidden |

`SriLankanCinematicHome.tsx` TASK 19 hunk is the nav replacement plus the `CinematicHeroNav` import. Unrelated earlier working-tree edits (below-Hero composition, Liya Vela removal) were not part of this task’s intent.

---

## 11. TypeScript / build / audit

```text
npx tsc --noEmit    → exit 0
npm run build       → compiled successfully
npm audit --omit=dev → 0 vulnerabilities
```

Seven approved routes: HTTP **200**. `/villas` **308** → `/apartments`. `/wellness` **308** → `/experiences`.

---

## 12. Remaining issues

1. Automation PNGs crop the left Hero column; they cannot prove the seven-link row visually. DOM queries at 1440px were used instead.
2. Compact threshold uses measured overflow **or** `innerWidth < 1180`. A 1100–1179 laptop will see MENU even if a slightly tighter gap could have fitted seven labels. That is intentional to avoid wrapping.
3. Global header still exists in the accessibility snapshot of some tools even when `inert` is set; computed style confirms it is hidden and non-interactive at Hero rest.
4. Production indexing is still off until the owner confirms an HTTPS origin.

---

TASK 19 stops here.
