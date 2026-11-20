"use client";

import { homeEase, splitHeadline } from "@/components/home/homeMotion";
import { homepageExperience } from "@/lib/homepage";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HomeExperience() {
  const prefersReducedMotion = useReducedMotion();
  const [desktopMotion, setDesktopMotion] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const lines = splitHeadline(homepageExperience.heading);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktopMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section id="fiona-experience" ref={ref} className="relative isolate min-h-[70vh] overflow-hidden bg-[#203C30]">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: prefersReducedMotion || !desktopMotion ? 0 : y,
          scale: prefersReducedMotion || !desktopMotion ? 1 : scale,
        }}
      >
        <Image
          src={homepageExperience.photo.src}
          alt={homepageExperience.photo.alt}
          fill
          sizes="100vw"
          quality={82}
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(13, 28, 22, 0.78) 0%, rgba(13, 28, 22, 0.42) 48%, rgba(13, 28, 22, 0.18) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="editorial-container relative z-10 flex min-h-[70vh] items-center py-20 lg:py-28">
        <div className="max-w-2xl text-[#F4F0E7]">
          <motion.p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#D7C5A7]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: homeEase }}
          >
            04 — The Fiona Experience
          </motion.p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] sm:text-5xl">
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
            className="mt-6 text-base font-light leading-8 text-[#F4F0E7]/88"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: prefersReducedMotion ? 0 : 0.28, ease: homeEase }}
          >
            {homepageExperience.copy}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
