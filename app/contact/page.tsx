import ContactForm from "@/components/ContactForm";
import { CinematicChapter, CinematicReveal, LuxuryMotif } from "@/components/luxury-motion";
import PremiumPageHero from "@/components/shared/PremiumPageHero";
import { pageMetadata } from "@/lib/seo";
import { brand, contact } from "@/lib/site";
import { villaImages } from "@/lib/villaMedia";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata("contact");

const contactDetails = [
  {
    icon: MapPin,
    label: brand.location,
    href: null as string | null,
  },
  {
    icon: Phone,
    label: `Phone / WhatsApp: ${contact.phoneDisplay}`,
    href: contact.telHref,
  },
  {
    icon: MessageCircle,
    label: "Chat on WhatsApp",
    href: contact.whatsapp,
  },
  {
    icon: Mail,
    label: contact.email,
    href: contact.mailtoHref,
  },
  {
    icon: Instagram,
    label: `Instagram ${contact.instagramHandle}`,
    href: contact.instagram,
  },
  {
    icon: Facebook,
    label: `Facebook ${contact.facebookLabel}`,
    href: contact.facebook,
  },
];

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-[#F4F0E7] pb-20">
      <PremiumPageHero
        eyebrow="Contact"
        title="Your Stay at Fiona Starts Here."
        copy="Planning your visit to Sri Lanka? Use the WhatsApp booking request form to check availability, or contact Fiona Green Serenity by telephone or email. This website does not take instant bookings. Your stay is not confirmed until our team replies."
        image={villaImages.outdoor[12]}
        overlay="night"
      />

      <CinematicChapter>
        <div className="editorial-container relative isolate grid gap-12 py-16 max-sm:py-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:py-28">
          <LuxuryMotif className="pointer-events-none absolute right-0 top-8 h-72 w-72 text-[#203C30] opacity-[0.05] max-sm:hidden" />

          <CinematicReveal direction="left" className="relative z-10">
            <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fiona-brand">Availability enquiry</p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-fiona-ink max-sm:text-[2.55rem]">{brand.name}</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-fiona-ink/90 font-light">
              Choose an apartment, dates and guest details. You send the prepared WhatsApp message yourself. Nothing is booked until Fiona replies.
            </p>
            <ul className="mt-10 space-y-5 text-sm leading-7 text-fiona-ink/90 font-light">
              {contactDetails.map((detail) => (
                <li key={detail.label}>
                  {detail.href ? (
                    <Link
                      href={detail.href}
                      className="flex gap-3 transition-colors hover:text-fiona-brand"
                      {...(detail.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <detail.icon className="mt-1 h-4 w-4 shrink-0 text-fiona-sage" aria-hidden="true" />
                      {detail.label}
                    </Link>
                  ) : (
                    <p className="flex gap-3">
                      <detail.icon className="mt-1 h-4 w-4 shrink-0 text-fiona-sage" aria-hidden="true" />
                      {detail.label}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </CinematicReveal>

          <div className="relative z-10">
            <ContactForm />
          </div>
        </div>
      </CinematicChapter>
    </main>
  );
}
