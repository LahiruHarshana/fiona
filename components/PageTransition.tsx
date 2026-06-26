"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}
