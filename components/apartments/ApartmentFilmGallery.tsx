"use client";

import type { ApartmentPhoto } from "@/lib/apartments";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useId, useState } from "react";

export default function ApartmentFilmGallery({
  name,
  photos,
  note,
  eager = false,
}: {
  name: string;
  photos: readonly ApartmentPhoto[];
  note?: string;
  eager?: boolean;
}) {
  const [active, setActive] = useState(0);
  const labelId = useId();
  const prefersReducedMotion = useReducedMotion();
  const current = photos[active] ?? photos[0];

  if (!current) {
    return null;
  }

  const select = (index: number) => {
    setActive((index + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col gap-4">
      <figure className="relative overflow-hidden bg-[#203C30]">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                quality={82}
                priority={eager && active === 0}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <figcaption id={labelId} className="sr-only">
          {name} photographs
        </figcaption>
      </figure>

      <div
        role="listbox"
        aria-labelledby={labelId}
        aria-activedescendant={`${labelId}-thumb-${active}`}
        className="grid grid-cols-3 gap-2 sm:grid-cols-6"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            select(active + 1);
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            select(active - 1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            select(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            select(photos.length - 1);
          }
        }}
      >
        {photos.map((photo, index) => {
          const selected = index === active;

          return (
            <button
              key={photo.src}
              id={`${labelId}-thumb-${index}`}
              type="button"
              role="option"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              aria-label={`Show photo ${index + 1} of ${photos.length}: ${photo.alt}`}
              onClick={() => select(index)}
              className={`relative aspect-[4/3] min-h-11 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39] ${
                selected ? "ring-1 ring-[#244D39] ring-offset-2 ring-offset-[#F4F0E7]" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={photo.src} alt="" fill sizes="96px" quality={50} className="object-cover" />
            </button>
          );
        })}
      </div>

      {note ? <p className="text-sm leading-6 text-[#203C30]">{note}</p> : null}
    </div>
  );
}
