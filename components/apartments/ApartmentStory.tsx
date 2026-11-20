"use client";

import ApartmentFacilities from "@/components/apartments/ApartmentFacilities";
import ApartmentGallery from "@/components/apartments/ApartmentGallery";
import styles from "@/components/apartments/apartments.module.css";
import { apartmentsEase } from "@/components/apartments/apartmentsMotion";
import ApartmentsMotif from "@/components/apartments/ApartmentsMotif";
import type { ApartmentProfile } from "@/lib/apartments";
import { contact } from "@/lib/site";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ApartmentStoryProps = {
  apartment: ApartmentProfile;
  index: number;
  total: number;
  storyImage: { src: string; alt: string };
};

function headlineLines(headline: string) {
  return headline
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.endsWith(".") ? line : `${line}.`));
}

export default function ApartmentStory({ apartment, index, total, storyImage }: ApartmentStoryProps) {
  const photoLeft = index % 2 === 0;
  const marker = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const lines = headlineLines(apartment.headline);
  const prefersReducedMotion = useReducedMotion();
  const [desktopMotion, setDesktopMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], photoLeft ? ["8%", "-6%"] : ["-6%", "8%"]);
  const photoScale = useTransform(scrollYProgress, [0.1, 0.55], [1.04, 1]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktopMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return (
    <section
      ref={sectionRef}
      id={apartment.id}
      className={`relative isolate overflow-x-hidden py-16 lg:py-28 ${index % 2 === 1 ? "bg-[#244D39]/6" : "bg-[#F4F0E7]"}`}
    >
      <div
        className={`pointer-events-none absolute -bottom-16 opacity-[0.05] text-[#203C30] max-lg:hidden ${
          photoLeft ? "right-[-4rem]" : "left-[-4rem]"
        }`}
      >
        <ApartmentsMotif className="h-[380px] w-[380px]" />
      </div>

      <div className="editorial-container relative grid items-start gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:gap-16">
        <motion.div
          className={`relative ${photoLeft ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2 lg:row-start-1"}`}
          initial={prefersReducedMotion ? false : { opacity: 0.4 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: apartmentsEase }}
        >
          <div className="lg:sticky lg:top-28">
            <div
              ref={photoRef}
              className={`relative aspect-[4/3] w-full overflow-hidden bg-[#203C30] lg:aspect-auto lg:h-[min(78vh,820px)] ${
                photoInView ? (photoLeft ? styles.revealLeft : styles.revealRight) : ""
              }`}
            >
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{
                  y: prefersReducedMotion || !desktopMotion ? 0 : photoY,
                  scale: prefersReducedMotion || !desktopMotion ? 1 : photoScale,
                }}
              >
                <Image
                  src={storyImage.src}
                  alt={storyImage.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  quality={85}
                  className="object-cover"
                  style={{ objectPosition: photoLeft ? "center 48%" : "center 40%" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`${photoLeft ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`}
          initial={prefersReducedMotion ? false : { opacity: 0, x: photoLeft ? 36 : -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.75, ease: apartmentsEase }}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#A3AA88]">{marker}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-[#244D39]">{apartment.eyebrow}</p>
          <p className="mt-3 font-display text-2xl text-[#203C30] sm:text-3xl">{apartment.name}</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-[#203C30] max-sm:text-[2.15rem] sm:text-5xl">
            {lines.map((line, lineIndex) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  delay: prefersReducedMotion ? 0 : 0.12 * lineIndex,
                  ease: apartmentsEase,
                }}
              >
                {line}
              </motion.span>
            ))}
          </h2>
          <p className="mt-6 text-base font-light leading-8 text-[#203C30]/85">{apartment.description}</p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 border-y border-[#D7C5A7]/80 py-7 text-sm sm:grid-cols-2">
            <div>
              <dt className="uppercase tracking-[0.16em] text-[#A3AA88]">Floor</dt>
              <dd className="mt-1 text-base text-[#203C30]">{apartment.floor}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-[#A3AA88]">Bedrooms</dt>
              <dd className="mt-1 text-base text-[#203C30]">{apartment.bedrooms}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-[#A3AA88]">Bathroom</dt>
              <dd className="mt-1 text-base text-[#203C30]">{apartment.bathroom}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-[#A3AA88]">Kitchen</dt>
              <dd className="mt-1 text-base text-[#203C30]">{apartment.kitchen}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="uppercase tracking-[0.16em] text-[#A3AA88]">Setting</dt>
              <dd className="mt-1 text-base text-[#203C30]">{apartment.outdoor}</dd>
            </div>
          </dl>

          <p className="mt-6 text-sm leading-7 text-[#203C30]/80">
            <span className="font-medium text-[#244D39]">Ideal for: </span>
            {apartment.idealFor}
          </p>

          <ApartmentFacilities facilities={apartment.facilities} />

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={apartment.enquiryHref}
              className="inline-flex min-h-11 items-center justify-center bg-[#244D39] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4F0E7] transition-colors duration-300 hover:bg-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39] max-sm:w-full"
            >
              {apartment.ctaLabel}
            </Link>
            <Link
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#244D39] transition-colors hover:text-[#203C30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39] max-sm:w-full"
            >
              WhatsApp
            </Link>
          </div>

          <div className="mt-12">
            <ApartmentGallery
              name={apartment.name}
              photos={apartment.photos}
              note={apartment.photoNote}
              eager={index === 0}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
