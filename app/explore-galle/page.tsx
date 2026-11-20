import AdventureChapter from "@/components/explore-galle/AdventureChapter";
import BeachChapter from "@/components/explore-galle/BeachChapter";
import ExploreCinematicHero from "@/components/explore-galle/ExploreCinematicHero";
import ExploreFinale from "@/components/explore-galle/ExploreFinale";
import HeritageChapter from "@/components/explore-galle/HeritageChapter";
import NatureChapter from "@/components/explore-galle/NatureChapter";
import ExploreMotion from "@/components/explore/ExploreMotion";
import {
  adventureActivities,
  adventureDisclaimer,
  destinationCategories,
  destinationsByCategory,
  exploreGalleIntro,
} from "@/lib/destinations";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/lib/site";

export const metadata = pageMetadata("exploreGalle");

const categoryNotes: Record<string, string> = {
  beaches:
    "Coastal conditions change. Do not assume swimming is always safe. Wildlife, including sea turtles, must not be fed or handled.",
  culture: "These are historic and cultural places in the region, not facilities at Fiona Green Serenity.",
  nature:
    "Boat trips, fishing demonstrations, tea-estate access and wildlife sightings are not guaranteed. Confirm locally.",
  adventure: adventureDisclaimer,
};

export default function ExploreGallePage() {
  const beaches = destinationsByCategory("beaches");
  const culture = destinationsByCategory("culture");
  const nature = destinationsByCategory("nature");

  return (
    <ExploreMotion>
      <main className="bg-[#F4F0E7]">
        <ExploreCinematicHero title={exploreGalleIntro.h1} copy={exploreGalleIntro.copy} />

        <section className="bg-[#F4F0E7] py-14 lg:py-16">
          <div className="editorial-container max-w-3xl">
            <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#244D39]">South Coast notes</p>
            <p className="mt-6 font-display text-3xl leading-snug text-[#203C30] sm:text-4xl">{exploreGalleIntro.pace}</p>
            <p className="mt-6 text-sm leading-7 text-[#203C30]">
              {brand.name} · {brand.location}
            </p>
          </div>
        </section>

        <nav aria-label="Destination categories" className="editorial-container pb-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 border-y border-[#D7C5A7]/80 py-5">
            {destinationCategories.map((category, index) => (
              <li key={category.id}>
                <a
                  href={category.href}
                  className="inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.16em] text-[#244D39] transition-colors hover:text-[#203C30]"
                >
                  <span className="mr-2 font-sans tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BeachChapter destinations={beaches} note={categoryNotes.beaches} />
        <HeritageChapter destinations={culture} note={categoryNotes.culture} />
        <NatureChapter destinations={nature} note={categoryNotes.nature} />
        <AdventureChapter activities={adventureActivities} disclaimer={adventureDisclaimer} />

        <section id="map" className="bg-[#F4F0E7]">
          <div className="editorial-container max-w-3xl py-16 lg:py-24">
            <h2 className="font-display text-4xl leading-tight text-[#203C30] sm:text-5xl">Map of the South Coast</h2>
            <p className="mt-5 text-base font-light leading-8 text-[#203C30]">
              A live map of Fiona Green Serenity and nearby attractions will be published after the owner confirms the
              official property location pin. Distances, driving times and map markers are not shown until that pin is
              verified. No coordinates have been guessed.
            </p>
          </div>
        </section>

        <ExploreFinale />
      </main>
    </ExploreMotion>
  );
}
