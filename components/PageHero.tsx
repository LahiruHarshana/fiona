"use client";

import { MakaraLineArt } from "@/components/SriLankanCinematicHome";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
};

const photoWash =
  "linear-gradient(105deg, rgba(253,251,247,0.36) 0%, rgba(253,251,247,0.14) 30%, rgba(253,251,247,0.04) 52%, rgba(253,251,247,0) 70%)";
const edgeBlend =
  "linear-gradient(180deg, rgba(32,60,48,0.16) 0%, rgba(32,60,48,0.03) 20%, rgba(253,251,247,0) 50%, rgba(253,251,247,0.36) 100%)";

export default function PageHero({ eyebrow, title, copy, image }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const washOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[62svh] overflow-hidden bg-[#243328] pt-24 max-sm:min-h-[56svh] max-sm:pt-20"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: prefersReducedMotion ? 0 : bgY,
          scale: prefersReducedMotion ? 1 : 1.1,
        }}
        aria-hidden="true"
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{ opacity: prefersReducedMotion ? 1 : washOpacity }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{ background: `${photoWash}, ${edgeBlend}` }}
        />
      </motion.div>

      <div className="pointer-events-none absolute -right-24 top-0 opacity-[0.04] mix-blend-multiply max-sm:-right-44 max-sm:top-10">
        <MakaraLineArt className="h-[800px] w-[800px] text-olive-900 max-sm:h-[420px] max-sm:w-[420px]" />
      </div>

      <div className="editorial-container relative z-10 flex items-center py-20 max-sm:py-14">
        <motion.div
          className="max-w-3xl bg-gradient-to-r from-[#FDFBF7]/80 via-[#FDFBF7]/45 to-transparent py-6 pr-10 max-sm:from-[#FDFBF7]/88 max-sm:via-[#FDFBF7]/55"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="fine-label">{eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-olive-900 max-sm:text-[2.85rem] max-sm:leading-[0.98] sm:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-olive-900/90 font-light max-sm:text-base max-sm:leading-7">{copy}</p>
        </motion.div>
      </div>
    </section>
  );
}
