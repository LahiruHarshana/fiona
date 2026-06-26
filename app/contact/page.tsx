import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { HeritageRosette, LiyaVelaBorder } from "@/components/SriLankanCinematicHome";
import { villaImages } from "@/lib/villaMedia";

const contactDetails = [
  {
    icon: MapPin,
    label: "Mihiripanna, Galle, Sri Lanka, 80m to the ocean",
    href: null,
  },
  {
    icon: Phone,
    label: "+94 77 123 4567",
    href: "tel:+94771234567",
  },
  {
    icon: Mail,
    label: "stay@villafiona.com",
    href: "mailto:stay@villafiona.com",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-ivory pb-20">
      <PageHero
        eyebrow="Contact"
        title="Reserve your sanctuary."
        copy="Share your dates, whether the one-bed apartment or larger two-beds room fits best, and any details we should shape with care."
        image={villaImages.outdoor[12]}
      />

      <section className="editorial-container grid gap-12 py-24 max-sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-32 relative isolate">
        <div className="absolute top-10 right-0 opacity-[0.03] pointer-events-none mix-blend-multiply max-sm:-right-40">
          <HeritageRosette className="h-[600px] w-[600px] text-olive-900 max-sm:h-[320px] max-sm:w-[320px]" />
        </div>

        <Reveal direction="left" className="relative z-10">
          <div>
            <p className="fine-label">Reservations</p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-olive-900 max-sm:text-[2.55rem]">
              Tell us when Villa FIONA should be ready.
            </h2>
            <Stagger className="mt-10 space-y-5 text-sm leading-7 text-olive-900/70 font-light" staggerDelay={0.08}>
              {contactDetails.map((detail) => (
                <StaggerItem key={detail.label} direction="left">
                  {detail.href ? (
                    <Link href={detail.href} className="flex gap-3 transition-colors hover:text-gold-deep">
                      <detail.icon className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {detail.label}
                    </Link>
                  ) : (
                    <p className="flex gap-3">
                      <detail.icon className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {detail.label}
                    </p>
                  )}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.15} className="relative z-10">
          <ContactForm />
        </Reveal>
      </section>

      <Reveal direction="none">
        <div className="w-full mt-10">
          <LiyaVelaBorder className="w-full h-auto text-gold opacity-80" />
        </div>
      </Reveal>
    </main>
  );
}
