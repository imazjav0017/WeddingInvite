"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type InvitationButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "solid" | "ghost";
  onClick?: () => void;
};

export function InvitationButton({
  children,
  href,
  className,
  variant = "solid",
  onClick,
}: InvitationButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] transition duration-300",
    variant === "solid"
      ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--gold-deep)]"
      : "border border-[var(--gold-border)] bg-white/60 text-[var(--ink)] hover:bg-[var(--paper-strong)]",
    className,
  );

  const interactiveProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.015, y: -1 },
        whileTap: { scale: 0.985 },
      };

  if (!href) {
    return (
      <motion.button
        className={classes}
        onClick={onClick}
        transition={{ duration: 0.2 }}
        type="button"
        {...interactiveProps}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div transition={{ duration: 0.2 }} {...interactiveProps}>
      <Link className={classes} href={href} rel="noreferrer" target="_blank">
        {children}
      </Link>
    </motion.div>
  );
}
