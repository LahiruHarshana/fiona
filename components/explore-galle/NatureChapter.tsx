import DestinationFilmRow from "@/components/explore-galle/DestinationFilmRow";
import type { Destination } from "@/lib/destinations";
import { destinationPhotos } from "@/lib/exploreGalleMedia";

export default function NatureChapter({
  destinations,
  note,
}: {
  destinations: readonly Destination[];
  note: string;
}) {
  const rumassala = destinations.find((item) => item.id === "rumassala-nature-area");
  const others = destinations.filter((item) => item.id !== "rumassala-nature-area");

  return (
    <section id="nature" className="bg-[#203C30] text-[#F4F0E7]">
      <div className="editorial-container py-16 lg:py-24">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.32em] text-[#D7C5A7]">03 / 04</p>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">Nature Beyond the Coast</h2>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#F4F0E7]">{note}</p>

        {others.map((destination, index) => (
          <DestinationFilmRow
            key={destination.id}
            destination={destination}
            photo={destinationPhotos[destination.id]}
            index={index}
            reverse={index % 2 === 1}
            tone="night"
          />
        ))}

        {rumassala ? (
          <article id={rumassala.slug} className="border-t border-[#D7C5A7]/30 py-16">
            <p className="font-sans text-[0.65rem] font-semibold tabular-nums tracking-[0.28em] text-[#D7C5A7]">
              {String(others.length + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D7C5A7]">Visitor destination</p>
            <h3 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">{rumassala.name}</h3>
            <p className="mt-5 max-w-2xl text-base font-light leading-8">{rumassala.description}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#D7C5A7]">
              No dedicated Rumassala Nature Area photograph is in the current local library. The Japanese Peace Pagoda
              appears in Culture &amp; Heritage.
            </p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
