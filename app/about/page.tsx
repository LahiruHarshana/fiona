import {
  CinematicChapter,
  CinematicReveal,
  LuxuryMotif,
  MaskedImageReveal,
  StaggerText,
} from "@/components/luxury-motion";
import PremiumPageHero from "@/components/shared/PremiumPageHero";
import {
  aboutClosing,
  aboutHospitality,
  aboutIntro,
  aboutPhilosophy,
  aboutStory,
} from "@/lib/about";
import { pageMetadata } from "@/lib/seo";
import { villaImages } from "@/lib/villaMedia";
import Link from "next/link";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-[#F4F0E7] pb-20">
      <PremiumPageHero
        eyebrow="About Fiona"
        title={aboutIntro.h1}
        copy={aboutIntro.copy}
        image={villaImages.outdoor[2]}
        overlay="garden"
      />

      <CinematicChapter id="our-story">
        <div className="editorial-container relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <LuxuryMotif className="pointer-events-none absolute -right-8 top-8 h-72 w-72 text-[#203C30] opacity-[0.05] max-lg:hidden" />
          <CinematicReveal direction="left">
            <MaskedImageReveal
              src={aboutStory.photo.src}
              alt={aboutStory.photo.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              side="left"
              priority
            />
          </CinematicReveal>
          <CinematicReveal direction="right" delay={0.08}>
            <p className="font-sans text-xs font-semibold tabular-nums tracking-[0.28em] text-[#A3AA88]">01</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#244D39]">About the house</p>
            <StaggerText
              text={aboutStory.heading}
              className="mt-5 font-display text-4xl leading-tight text-[#203C30] max-sm:text-[2.15rem] sm:text-5xl"
            />
            <p className="mt-6 text-base leading-8 text-[#203C30]/85 font-light">{aboutStory.copy}</p>
          </CinematicReveal>
        </div>
      </CinematicChapter>

      <CinematicChapter id="our-hospitality" tone="sage">
        <div className="editorial-container relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <CinematicReveal direction="left" className="lg:order-1">
            <p className="font-sans text-xs font-semibold tabular-nums tracking-[0.28em] text-[#A3AA88]">02</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#244D39]">How we welcome you</p>
            <StaggerText
              text={aboutHospitality.heading}
              className="mt-5 font-display text-4xl leading-tight text-[#203C30] max-sm:text-[2.15rem] sm:text-5xl"
            />
            <p className="mt-6 text-base leading-8 text-[#203C30]/85 font-light">{aboutHospitality.copy}</p>
          </CinematicReveal>
          <CinematicReveal direction="right" className="lg:order-2">
            <MaskedImageReveal
              src={aboutHospitality.photo.src}
              alt={aboutHospitality.photo.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              side="right"
              objectPosition="center 55%"
            />
          </CinematicReveal>
        </div>
      </CinematicChapter>

      <CinematicChapter id="our-philosophy" tone="forest">
        <div className="editorial-container relative mx-auto max-w-3xl py-20 text-center lg:py-28">
          <CinematicReveal>
            <p className="font-sans text-xs font-semibold tabular-nums tracking-[0.28em] text-[#D7C5A7]">03</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-[#F4F0E7] max-sm:text-[2.15rem] sm:text-5xl">
              {aboutPhilosophy.heading}
            </h2>
            <p className="mt-6 font-display text-3xl leading-tight text-[#D7C5A7] max-sm:text-[1.85rem] sm:text-5xl">
              {aboutPhilosophy.subheading}
            </p>
            <div className="mx-auto mt-8 h-px w-24 bg-[#A3AA88]" aria-hidden="true" />
            <p className="mt-8 text-lg leading-8 text-[#F4F0E7]/85 font-light">{aboutPhilosophy.copy}</p>
          </CinematicReveal>
        </div>
      </CinematicChapter>

      <CinematicChapter tone="night">
        <div className="editorial-container relative z-10 max-w-3xl py-20 lg:py-28">
          <CinematicReveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A3AA88]">Visit Fiona</p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{aboutClosing.heading}</h2>
            <p className="mt-6 text-base leading-8 text-[#F4F0E7]/85 font-light">{aboutClosing.copy}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={aboutClosing.primaryHref}
                className="inline-flex items-center justify-center border border-[#D7C5A7] bg-[#F4F0E7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#203C30] transition-colors duration-300 hover:bg-transparent hover:text-[#F4F0E7] max-sm:w-full"
              >
                {aboutClosing.primaryLabel}
              </Link>
              <Link
                href={aboutClosing.secondaryHref}
                className="inline-flex items-center justify-center border border-[#D7C5A7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F4F0E7] transition-colors duration-300 hover:bg-[#F4F0E7] hover:text-[#203C30] max-sm:w-full"
              >
                {aboutClosing.secondaryLabel}
              </Link>
            </div>
          </CinematicReveal>
        </div>
      </CinematicChapter>
    </main>
  );
}
