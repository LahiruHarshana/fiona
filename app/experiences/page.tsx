import {
  CinematicChapter,
  CinematicReveal,
  LuxuryMotif,
  MaskedImageReveal,
  StaggerText,
} from "@/components/luxury-motion";
import PremiumPageHero from "@/components/shared/PremiumPageHero";
import {
  experienceItems,
  experiencesClosing,
  experiencesIntro,
} from "@/lib/experiences";
import { pageMetadata } from "@/lib/seo";
import { villaImages } from "@/lib/villaMedia";
import Link from "next/link";

export const metadata = pageMetadata("experiences");

function chapterTone(index: number, hasPhoto: boolean) {
  if (!hasPhoto && index === 2) {
    return "night" as const;
  }
  if (!hasPhoto) {
    return "forest" as const;
  }
  if (index % 2 === 1) {
    return "sage" as const;
  }
  return "ivory" as const;
}

export default function ExperiencesPage() {
  return (
    <main className="overflow-x-hidden bg-[#F4F0E7] pb-20">
      <PremiumPageHero
        eyebrow="Experiences"
        title={experiencesIntro.h1}
        copy={experiencesIntro.copy}
        image={villaImages.outdoor[7]}
        overlay="interior"
      />

      <CinematicChapter>
        <div className="editorial-container relative isolate py-16 lg:py-24">
          <LuxuryMotif className="pointer-events-none absolute right-0 top-8 h-64 w-64 text-[#203C30] opacity-[0.06] max-sm:hidden" />
          <CinematicReveal className="max-w-3xl">
            <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#A3AA88]">A stay, in chapters</p>
            <p className="mt-6 max-w-2xl font-display text-3xl leading-snug text-[#203C30] sm:text-4xl">
              Garden living, balcony light, then the independent coast beyond the gate.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#203C30]/80 font-light">
              Some moments belong to the garden and balcony at Fiona. Nearby beaches, restaurants and
              heritage places are independently operated. Fiona does not run tours, meals or spa
              services.
            </p>
          </CinematicReveal>
        </div>
      </CinematicChapter>

      {experienceItems.map((experience, index) => {
        const photo = experience.photo;
        const tone = chapterTone(index, Boolean(photo));
        const dark = tone === "forest" || tone === "night";

        if (photo) {
          const photoLeft = index % 2 === 0;

          return (
            <CinematicChapter key={experience.id} id={experience.id} tone={tone}>
              <div className="editorial-container relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-28">
                <CinematicReveal direction={photoLeft ? "left" : "right"} className={photoLeft ? "" : "lg:order-2"}>
                  <MaskedImageReveal
                    src={photo.src}
                    alt={photo.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    side={photoLeft ? "left" : "right"}
                    priority={index === 0}
                    objectPosition={index === 1 ? "center 35%" : "center 42%"}
                  />
                </CinematicReveal>
                <CinematicReveal direction={photoLeft ? "right" : "left"} className={photoLeft ? "" : "lg:order-1"} delay={0.08}>
                  <p className="font-sans text-xs font-semibold tabular-nums tracking-[0.28em] text-[#A3AA88]">
                    {experience.number}
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#244D39]">
                    {experience.settingLabel} · {experience.name}
                  </p>
                  <StaggerText
                    text={experience.headline}
                    className="mt-5 font-display text-4xl leading-tight text-[#203C30] max-sm:text-[2.15rem] sm:text-5xl"
                  />
                  <p className="mt-6 text-base leading-8 text-[#203C30]/85 font-light">{experience.description}</p>
                </CinematicReveal>
              </div>
            </CinematicChapter>
          );
        }

        return (
          <CinematicChapter key={experience.id} id={experience.id} tone={tone}>
            <div className="editorial-container relative py-20 lg:py-28">
              <LuxuryMotif
                className={`pointer-events-none absolute right-0 top-10 h-72 w-72 opacity-[0.08] max-sm:hidden ${
                  dark ? "text-[#F4F0E7]" : "text-[#203C30]"
                }`}
              />
              <CinematicReveal className="relative max-w-3xl">
                <p className={`font-sans text-xs font-semibold tabular-nums tracking-[0.28em] ${dark ? "text-[#D7C5A7]" : "text-[#A3AA88]"}`}>
                  {experience.number}
                </p>
                <p className={`mt-3 text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-[#D7C5A7]" : "text-[#244D39]"}`}>
                  {experience.settingLabel} · {experience.name}
                </p>
                <StaggerText
                  text={experience.headline}
                  className={`mt-5 font-display text-4xl leading-tight max-sm:text-[2.15rem] sm:text-5xl ${
                    dark ? "text-[#F4F0E7]" : "text-[#203C30]"
                  }`}
                />
                <p className={`mt-6 text-base leading-8 font-light ${dark ? "text-[#F4F0E7]/85" : "text-[#203C30]/85"}`}>
                  {experience.description}
                </p>
                {experience.href ? (
                  <Link
                    href={experience.href}
                    className={`mt-8 inline-flex items-center border-b pb-1 text-xs font-bold uppercase tracking-[0.2em] ${
                      dark
                        ? "border-[#D7C5A7] text-[#F4F0E7] hover:text-[#D7C5A7]"
                        : "border-[#244D39] text-[#244D39] hover:text-[#203C30]"
                    }`}
                  >
                    {experience.hrefLabel}
                  </Link>
                ) : null}
              </CinematicReveal>
            </div>
          </CinematicChapter>
        );
      })}

      <CinematicChapter tone="night">
        <div className="editorial-container relative z-10 max-w-3xl py-20 lg:py-28">
          <CinematicReveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A3AA88]">Plan your stay</p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{experiencesClosing.heading}</h2>
            <p className="mt-6 text-base leading-8 text-[#F4F0E7]/85 font-light">{experiencesClosing.copy}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={experiencesClosing.primaryHref}
                className="inline-flex items-center justify-center border border-[#D7C5A7] bg-[#F4F0E7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#203C30] transition-colors duration-300 hover:bg-transparent hover:text-[#F4F0E7] max-sm:w-full"
              >
                {experiencesClosing.primaryLabel}
              </Link>
              <Link
                href={experiencesClosing.secondaryHref}
                className="inline-flex items-center justify-center border border-[#D7C5A7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F4F0E7] transition-colors duration-300 hover:bg-[#F4F0E7] hover:text-[#203C30] max-sm:w-full"
              >
                {experiencesClosing.secondaryLabel}
              </Link>
            </div>
          </CinematicReveal>
        </div>
      </CinematicChapter>
    </main>
  );
}
