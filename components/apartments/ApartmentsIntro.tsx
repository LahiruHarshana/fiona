"use client";

import { apartmentsEase } from "@/components/apartments/apartmentsMotion";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type Chapter = {
  href: string;
  index: string;
  name: string;
};

export default function ApartmentsIntro({
  copy,
  chapters,
}: {
  copy: string;
  chapters: readonly Chapter[];
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F4F0E7] py-16 lg:py-24">
      <div className="editorial-container relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-end">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: apartmentsEase }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-fiona-brand">Two Distinctive Ways to Stay</p>
          <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-fiona-ink/90 max-sm:text-base">
            {copy}
          </p>
        </motion.div>

        <nav aria-label="Apartment chapters" className="flex gap-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.href}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.12 * index, ease: apartmentsEase }}
            >
              <Link
                href={chapter.href}
                className="group block min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244D39]"
              >
                <span className="block font-sans text-sm tracking-[0.28em] text-[#203C30]">{chapter.index}</span>
                <span className="mt-2 block max-w-[11rem] text-xs uppercase tracking-[0.16em] text-fiona-brand transition-colors group-hover:text-fiona-ink">
                  {chapter.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </section>
  );
}
