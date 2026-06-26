import PageHero from "@/components/PageHero";
import { HeritageRosette } from "@/components/SriLankanCinematicHome";
import { allVillaImages, villaImages } from "@/lib/villaMedia";
import type { CSSProperties } from "react";

const galleryImages = allVillaImages.map((image) => image.src);

const galleryRows = [
  {
    images: galleryImages.filter((_, index) => index % 3 === 0),
    duration: "82s",
    direction: "left",
    offset: "pl-0",
  },
  {
    images: galleryImages.filter((_, index) => index % 3 === 1),
    duration: "94s",
    direction: "right",
    offset: "pl-20 sm:pl-32",
  },
  {
    images: galleryImages.filter((_, index) => index % 3 === 2),
    duration: "88s",
    direction: "left",
    offset: "pl-10 sm:pl-16",
  },
];

function GalleryTrack({
  images,
  duration,
  direction,
  offset,
}: {
  images: string[];
  duration: string;
  direction: string;
  offset: string;
}) {
  return (
    <div className="gallery-cinema-mask overflow-hidden py-2">
      <div
        className={`gallery-cinema-track flex w-max gap-4 ${offset}`}
        data-direction={direction}
        style={{ "--gallery-duration": duration } as CSSProperties}
      >
        {[...images, ...images].map((image, index) => {
          const duplicate = index >= images.length;

          return (
            <figure
              key={`${image}-${index}`}
              className="group relative h-[46vw] max-h-[360px] min-h-[210px] w-[70vw] max-w-[520px] min-w-[260px] shrink-0 overflow-hidden border border-gold/20 bg-paper shadow-modern sm:h-[34vw] sm:w-[48vw] lg:h-[29vw] lg:w-[34vw] xl:h-[360px] xl:w-[520px]"
              aria-hidden={duplicate ? "true" : undefined}
            >
              <img
                src={image}
                alt={duplicate ? "" : "Fiona Villa gallery image"}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1800ms] ease-smooth group-hover:scale-[1.035]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-olive-900/18 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-35"
                aria-hidden="true"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <main className="bg-ivory">
      <PageHero
        eyebrow="Gallery"
        title="The Fiona Villa photo story in motion."
        copy="A single flowing gallery brings the villa images together: arrival, garden, balcony, guest moments, kitchens, and apartment rooms."
        image={villaImages.drone[8]}
      />

      <section className="relative isolate overflow-hidden bg-cream py-16 text-olive-900 sm:py-20 lg:py-24">
        <div className="absolute -right-56 top-10 opacity-[0.045] pointer-events-none mix-blend-multiply max-sm:-right-44">
          <HeritageRosette className="h-[700px] w-[700px] text-olive-900 max-sm:h-[340px] max-sm:w-[340px]" />
        </div>

        <div className="editorial-container relative z-10 mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="fine-label">Continuous Gallery</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-light leading-tight text-olive-900 max-sm:text-[2.55rem] sm:text-6xl">
              One smooth stream, all together.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-olive-700">
            The images drift on their own in a seamless loop, so the gallery feels more like a slow film than a set of separate albums.
          </p>
        </div>

        <div className="relative z-10 space-y-5">
          {galleryRows.map((row) => (
            <GalleryTrack key={row.duration} {...row} />
          ))}
        </div>
      </section>
    </main>
  );
}
