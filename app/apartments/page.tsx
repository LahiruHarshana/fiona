import ApartmentStayCta from "@/components/apartments/ApartmentStayCta";
import ApartmentStory from "@/components/apartments/ApartmentStory";
import ApartmentsCinematicHero from "@/components/apartments/ApartmentsCinematicHero";
import ApartmentsIntro from "@/components/apartments/ApartmentsIntro";
import { apartmentProfiles, apartmentsIntro } from "@/lib/apartments";
import { pageMetadata } from "@/lib/seo";
import { villaImages } from "@/lib/villaMedia";

export const metadata = pageMetadata("apartments");

const storyImages = [
  {
    src: villaImages.outdoor[0],
    alt: "Garden frontage and ground-floor veranda at Fiona Green Serenity",
  },
  {
    src: villaImages.balcony[0],
    alt: "Open balcony with garden and treetop views at Fiona Green Serenity",
  },
] as const;

export default function ApartmentsPage() {
  return (
    <main className="overflow-x-hidden bg-[#F4F0E7]">
      <ApartmentsCinematicHero
        eyebrow="Our Apartments"
        title={apartmentsIntro.h1}
        copy={apartmentsIntro.copy}
        image={villaImages.outdoor[0]}
        imageAlt="Garden lawn and veranda at Fiona Green Serenity"
      />

      <ApartmentsIntro
        copy="Fiona Green Serenity offers exactly two apartment-style stays. Kitchen, garden and balcony photographs illustrate those units. They are not additional apartments."
        chapters={apartmentProfiles.map((apartment, index) => ({
          href: `#${apartment.id}`,
          index: String(index + 1).padStart(2, "0"),
          name: apartment.name,
        }))}
      />

      {apartmentProfiles.map((apartment, index) => (
        <ApartmentStory
          key={apartment.id}
          apartment={apartment}
          index={index}
          total={apartmentProfiles.length}
          storyImage={storyImages[index] ?? storyImages[0]}
        />
      ))}

      <ApartmentStayCta />
    </main>
  );
}
