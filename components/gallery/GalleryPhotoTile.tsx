"use client";

import styles from "@/components/luxury-motion/luxury.module.css";
import type { GalleryPhoto } from "@/lib/gallery";
import { useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function GalleryPhotoTile({
  photo,
  featured,
  index,
  categoryLabel,
  onOpen,
}: {
  photo: GalleryPhoto;
  featured: boolean;
  index: number;
  categoryLabel?: string;
  onOpen: (index: number, button: HTMLButtonElement) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const maskHeavy = index < 6;
  const revealClass = !prefersReducedMotion && maskHeavy && inView
    ? index % 3 === 0
      ? styles.revealUp
      : index % 2 === 0
        ? styles.revealLeft
        : styles.revealRight
    : "";

  const aspect = featured
    ? "aspect-[4/5] sm:aspect-[16/10]"
    : photo.height > photo.width
      ? "aspect-[4/5]"
      : index % 5 === 2
        ? "aspect-[5/4]"
        : "aspect-[3/2]";

  return (
    <button
      ref={ref}
      type="button"
      onClick={(event) => onOpen(index, event.currentTarget)}
      className={`group relative block w-full overflow-hidden bg-[#203C30] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39] ${revealClass}`}
      aria-label={`Open photograph: ${photo.title}. ${photo.alt}`}
    >
      <span className={`relative block ${aspect}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          quality={82}
          priority={index < 2}
          loading={index < 2 ? "eager" : "lazy"}
          className={`object-cover ${
            prefersReducedMotion ? "" : "transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          }`}
        />
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#203C30]/80 to-transparent p-4 pt-10 text-[#F4F0E7]">
        <span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#D7C5A7]">
          {categoryLabel}
        </span>
        <span className="mt-1 block font-display text-xl leading-tight">{photo.title}</span>
      </span>
    </button>
  );
}
