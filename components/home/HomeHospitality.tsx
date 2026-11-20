"use client";

import HomePhoto from "@/components/home/HomePhoto";
import { homeEase, splitHeadline } from "@/components/home/homeMotion";
import { homepageHospitality } from "@/lib/homepage";
import { motion, useReducedMotion } from "framer-motion";

export default function HomeHospitality() {
  const prefersReducedMotion = useReducedMotion();
  const lines = splitHeadline(homepageHospitality.heading);

  return (
    <section id="hospitality" className="relative isolate overflow-x-hidden bg-[#F4F0E7] py-16 lg:py-28">
      <div className="editorial-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:gap-16">
        <HomePhoto
          src={homepageHospitality.photo.src}
          alt={homepageHospitality.photo.alt}
          sizes="(min-width: 1024px) 58vw, 100vw"
          side="left"
          objectPosition="center 60%"
        />
        <div>
          <motion.p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#A3AA88]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: homeEase }}
          >
            07 — Hospitality
          </motion.p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-[#203C30] max-sm:text-[2.15rem] sm:text-5xl">
            {lines.map((line, index) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.12 * index, ease: homeEase }}
              >
                {line}
              </motion.span>
            ))}
          </h2>
          <motion.p
            className="mt-6 text-base font-light leading-8 text-[#203C30]/85"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: prefersReducedMotion ? 0 : 0.24, ease: homeEase }}
          >
            {homepageHospitality.copy}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
