import { apartmentIds, apartments, brand, contact, type ApartmentId } from "@/lib/site";

export const WHATSAPP_BOOKING_NUMBER = "94743842244";
export const WHATSAPP_BOOKING_BASE = `https://wa.me/${WHATSAPP_BOOKING_NUMBER}`;

export const NAME_MAX = 80;
export const PHONE_MAX = 40;
export const REQUESTS_MAX = 400;
export const ADULTS_MAX = 20;
export const CHILDREN_MAX = 20;
export const MESSAGE_MAX = 1800;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const bookingApartmentOptions = [
  { id: apartments.greenGarden.id, name: apartments.greenGarden.name },
  { id: apartments.balconySuite.id, name: apartments.balconySuite.name },
] as const;

export type BookingDraft = {
  apartmentId: ApartmentId | "";
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  name: string;
  phone: string;
  requests: string;
};

export type BookingField = keyof BookingDraft;

export type BookingErrors = Partial<Record<BookingField, string>>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function todayIsoLocal(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function nextIsoDay(iso: string): string {
  if (!ISO_DATE.test(iso)) {
    return todayIsoLocal();
  }

  const [year, month, day] = iso.split("-").map(Number);
  return todayIsoLocal(new Date(year, month - 1, day + 1));
}

export function parseApartmentQuery(value: string | null | undefined): ApartmentId | "" {
  if (!value) {
    return "";
  }

  return apartmentIds.includes(value as ApartmentId) ? (value as ApartmentId) : "";
}

export function apartmentName(id: ApartmentId): string {
  return id === apartments.greenGarden.id ? apartments.greenGarden.name : apartments.balconySuite.name;
}

export function formatStayDate(iso: string): string {
  if (!ISO_DATE.test(iso)) {
    return iso;
  }

  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function parseCount(value: string): number | null {
  const trimmed = value.trim();

  if (!/^\d+$/.test(trimmed)) {
    return null;
  }

  return Number.parseInt(trimmed, 10);
}

export function validateBooking(draft: BookingDraft, now = new Date()): BookingErrors {
  const errors: BookingErrors = {};
  const minDate = todayIsoLocal(now);

  if (draft.apartmentId !== apartments.greenGarden.id && draft.apartmentId !== apartments.balconySuite.id) {
    errors.apartmentId = "Please choose one of the two apartments.";
  }

  if (!ISO_DATE.test(draft.checkIn)) {
    errors.checkIn = "Please choose a check-in date.";
  } else if (draft.checkIn < minDate) {
    errors.checkIn = "Check-in cannot be earlier than today.";
  }

  if (!ISO_DATE.test(draft.checkOut)) {
    errors.checkOut = "Please choose a check-out date.";
  } else if (ISO_DATE.test(draft.checkIn) && draft.checkOut <= draft.checkIn) {
    errors.checkOut = "Check-out must be after check-in.";
  }

  const adults = parseCount(draft.adults);

  if (adults === null || adults < 1) {
    errors.adults = "Enter at least one adult.";
  } else if (adults > ADULTS_MAX) {
    errors.adults = `Enter a whole number of adults up to ${ADULTS_MAX}.`;
  }

  const children = draft.children.trim() === "" ? 0 : parseCount(draft.children);

  if (children === null || children < 0) {
    errors.children = "Children must be a whole number of 0 or more.";
  } else if (children > CHILDREN_MAX) {
    errors.children = `Enter a whole number of children up to ${CHILDREN_MAX}.`;
  }

  const name = draft.name.trim();

  if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > NAME_MAX) {
    errors.name = `Name must be ${NAME_MAX} characters or fewer.`;
  }

  const phone = draft.phone.trim();

  if (phone && phone.length > PHONE_MAX) {
    errors.phone = `Phone must be ${PHONE_MAX} characters or fewer.`;
  }

  if (draft.requests.length > REQUESTS_MAX) {
    errors.requests = `Special requests must be ${REQUESTS_MAX} characters or fewer.`;
  }

  return errors;
}

export function buildBookingMessage(draft: BookingDraft): string {
  const lines = [
    `Hello ${brand.name},`,
    "",
    "I would like to check availability for a stay.",
    "",
    `Apartment: ${draft.apartmentId ? apartmentName(draft.apartmentId) : ""}`,
    `Check-in: ${formatStayDate(draft.checkIn)}`,
    `Check-out: ${formatStayDate(draft.checkOut)}`,
    `Adults: ${draft.adults.trim()}`,
    `Children: ${draft.children.trim() === "" ? "0" : draft.children.trim()}`,
    `Guest Name: ${draft.name.trim()}`,
  ];

  const phone = draft.phone.trim();

  if (phone) {
    lines.push(`Phone: ${phone}`);
  }

  const requests = draft.requests.trim();

  if (requests) {
    lines.push(`Special Requests: ${requests}`);
  }

  lines.push("", "Please let me know the availability and price.", "", "Thank you!");

  let message = lines.join("\n");

  if (message.length > MESSAGE_MAX) {
    message = `${message.slice(0, MESSAGE_MAX - 1).trimEnd()}…`;
  }

  return message;
}

export function buildWhatsAppBookingUrl(message: string): string {
  return `${WHATSAPP_BOOKING_BASE}?text=${encodeURIComponent(message)}`;
}

export function isApprovedWhatsAppNumber(url: string): boolean {
  return url.startsWith(`${WHATSAPP_BOOKING_BASE}?text=`) && url.includes(WHATSAPP_BOOKING_NUMBER);
}

export const emptyBookingDraft = (): BookingDraft => ({
  apartmentId: "",
  checkIn: "",
  checkOut: "",
  adults: "1",
  children: "0",
  name: "",
  phone: "",
  requests: "",
});

export const bookingDisclaimer =
  "Your request will open in WhatsApp. Please send the message to Fiona Green Serenity to enquire about availability. Your stay is not confirmed until our team responds and confirms your reservation.";

export const whatsappClickChatNote =
  "Opening WhatsApp does not send the message. You must tap Send in WhatsApp. This website does not take instant bookings or store your request.";
