"use client";

import { DecorativeDivider } from "@/components/invitation/decorative-divider";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant } from "@/lib/types/invitation";
import { motion, useReducedMotion } from "motion/react";

type DressCodeSectionProps = {
  invitation: InvitationVariant;
};

export function DressCodeSection({ invitation }: DressCodeSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const dressCode = invitation.dressCode;

  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
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
              <path d="M7 4.5 9.2 3h5.6L17 4.5l3.5 2.4-2.2 3.7-1.8-1.2V20H7.5V9.4L5.7 10.6 3.5 6.9 7 4.5Z" />
              <path d="M9.2 3 12 6l2.8-3" />
            </svg>
          </motion.div>

          <motion.h3
            className="mb-2 text-center font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          >
            {dressCode.title}
          </motion.h3>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.92 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.06 }}
            viewport={{ once: true }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
          >
            <DecorativeDivider className="my-6 text-[rgb(139,35,55)]" />
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-xl grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            className="py-6 text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <h4 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-[rgb(139,35,55)]">
              {dressCode.womenTitle}
            </h4>
            <div className="mx-auto mb-4 h-px w-10 bg-[rgb(139,35,55)]/30" />
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {dressCode.womenAttire}
            </p>
          </motion.div>

          <motion.div
            className="py-6 text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.48, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <h4 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-[rgb(139,35,55)]">
              {dressCode.menTitle}
            </h4>
            <div className="mx-auto mb-4 h-px w-10 bg-[rgb(139,35,55)]/30" />
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {dressCode.menAttire}
            </p>
          </motion.div>
        </div>
      </div>
    </FadeIn>
  );
}
