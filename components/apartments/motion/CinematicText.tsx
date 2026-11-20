"use client";

import { apartmentsEase } from "@/components/apartments/apartmentsMotion";
import { motion, useReducedMotion } from "framer-motion";

export function splitLines(headline: string) {
  if (!headline.includes(". ")) {
    return [headline];
  }

  return headline
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.endsWith(".") ? line : `${line}.`));
}

export default function CinematicText({
  text,
  as: Tag = "h2",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const lines = splitLines(text);

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={prefersReducedMotion ? false : { y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.85, delay: prefersReducedMotion ? 0 : 0.08 * index, ease: apartmentsEase }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
