"use client";

import styles from "@/components/luxury-motion/luxury.module.css";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Side = "left" | "right" | "up";

export default function MaskedImageReveal({
  src,
  alt,
  sizes,
  side = "left",
  className = "aspect-[4/3] lg:aspect-auto lg:h-[min(72vh,760px)]",
  objectPosition = "center 42%",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  side?: Side;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [desktopMotion, setDesktopMotion] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], side === "right" ? ["-6%", "8%"] : ["8%", "-6%"]);
  const scale = useTransform(scrollYProgress, [0.12, 0.7], [1.05, 1]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktopMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const revealClass = side === "right" ? styles.revealRight : side === "up" ? styles.revealUp : styles.revealLeft;

  return (
    <div ref={frameRef} className={`relative w-full overflow-hidden bg-[#203C30] ${className} ${inView ? revealClass : ""}`}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: prefersReducedMotion || !desktopMotion ? 0 : y,
          scale: prefersReducedMotion || !desktopMotion ? 1 : scale,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={82}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>
    </div>
  );
}
