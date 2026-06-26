"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MakaraLineArt } from "@/components/SriLankanCinematicHome";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
};

export default function PageHero({ eyebrow, title, copy, image }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[62svh] overflow-hidden bg-ivory pt-24 max-sm:min-h-[56svh] max-sm:pt-20"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${image})`,
          y: bgY,
          scale: 1.1,
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0"
        style={{ opacity }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(253,251,247,0.92) 0%, rgba(253,251,247,0.55) 40%, rgba(253,251,247,1) 100%)",
          }}
        />
      </motion.div>

      <div className="absolute -right-24 top-0 opacity-[0.04] mix-blend-multiply pointer-events-none max-sm:-right-44 max-sm:top-10">
        <MakaraLineArt className="h-[800px] w-[800px] text-olive-900 max-sm:h-[420px] max-sm:w-[420px]" />
      </div>

      <div className="editorial-container relative z-10 flex items-center py-20 max-sm:py-14">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="fine-label">{eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-olive-900 max-sm:text-[2.85rem] max-sm:leading-[0.98] sm:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-olive-900/80 font-light max-sm:text-base max-sm:leading-7">{copy}</p>
        </motion.div>
      </div>
    </section>
  );
}
