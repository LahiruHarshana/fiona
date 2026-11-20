import PageHero from "@/components/PageHero";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import type { Metadata } from "next";
import { BriefcaseBusiness, Moon, Sparkles } from "lucide-react";
import { HeritageRosette } from "@/components/SriLankanCinematicHome";
import { villaImages } from "@/lib/villaMedia";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const rituals = [
  {
    time: "08:00",
    title: "Balcony Morning",
    copy: "Start above the garden with shade, breakfast, and the palms in view.",
  },
  {
    time: "11:30",
    title: "Quiet Work Corner",
    copy: "Use the desk spaces when the day needs focus without leaving the retreat.",
  },
  {
    time: "17:45",
    title: "Evening Veranda",
    copy: "Return to the lit balcony and garden edge as the house cools down.",
  },
];

const treatments = [
  {
    icon: Sparkles,
    title: "Garden Rest",
    copy: "Shaded seating and green views make rest feel simple and unforced.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Work Retreat",
    copy: "Compact desks and calm rooms support longer stays and remote work.",
  },
  {
    icon: Moon,
    title: "Sleep Support",
    copy: "Evening tea, linen turn-downs, and quiet lighting close the day.",
  },
];

export default function WellnessPage() {
  return (
    <main className="bg-ivory pb-20">
      <PageHero
        eyebrow="Wellness"
        title="Rest is built into the balcony, garden, and rooms."
        copy="Wellness at Villa FIONA is not a separate program. It is the slower daily rhythm shown in the photos: shade, reading, work corners, and warm night light."
        image={villaImages.guest[10]}
      />

      <Reveal direction="up">
        <section className="editorial-container grid gap-12 py-24 max-sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-32 relative isolate">
          <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none mix-blend-multiply max-sm:-right-40">
            <HeritageRosette className="h-[600px] w-[600px] text-olive-900 max-sm:h-[320px] max-sm:w-[320px]" />
          </div>

          <div className="relative z-10">
            <p className="fine-label">Daily Rituals</p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-olive-900 max-sm:text-[2.55rem]">
              Rest is arranged, never rushed.
            </h2>
          </div>
          <Stagger className="divide-y divide-gold/30 border-y border-gold/30 relative z-10" staggerDelay={0.1}>
            {rituals.map((ritual) => (
              <StaggerItem key={ritual.time} direction="up">
                <article className="grid gap-4 py-7 max-sm:py-6 sm:grid-cols-[90px_1fr]">
                  <p className="text-sm uppercase tracking-[0.2em] text-gold-deep">{ritual.time}</p>
                  <div>
                    <h3 className="font-display text-3xl text-olive-900">{ritual.title}</h3>
                    <p className="mt-3 leading-7 text-olive-900/70 font-light">{ritual.copy}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      <Reveal direction="up" delay={0.15}>
        <section className="bg-paper py-20 max-sm:py-16 lg:py-28 border-y border-gold/20">
          <Stagger className="editorial-container grid gap-5 md:grid-cols-3" staggerDelay={0.08}>
            {treatments.map((treatment) => (
              <StaggerItem key={treatment.title} direction="up">
                <article className="group border border-gold/20 bg-ivory p-8 transition-all duration-500 hover:shadow-xl hover:border-gold/50 max-sm:p-6">
                  <treatment.icon className="h-8 w-8 text-gold" aria-hidden="true" />
                  <h3 className="mt-8 font-display text-3xl text-olive-900 max-sm:mt-6">{treatment.title}</h3>
                  <p className="mt-4 leading-7 text-olive-900/70 font-light">{treatment.copy}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>
    </main>
  );
}
