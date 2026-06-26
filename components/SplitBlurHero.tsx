"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { villaImages } from "@/lib/villaMedia";

export default function SplitBlurHero() {
  const bgImage = villaImages.drone[8]; // Same as heroDay in CinematicHero

  return (
    <section className="relative h-screen w-full overflow-hidden bg-olive-900">
      {/* Base Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Left Blur Panel */}
      <div className="absolute inset-y-0 left-0 w-1/2 backdrop-blur-[24px] bg-black/10 z-10 border-r border-white/10" />

      {/* Navigation Layer */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-10 py-8 text-xs font-medium uppercase tracking-widest text-white/90">
        <div className="flex items-center gap-6">
          <span>Follow Us</span>
          <div className="flex gap-4">
            {/* Social Placeholders */}
            <span className="h-4 w-4 rounded-full border border-white/50"></span>
            <span className="h-4 w-4 rounded-full border border-white/50"></span>
            <span className="h-4 w-4 rounded-full border border-white/50"></span>
          </div>
        </div>
        <div className="flex gap-12">
          <Link href="/villas" className="hover:text-white transition-colors">Villas</Link>
          <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
          <Link href="/retreat" className="hover:text-white transition-colors">Retreat</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>

      {/* Main Text */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {/* Left Text: Cutout (Transparent text with fixed background) */}
        <h1 
          className="absolute text-[18vw] font-display font-bold uppercase leading-none tracking-tight bg-cover bg-center bg-no-repeat bg-fixed bg-clip-text text-transparent"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            clipPath: 'inset(0 50% 0 0)',
            WebkitBackgroundClip: 'text'
          }}
        >
          FIONA
        </h1>

        {/* Right Text: Solid White */}
        <h1 
          className="absolute text-[18vw] font-display font-bold uppercase leading-none tracking-tight text-white"
          style={{ 
            clipPath: 'inset(0 0 0 50%)'
          }}
        >
          FIONA
        </h1>
      </div>

      {/* Bottom Content Left */}
      <div className="absolute bottom-16 left-16 z-30 max-w-sm text-white">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl font-light">01</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-wide ml-2">DISCOVER FIONA</h2>
        </div>
        <p className="text-sm text-white/70 leading-relaxed mb-8">
          A warm house in a green pocket. Courtyard paths, soft planting, shaded walls, and the glow of the veranda.
        </p>
        <Link href="/villas" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] hover:text-white/80 transition-colors">
          View All Villas
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Vertical Text Right */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30">
        <p className="text-white/40 text-sm font-light tracking-[0.8em] [writing-mode:vertical-rl] rotate-180 uppercase">
          South Coast
        </p>
      </div>
    </section>
  );
}
