"use client";

import DestinationFilmRow from "@/components/explore-galle/DestinationFilmRow";
import { useExploreProgress } from "@/components/explore-galle/motion/useExploreCinema";
import type { Destination } from "@/lib/destinations";
import { destinationPhotos } from "@/lib/exploreGalleMedia";
import { motion, useTransform } from "framer-motion";
import Image from "next/image";

export default function BeachChapter({
  destinations,
  note,
}: {
  destinations: readonly Destination[];
  note: string;
}) {
  const featured = destinations[0];
  const rest = destinations.slice(1);
  const photo = featured ? destinationPhotos[featured.id] : undefined;
  const { ref, progress, cinema, prefersReducedMotion } = useExploreProgress();
  const scale = useTransform(progress, [0, 1], [1.07, 1]);
  const y = useTransform(progress, [0, 1], ["6%", "-6%"]);
  const clip = useTransform(progress, [0, 0.18], ["inset(0% 12% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const textY = useTransform(progress, [0, 0.25, 0.85, 1], [20, 0, 0, -24]);

  return (
    <section id="beaches" className="bg-[#203C30] text-[#F4F0E7]">
      <article
        id={featured?.slug}
        ref={ref}
        className={cinema ? "relative lg:min-h-[180vh]" : "relative"}
      >
        <div
          className={
            cinema
              ? "sticky top-0 h-screen min-h-[100svh] overflow-hidden bg-[#203C30]"
              : "relative min-h-[70svh] overflow-hidden bg-[#203C30]"
          }
        >
          {featured && photo ? (
            <>
              <motion.div
                className="absolute inset-0"
                style={{ clipPath: cinema && !prefersReducedMotion ? clip : "inset(0% 0% 0% 0%)" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    scale: cinema && !prefersReducedMotion ? scale : 1,
                    y: cinema && !prefersReducedMotion ? y : 0,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    quality={82}
                    className="object-cover"
                    style={{ objectPosition: photo.objectPosition }}
                  />
                </motion.div>
              </motion.div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(32, 60, 48, 0.78) 0%, rgba(32, 60, 48, 0.28) 55%, rgba(32, 60, 48, 0.12) 100%)",
                }}
                aria-hidden="true"
              />
              <motion.div
                className="editorial-container relative z-10 flex h-full min-h-[70svh] items-end py-16 lg:items-center"
                style={{ y: cinema && !prefersReducedMotion ? textY : 0 }}
              >
                <div className="max-w-xl">
                  <p className="font-sans text-[0.65rem] font-semibold tracking-[0.32em] text-[#D7C5A7]">01 / 04</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-[#D7C5A7]">
                    Where the Ocean Meets the Shore
                  </p>
                  <h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">{featured.name}</h2>
                  <p className="mt-6 text-base font-light leading-8 text-[#F4F0E7]">{featured.description}</p>
                </div>
              </motion.div>
            </>
          ) : null}
        </div>
      </article>

      <div className="bg-[#F4F0E7] text-[#203C30]">
        <div className="editorial-container py-16 lg:py-20">
          <p className="max-w-2xl text-sm leading-7 text-[#203C30]">{note}</p>
          {rest.map((destination, index) => (
            <DestinationFilmRow
              key={destination.id}
              destination={destination}
              photo={destinationPhotos[destination.id]}
              index={index + 1}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
