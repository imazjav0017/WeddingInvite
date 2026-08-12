"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Ornament } from "@/components/invitation/ornament";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "gold" | "sage";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  tone = "gold",
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <motion.p
        className="invitation-eyebrow"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
        viewport={{ once: true }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="invitation-title mt-4"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>
      {body ? (
        <motion.p
          className="invitation-copy mt-4"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          {body}
        </motion.p>
      ) : null}
      <Ornament
        className={cn("mt-6", align === "center" ? "justify-center" : "justify-start")}
        tone={tone}
      />
    </div>
  );
}
