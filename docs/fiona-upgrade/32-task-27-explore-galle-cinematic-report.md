# TASK 27 — Explore Galle cinematic destination experience

Date: 20 November 2026  
Scope: `/explore-galle` only. Homepage cinematic stack, Navigation, Footer, apartments film, and SEO indexing were not modified.

## 1. Files created or modified

### Created

| File | Role |
| --- | --- |
| `lib/exploreGalleMedia.ts` | Inspected image-to-attraction map and conservative alt text |
| `components/explore-galle/ExploreCinematicHero.tsx` | Prologue film hero |
| `components/explore-galle/BeachChapter.tsx` | Chapter 01 featured Dalawella pin + remaining beaches |
| `components/explore-galle/HeritageChapter.tsx` | Chapter 02 |
| `components/explore-galle/NatureChapter.tsx` | Chapter 03 including text-led Rumassala |
| `components/explore-galle/AdventureChapter.tsx` | Chapter 04 |
| `components/explore-galle/ExploreFinale.tsx` | Epilogue CTAs |
| `components/explore-galle/DestinationFilmRow.tsx` | Reversible clip / scale / parallax row |
| `components/explore-galle/exploreMotion.ts` | Shared easing |
| `components/explore-galle/motion/useExploreCinema.ts` | Desktop cinema gate + spring scroll progress |

### Modified

- `app/explore-galle/page.tsx` — composes the cinematic journey. `metadata = pageMetadata("exploreGalle")` unchanged.

### Unchanged

- `lib/destinations.ts` copy, 15 attractions, 5 activities, disclaimers
- `components/SriLankanCinematicHome.tsx`, Footer, Navigation, `app/template.tsx`
- Owner files in `public/explore-galle/` (not renamed)

The old sentence *“The photograph on this page shows Fiona Green Serenity…”* is omitted from the new hero because the hero now uses a coastal photograph, not the villa. Pace copy, category notes, map caveat and closing CTAs remain.

## 2. Local image inventory

All 19 owner files in `public/explore-galle/` are present:

`dalawella-beach.webp`, `unawatuna-beach.jpg`, `jungle-beach.jpg`, `koggala-beach.jpeg`, `weligama.webp`, `Mirissa-beach.jpg`, `hikkaduwa-beach.avif`, `galle-fort.webp`, `old-dutch-hospital.jpg`, `pagoda-rumassala.jpeg`, `martin-folk.jpg`, `koggala-lake.jpeg`, `tes-estate.jpg`, `traditional-stilt-fishing-in-sri-lanka-2021-08-26-22-38-59-utc-min-1-scaled.jpg`, `surfing.jpeg`, `snorkelling.jpeg`, `diving.webp`, `whale-watching.jpg`, `boat-excursions.jpg`.

`Mirissa-beach.jpg` capitalization matches the filesystem.

## 3. Image-to-attraction mapping

| Attraction / activity | File | Visual check |
| --- | --- | --- |
| Hero / Dalawella Turtle Beach | `dalawella-beach.webp` | Palm beach, shallow water — used as south-coast / Dalawella illustration |
| Unawatuna Beach | `unawatuna-beach.jpg` | Aerial bay and surf |
| Jungle Beach — Rumassala | `jungle-beach.jpg` | Forested cove (watermark `ValShevch` visible) |
| Weligama Beach | `weligama.webp` | Long bay with Taprobane-style island — visually Weligama |
| Mirissa Beach | `Mirissa-beach.jpg` | Rocky cove aerial |
| Hikkaduwa Beach | `hikkaduwa-beach.avif` | Served as the owner-named file (see §4) |
| Galle Fort | `galle-fort.webp` | Fort, lighthouse, ramparts |
| Old Dutch Hospital | `old-dutch-hospital.jpg` | Arched courtyard, Taphouse / Tea Breeze |
| Japanese Peace Pagoda | `pagoda-rumassala.jpeg` | White stupa on Rumassala headland |
| Martin Wickramasinghe Folk Museum | `martin-folk.jpg` | Vernacular tiled house in a garden |
| Koggala Lake & Madol Duwa | `koggala-lake.jpeg` | Lake island reflection — **not** labelled Madol Duwa |
| Traditional Stilt Fishing | dedicated sunset file + `koggala-beach.jpeg` as support | Both depict stilt fishermen |
| Handunugoda Tea Estate | `tes-estate.jpg` | Tea pickers on a hillside — **not** labelled as Handunugoda specifically |
| Surfing / Snorkelling / Diving / Whale watching / Boat excursions | matching activity files | Activity-accurate; whale/boat not claimed as Fiona operations |

## 4. Missing or uncertain matches

- **Koggala Beach** — owner file `koggala-beach.jpeg` shows stilt fishermen on the coast at dusk. It is now used for Koggala Beach (traditional fishing culture). Traditional Stilt Fishing keeps the dedicated sunset photograph.
- **Rumassala Nature Area** — no dedicated nature still. Text-led treatment; pagoda stays in Culture.
- **`hikkaduwa-beach.avif`** — valid AVIF on disk; local `sips` conversion produced a black JPEG, so pixel inspection failed. It is still mapped as the owner Hikkaduwa file with conservative alt text.
- **`tes-estate.jpg`** — generic Ceylon tea estate, not proven Handunugoda.
- **`koggala-lake.jpeg`** — lake island scenery, not proven Madol Duwa.
- **`whale-watching.jpg`** — whale and tour boat; location not proven as Mirissa.
- **`jungle-beach.jpg`** — third-party watermark present.

## 5. Copyright / licensing confirmation status

**Not confirmed.** Files were supplied by the owner for integration. Publication rights, model releases and stock-licence terms are **not verified**. Do not treat these photographs as royalty-free. The owner must confirm website publication rights before public deployment. Jungle Beach carries a visible photographer watermark.

## 6. New design architecture

Four cinematic chapters plus prologue and epilogue, scoped to `/explore-galle`.

- Hero: full-bleed Dalawella still, forest gradient, ivory type, champagne eyebrow.
- Beaches: one short desktop sticky film (`~180vh`) for Dalawella, then editorial rows.
- Heritage: ivory ground, champagne rule, horizontal mask reveals.
- Nature: forest ground, lake / tea / dual stilt stills, text-led Rumassala.
- Adventure: ivory rows, independent-operator labels, existing disclaimer.
- Finale: Explore Our Apartments `/apartments` and WhatsApp `94743842244`.
- Map section unchanged (no invented pins).

No `overflow-x-hidden` on `<main>` (sticky compatibility). No wheel hijack.

## 7. Scroll scene storyboard

1. **Prologue** — Discover the Southern Coast / approved H1  
2. South Coast notes + category nav (`#beaches` `#culture` `#nature` `#adventure`)  
3. **01 Where the Ocean Meets the Shore** — Dalawella pin, then Unawatuna → Hikkaduwa  
4. **02 Stories Written in Stone** — Fort, Hospital, Pagoda, Folk Museum  
5. **03 Nature Beyond the Coast** — Lake, Stilt Fishing, Tea, Rumassala text  
6. **04 Adventure in the South** — five activities  
7. Map caveat  
8. **Epilogue** — Make Fiona Your Base…  
9. Unchanged Footer

## 8. Framer Motion mappings

Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Springs: stiffness 90 / damping 30.

| Scene | Range | Image | Text | Sticky |
| --- | --- | --- | --- | --- |
| Hero | start-start → end-start | scale 1.08→1 on load; scroll y 0–14%, scale 1–1.07 | heading y 0–-10%; masked H1 | no |
| Dalawella pin | 0–1 on 180vh runway | clip 12%→0; scale 1.07→1; y ±6% | y 20→0→-24 | desktop only, 100vh stage |
| Film rows | start-end → end-start | clip 18%→0 (alternating side); scale 1.06→1; y ±8% | y 28→0 | no |
| Stilt pair | start-end → end-start | support + primary; y ±8% | static in document | no |

Scroll up reverses MotionValue-driven transforms. Reduced motion disables clip, scale, parallax and the pin.

## 9. Mobile fallback

Below `1024px`: no 180vh runway, no sticky, no clip wipes. Photographs remain first. Category nav wraps. Overflow delta `0` at 320 / 375 / 390 / 430 / 768 / 1024 / 1440.

## 10. Image optimization

`next/image` with `sizes` `100vw` (hero / pin) or `(min-width: 1024px) 48vw, 100vw` (rows). Aspect-ratio boxes. Priority only on the hero. AVIF served without renaming. Original files untouched.

## 11. Accessibility

- One H1; chapter H2; attraction H3  
- Alt text describes visible content and avoids false place names  
- Category nav and UNESCO Fort link remain keyboard reachable  
- Independent / seasonal labels preserved  
- Reduced-motion stills show all copy immediately  
- Adventure disclaimer and map caveat remain in the document  

## 12. TypeScript / build / audit

```text
npx tsc --noEmit     # exit 0
npm run build        # exit 0, Next.js 15.5.29
npm audit --omit=dev # 0 vulnerabilities
```

`/explore-galle` first-load JS **163 kB**. Homepage remains **177 kB**.

## 13. Before / after screenshots

Before (TASK 24 card magazine):

- `docs/fiona-upgrade/task-27/before/explore-galle-hero-task-24.png`
- `docs/fiona-upgrade/task-27/before/explore-galle-mid-task-24.png`

After (`next start` :3018):

- `after/1440/prologue.png`
- `after/1440/chapter-01-beaches.png`
- `after/1440/unawatuna.png`
- `after/1440/chapter-02-heritage.png`
- `after/1440/galle-fort.png`
- `after/1440/chapter-03-nature.png`
- `after/1440/stilt-fishing.png`
- `after/1440/chapter-04-adventure.png`
- `after/1440/epilogue.png`
- `after/1440/reduced-motion.png`
- `after/1440/homepage-hero.png`
- `after/375/prologue.png`, `chapter-01.png`, `chapter-02.png`

No screen recording. Smoothness judged from production stills, not a GPU trace.

## 14. Original Hero regression

Homepage stills after the Explore Galle tour show the split Fiona wordmark, DISCOVER VILLA and EXPLORE NOW. `SriLankanCinematicHome.tsx` was not edited.

## 15. Remaining issues

- Owner must confirm image publication rights.  
- Hikkaduwa AVIF not visually decoded in the local inspector.  
- Koggala Beach has no verified beach still.  
- Jungle Beach watermark.  
- `npm run dev` CSS can 404 after a production build; recapture used `next start`.  
- Not committed, not pushed, not deployed.
