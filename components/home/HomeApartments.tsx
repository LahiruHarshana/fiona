"use client";

import HomePhoto from "@/components/home/HomePhoto";
import { homeEase } from "@/components/home/homeMotion";
import { homepageApartments } from "@/lib/homepage";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function HomeApartments() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="discover-apartments" className="relative isolate overflow-x-hidden border-y border-fiona-accent/55 bg-fiona-ivory py-16 lg:py-28">
      <div className="editorial-container">
        <motion.div
          className="max-w-3xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: homeEase }}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-fiona-brand">
            03 — Discover Our Apartments
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-[#203C30] sm:text-5xl">
            {homepageApartments.heading}
          </h2>
          <p className="mt-6 text-base font-light leading-8 text-fiona-ink/90">{homepageApartments.intro}</p>
        </motion.div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {homepageApartments.units.map((unit, index) => {
            const photoLeft = index % 2 === 0;

            return (
              <article
                key={unit.id}
                className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:gap-16"
              >
                <motion.div
                  className={photoLeft ? "lg:col-start-1" : "lg:col-start-2 lg:row-start-1"}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: photoLeft ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: homeEase }}
                >
                  <HomePhoto
                    src={unit.photo.src}
                    alt={unit.photo.alt}
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    side={photoLeft ? "left" : "right"}
                    className="aspect-[4/3] lg:aspect-auto lg:h-[min(68vh,700px)]"
                    objectPosition="center 40%"
                  />
                </motion.div>
                <motion.div
                  className={photoLeft ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: photoLeft ? 28 : -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: homeEase }}
                >
                  <p className="font-sans text-[11px] tracking-[0.28em] text-fiona-brand">
                    {String(index + 1).padStart(2, "0")} / 02
                  </p>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-[#203C30] sm:text-4xl">{unit.name}</h3>
                  <p className="mt-5 text-base font-light leading-8 text-fiona-ink/90">{unit.copy}</p>
                  <ul className="mt-7 space-y-3">
                    {unit.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="border-t border-[#D7C5A7]/80 pt-3 text-sm text-[#203C30]"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={unit.href}
                    className="mt-8 inline-flex min-h-11 items-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#244D39] transition-colors hover:text-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39]"
                  >
                    {unit.ctaLabel}
                    <span aria-hidden="true" className="ml-2">
                      →
                    </span>
                  </Link>
                </motion.div>
              </article>
            );
          })}
        </div>

        <motion.div
          className="mt-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: homeEase }}
        >
          <Link
            href={homepageApartments.ctaHref}
            className="inline-flex min-h-11 items-center justify-center border border-[#244D39] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#244D39] transition-colors hover:bg-[#244D39] hover:text-[#F4F0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39] max-sm:w-full"
          >
            {homepageApartments.ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
