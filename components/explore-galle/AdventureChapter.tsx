import DestinationFilmRow from "@/components/explore-galle/DestinationFilmRow";
import type { Destination } from "@/lib/destinations";
import { destinationPhotos } from "@/lib/exploreGalleMedia";

export default function AdventureChapter({
  activities,
  disclaimer,
}: {
  activities: readonly Destination[];
  disclaimer: string;
}) {
  return (
    <section id="adventure" className="bg-[#F4F0E7]">
      <div className="editorial-container py-16 lg:py-24">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.32em] text-[#244D39]">04 / 04</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-[#203C30] sm:text-6xl">Adventure in the South</h2>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#203C30]">{disclaimer}</p>
        {activities.map((activity, index) => (
          <DestinationFilmRow
            key={activity.id}
            destination={activity}
            photo={destinationPhotos[activity.id]}
            index={index}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
