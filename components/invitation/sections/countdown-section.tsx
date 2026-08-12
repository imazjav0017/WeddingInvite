"use client";

import { CountdownClock } from "@/components/invitation/countdown-clock";
import { FadeIn } from "@/components/motion/fade-in";
import { motion, useReducedMotion } from "motion/react";
import type { InvitationVariant } from "@/lib/types/invitation";

type CountdownSectionProps = {
  invitation: InvitationVariant;
};

export function CountdownSection({ invitation }: CountdownSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h3
          className="mb-3 font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          Counting Down to Forever
        </motion.h3>

        <motion.div
          className="my-6 flex items-center justify-center gap-3 text-[rgb(139,35,55)]"
          initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.92 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.06 }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
        >
          <span className="h-px w-16 bg-current/30" />
          <span aria-hidden="true" className="text-[10px] opacity-50">
            ♥
          </span>
          <span className="h-px w-16 bg-current/30" />
        </motion.div>

        <div className="mt-8">
          <CountdownClock targetIsoDate={invitation.scratchReveal.isoDate} />
        </div>
      </div>
    </FadeIn>
  );
}
