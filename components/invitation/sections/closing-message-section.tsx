/* eslint-disable @next/next/no-img-element */
"use client";

import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant } from "@/lib/types/invitation";
import { motion, useReducedMotion } from "motion/react";
import { dancingScript } from "@/lib/fonts";

type ClosingMessageSectionProps = {
  invitation: InvitationVariant;
};

function Flourish({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 400 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20"
        opacity="0.3"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20"
        opacity="0.2"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle cx="50" cy="28" fill="currentColor" opacity="0.25" r="2" />
      <circle cx="100" cy="21" fill="currentColor" opacity="0.25" r="2" />
      <circle cx="150" cy="12" fill="currentColor" opacity="0.25" r="2" />
      <circle cx="200" cy="18" fill="currentColor" opacity="0.25" r="2" />
      <circle cx="250" cy="28" fill="currentColor" opacity="0.25" r="2" />
      <circle cx="300" cy="23" fill="currentColor" opacity="0.25" r="2" />
      <circle cx="350" cy="13" fill="currentColor" opacity="0.25" r="2" />
    </svg>
  );
}

export function ClosingMessageSection({
  invitation,
}: ClosingMessageSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <div className="mx-auto max-w-lg text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <Flourish className="mb-8 w-full text-[rgb(139,35,55)]" />
        </motion.div>

        <motion.h2
          className={`${dancingScript.className} mb-4 font-[var(--font-script)] text-4xl leading-relaxed text-[rgb(139,35,55)] md:text-5xl`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          We look forward to celebrating with you!
        </motion.h2>

        <motion.div
          className="mx-auto flex w-full justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.09, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        >
          <img
            alt="I and Z monogram"
            className="h-auto w-[11.5rem] select-none object-contain md:w-[13rem]"
            draggable={false}
            src="/images/IZ_Logo.png"
          />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <Flourish className="mt-8 w-full rotate-180 text-[rgb(139,35,55)]" />
        </motion.div>
      </div>
    </FadeIn>
  );
}
