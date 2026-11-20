"use client";

import { exploreEase } from "@/components/explore-galle/exploreMotion";
import { exploreGalleClosing } from "@/lib/destinations";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function ExploreFinale() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#203C30] py-24 text-[#F4F0E7] lg:py-32">
      <div className="editorial-container relative z-10 max-w-3xl">
        <motion.p
          className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#D7C5A7]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: exploreEase }}
        >
          Your journey begins at Fiona
        </motion.p>
        <motion.h2
          className="mt-5 font-display text-4xl leading-tight sm:text-6xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: exploreEase }}
        >
          {exploreGalleClosing.heading}
        </motion.h2>
        <p className="mt-6 text-base font-light leading-8 text-[#F4F0E7]">{exploreGalleClosing.copy}</p>
        <p className="mt-5 text-sm leading-7 text-[#D7C5A7]">
          Contact Fiona directly. This website does not take instant bookings.
        </p>
        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: prefersReducedMotion ? 0 : 0.12, ease: exploreEase }}
        >
          <Link
            href={exploreGalleClosing.primaryHref}
            className="inline-flex min-h-11 items-center justify-center border border-[#D7C5A7] bg-[#F4F0E7] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#203C30] transition-colors hover:bg-transparent hover:text-[#F4F0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7] max-sm:w-full"
          >
            {exploreGalleClosing.primaryLabel}
          </Link>
          <Link
            href={exploreGalleClosing.secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center border border-[#D7C5A7] px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-[#F4F0E7] transition-colors hover:bg-[#F4F0E7] hover:text-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7] max-sm:w-full"
          >
            {exploreGalleClosing.secondaryLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
