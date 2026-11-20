"use client";

import { useSceneProgress } from "@/components/apartments/motion/useSceneProgress";
import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";

export type FilmSceneRender = {
  progress: MotionValue<number>;
  cinema: boolean;
  prefersReducedMotion: boolean;
};

export default function ScrollFilmScene({
  id,
  heightClass = "lg:min-h-[240vh]",
  children,
}: {
  id: string;
  heightClass?: string;
  children: (scene: FilmSceneRender) => ReactNode;
}) {
  const { ref, progress, cinema, prefersReducedMotion } = useSceneProgress();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${heightClass} motion-reduce:lg:min-h-0`}
    >
      <div
        className={
          cinema
            ? "sticky top-0 h-screen min-h-[100svh] overflow-hidden bg-[#203C30]"
            : "relative min-h-[70svh] overflow-hidden bg-[#203C30] lg:sticky lg:top-0 lg:h-screen lg:min-h-[100svh] motion-reduce:lg:relative motion-reduce:lg:h-auto motion-reduce:lg:min-h-[70svh]"
        }
      >
        {children({ progress, cinema, prefersReducedMotion })}
      </div>
    </section>
  );
}
