"use client";

import { apartmentsEase } from "@/components/apartments/apartmentsMotion";
import ApartmentsMotif from "@/components/apartments/ApartmentsMotif";
import { stayYourWay } from "@/lib/apartments";
import { contact } from "@/lib/site";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function ApartmentStayCta() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#203C30] py-20 text-[#F4F0E7] lg:py-28">
      <motion.div
        className="pointer-events-none absolute -right-10 top-8 opacity-[0.08] text-[#D7C5A7] max-sm:hidden"
        animate={prefersReducedMotion ? undefined : { y: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ApartmentsMotif className="h-[420px] w-[420px]" />
      </motion.div>

      <div className="editorial-container relative z-10 max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#A3AA88]">Reservations</p>
        <motion.h2
          className="mt-5 font-display text-4xl leading-tight sm:text-5xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: apartmentsEase }}
        >
          {stayYourWay.heading}
        </motion.h2>
        <p className="mt-6 text-base font-light leading-8 text-[#F4F0E7]/85">{stayYourWay.copy}</p>
        <p className="mt-5 text-sm leading-7 text-[#D7C5A7]">{stayYourWay.enquiryNote}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={stayYourWay.ctaHref}
            className="inline-flex min-h-11 items-center justify-center border border-[#D7C5A7] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4F0E7] transition-colors duration-300 hover:bg-[#F4F0E7] hover:text-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7] max-sm:w-full"
          >
            Enquire About Your Stay
          </Link>
          <Link
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#D7C5A7] transition-colors hover:text-[#F4F0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C5A7] max-sm:w-full"
          >
            WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
