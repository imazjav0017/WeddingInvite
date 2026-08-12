"use client";

import { ScratchReveal } from "@/components/interactions/scratch-reveal";
import { FadeIn } from "@/components/motion/fade-in";
import { motion, useReducedMotion } from "motion/react";
import type { InvitationVariant } from "@/lib/types/invitation";

type ScratchDateSectionProps = {
  invitation: InvitationVariant;
};

export function ScratchDateSection({
  invitation,
}: ScratchDateSectionProps) {
  const { scratchReveal } = invitation;
  const prefersReducedMotion = useReducedMotion();

  return (
    <FadeIn
      className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(251,243,243,0.9),rgba(248,238,236,0.96))] px-6 py-16 md:py-20"
      distance={24}
      duration={0.6}
    >
      <ScratchReveal
        className="mx-auto"
        overlayLabel="Scratch the heart"
      >
        {({ isComplete }) => (
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-[var(--ink)]">
          <span className="sr-only">
            {scratchReveal.dayNumber}
            {scratchReveal.daySuffix} {scratchReveal.month} {scratchReveal.year},{" "}
            {scratchReveal.weekday}, {scratchReveal.time}
          </span>

          <motion.p
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : isComplete
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0.58, scale: 0.96 }
            }
            aria-hidden="true"
            className="mb-1 font-[var(--font-script)] text-xl italic text-[rgb(145,48,65)]"
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            You&apos;re Invited!
          </motion.p>

          <div aria-hidden="true" className="leading-none">
            <div className="font-[var(--font-display)] text-base font-bold text-[rgb(59,22,30)]">
              {scratchReveal.dayNumber}
              <span className="align-top text-[0.72em]">{scratchReveal.daySuffix}</span>{" "}
              {scratchReveal.month.charAt(0)}
              {scratchReveal.month.slice(1).toLowerCase()} {scratchReveal.year}
            </div>
            <div className="mt-2 font-[var(--font-script)] text-sm text-[rgb(145,39,60)]">
              {scratchReveal.weekday}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[rgb(100,64,71)]">
              {scratchReveal.time}
            </div>
          </div>
        </div>
        )}
      </ScratchReveal>
    </FadeIn>
  );
}
