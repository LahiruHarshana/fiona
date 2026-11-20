"use client";

import { useExploreCinema } from "@/components/explore-galle/motion/useExploreCinema";
import type { Destination } from "@/lib/destinations";
import type { ExplorePhoto } from "@/lib/exploreGalleMedia";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function DestinationFilmRow({
  destination,
  photo,
  index,
  reverse = false,
  tone = "ivory",
}: {
  destination: Destination;
  photo?: ExplorePhoto;
  index: number;
  reverse?: boolean;
  tone?: "ivory" | "night";
}) {
  const ref = useRef<HTMLElement>(null);
  const { cinema, prefersReducedMotion } = useExploreCinema();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0.08, 0.42],
    reverse ? ["inset(0% 0% 0% 18%)", "inset(0% 0% 0% 0%)"] : ["inset(0% 18% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const textY = useTransform(scrollYProgress, [0.15, 0.5], [28, 0]);
  const ink = tone === "night" ? "text-[#F4F0E7]" : "text-[#203C30]";
  const accent = tone === "night" ? "text-[#D7C5A7]" : "text-[#244D39]";

  return (
    <article
      id={destination.slug}
      ref={ref}
      className={`grid items-stretch gap-8 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
    >
      {photo ? (
        <motion.div
          className="relative aspect-[4/3] overflow-hidden bg-[#203C30] lg:aspect-[5/4]"
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
              sizes="(min-width: 1024px) 48vw, 100vw"
              quality={80}
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <div className={`flex min-h-[12rem] items-end border border-[#D7C5A7]/70 p-8 ${tone === "night" ? "border-[#D7C5A7]/35" : ""}`}>
          <p className={`font-display text-3xl leading-tight ${ink}`}>A place to visit in person.</p>
        </div>
      )}

      <motion.div
        className="flex flex-col justify-center lg:py-8"
        style={{ y: cinema && !prefersReducedMotion ? textY : 0 }}
      >
        <p className={`font-sans text-[0.65rem] font-semibold tabular-nums tracking-[0.28em] ${accent}`}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className={`mt-3 text-xs font-bold uppercase tracking-[0.2em] ${accent}`}>
          {destination.independentlyOperated ? "Independently operated" : "Visitor destination"}
          {destination.seasonal ? " · Seasonal" : ""}
        </p>
        <h3 className={`mt-4 font-display text-3xl leading-tight sm:text-4xl ${ink}`}>{destination.name}</h3>
        <p className={`mt-5 text-base font-light leading-8 ${ink}`}>{destination.description}</p>
        {destination.officialUrl ? (
          <a
            href={destination.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex w-fit border-b pb-1 text-xs font-bold uppercase tracking-[0.18em] ${accent} border-current`}
          >
            Official visitor information
          </a>
        ) : null}
      </motion.div>
    </article>
  );
}
