"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Leaf, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    eyebrow: "Private Botanical Villas",
    copy: "Warm verandas, mature planting, and the hush of coastland mornings set the pace.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=85",
    eyebrow: "Poolside Quiet",
    copy: "Days unfold between shaded swims, slow meals, and a garden that always feels alive.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2400&q=85",
    eyebrow: "Coastal Rituals",
    copy: "A retreat for unhurried arrivals, candlelit dinners, and restorative island air.",
  },
];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5400);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const slide = slides[activeSlide];

  return (
    <section className="relative isolate flex min-h-[86svh] overflow-hidden bg-ivory pt-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.15, ease: smoothEase }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,246,236,0.92) 0%, rgba(250,246,236,0.72) 48%, rgba(250,246,236,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="editorial-container relative z-10 flex min-h-[86svh] items-center py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="mb-7 flex items-center justify-center gap-1.5 text-gold-deep"
            aria-label="Five star retreat"
          >
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide.eyebrow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.34 }}
              className="fine-label"
            >
              {slide.eyebrow}
            </motion.p>
          </AnimatePresence>

          <h1 className="mt-5 font-display text-6xl leading-[0.95] text-olive-900 sm:text-7xl lg:text-8xl">
            Villa FIONA
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide.copy}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-olive-500 sm:text-lg"
            >
              {slide.copy}
            </motion.p>
          </AnimatePresence>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/villas"
              className="inline-flex items-center gap-3 border border-olive-700 bg-olive-700 px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-olive-900"
            >
              Explore Villas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/retreat"
              className="inline-flex items-center gap-3 border border-gold-soft bg-paper/80 px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-olive-900 transition-colors duration-300 hover:border-gold hover:text-gold-deep"
            >
              <Leaf className="h-4 w-4 text-sage" aria-hidden="true" />
              The Retreat
            </Link>
          </div>

          <div className="mt-12 flex justify-center gap-3">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.eyebrow}
                aria-label={`Show ${item.eyebrow}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 transition-all duration-300 ${
                  index === activeSlide ? "w-10 bg-gold" : "w-2.5 bg-sage-soft hover:bg-sage"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
