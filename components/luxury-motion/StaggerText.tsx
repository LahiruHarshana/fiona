"use client";

import { luxuryEase, splitHeadline } from "@/components/luxury-motion/motion";
import { motion, useReducedMotion } from "framer-motion";

export default function StaggerText({
  text,
  as: Tag = "h2",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const lines = splitHeadline(text);

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <motion.span
          key={`${line}-${index}`}
          className="block overflow-hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.1 * index, ease: luxuryEase }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
