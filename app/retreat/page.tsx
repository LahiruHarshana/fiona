import PageHero from "@/components/PageHero";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { Leaf, Sparkles, SunMedium } from "lucide-react";
import { HeritageRosette, LiyaVelaBorder } from "@/components/SriLankanCinematicHome";
import { villaImages } from "@/lib/villaMedia";

const values = [
  {
    icon: Leaf,
    title: "Botanical Calm",
    copy: "Every path is softened by planting, scent, shade, and natural texture.",
  },
  {
    icon: Sparkles,
    title: "Quiet Service",
    copy: "Attentive hospitality that appears gracefully and lets the day stay yours.",
  },
  {
    icon: SunMedium,
    title: "Warm Ritual",
    copy: "Tea, bathing, seasonal dining, and sunset moments are treated as the luxury.",
  },
];

export default function RetreatPage() {
  return (
    <main className="bg-ivory pb-20">
      <PageHero
        eyebrow="The Retreat"
        title="A private house revealed through palms, veranda, and light."
        copy="The new photos show Fiona as a compact tropical retreat: garden frontage below, balcony living above, and warm rooms arranged for slow South Coast days."
        image={villaImages.outdoor[2]}
      />

      <Reveal direction="up">
        <section className="editorial-container grid gap-12 py-24 max-sm:py-16 relative isolate lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
          <div className="absolute top-10 right-0 opacity-[0.03] pointer-events-none mix-blend-multiply max-sm:-right-40">
            <HeritageRosette className="h-[600px] w-[600px] text-olive-900 max-sm:h-[320px] max-sm:w-[320px]" />
          </div>

          <div className="relative z-10">
            <p className="fine-label">Our Rhythm</p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-olive-900 max-sm:text-[2.55rem]">
              Hospitality with space around it.
            </h2>
          </div>
          <div className="space-y-7 text-base leading-8 text-olive-900/70 font-light relative z-10">
            <p>
              The retreat is intentionally small. Mornings move from bedroom to kitchen to balcony,
              while the garden frontage keeps the house calm and green from the first step in.
            </p>
            <p>
              The photos show warm timber doors, simple tiled rooms, planted corners, shaded seating,
              and a night-lit exterior that makes the villa feel personal rather than formal.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal direction="up" delay={0.15}>
        <section className="bg-paper py-20 max-sm:py-16 lg:py-28 border-y border-gold/20">
          <div className="editorial-container grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="group border border-gold/20 bg-ivory p-8 transition-all duration-500 hover:shadow-xl hover:border-gold/50 max-sm:p-6">
                <value.icon className="h-8 w-8 text-gold" aria-hidden="true" />
                <h3 className="mt-8 font-display text-3xl text-olive-900 max-sm:mt-6">{value.title}</h3>
                <p className="mt-4 leading-7 text-olive-900/70 font-light">{value.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal direction="none">
        <div className="w-full mt-20">
          <LiyaVelaBorder className="w-full h-auto text-gold opacity-80" />
        </div>
      </Reveal>
    </main>
  );
}
