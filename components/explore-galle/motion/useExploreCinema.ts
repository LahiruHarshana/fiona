"use client";

import { useScroll, useSpring, useReducedMotion, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function useExploreCinema() {
  const prefersReducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return {
    prefersReducedMotion: Boolean(prefersReducedMotion),
    desktop,
    cinema: Boolean(desktop && !prefersReducedMotion),
  };
}

export function useExploreProgress(offset: ["start start" | "start end", "end end" | "end start"] = ["start start", "end end"]) {
  const ref = useRef<HTMLElement>(null);
  const { prefersReducedMotion, desktop, cinema } = useExploreCinema();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001, mass: 0.35 });

  return {
    ref,
    progress: progress as MotionValue<number>,
    prefersReducedMotion,
    desktop,
    cinema,
  };
}
