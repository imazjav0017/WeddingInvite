"use client";

import { DecorativeDivider } from "@/components/invitation/decorative-divider";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant } from "@/lib/types/invitation";
import { motion, useReducedMotion } from "motion/react";

type TransportationSectionProps = {
  invitation: InvitationVariant;
};

export function TransportationSection({
  invitation,
}: TransportationSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const transportation = invitation.transportation;

  if (!transportation.enabled) {
    return null;
  }

  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <div className="mx-auto max-w-md text-center">
        <motion.div
          aria-hidden="true"
          className="mx-auto mb-3 h-7 w-7 text-[rgb(139,35,55)]"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        >
          <svg
            className="h-full w-full"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 16H9m10-5-1.3-4.35A1.5 1.5 0 0 0 16.26 5H7.74a1.5 1.5 0 0 0-1.44 1.65L5 11m14 0H5m14 0v5m-14-5v5m2 0h0m10 0h0M7 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
          </svg>
        </motion.div>

        <motion.h3
          className="mb-2 text-center font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          {transportation.title}
        </motion.h3>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.92 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.06 }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
        >
          <DecorativeDivider className="my-6 text-[rgb(139,35,55)]" />
        </motion.div>

        <motion.p
          className="mx-auto max-w-md whitespace-pre-line leading-relaxed text-[var(--muted)]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.48, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          {transportation.message}
        </motion.p>
      </div>
    </FadeIn>
  );
}
