import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { label: "The Retreat", href: "/retreat" },
  { label: "Garden Villas", href: "/villas" },
  { label: "Wellness", href: "/wellness" },
  { label: "Experiences", href: "/experiences" },
];

export default function Footer() {
  return (
    <footer className="bg-olive-900 text-gold border-t border-gold/30">
      <div className="editorial-container grid gap-12 py-16 max-sm:gap-8 max-sm:py-12 md:grid-cols-[0.9fr_1.1fr_1fr] lg:py-20">
        <div className="flex flex-col items-start">
          <img src="/images/logo.png" alt="Fiona Villa Logo" className="h-24 w-auto object-contain mix-blend-screen -ml-4 max-sm:h-20" />
        </div>

        <div className="space-y-5 text-sm leading-7 text-ivory/80">
          <p className="flex gap-3">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            Villa FIONA, Mihiripanna, Galle, Sri Lanka
          </p>
          <Link href="tel:+94771234567" className="flex gap-3 transition-colors hover:text-gold-deep">
            <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            +94 77 123 4567
          </Link>
          <Link href="mailto:stay@villafiona.com" className="flex gap-3 transition-colors hover:text-gold-deep">
            <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            stay@villafiona.com
          </Link>
          <Link href="/gallery" className="flex gap-3 transition-colors hover:text-gold-deep">
            <Instagram className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            @villafiona.retreat
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-ivory/80 max-sm:grid-cols-1">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-gold-deep">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="editorial-container flex flex-col gap-3 py-6 text-xs text-gold/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Villa FIONA. All rights reserved.</p>
          <p>Purely Green Serenity, 80m from the South Coast ocean.</p>
        </div>
      </div>
    </footer>
  );
}
