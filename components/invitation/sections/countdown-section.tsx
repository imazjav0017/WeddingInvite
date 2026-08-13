"use client";

import { CountdownClock } from "@/components/invitation/countdown-clock";
import { DecorativeDivider } from "@/components/invitation/decorative-divider";
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
          initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.92 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.06 }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
        >
          <DecorativeDivider className="my-6 text-[rgb(139,35,55)]" />
        </motion.div>

        <div className="mt-8">
          <CountdownClock targetIsoDate={invitation.scratchReveal.isoDate} />
        </div>
      </div>
    </FadeIn>
  );
}
