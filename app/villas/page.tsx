import PageHero from "@/components/PageHero";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { ArrowRight, BedDouble, ChefHat, DoorOpen } from "lucide-react";
import Link from "next/link";
import { HeritageRosette, LiyaVelaBorder } from "@/components/SriLankanCinematicHome";
import { villaImages } from "@/lib/villaMedia";

const villas = [
  {
    title: "First Apartment Bedroom",
    detail: "A bright one-bed apartment with a work desk, seating corner, bath, and private kitchen nearby.",
    image: villaImages.firstApartmentRoom[1],
    icon: BedDouble,
  },
  {
    title: "Second Apartment Two Beds Room",
    detail: "A larger room with balcony doors, generous floor space, bath details, and a relaxed two-bed feel.",
    image: villaImages.secondApartmentRoom[0],
    icon: BedDouble,
  },
  {
    title: "Open Balcony Kitchen",
    detail: "A social counter and kitchen setting connected to the balcony for long, easy meals.",
    image: villaImages.kitchenSecond[2],
    icon: ChefHat,
  },
  {
    title: "Garden and Balcony Living",
    detail: "Shaded veranda edges, garden frontage, balcony seating, and warm night lighting around the house.",
    image: villaImages.balcony[1],
    icon: DoorOpen,
  },
];

export default function VillasPage() {
  return (
    <main className="bg-ivory pb-20">
      <PageHero
        eyebrow="Villas"
        title="Apartment-style stays inside one green villa."
        copy="The new photos show two clear stay experiences: a quiet one-bed apartment and a larger two-beds room, both connected to Fiona's balcony and garden life."
        image={villaImages.drone[8]}
      />

      <section className="editorial-container py-24 max-sm:py-16 lg:py-32 relative isolate">
        <div className="absolute top-40 left-0 opacity-[0.03] pointer-events-none mix-blend-multiply max-sm:-left-40">
          <HeritageRosette className="h-[500px] w-[500px] text-olive-900 max-sm:h-[320px] max-sm:w-[320px]" />
        </div>

        <Stagger className="grid gap-12 max-sm:gap-8 lg:gap-20 relative z-10" staggerDelay={0.12}>
          {villas.map((villa, index) => (
            <StaggerItem key={villa.title} direction="up">
              <article className="group grid overflow-hidden border border-gold/20 bg-paper shadow-sm transition-all duration-500 hover:shadow-xl hover:border-gold/40 lg:grid-cols-[1fr_0.9fr]">
                <div
                  className={`min-h-[400px] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 max-sm:min-h-[280px] lg:min-h-80 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  style={{ backgroundImage: `url(${villa.image})` }}
                  aria-hidden="true"
                />
                <div className="flex flex-col justify-center p-8 max-sm:p-6 lg:p-16 relative bg-paper z-10">
                  <villa.icon className="h-8 w-8 text-gold" aria-hidden="true" />
                  <h2 className="mt-8 font-display text-4xl text-olive-900 max-sm:mt-6 max-sm:text-[2.25rem] sm:text-5xl">
                    {villa.title}
                  </h2>
                  <p className="mt-5 leading-8 text-olive-900/70 font-light">{villa.detail}</p>
                  <Link
                    href="/contact"
                    className="mt-10 inline-flex w-fit items-center gap-3 border border-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-olive-900 transition-colors duration-300 hover:bg-gold hover:text-ivory max-sm:w-full max-sm:justify-center max-sm:tracking-[0.14em]"
                  >
                    Enquire
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Reveal direction="none">
        <div className="w-full mt-10">
          <LiyaVelaBorder className="w-full h-auto text-gold opacity-80" />
        </div>
      </Reveal>
    </main>
  );
}
