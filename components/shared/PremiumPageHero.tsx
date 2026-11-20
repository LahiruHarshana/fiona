"use client";

import { luxuryEase, splitHeadline } from "@/components/luxury-motion/motion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type OverlayTone = "garden" | "interior" | "night";

type PremiumPageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  overlay?: OverlayTone;
};

const overlays: Record<OverlayTone, string> = {
  garden:
    "linear-gradient(105deg, rgba(13, 28, 22, 0.70) 0%, rgba(13, 28, 22, 0.42) 46%, rgba(13, 28, 22, 0.22) 100%)",
  interior:
    "linear-gradient(105deg, rgba(13, 28, 22, 0.74) 0%, rgba(13, 28, 22, 0.48) 48%, rgba(13, 28, 22, 0.28) 100%)",
  night:
    "linear-gradient(105deg, rgba(13, 28, 22, 0.58) 0%, rgba(13, 28, 22, 0.34) 50%, rgba(13, 28, 22, 0.18) 100%)",
};

export default function PremiumPageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt = "",
  objectPosition = "center 42%",
  overlay = "garden",
}: PremiumPageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const titleLines = splitHeadline(title);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#0D1C16] pt-24 max-sm:pt-20"
    >
      {image ? (
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            y: prefersReducedMotion ? 0 : bgY,
            scale: prefersReducedMotion ? 1 : bgScale,
          }}
          aria-hidden={imageAlt ? undefined : true}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition }}
          />
        </motion.div>
      ) : null}

      {image ? (
        <div className="absolute inset-0" style={{ background: overlays[overlay] }} aria-hidden="true" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 18% 40%, rgba(202, 174, 105, 0.12), transparent 42%), linear-gradient(180deg, rgba(13, 28, 22, 1) 0%, rgba(24, 42, 34, 1) 100%)",
          }}
          aria-hidden="true"
        />
      )}

      <div className="editorial-container relative z-10 flex min-h-[48svh] items-center py-16 max-sm:min-h-[44svh] max-sm:py-12 lg:min-h-[54svh] lg:py-20">
        <motion.div
          className="max-w-3xl"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D7C5A7]">{eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-[#F4F0E7] max-sm:text-[2.7rem] max-sm:leading-[1.02] sm:text-7xl">
            {titleLines.map((line, index) => (
              <motion.span
                key={`${line}-${index}`}
                className="block overflow-hidden"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: prefersReducedMotion ? 0 : 0.12 * index, ease: luxuryEase }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F4F0E7]/90 font-light max-sm:text-base max-sm:leading-7">
            {copy}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
