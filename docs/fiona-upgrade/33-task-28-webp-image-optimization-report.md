# TASK 28 — Website-wide WebP conversion, asset optimization, and safe reference migration

Date: 20 November 2026  
Scope: raster image optimization only. No redesign. Cinematic Hero / HeroLoader / ScrollCinema logic, Navigation, Footer (logo remains PNG), copy, colours, typography, and indexing were not redesigned.

This website was **not committed, pushed, or deployed**.

---

## 1. Image inventory

`public/` was scanned recursively (skipping `generated/`). Supported rasters: `.jpg`, `.jpeg`, `.png`, `.avif`, `.bmp`, `.tif`, `.tiff`. Existing `.webp` files were inventoried and not re-encoded.

| Metric | Count |
| --- | --- |
| Raster files scanned (including existing WebP) | 140 |
| Converted and **adopted** (app may reference `.webp`) | 73 |
| Converted then **kept original refs** (WebP not beneficial) | 63 |
| Already WebP (left as-is) | 4 |
| Conversion errors | 0 |
| Missing originals | 0 |
| Missing adopted WebP files (after collision repair) | 0 |

Full per-file records (dimensions, alpha, EXIF orientation, MAE, sizes, adopt flag) live in:

`docs/fiona-upgrade/task-28-webp-manifest.json`

### Protected cinematic assets

| Path | Role | Decision |
| --- | --- | --- |
| `/fiona-images/707902450_122124969795184570_1085409261198412845_n.png` | Hero slideshow slide 1 | **Adopted WebP** (MAE 1.413, 79.4% smaller, dimensions 1916×821 unchanged) |
| `/Guest/4.jpeg` | Hero slideshow slide 2 | **Deferred** — WebP larger (216 KB → 272 KB) |
| `/fiona-images/715202033_122125886307184570_8249085672172725017_n.jpg` | Hero slideshow slide 3 | **Deferred** — WebP larger |
| `/Drone/9.jpeg` | `heroDay` / SplitBlurHero | **Deferred** — WebP larger |
| `/Drone/3.jpeg` | `heroNight` | **Deferred** — WebP larger |
| `/fiona-images/logo.png` | Cinematic home logo constant | **Deferred** — visual MAE 106.658 (alpha) |
| `/images/logo.png` | Footer + LoadingScreen | **Deferred** — same MAE; PNG retained |

Originals for all of the above remain on disk.

### Already-WebP Explore Galle files (not re-encoded)

- `/explore-galle/dalawella-beach.webp`
- `/explore-galle/diving.webp`
- `/explore-galle/galle-fort.webp`
- `/explore-galle/weligama.webp`

---

## 2. Conversion strategy

- Sidecar `.webp` next to the original. **Originals are never overwritten or renamed.**
- Adopt WebP in the app only when **all** of these hold:
  - WebP is smaller than the original
  - Width/height match after EXIF `rotate()`
  - Sample MAE ≤ 4.5 (protected hero) or ≤ 8 (other)
  - Savings ≥ 2 KB
  - For AVIF: WebP must also be &lt; 95% of AVIF size
- If WebP is larger or visually worse, keep the original URL. Unused sidecar WebPs are not kept on disk (except when a sibling file of a different extension adopted the same stem).
- `villaImages` series still emit `.jpeg` paths; `optimizedPublicSrc()` remaps only adopted files. Mixed albums (some JPEG, some WebP) are therefore safe.
- `Room 02` is mapped for both the encoded URL (`Room%2002`) and the disk space form.

---

## 3. Script created

`scripts/optimize-images-to-webp.mjs`

```bash
node scripts/optimize-images-to-webp.mjs --dry-run
npm run optimize:images
```

Behaviour:

1. Recursively scan `public/`
2. Preserve directory structure and aspect ratio
3. `sharp(...).rotate()` for EXIF orientation
4. Preserve alpha (`alphaQuality: 90` when `hasAlpha`)
5. Do not overwrite originals
6. Log errors instead of silent skip
7. Dry-run mode
8. Repeatable: writes `docs/fiona-upgrade/task-28-webp-manifest.json` and regenerates `lib/webpAdoptedPaths.ts`
9. After conversion, deletes non-adopted sidecars unless another adopted source shares the WebP path

Uses project `sharp` (override `0.35.5`). No extra image libraries were installed.

---

## 4. Quality settings

| Class | Quality | Notes |
| --- | --- | --- |
| Cinematic / `/fiona-images/` / `/Drone/` / protected set | 92 | High photographic quality |
| Apartments, gallery, Explore Galle, remaining JPEG | 88 | Architectural and destination detail |
| Logo / transparent PNG | 90 + alphaQuality 90 | **Not adopted** after MAE failure |

No separate thumbnail files were generated; gallery thumbs already use `next/image` with `sizes="96px"` and `quality={50}`.

---

## 5. Old-to-new path mapping

Explicit map: `lib/webpAdoptedPaths.ts` (`optimizedPublicSrc`).

Wired through:

- `lib/villaMedia.ts` — `series()` wraps every JPEG URL
- `lib/exploreGalleMedia.ts` — every destination `src`
- `components/SriLankanCinematicHome.tsx` — **only** slideshow slide 1 path (`…_n.png` → `…_n.webp`)

Not remapped (intentional):

- Footer / LoadingScreen `/images/logo.png`
- Hero slides 2–3 and drone hero stills
- Hikkaduwa AVIF
- Explore JPEGs that failed the size gate
- Open Graph still uses `villaImages.outdoor[0]` (`/Outdoor/Outdoor/1.jpeg` — WebP was larger)

---

## 6. Files converted and adopted (73)

| Folder | Adopted | Original bytes | WebP bytes | Saved |
| --- | --- | --- | --- | --- |
| `/1st_Apartment_1_Bed_Room/Room 02` | 11 | 1,367,103 | 1,122,886 | 244,217 |
| `/2nd_Apartment_2_Beds_room/Room_01` | 18 | 2,217,567 | 1,844,438 | 373,129 |
| `/Balcony` | 6 (4, 5, 7, 10, 12, 13) | 1,238,260 | 1,141,384 | 96,876 |
| `/Guest` | 14 (not 4, 15) | 2,362,562 | 2,077,840 | 284,722 |
| `/Kitchen/1st_Apartment_Kitchen` | 5 | 817,567 | 703,652 | 113,915 |
| `/Kitchen/2nd_Apartment_open_kitchen` | 4 (not 4) | 746,864 | 672,082 | 74,782 |
| `/Outdoor/Outdoor` | 6 (12, 14, 20, 22, 23, 24) | 1,305,945 | 1,224,860 | 81,085 |
| `/explore-galle` | 4 | 2,176,656 | 1,682,012 | 494,644 |
| `/fiona-images` | 1 (hero PNG) | 3,037,236 | 625,000 | 2,412,236 |
| `/images` | 4 unused villa stills | 2,276,426 | 466,570 | 1,809,856 |

Explore Galle adopted:

- `boat-excursions.jpg` → `.webp`
- `koggala-lake.jpeg` → `.webp`
- `old-dutch-hospital.jpg` → `.webp`
- `traditional-stilt-fishing-in-sri-lanka-2021-08-26-22-38-59-utc-min-1-scaled.jpg` → `.webp`

Largest single save: hero PNG 3,037,236 → 625,000 bytes (79.42%, MAE 1.413).

---

## 7. Files skipped / retained original

### Already WebP (4)

Dalawella, diving, Galle Fort, Weligama.

### AVIF retained

`/explore-galle/hikkaduwa-beach.avif` — 78,484 bytes vs WebP 222,342 bytes. AVIF stays. Browser support and existing `next/image` usage are sufficient.

### JPEG/PNG retained because WebP was larger or MAE failed (63)

Includes:

- All `/Drone/*.jpeg`
- Most `/Outdoor/Outdoor/*.jpeg` (OG image `1.jpeg` included)
- `/Guest/4.jpeg`, `/Guest/15.jpeg`
- `/Kitchen/2nd_Apartment_open_kitchen/4.jpeg`
- Remaining balcony frames
- Explore: Unawatuna, Jungle Beach, Koggala Beach, Mirissa, pagoda, martin-folk, tes-estate, surfing, snorkelling, whale-watching
- Hero slide 3 JPG and other `/fiona-images/*.jpg`
- Logos + unused ChatGPT PNG (MAE 106.658 — alpha / graphic, not photographic)

These originals remain the public URLs. Sidecar WebPs for this group were removed so the library is not duplicated with larger files.

---

## 8. Files retained as AVIF / PNG

| File | Why |
| --- | --- |
| `hikkaduwa-beach.avif` | Smaller than WebP; already supported |
| `/images/logo.png`, `/fiona-images/logo.png` | Transparency MAE failure; Footer/LoadingScreen unchanged |
| Unused `ChatGPT Image Jun 17, 2026, 01_33_28 AM.png` | Same logo-like graphic; not referenced by the app |

SVG, GIF, fonts, and icons were not converted.

---

## 9. Original and optimized sizes

| | Bytes | MiB |
| --- | --- | --- |
| Adopted originals | 17,546,186 | 16.73 |
| Adopted WebP | 11,560,724 | 11.02 |
| **Bytes saved on adopted set** | **5,985,462** | **5.71** |
| **Reduction on adopted set** | **34.1%** | |
| Full scan originalBytes (includes already-WebP + non-adopted originals) | 39,299,719 | 37.48 |

Disk: originals kept. Non-adopted sidecars removed (~21.3 MB of unused WebP). One collision was repaired: `707902450_…_n.jpg` and `…_n.png` share a WebP stem; the JPG failed adoption and must not delete the PNG’s WebP. The script now skips unlink when another source adopted that path. The hero WebP was regenerated (625,000 bytes, 1916×821).

---

## 10. Total savings

**~5.71 MB** of referenced photographic payload on the adopted set, driven mainly by:

1. Hero slideshow PNG → WebP (~2.41 MB)
2. Unused `/images/villa-*.png|jpg` sidecars (~1.81 MB, not currently referenced in TSX)
3. Explore Dutch Hospital / lake / boat / stilt (~0.49 MB)
4. Apartment room + guest + kitchen series (~1.09 MB)

---

## 11. Visual comparison results

Method: Sharp decode → EXIF rotate → 64×64 RGB sample → mean absolute error. Protected threshold 4.5; others 8. Dimensions required to match.

| Concern | Result |
| --- | --- |
| Hero PNG vs WebP | MAE 1.413, dim match, no banding observed in the cinematic first viewport |
| Hero JPEG slides / drone stills | MAE acceptable but **WebP larger** — originals kept |
| Logos | MAE 106.658 — **not adopted** |
| Adopted interiors / gallery / explore | MAE typically 1.2–3.3; no automatic-adopt of worse files |
| Hikkaduwa AVIF | Not replaced |

Dimensions and orientation were preserved (`rotate()`). No cropping.

---

## 12. Broken-image verification

HTTP checks against `next start` on port 3028:

- `/`, `/apartments`, `/experiences`, `/explore-galle`, `/gallery`, `/about`, `/contact`, `/retreat`, `/privacy` → **200**
- `/villas` → **308** `/apartments`; `/wellness` → **308** `/experiences`
- `/robots.txt` still `Disallow: /`
- Sample originals and WebPs (hero WebP + PNG, Guest/4, Drone/3 and /9, logos, Hikkaduwa AVIF, adopted Explore and Room 02 WebP, Outdoor/1.jpeg) → **200**
- Gallery HTML still lists **25** photographs; mixed JPEG/WebP as mapped
- Explore HTML uses `.webp` only for the four adopted files; Koggala Beach remains `koggala-beach.jpeg`; Hikkaduwa remains `.avif`

Broken reference count: **0** (checked adopted files on disk + sampled HTTP + page HTML `next/image` URLs).

---

## 13. Next.js optimization improvements

`next/image` usage was reviewed, not rewritten:

- Inner cinematic pages already use `fill`, `sizes` (`100vw` / `48vw` / `96px` thumbs), `priority` only on first-viewport heroes.
- Homepage cinematic hero remains CSS background + custom preload (`heroSlides` + logo). **Not** migrated to `next/image`.
- Preload list now includes the adopted slide-1 WebP automatically because it reads `heroSlides[].image`.
- No layout-shift changes (width/height/`fill` containers untouched).
- `next/image` optimizer returned 200 for WebP, AVIF, JPEG, and PNG sources.

---

## 14. Cinematic Hero verification

- Split “Fiona” typography, blur mask, slide controls, Explore Now, and overlay copy remain.
- Slide order unchanged: (1) adopted WebP, (2) `/Guest/4.jpeg`, (3) original JPG.
- No edits to HeroLoader, ScrollCinema timeline, intro timings, or navigation-at-scroll-0 behaviour.
- Production homepage screenshot: slide 2 (Guest/4) still photographic, champagne type, forest overlay.
- 375 CSS pixels: `scrollWidth === 375` (no horizontal overflow). Split Fiona + hamburger present. Extra white in the screenshot is the browser canvas around the emulated 375-wide layout, not page overflow.

---

## 15. Apartments and Explore Galle animation verification

- `/apartments` cinematic intro still uses `villaImages.outdoor[0]` (JPEG, not adopted). Two apartments, two suite bedrooms, film galleries intact.
- `/explore-galle` Dalawella hero still `dalawella-beach.webp`. Category nav and destination copy unchanged. Destination IDs unchanged.
- Gallery filters: All Photos + seven categories, 25 items, WhatsApp CTAs present.

---

## 16. TypeScript / build / audit

Executed (not claimed):

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass |
| `npm run build` | Pass — Next.js 15.5.29, 16 static pages |
| `npm audit --omit=dev` | **0 vulnerabilities** |

`npm audit fix --force` was not run. Next was not upgraded.

---

## 17. Remaining issues

1. **Hero JPEG / drone stills** stay JPEG because q92 WebP was larger. Do not force-migrate; a future pass could try lower quality only with visual QA.
2. **Logos stay PNG.** WebP crushed alpha (MAE ~107). Footer and LoadingScreen were not changed.
3. **Duplicate ~1.4 MB logo PNGs** (`/images/logo.png`, `/fiona-images/logo.png`, unused ChatGPT PNG). Out of scope to redesign; a later dedicated logo export could shrink them without WebP.
4. **`/images/villa-*` WebPs** are adopted on disk but unused by current pages (legacy `/retreat` still uses `villaImages`).
5. **Outdoor / drone JPEGs** remain among the largest referenced files (`Outdoor/10.jpeg` ~427 KB, several drone frames ~350–410 KB). They already compress poorly to WebP at photographic quality.
6. **Stem collision:** `707902450_…_n.jpg` and `.png` share one WebP filename. Documented and guarded in the script.
7. **Viewport screenshot set:** HTTP 200 on all listed routes; overflow measured at 375 and 768 on `/`. Not every listed pixel width was screenshot for every route.
8. **`next/image` Accept negotiation:** `curl` without `image/webp` receives JPEG from the optimizer; browsers that send WebP Accept still benefit. Source files for adopted photos are WebP.

---

## Rollback

1. Revert `lib/villaMedia.ts` `series()` (drop `optimizedPublicSrc`).
2. Revert `lib/exploreGalleMedia.ts` wrappers.
3. Revert the single slideshow path in `SriLankanCinematicHome.tsx` to `.png`.
4. Leave original rasters in `public/` (they were never deleted).

Manifest records `originalPath`, `webpPath`, `status`, `adopt`, and `deferReason` for every scanned file.

---

## Definition of done

Optimized WebP is used where it is smaller and visually close. Protected hero JPEGs and logos were not forced. Animations, gallery count, destination IDs, WhatsApp enquiry, redirects, and `robots.txt` disallow remain intact. The pipeline is reproducible via `npm run optimize:images`.
