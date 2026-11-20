"use client";

import ApartmentFacilities from "@/components/apartments/ApartmentFacilities";
import ApartmentFilmGallery from "@/components/apartments/ApartmentFilmGallery";
import ScrollFilmScene from "@/components/apartments/ScrollFilmScene";
import type { ApartmentProfile } from "@/lib/apartments";
import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function GardenStory({
  apartment,
  layers,
}: {
  apartment: ApartmentProfile;
  layers: readonly { src: string; alt: string }[];
}) {
  return (
    <>
      <ScrollFilmScene id={apartment.id}>
        {({ progress, cinema, prefersReducedMotion }) => (
          <GardenStage
            apartment={apartment}
            layers={layers}
            progress={progress}
            cinema={cinema}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </ScrollFilmScene>

      <div className="bg-[#F4F0E7]">
        <article className="editorial-container grid gap-12 py-16 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:py-24">
          <div>
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#244D39]">
              Chapter 01 — Living in the Green
            </p>
            <h3 className="mt-4 font-display text-3xl leading-tight text-[#203C30] sm:text-4xl">{apartment.name}</h3>
            <p className="mt-6 text-base font-light leading-8 text-[#203C30]">{apartment.description}</p>
            <p className="mt-4 text-sm leading-7 text-[#203C30]">
              <span className="font-medium text-[#244D39]">Ideal for: </span>
              {apartment.idealFor}
            </p>
            <ApartmentFacilities facilities={apartment.facilities} />
            <Link
              href={apartment.enquiryHref}
              className="mt-10 inline-flex min-h-11 items-center justify-center bg-[#244D39] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4F0E7] transition-colors hover:bg-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39]"
            >
              {apartment.ctaLabel}
            </Link>
          </div>
          <ApartmentFilmGallery name={apartment.name} photos={apartment.photos} eager />
        </article>
      </div>
    </>
  );
}

function GardenStage({
  apartment,
  layers,
  progress,
  cinema,
  prefersReducedMotion,
}: {
  apartment: ApartmentProfile;
  layers: readonly { src: string; alt: string }[];
  progress: MotionValue<number>;
  cinema: boolean;
  prefersReducedMotion: boolean;
}) {
  const op0 = useTransform(progress, [0, 0.18, 0.34], [1, 1, 0]);
  const op1 = useTransform(progress, [0.16, 0.32, 0.52, 0.64], [0, 1, 1, 0]);
  const op2 = useTransform(progress, [0.5, 0.64, 0.82, 0.94], [0, 1, 1, 0]);
  const op3 = useTransform(progress, [0.78, 0.92, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0, 0.5, 1], [1.07, 1.02, 1]);
  const y = useTransform(progress, [0, 1], ["6%", "-6%"]);
  const textY = useTransform(progress, [0, 0.2, 0.82, 1], [18, 0, 0, -28]);
  const textOp = useTransform(progress, [0, 0.08, 0.78, 0.94], [1, 1, 1, 0]);
  const amenityOp = useTransform(progress, [0.28, 0.44, 0.72, 0.86], [0, 1, 1, 0]);
  const clip = useTransform(progress, [0, 0.14], ["inset(0% 16% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const opacities = [op0, op1, op2, op3];

  return (
    <div className="absolute inset-0 min-h-[70svh]">
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: cinema && !prefersReducedMotion ? clip : "inset(0% 0% 0% 0%)",
        }}
      >
        {layers.map((layer, index) => (
          <motion.div
            key={`${layer.src}-${index}`}
            className="absolute inset-0"
            style={{
              opacity:
                cinema && !prefersReducedMotion
                  ? index === 0
                    ? 1
                    : opacities[index]
                  : index === 0
                    ? 1
                    : 0,
              scale: cinema && !prefersReducedMotion ? scale : 1,
              y: cinema && !prefersReducedMotion ? y : 0,
            }}
          >
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              sizes="100vw"
              quality={82}
              priority={index === 0}
              className="object-cover"
              style={{ objectPosition: index === 0 ? "center 48%" : "center 40%" }}
            />
          </motion.div>
        ))}
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(32, 60, 48, 0.72) 0%, rgba(32, 60, 48, 0.28) 48%, rgba(32, 60, 48, 0.12) 100%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="editorial-container relative z-10 flex h-full min-h-[70svh] items-end py-16 lg:items-center lg:py-0"
        style={{
          y: cinema && !prefersReducedMotion ? textY : 0,
          opacity: cinema && !prefersReducedMotion ? textOp : 1,
        }}
      >
        <div className="max-w-xl text-[#F4F0E7]">
          <p className="font-sans text-[0.65rem] font-semibold tabular-nums tracking-[0.32em] text-[#D7C5A7]">01 / 02</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D7C5A7]">{apartment.name}</p>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">{apartment.headline}</h2>
          <motion.ul
            className="mt-8 space-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#D7C5A7]"
            style={{ opacity: cinema && !prefersReducedMotion ? amenityOp : 1 }}
          >
            <li>{apartment.floor}</li>
            <li>{apartment.bedrooms}</li>
            <li>{apartment.kitchen}</li>
            <li>{apartment.outdoor}</li>
          </motion.ul>
        </div>
      </motion.div>
    </div>
  );
}
