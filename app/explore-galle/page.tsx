import DestinationCard from "@/components/explore/DestinationCard";
import ExploreMotion from "@/components/explore/ExploreMotion";
import { CinematicChapter, CinematicReveal, LuxuryMotif, StaggerText } from "@/components/luxury-motion";
import PremiumPageHero from "@/components/shared/PremiumPageHero";
import {
  adventureActivities,
  adventureDisclaimer,
  destinationCategories,
  destinationsByCategory,
  exploreGalleClosing,
  exploreGalleIntro,
} from "@/lib/destinations";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/lib/site";
import Link from "next/link";

export const metadata = pageMetadata("exploreGalle");

const categoryNotes: Record<string, string> = {
  beaches:
    "Coastal conditions change. Do not assume swimming is always safe. Wildlife, including sea turtles, must not be fed or handled.",
  culture: "These are historic and cultural places in the region, not facilities at Fiona Green Serenity.",
  nature:
    "Boat trips, fishing demonstrations, tea-estate access and wildlife sightings are not guaranteed. Confirm locally.",
  adventure: adventureDisclaimer,
};

const chapterNumbers = ["01", "02", "03", "04"] as const;

export default function ExploreGallePage() {
  const magazineCategories = destinationCategories.filter((category) => category.id !== "adventure");

  return (
    <ExploreMotion>
      <main className="overflow-x-hidden bg-[#F4F0E7] pb-20">
        <PremiumPageHero
          eyebrow="Explore Galle"
          title={exploreGalleIntro.h1}
          copy={exploreGalleIntro.copy}
        />

        <CinematicChapter>
          <div className="editorial-container relative isolate py-16 lg:py-24">
            <LuxuryMotif className="pointer-events-none absolute right-4 top-10 h-64 w-64 text-[#203C30] opacity-[0.06] max-sm:hidden" />
            <CinematicReveal className="max-w-3xl">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#A3AA88]">South Coast notes</p>
              <p className="mt-6 font-display text-3xl leading-snug text-[#203C30] sm:text-4xl">{exploreGalleIntro.pace}</p>
              <p className="mt-6 text-sm leading-7 text-[#203C30]/70">{exploreGalleIntro.accommodationNote}</p>
              <p className="mt-4 text-sm text-[#A3AA88]">
                {brand.name} · {brand.location}
              </p>
            </CinematicReveal>
          </div>
        </CinematicChapter>

        <nav aria-label="Destination categories" className="editorial-container pb-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 border-y border-[#D7C5A7]/80 py-5">
            {destinationCategories.map((category, index) => (
              <li key={category.id}>
                <a
                  href={category.href}
                  className="inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.16em] text-[#244D39] transition-colors hover:text-[#203C30]"
                >
                  <span className="mr-2 font-sans tabular-nums text-[#A3AA88]">{String(index + 1).padStart(2, "0")}</span>
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {magazineCategories.map((category, chapterIndex) => {
          const items = destinationsByCategory(category.id);
          const tone = chapterIndex % 2 === 1 ? "sage" : "ivory";

          return (
            <CinematicChapter key={category.id} id={category.id} tone={tone}>
              <div className="editorial-container grid gap-10 py-16 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:items-start lg:gap-16 lg:py-24">
                <CinematicReveal className="lg:sticky lg:top-28">
                  <p className="font-sans text-xs font-semibold tabular-nums tracking-[0.28em] text-[#A3AA88]">
                    {chapterNumbers[chapterIndex]}
                  </p>
                  <StaggerText
                    text={category.label}
                    className="mt-4 font-display text-4xl leading-tight text-[#203C30] sm:text-5xl"
                  />
                  <p className="mt-5 text-sm leading-7 text-[#203C30]/75">{categoryNotes[category.id]}</p>
                </CinematicReveal>
                <div>
                  {items.map((destination, index) => (
                    <CinematicReveal key={destination.id} delay={Math.min(index, 4) * 0.05}>
                      <DestinationCard destination={destination} index={index} />
                    </CinematicReveal>
                  ))}
                </div>
              </div>
            </CinematicChapter>
          );
        })}

        <CinematicChapter id="adventure" tone="forest">
          <div className="editorial-container grid gap-10 py-16 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:items-start lg:gap-16 lg:py-24">
            <CinematicReveal className="lg:sticky lg:top-28">
              <p className="font-sans text-xs font-semibold tabular-nums tracking-[0.28em] text-[#D7C5A7]">04</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-[#F4F0E7] sm:text-5xl">Adventure & Activities</h2>
              <p className="mt-5 text-sm leading-7 text-[#F4F0E7]/80">{adventureDisclaimer}</p>
            </CinematicReveal>
            <div>
              {adventureActivities.map((activity, index) => (
                <CinematicReveal key={activity.id} delay={Math.min(index, 4) * 0.05}>
                  <article id={activity.slug} className="border-t border-[#F4F0E7]/20 py-8">
                    <p className="font-sans text-[0.65rem] font-semibold tabular-nums tracking-[0.28em] text-[#D7C5A7]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D7C5A7]">
                      {activity.independentlyOperated ? "Independently operated" : "Visitor destination"}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-[#F4F0E7] sm:text-3xl">{activity.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#F4F0E7]/80 font-light">{activity.description}</p>
                  </article>
                </CinematicReveal>
              ))}
            </div>
          </div>
        </CinematicChapter>

        <CinematicChapter id="map" tone="sage">
          <div className="editorial-container max-w-3xl py-16 lg:py-24">
            <CinematicReveal>
              <h2 className="font-display text-4xl leading-tight text-[#203C30] sm:text-5xl">Map of the South Coast</h2>
              <p className="mt-5 text-base leading-8 text-[#203C30]/85 font-light">
                A live map of Fiona Green Serenity and nearby attractions will be published after the
                owner confirms the official property location pin. Distances, driving times and map
                markers are not shown until that pin is verified. No coordinates have been guessed.
              </p>
            </CinematicReveal>
          </div>
        </CinematicChapter>

        <CinematicChapter tone="night">
          <div className="editorial-container max-w-3xl py-20 lg:py-28">
            <CinematicReveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A3AA88]">Stay at Fiona</p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{exploreGalleClosing.heading}</h2>
              <p className="mt-6 text-base leading-8 text-[#F4F0E7]/85 font-light">{exploreGalleClosing.copy}</p>
              <p className="mt-4 text-sm leading-7 text-[#D7C5A7]">
                Contact Fiona directly. This website does not take instant bookings.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={exploreGalleClosing.primaryHref}
                  className="inline-flex items-center justify-center border border-[#D7C5A7] bg-[#F4F0E7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#203C30] transition-colors hover:bg-transparent hover:text-[#F4F0E7] max-sm:w-full"
                >
                  {exploreGalleClosing.primaryLabel}
                </Link>
                <a
                  href={exploreGalleClosing.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-[#D7C5A7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F4F0E7] transition-colors hover:bg-[#F4F0E7] hover:text-[#203C30] max-sm:w-full"
                >
                  {exploreGalleClosing.secondaryLabel}
                </a>
              </div>
            </CinematicReveal>
          </div>
        </CinematicChapter>
      </main>
    </ExploreMotion>
  );
}
