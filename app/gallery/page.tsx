import GalleryExperience from "@/components/gallery/GalleryExperience";
import { CinematicChapter, CinematicReveal } from "@/components/luxury-motion";
import PremiumPageHero from "@/components/shared/PremiumPageHero";
import { galleryClosing, galleryIntro } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";
import { villaImages } from "@/lib/villaMedia";
import Link from "next/link";

export const metadata = pageMetadata("gallery");

export default function GalleryPage() {
  return (
    <main className="overflow-x-hidden bg-[#F4F0E7] pb-20">
      <PremiumPageHero
        eyebrow="Gallery"
        title={galleryIntro.h1}
        copy={galleryIntro.copy}
        image={villaImages.outdoor[0]}
        imageAlt="Garden lawn and veranda at Fiona Green Serenity, the accommodation"
        overlay="garden"
      />

      <GalleryExperience />

      <CinematicChapter tone="night">
        <div className="editorial-container max-w-3xl py-20 lg:py-28">
          <CinematicReveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A3AA88]">Stay at Fiona</p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{galleryClosing.heading}</h2>
            <p className="mt-6 text-base leading-8 text-[#F4F0E7]/85 font-light">{galleryClosing.copy}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={galleryClosing.primaryHref}
                className="inline-flex items-center justify-center border border-[#D7C5A7] bg-[#F4F0E7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#203C30] transition-colors hover:bg-transparent hover:text-[#F4F0E7] max-sm:w-full"
              >
                {galleryClosing.primaryLabel}
              </Link>
              <a
                href={galleryClosing.secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-[#D7C5A7] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#F4F0E7] transition-colors hover:bg-[#F4F0E7] hover:text-[#203C30] max-sm:w-full"
              >
                {galleryClosing.secondaryLabel}
              </a>
            </div>
          </CinematicReveal>
        </div>
      </CinematicChapter>
    </main>
  );
}
