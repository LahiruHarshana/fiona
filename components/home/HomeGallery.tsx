"use client";

import HomePhoto from "@/components/home/HomePhoto";
import { homeEase } from "@/components/home/homeMotion";
import { homepageGallery } from "@/lib/homepage";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeGallery() {
  const prefersReducedMotion = useReducedMotion();
  const [featured, ...supporting] = homepageGallery.photos;

  return (
    <section id="gallery-preview" className="relative isolate bg-[#F4F0E7] py-16 lg:py-28">
      <div className="editorial-container">
        <motion.div
          className="max-w-3xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: homeEase }}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#A3AA88]">06 — Gallery</p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-[#203C30] sm:text-5xl">
            {homepageGallery.heading}
          </h2>
          <p className="mt-6 text-base font-light leading-8 text-[#203C30]/85">{homepageGallery.copy}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-4">
          {featured ? (
            <div className="col-span-2 lg:col-span-8 lg:row-span-2">
              <HomePhoto
                src={featured.src}
                alt={featured.alt}
                sizes="(min-width: 1024px) 66vw, 100vw"
                side="up"
                className="aspect-[4/3] lg:h-full lg:min-h-[420px]"
              />
            </div>
          ) : null}
          {supporting.map((photo, index) => (
            <motion.figure
              key={photo.src}
              className="group relative col-span-1 overflow-hidden bg-[#203C30] lg:col-span-4"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.08 * index, ease: homeEase }}
            >
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  quality={82}
                  className={`object-cover ${prefersReducedMotion ? "" : "transition-transform duration-700 group-hover:scale-[1.04]"}`}
                />
              </span>
            </motion.figure>
          ))}
        </div>

        <Link
          href={homepageGallery.ctaHref}
          className="mt-10 inline-flex min-h-11 items-center justify-center border border-[#244D39] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#244D39] transition-colors hover:bg-[#244D39] hover:text-[#F4F0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39] max-sm:w-full"
        >
          {homepageGallery.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
