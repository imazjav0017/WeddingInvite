"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

const createContainerVariants = (
  prefersReducedMotion: boolean | null,
  delay: number,
  stagger: number,
): Variants => ({
  hidden: { opacity: prefersReducedMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion
      ? { duration: 0.01 }
      : {
          delayChildren: delay,
          staggerChildren: stagger,
        },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Stagger({
  children,
  className,
  delay = 0.04,
  stagger = 0.08,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={createContainerVariants(prefersReducedMotion, delay, stagger)}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={prefersReducedMotion ? { hidden: {}, visible: {} } : itemVariants}
    >
      {children}
    </motion.div>
  );
}
