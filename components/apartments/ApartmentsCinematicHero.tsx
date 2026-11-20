"use client";

import { apartmentsEase } from "@/components/apartments/apartmentsMotion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type ApartmentsCinematicHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
};

export default function ApartmentsCinematicHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
}: ApartmentsCinematicHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#0D1C16] pt-24 max-sm:pt-20"
    >
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease: apartmentsEase }}
        style={{ y: prefersReducedMotion ? 0 : photoY }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
          style={{ objectPosition: "center 42%" }}
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(13, 28, 22, 0.72) 0%, rgba(13, 28, 22, 0.42) 48%, rgba(13, 28, 22, 0.20) 100%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="editorial-container relative z-10 flex min-h-[78svh] items-center py-16 max-sm:min-h-[70svh] max-sm:py-12 lg:min-h-[88svh] lg:py-24"
        style={{ y: prefersReducedMotion ? 0 : textY }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7C5A7]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.35, ease: apartmentsEase }}
          >
            {eyebrow}
          </motion.p>
          <div className="mt-5 overflow-hidden">
            <motion.h1
              className="font-display text-5xl leading-[1.05] text-[#F4F0E7] max-sm:text-[2.7rem] max-sm:leading-[1.02] sm:text-7xl"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.85, delay: prefersReducedMotion ? 0 : 0.5, ease: apartmentsEase }}
            >
              {title}
            </motion.h1>
          </div>
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-8 text-[#F4F0E7]/90 font-light max-sm:text-base max-sm:leading-7"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.85, ease: apartmentsEase }}
          >
            {copy}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
