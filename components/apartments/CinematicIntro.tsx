"use client";

import { apartmentsEase } from "@/components/apartments/apartmentsMotion";
import { splitLines } from "@/components/apartments/motion/CinematicText";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function CinematicIntro({
  title,
  copy,
  image,
  imageAlt,
}: {
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const lines = splitLines(title);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#203C30] pt-24 max-sm:pt-20">
      <motion.div
        className="absolute inset-0 origin-center"
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.7, ease: apartmentsEase }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            y: prefersReducedMotion ? 0 : photoY,
            scale: prefersReducedMotion ? 1 : photoScale,
          }}
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
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(32, 60, 48, 0.88) 0%, rgba(32, 60, 48, 0.62) 38%, rgba(32, 60, 48, 0.28) 68%, rgba(32, 60, 48, 0.16) 100%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="editorial-container relative z-10 flex min-h-[88svh] flex-col justify-center py-20 max-sm:min-h-[78svh] max-sm:py-14 lg:min-h-[100svh]"
        style={{ y: prefersReducedMotion ? 0 : headingY }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#D7C5A7]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: prefersReducedMotion ? 0 : 0.3, ease: apartmentsEase }}
          >
            The Fiona Collection
          </motion.p>
          <h1 className="mt-6 font-display text-5xl leading-[1.04] text-[#F4F0E7] max-sm:text-[2.7rem] sm:text-7xl">
            {lines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? false : { y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.9, delay: prefersReducedMotion ? 0 : 0.45 + index * 0.12, ease: apartmentsEase }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-8 max-w-2xl text-lg leading-8 text-[#F4F0E7] max-sm:text-base"
            style={{ textShadow: "0 1px 18px rgba(32, 60, 48, 0.9), 0 0 2px rgba(32, 60, 48, 0.65)" }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: prefersReducedMotion ? 0 : 0.95, ease: apartmentsEase }}
          >
            {copy}
          </motion.p>
        </div>

        {prefersReducedMotion ? null : (
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#D7C5A7] max-sm:bottom-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: apartmentsEase }}
          >
            Scroll to explore
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
