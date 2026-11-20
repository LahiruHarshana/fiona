# 22 — TASK 17 WhatsApp-Only Booking Request

**Date:** 19 November 2026  
**Stack:** Next.js 15.5.29 · React 19.2.6  
**Decision:** WhatsApp booking **request** form is live on `/contact`. This is **not** a reservation platform. The site remains **NOT READY FOR PRODUCTION** (no verified HTTPS origin; indexing still off).

Opening WhatsApp was verified as a correctly encoded `wa.me` URL. Delivery was **not** claimed; the guest must tap Send.

---

## 1. Files modified

| File | Change |
| --- | --- |
| `lib/whatsappBooking.ts` | **New.** Validation, date formatting, message + `wa.me` URL helpers |
| `components/WhatsAppBookingForm.tsx` | **New.** Client form, preview, Continue / Copy |
| `components/ContactForm.tsx` | Suspense wrapper around the WhatsApp form |
| `app/contact/page.tsx` | Copy: availability enquiry via WhatsApp, not instant booking |
| `lib/seo.ts` | Contact description mentions WhatsApp request |
| `lib/privacy.ts` / `app/privacy/page.tsx` | Draft notice updated to describe browser-only form + WhatsApp send |
| `scripts/check-whatsapp-booking.ts` | Local checks (excluded from `tsc` include) |
| `tsconfig.json` | Exclude `scripts` |
| `docs/fiona-upgrade/22-task-17-whatsapp-booking-report.md` | This report |

**Not modified:** `CinematicHero`, `HeroLoader`, `ScrollCinema`, `SriLankanCinematicHome.tsx`, `LoadingScreen.tsx`, `app/template.tsx`, Hero assets, apartment page layout, `next.config.ts` redirects, indexing gate.

No API routes, MongoDB, payments, WhatsApp Cloud API, or `localStorage`/`sessionStorage` for booking fields.

---

## 2. Form fields

| Field | Required | Notes |
| --- | --- | --- |
| Apartment | Yes | `green-garden` / `balcony-suite` only |
| Check-in | Yes | `type="date"`, min = today (guest local TZ) |
| Check-out | Yes | Strictly after check-in; cleared if check-in moves later |
| Adults | Yes | Integer 1–20 (not an occupancy claim) |
| Children | No | Default `0`, integer 0–20 |
| Full name | Yes | Trimmed, 2–80 characters |
| Phone / WhatsApp | No | Explicitly not required to open WhatsApp |
| Special requests | No | Max 400 characters, text only |

No passport, card, or national-ID fields.

---

## 3. Validation rules

Implemented in `validateBooking()`:

- Unknown apartment id rejected.
- Missing dates rejected.
- Check-in before today rejected.
- Check-out ≤ check-in rejected.
- Adults < 1 rejected.
- Children negative / non-integer rejected.
- Empty name rejected.

Errors shown after submit attempt (`role="alert"`). Continue becomes an `https://wa.me/94743842244?text=` link only when the draft is valid.

---

## 4. Apartment preselection

`/contact?apartment=green-garden` and `/contact?apartment=balcony-suite` are read with `useSearchParams`.

`parseApartmentQuery` allows **only** those two ids. Invalid values (`evil`, `penthouse`, HTML) leave both radios unselected. Query text is never concatenated into the WhatsApp message.

Verified in Chromium: green-garden checked; balcony-suite checked; `?apartment=evil` neither checked.

Apartment page `enquiryHref` values were not changed.

---

## 5. WhatsApp message template

```
Hello Fiona Green Serenity,

I would like to check availability for a stay.

Apartment: [canonical name]
Check-in: [D Month YYYY]
Check-out: [D Month YYYY]
Adults: [n]
Children: [n]
Guest Name: [name]
Phone: [optional]
Special Requests: [optional]

Please let me know the availability and price.

Thank you!
```

Optional lines omitted when empty. No prices, no “confirmed”, no booking references. Dates use English month names. Message truncated at 1800 characters if needed.

---

## 6. Message URL generation

```
https://wa.me/94743842244?text=${encodeURIComponent(message)}
```

Number matches `contact.whatsapp`. Direct “Chat on WhatsApp” on the contact sidebar remains the same base URL without a prefilled booking body.

Primary CTA: **Continue to WhatsApp** (`target=_blank`, `rel=noopener noreferrer`).  
Secondary: **Copy Booking Request** (`navigator.clipboard`; fallback instruction if blocked).

---

## 7. Privacy / data handling

- No form POST, no API, no database.
- No `localStorage` / `sessionStorage` for booking fields (verified empty of booking keys in lab).
- Draft `/privacy` still **noindex** and still labelled a draft. Wording now describes: browser-only fields; WhatsApp receives the text only if the guest sends it.
- Not published as a finished legal policy.

---

## 8. UI / UX

Contact form uses page-scoped `#244D39`, `#203C30`, `#F4F0E7`, `#D7C5A7`. Disclaimer text is the approved stay-not-confirmed copy. Email, phone, Instagram, Facebook, location retained.

No “Booking Successful” / “Reservation Confirmed” in the UI.

---

## 9. Browser / mobile tests

| Scenario | Result |
| --- | --- |
| Blank required fields | Alerts: check-in, check-out, name |
| Check-in in the past | “Check-in cannot be earlier than today.” |
| Check-out equal to check-in | “Check-out must be after check-in.” |
| Valid details | `wa.me/94743842244?text=` with decoded English message |
| Green Garden query | Radio checked |
| Balcony Suite query | Radio checked |
| Invalid query | Neither radio checked |
| Optional phone/requests omitted | Not in message |
| Copy | Implemented; clipboard not asserted in this lab |
| 320 / 390 overflow | `scrollWidth` not greater than viewport (headless) |
| Keyboard | Native labels, date inputs, radios, min 44px CTAs |
| No fake confirmation | Pass |
| Seven routes 200 | Pass |
| Robots `Disallow: /` | Pass |
| `/villas` 308 | Pass |
| Hero Explore Now `/villas`, Retreat `/retreat`, header opacity 0 | Pass (Chromium `/`) |

WhatsApp itself was **not** sent. Headless wait for the CTA string timed out once (`networkidle0`); Cursor Chromium confirmed the live form.

---

## 10. TypeScript / build / audit

| Command | Exit |
| --- | --- |
| `npx tsc --noEmit` | **0** |
| `npx tsx scripts/check-whatsapp-booking.ts` | **0** (validation + encoding) |
| `npm run build` | **0** |
| `npm audit --omit=dev` | **0** |

---

## 11. Hero regression

Protected files were not edited in this task. Live homepage still shows split Fiona layers, Villas / Retreat / Explore Now, ScrollCinema scenes 01–08, header hidden at `scrollY = 0`. Explore Now remains `/villas`.

---

## 12. Remaining issues

- Production HTTPS origin still missing; indexing stays off.
- Privacy page is still a **draft**.
- `/retreat` still reachable from the Hero.
- Physical phone WhatsApp send and copy-on-iOS **not tested**.
- Accessibility snapshot tools sometimes omit the form subtree; native labels are present in the DOM.

No commit, push, or deploy was performed.
