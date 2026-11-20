"use client";

import HomeMotif from "@/components/home/HomeMotif";
import { homeEase } from "@/components/home/homeMotion";
import { homepageSouthCoast } from "@/lib/homepage";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function HomeSouthCoast() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="southern-sri-lanka" className="relative isolate overflow-hidden bg-[#203C30] py-20 text-[#F4F0E7] lg:py-28">
      <div className="pointer-events-none absolute -right-10 top-8 opacity-[0.08] text-[#D7C5A7] max-sm:hidden">
        <HomeMotif className="h-[420px] w-[420px]" />
      </div>
      <div className="editorial-container relative max-w-3xl">
        <motion.p
          className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#D7C5A7]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: homeEase }}
        >
          05 — Discover Southern Sri Lanka
        </motion.p>
        <motion.h2
          className="mt-5 font-display text-4xl leading-tight sm:text-5xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: homeEase }}
        >
          {homepageSouthCoast.heading}
        </motion.h2>
        <motion.p
          className="mt-6 text-base font-light leading-8 text-[#F4F0E7]/85"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.12, ease: homeEase }}
        >
          {homepageSouthCoast.copy}
        </motion.p>
        <p className="mt-4 text-sm leading-7 text-[#D7C5A7]/90">{homepageSouthCoast.note}</p>
        <Link
          href={homepageSouthCoast.ctaHref}
          className="mt-8 inline-flex min-h-11 items-center justify-center border border-[#D7C5A7] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4F0E7] transition-colors hover:bg-[#F4F0E7] hover:text-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7] max-sm:w-full"
        >
          {homepageSouthCoast.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
