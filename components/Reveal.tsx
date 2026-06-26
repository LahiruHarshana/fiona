"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Direction = "up" | "down" | "left" | "right" | "none" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  once?: boolean;
};

const initial: Record<Direction, Record<string, number>> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: -60 },
  right: { x: 60 },
  none: {},
  scale: { scale: 0.92, y: 30 },
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initial[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...initial[direction] },
        visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
