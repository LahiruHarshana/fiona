import DestinationFilmRow from "@/components/explore-galle/DestinationFilmRow";
import type { Destination } from "@/lib/destinations";
import { destinationPhotos } from "@/lib/exploreGalleMedia";

export default function HeritageChapter({
  destinations,
  note,
}: {
  destinations: readonly Destination[];
  note: string;
}) {
  return (
    <section id="culture" className="bg-[#F4F0E7]">
      <div className="editorial-container py-16 lg:py-24">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.32em] text-[#244D39]">02 / 04</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-[#203C30] sm:text-6xl">Stories Written in Stone</h2>
        <div className="mt-6 h-px max-w-xs bg-[#D7C5A7]" aria-hidden="true" />
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#203C30]">{note}</p>
        {destinations.map((destination, index) => (
          <DestinationFilmRow
            key={destination.id}
            destination={destination}
            photo={destinationPhotos[destination.id]}
            index={index}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
