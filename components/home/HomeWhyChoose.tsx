"use client";

import { homeEase } from "@/components/home/homeMotion";
import { homepageWhyChoose } from "@/lib/homepage";
import { motion, useReducedMotion } from "framer-motion";
import { ChefHat, HeartHandshake, House, Trees, Waves, Wind } from "lucide-react";

const whyIcons = [Waves, House, Wind, ChefHat, Trees, HeartHandshake];

export default function HomeWhyChoose() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="why-choose" className="relative isolate bg-[#F4F0E7] py-16 lg:py-28">
      <div className="editorial-container grid gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: homeEase }}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-fiona-brand">02 — Stay with us</p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-[#203C30] sm:text-5xl">Why Choose Fiona?</h2>
        </motion.div>

        <ul>
          {homepageWhyChoose.map((item, index) => {
            const Icon = whyIcons[index] ?? Trees;

            return (
              <motion.li
                key={item.id}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-[#D7C5A7]/80 py-6 last:border-b"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.06 * index, ease: homeEase }}
              >
                <span className="font-sans text-[11px] tracking-[0.22em] text-fiona-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-start gap-3">
                  <Icon className="mt-1 h-4 w-4 shrink-0 text-fiona-sage" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-2xl text-[#203C30]">{item.title}</h3>
                    <p className="mt-2 text-sm font-light leading-7 text-fiona-ink/90">{item.copy}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
