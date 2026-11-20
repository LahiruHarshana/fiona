/**
 * Draft privacy wording for owner / qualified legal review.
 * Do not treat this as a finished policy. No company registration, DPO,
 * cookie vendor list, or data-retention schedule is asserted here because
 * those facts have not been confirmed.
 */

import { brand, contact } from "@/lib/site";

export const privacyDraft = {
  status: "draft-awaiting-owner-approval" as const,
  h1: "Privacy notice (draft)",
  intro:
    "This page is a draft for the owner of Fiona Green Serenity to review with qualified legal advice before it is treated as a published privacy policy. It describes only what this website currently does. It does not invent a company registration number, a data-protection officer, a cookie list, or a retention period.",
  lastReviewedNote:
    "No owner-approved privacy policy has been signed yet. Until that happens, this page stays unpublished to search engines.",
  controllerUnknown:
    "The legal person or business that operates Fiona Green Serenity has not been confirmed in writing for this draft. Until that is confirmed, privacy questions can be sent using the contact details already published on this website.",
  property: {
    tradingName: brand.name,
    location: brand.location,
    email: contact.email,
    phone: contact.phoneDisplay,
    whatsapp: contact.whatsapp,
  },
  whatThisSiteDoes: [
    "This website is a contact-only brochure. It does not take instant bookings, online payments, or account registrations.",
    "The booking request form runs only in your browser. It does not send your details to this website’s server, and it does not save them in a database or in the browser’s storage.",
    "If you continue to WhatsApp, the prefilled availability enquiry is handed to WhatsApp. The message is sent only if you tap Send in WhatsApp. WhatsApp then processes that message under its own terms.",
    "If you choose email, telephone, Instagram or Facebook instead, those services receive whatever you send them under their own terms. This website does not operate those services.",
    "No Google Analytics or other advertising tag is installed in this codebase at the time of this draft.",
  ],
  whatThisSiteDoesNotClaim: [
    "This draft is not a finished, owner-approved privacy policy.",
    "This draft does not list cookies, hosting-provider names, or analytics products that have not been chosen.",
    "Photographs on the site include property images. Whether any guest appears, and whether those people have given permission, still requires owner confirmation.",
  ],
  ifFormEnabledLater:
    "The website still does not store booking-request fields. If a future feature collected stay details on a server, this notice would need a new owner-approved rewrite before that feature went live.",
  rights:
    "People may have rights under the laws that apply to them, including Sri Lanka’s personal-data rules and, for some visitors, other countries’ rules. This draft does not give legal advice. Ask a qualified adviser which rights apply.",
  contactPrompt: "Questions about this draft can be sent by email or WhatsApp using the published Fiona Green Serenity contact details.",
} as const;
