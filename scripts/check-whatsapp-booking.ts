import assert from "node:assert/strict";
import {
  WHATSAPP_BOOKING_NUMBER,
  buildBookingMessage,
  buildWhatsAppBookingUrl,
  emptyBookingDraft,
  isApprovedWhatsAppNumber,
  parseApartmentQuery,
  validateBooking,
  type BookingDraft,
} from "../lib/whatsappBooking";

const now = new Date(2026, 10, 19);

function draft(overrides: Partial<BookingDraft>): BookingDraft {
  return {
    ...emptyBookingDraft(),
    apartmentId: "green-garden",
    checkIn: "2026-12-01",
    checkOut: "2026-12-05",
    adults: "2",
    children: "0",
    name: "Ada Perera",
    ...overrides,
  };
}

assert.equal(parseApartmentQuery("green-garden"), "green-garden");
assert.equal(parseApartmentQuery("balcony-suite"), "balcony-suite");
assert.equal(parseApartmentQuery("penthouse"), "");
assert.equal(parseApartmentQuery("<script>"), "");

assert.ok(validateBooking(draft({ apartmentId: "" }), now).apartmentId);
assert.ok(validateBooking(draft({ checkIn: "2026-11-18" }), now).checkIn);
assert.ok(validateBooking(draft({ checkOut: "2026-12-01" }), now).checkOut);
assert.ok(validateBooking(draft({ checkOut: "2026-11-30" }), now).checkOut);
assert.ok(validateBooking(draft({ adults: "0" }), now).adults);
assert.ok(validateBooking(draft({ name: " " }), now).name);
assert.equal(Object.keys(validateBooking(draft({}), now)).length, 0);

const message = buildBookingMessage(
  draft({
    apartmentId: "balcony-suite",
    phone: "",
    requests: "",
  }),
);

assert.match(message, /Scenic Balcony 2-Bed Suite/);
assert.match(message, /Check-in: 1 December 2026/);
assert.match(message, /Check-out: 5 December 2026/);
assert.doesNotMatch(message, /^Phone:/m);
assert.doesNotMatch(message, /Special Requests:/);
assert.doesNotMatch(message, /confirmed/i);
assert.doesNotMatch(message, /price is/i);
assert.doesNotMatch(message, /booking reference/i);

const withOptionals = buildBookingMessage(draft({ phone: "+94 77 000 0000", requests: "Late arrival" }));
assert.match(withOptionals, /Phone: \+94 77 000 0000/);
assert.match(withOptionals, /Special Requests: Late arrival/);

const url = buildWhatsAppBookingUrl(message);
assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_BOOKING_NUMBER}?text=`));
assert.ok(isApprovedWhatsAppNumber(url));
assert.equal(decodeURIComponent(url.split("text=")[1]), message);

console.log("whatsapp booking checks passed");
