"use client";

import { apartmentsEase } from "@/components/apartments/apartmentsMotion";
import { useDesktopCinema } from "@/components/apartments/motion/useSceneProgress";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function FilmInterlude({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { cinema, prefersReducedMotion } = useDesktopCinema();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const clip = useTransform(scrollYProgress, [0.1, 0.45], ["inset(22% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#203C30]">
      <motion.div
        className="relative min-h-[56svh] lg:min-h-[72svh]"
        style={{
          clipPath: cinema && !prefersReducedMotion ? clip : "inset(0% 0% 0% 0%)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: cinema && !prefersReducedMotion ? y : 0,
            scale: cinema && !prefersReducedMotion ? scale : 1,
          }}
        >
          <Image src={src} alt={alt} fill sizes="100vw" quality={82} className="object-cover" style={{ objectPosition: "center 40%" }} />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(32,60,48,0.35) 0%, rgba(32,60,48,0.62) 100%)" }}
          aria-hidden="true"
        />
        <div className="editorial-container relative z-10 flex min-h-[56svh] items-center py-16 lg:min-h-[72svh]">
          <div className="max-w-3xl overflow-hidden">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#D7C5A7]">The art of slow living</p>
            <motion.h2
              className="mt-6 font-display text-4xl leading-tight text-[#F4F0E7] sm:text-6xl"
              initial={prefersReducedMotion ? false : { y: 48, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: apartmentsEase }}
            >
              A Little More Space to Slow Down.
            </motion.h2>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
