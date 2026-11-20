import ApartmentsFinale from "@/components/apartments/ApartmentsFinale";
import BalconyStory from "@/components/apartments/BalconyStory";
import CinematicIntro from "@/components/apartments/CinematicIntro";
import FilmInterlude from "@/components/apartments/FilmInterlude";
import GardenStory from "@/components/apartments/GardenStory";
import { apartmentProfiles, apartmentsIntro } from "@/lib/apartments";
import { pageMetadata } from "@/lib/seo";
import { villaImages } from "@/lib/villaMedia";

export const metadata = pageMetadata("apartments");

const garden = apartmentProfiles[0];
const balcony = apartmentProfiles[1];

export default function ApartmentsPage() {
  return (
    <main className="bg-[#F4F0E7]">
      <CinematicIntro
        title={apartmentsIntro.h1}
        copy={apartmentsIntro.copy}
        image={villaImages.outdoor[0]}
        imageAlt="Garden lawn and veranda at Fiona Green Serenity"
      />

      <section className="bg-[#F4F0E7] py-14 lg:py-16">
        <div className="editorial-container max-w-3xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#244D39]">A different way to stay</p>
          <p className="mt-5 text-lg font-light leading-8 text-[#203C30]">
            Fiona Green Serenity offers exactly two apartment-style stays. Kitchen, garden and balcony photographs
            illustrate those units. They are not additional apartments.
          </p>
          <nav aria-label="Apartment chapters" className="mt-8 flex flex-wrap gap-6">
            <a href={`#${garden.id}`} className="text-xs font-bold uppercase tracking-[0.18em] text-[#244D39] hover:text-[#203C30]">
              01 {garden.name}
            </a>
            <a href={`#${balcony.id}`} className="text-xs font-bold uppercase tracking-[0.18em] text-[#244D39] hover:text-[#203C30]">
              02 {balcony.name}
            </a>
          </nav>
        </div>
      </section>

      {garden ? (
        <GardenStory
          apartment={garden}
          layers={[
            { src: villaImages.outdoor[0], alt: "Garden frontage and ground-floor veranda at Fiona Green Serenity" },
            {
              src: villaImages.firstApartmentRoom[0],
              alt: "Air-conditioned bedroom in the Green Garden Apartment at Fiona Green Serenity",
            },
            { src: villaImages.kitchenFirst[0], alt: "Fully equipped private kitchen in the Green Garden Apartment" },
            { src: villaImages.firstApartmentRoom[5], alt: "Green Garden Apartment bedroom opening toward the garden" },
          ]}
        />
      ) : null}

      <FilmInterlude
        src={villaImages.outdoor[2]}
        alt="Tropical garden and veranda at Fiona Green Serenity"
      />

      {balcony ? (
        <BalconyStory
          apartment={balcony}
          layers={[
            { src: villaImages.balcony[0], alt: "Open balcony with garden and treetop views at Fiona Green Serenity" },
            {
              src: villaImages.secondApartmentRoom[0],
              alt: "One of the two separate bedrooms in the Scenic Balcony 2-Bed Suite, opening to the balcony",
            },
            {
              src: villaImages.secondApartmentRoom[4],
              alt: "Second separate bedroom in the Scenic Balcony 2-Bed Suite",
            },
            { src: villaImages.balcony[5], alt: "Shaded balcony and bar counter looking over the tropical garden" },
          ]}
        />
      ) : null}

      <ApartmentsFinale />
    </main>
  );
}
