"use client";

import HomeMotif from "@/components/home/HomeMotif";
import HomePhoto from "@/components/home/HomePhoto";
import { homeEase } from "@/components/home/homeMotion";
import { homepageWelcome } from "@/lib/homepage";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const headingLines = ["Where Tropical Nature Meets", "the Comfort of Home."];

export default function HomeWelcome() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="welcome" className="relative isolate overflow-x-hidden bg-[#F4F0E7] py-16 lg:py-28">
      <div className="pointer-events-none absolute -right-16 bottom-0 opacity-[0.05] text-[#203C30] max-lg:hidden">
        <HomeMotif className="h-[380px] w-[380px]" />
      </div>
      <div className="editorial-container relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:gap-16">
        <HomePhoto
          src={homepageWelcome.photo.src}
          alt={homepageWelcome.photo.alt}
          sizes="(min-width: 1024px) 58vw, 100vw"
          side="left"
        />
        <div>
          <motion.p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#A3AA88]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: homeEase }}
          >
            01 — Welcome to Fiona
          </motion.p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-[#203C30] max-sm:text-[2.15rem] sm:text-5xl">
            {headingLines.map((line, index) => (
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
            transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: prefersReducedMotion ? 0 : 0.28, ease: homeEase }}
          >
            {homepageWelcome.copy}
          </motion.p>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.4, ease: homeEase }}
          >
            <Link
              href={homepageWelcome.ctaHref}
              className="mt-8 inline-flex min-h-11 items-center justify-center bg-[#244D39] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4F0E7] transition-colors hover:bg-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39] max-sm:w-full"
            >
              {homepageWelcome.ctaLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
