"use client";

import GalleryPhotoTile from "@/components/gallery/GalleryPhotoTile";
import {
  galleryFilters,
  galleryPhotosByCategory,
  type GalleryFilterId,
} from "@/lib/gallery";
import { trapTabKey } from "@/lib/focusTrap";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export default function GalleryExperience() {
  const filterId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<GalleryFilterId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const photos = galleryPhotosByCategory(filter);
  const lightboxPhoto = lightboxIndex === null ? null : photos[lightboxIndex];

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const showRelative = useCallback(
    (step: number) => {
      setLightboxIndex((current) => {
        if (current === null || photos.length === 0) {
          return current;
        }

        return (current + step + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (lightboxPhoto) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();

      return () => {
        document.body.style.overflow = previous;
      };
    }

    return undefined;
  }, [lightboxPhoto]);

  useEffect(() => {
    if (lightboxPhoto === null) {
      return undefined;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showRelative(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showRelative(-1);
      }

      if (dialogRef.current) {
        trapTabKey(event, dialogRef.current);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, lightboxPhoto, showRelative]);

  const openPhoto = (index: number, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setLightboxIndex(index);
  };

  return (
    <section className="relative isolate py-12 lg:py-16" aria-labelledby={`${filterId}-heading`}>
      <div className="editorial-container">
        <h2 id={`${filterId}-heading`} className="font-display text-4xl leading-tight text-[#203C30] sm:text-5xl">
          The Fiona photograph collection
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#203C30]/75">
          A curated set of genuine property photographs. Kitchens, the balcony and the garden are parts of
          the stay, not additional apartments. The upper suite has two separate bedrooms.
        </p>

        <div
          role="tablist"
          aria-label="Gallery categories"
          className="mt-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
          onKeyDown={(event) => {
            const ids = galleryFilters.map((item) => item.id);
            const current = ids.indexOf(filter);
            if (current < 0) {
              return;
            }

            const focusTab = (id: GalleryFilterId) => {
              setFilter(id);
              window.requestAnimationFrame(() => {
                document.getElementById(`${filterId}-tab-${id}`)?.focus();
              });
            };

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              event.preventDefault();
              focusTab(ids[(current + 1) % ids.length]);
            }

            if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
              event.preventDefault();
              focusTab(ids[(current - 1 + ids.length) % ids.length]);
            }

            if (event.key === "Home") {
              event.preventDefault();
              focusTab(ids[0]);
            }

            if (event.key === "End") {
              event.preventDefault();
              focusTab(ids[ids.length - 1]);
            }
          }}
        >
          {galleryFilters.map((item) => {
            const selected = filter === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${filterId}-panel`}
                tabIndex={selected ? 0 : -1}
                id={`${filterId}-tab-${item.id}`}
                title={item.label}
                onClick={() => {
                  setFilter(item.id);
                  setLightboxIndex(null);
                }}
                className={`min-h-11 shrink-0 border-b-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                  selected
                    ? "border-[#244D39] text-[#203C30]"
                    : "border-transparent text-[#244D39]/70 hover:text-[#203C30]"
                }`}
              >
                <span className="sm:hidden">{item.shortLabel}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#244D39]/80" aria-live="polite">
          Showing {photos.length} {photos.length === 1 ? "photograph" : "photographs"}
          {filter === "all" ? "" : ` · ${galleryFilters.find((item) => item.id === filter)?.label}`}
        </p>
      </div>

      <div
        id={`${filterId}-panel`}
        role="tabpanel"
        aria-labelledby={`${filterId}-tab-${filter}`}
        className="editorial-container mt-8"
      >
        {photos.length === 0 ? (
          <p className="border border-[#D7C5A7] bg-[#F4F0E7] p-8 text-sm text-[#203C30]">
            No photographs are published in this category yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
            {photos.map((photo, index) => {
              const featured = filter === "all" && index === 0;
              const span = featured
                ? "sm:col-span-2 lg:col-span-8"
                : index % 7 === 3
                  ? "lg:col-span-8"
                  : "lg:col-span-4";

              return (
                <li key={photo.id} className={span}>
                  <GalleryPhotoTile
                    photo={photo}
                    featured={featured}
                    index={index}
                    categoryLabel={galleryFilters.find((item) => item.id === photo.category)?.shortLabel}
                    onOpen={openPhoto}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {lightboxPhoto ? (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#203C30]/92 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${filterId}-lightbox-title`}
          onClick={closeLightbox}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            touchStartX.current = null;

            if (start === null || end === undefined) {
              return;
            }

            const delta = end - start;
            if (delta > 56) {
              showRelative(-1);
            } else if (delta < -56) {
              showRelative(1);
            }
          }}
        >
          <div
            className="relative flex h-full w-full max-w-6xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 text-[#F4F0E7]">
              <div>
                <p id={`${filterId}-lightbox-title`} className="font-display text-2xl leading-tight sm:text-3xl">
                  {lightboxPhoto.title}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#D7C5A7]">
                  {lightboxIndex! + 1} / {photos.length}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeLightbox}
                className="min-h-11 border border-[#D7C5A7] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F4F0E7] hover:bg-[#F4F0E7] hover:text-[#203C30]"
              >
                Close
              </button>
            </div>

            <div className="relative mt-4 min-h-0 flex-1">
              <Image
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                fill
                sizes="100vw"
                quality={88}
                priority
                className="object-contain"
              />
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#F4F0E7]/85">
              {lightboxPhoto.description ?? lightboxPhoto.alt}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => showRelative(-1)}
                className="min-h-11 flex-1 border border-[#D7C5A7] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F4F0E7] hover:bg-[#F4F0E7] hover:text-[#203C30] sm:flex-none"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => showRelative(1)}
                className="min-h-11 flex-1 border border-[#D7C5A7] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F4F0E7] hover:bg-[#F4F0E7] hover:text-[#203C30] sm:flex-none"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
