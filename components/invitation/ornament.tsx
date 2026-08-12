"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type OrnamentProps = {
  className?: string;
  tone?: "gold" | "sage";
};

export function Ornament({ className, tone = "gold" }: OrnamentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center gap-3",
        tone === "gold" ? "text-[var(--gold)]" : "text-[var(--sage)]",
        className,
      )}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
    >
      <motion.span
        className="h-px w-12 bg-current/45 sm:w-16"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        style={{ originX: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
      />
      <motion.span
        className="text-sm"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
      >
        *
      </motion.span>
      <motion.span
        className="h-px w-12 bg-current/45 sm:w-16"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        style={{ originX: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
      />
    </motion.div>
  );
}
