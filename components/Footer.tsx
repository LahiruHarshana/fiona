import { aboutIntro } from "@/lib/about";
import { brand, contact, footerNavigation, siteCopy } from "@/lib/site";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-[#F4F0E7]/82 transition-colors duration-300 hover:text-[#D7C5A7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7]";

const iconLinkClass =
  "flex min-h-11 items-start gap-3 text-sm leading-6 text-[#F4F0E7]/82 transition-colors duration-300 hover:text-[#D7C5A7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7]";

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#D7C5A7]">{children}</p>
  );
}

function FooterMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="52" stroke="currentColor" strokeWidth="0.4" />
      <path
        d="M100 28c18 28 18 56 0 84-18-28-18-56 0-84Zm0 144c-18-28-18-56 0-84 18 28 18 56 0 84ZM28 100c28-18 56-18 84 0-28 18-56 18-84 0Zm144 0c-28 18-56 18-84 0 28-18 56-18 84 0Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#203C30] text-[#F4F0E7]">
      <div className="pointer-events-none absolute -right-16 bottom-0 opacity-[0.07] text-[#D7C5A7] max-sm:hidden">
        <FooterMotif className="h-[420px] w-[420px]" />
      </div>

      <section
        aria-labelledby="footer-cta-heading"
        className="editorial-container relative border-b border-[#D7C5A7]/15 py-12 max-sm:py-10 lg:py-14"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#D7C5A7]">
          Your Little Paradise Awaits
        </p>
        <div className="mt-4 grid items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_auto]">
          <div className="max-w-2xl">
            <h2
              id="footer-cta-heading"
              className="font-display text-3xl font-light leading-tight text-[#F4F0E7] sm:text-4xl lg:text-[2.75rem]"
            >
              Where Every Stay Feels Special.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#F4F0E7]/80 sm:text-base">
              Escape to tropical tranquility and discover the beauty of Fiona Green Serenity.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-[#D7C5A7]/70 px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4F0E7] transition-colors duration-300 hover:border-[#D7C5A7] hover:bg-[#D7C5A7]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7]"
            >
              Enquire on WhatsApp
            </Link>
            <Link
              href="/apartments"
              className="inline-flex min-h-11 items-center justify-center px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#D7C5A7] transition-colors duration-300 hover:text-[#F4F0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7]"
            >
              Explore Our Apartments
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className="editorial-container relative grid gap-10 py-12 max-sm:gap-9 max-sm:py-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr_0.8fr] lg:gap-12 lg:py-14">
        <div>
          <Link href="/" className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7C5A7]">
            <Image
              src="/images/logo.png"
              alt={brand.name}
              width={220}
              height={96}
              className="h-20 w-auto object-contain mix-blend-screen max-sm:h-[4.5rem]"
            />
          </Link>
          <p className="mt-4 font-display text-2xl font-light leading-snug text-[#F4F0E7]">{brand.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#D7C5A7]">{brand.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#F4F0E7]/75">{aboutIntro.copy}</p>
        </div>

        <nav aria-label="Footer">
          <SectionLabel>Explore</SectionLabel>
          <ul className="flex flex-col">
            {footerNavigation.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <SectionLabel>Contact</SectionLabel>
          <ul className="flex flex-col gap-1">
            <li className="flex items-start gap-3 py-2 text-sm leading-6 text-[#F4F0E7]/82">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D7C5A7]" aria-hidden="true" />
              <span>{brand.location}</span>
            </li>
            <li>
              <Link href={contact.telHref} className={iconLinkClass}>
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D7C5A7]" aria-hidden="true" />
                <span>
                  Phone / WhatsApp
                  <span className="block">{contact.phoneDisplay}</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href={contact.mailtoHref} className={iconLinkClass}>
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D7C5A7]" aria-hidden="true" />
                {contact.email}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <SectionLabel>Connect</SectionLabel>
          <ul className="flex flex-col">
            <li>
              <Link
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
              >
                <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-[#D7C5A7]" aria-hidden="true" />
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
              >
                <Facebook className="mt-0.5 h-4 w-4 shrink-0 text-[#D7C5A7]" aria-hidden="true" />
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D7C5A7]" aria-hidden="true" />
                WhatsApp
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-[#D7C5A7]/15">
        <div className="editorial-container flex flex-col gap-3 py-5 text-xs leading-5 text-[#F4F0E7]/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {siteCopy.copyright}{" "}
            <span className="text-[#D7C5A7]/50" aria-hidden="true">
              ·
            </span>{" "}
            <Link
              href="/privacy"
              className="text-[#F4F0E7]/70 underline-offset-4 transition-colors hover:text-[#D7C5A7] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7]"
            >
              Privacy (draft)
            </Link>
          </p>
          <p className="hidden sm:block">{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
