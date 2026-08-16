"use client";

import { DecorativeDivider } from "@/components/invitation/decorative-divider";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant } from "@/lib/types/invitation";
import { motion, useReducedMotion } from "motion/react";
import { dancingScript } from "@/lib/fonts";

type ValimaInvitationSectionProps = {
  invitation: InvitationVariant;
};

function ArchitecturalFlourish() {
  return (
    <svg
      aria-hidden="true"
      className="w-full text-[rgb(139,35,55)] opacity-20"
      fill="none"
      viewBox="0 0 800 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="100" y="250" width="600" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M350 250 V160 Q350 80 400 60 Q450 80 450 160 V250" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="400" cy="55" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="150" y="180" width="200" height="70" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M200 180 V140 Q200 110 250 100 Q300 110 300 140 V180" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="250" cy="96" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="450" y="180" width="200" height="70" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M500 180 V140 Q500 110 550 100 Q600 110 600 140 V180" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="550" cy="96" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="130" y="150" width="20" height="100" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M125 150 L140 120 L155 150" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="650" y="150" width="20" height="100" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M645 150 L660 120 L675 150" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="375" y="180" width="20" height="30" rx="10" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="405" y="180" width="20" height="30" rx="10" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M180 250 V220 Q180 200 210 200 Q240 200 240 220 V250" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M270 250 V220 Q270 200 300 200 Q330 200 330 220 V250" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M470 250 V220 Q470 200 500 200 Q530 200 530 220 V250" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M560 250 V220 Q560 200 590 200 Q620 200 620 220 V250" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M375 250 V210 Q375 185 400 180 Q425 185 425 210 V250" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="150" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="200" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="250" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="300" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="350" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="400" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="450" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="500" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="550" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="600" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="650" cy="265" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function ValimaInvitationSection({
  invitation,
}: ValimaInvitationSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const valimaInvitation = invitation.valimaInvitation;

  if (!valimaInvitation.enabled) {
    return null;
  }

  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <div className="mx-auto max-w-lg text-center">
        <motion.div
          aria-hidden="true"
          className="mx-auto mb-3 h-8 w-8 text-[rgb(139,35,55)]"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        >
          <svg className="h-full w-full" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 25.5V14.8C8 9.5 11.7 6 16 6C20.3 6 24 9.5 24 14.8V25.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <path
              d="M11.2 25.5V15.8C11.2 12.4 13.2 10.2 16 10.2C18.8 10.2 20.8 12.4 20.8 15.8V25.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
              opacity="0.9"
            />
            <path
              d="M6.5 25.5H25.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
            <path
              d="M8.8 18.5H23.2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.2"
              opacity="0.7"
            />
            <path
              d="M12.2 13.5H19.8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.1"
              opacity="0.65"
            />
            <circle cx="16" cy="6.2" fill="currentColor" opacity="0.9" r="1.2" />
          </svg>
        </motion.div>

        <motion.h3
          className={`${dancingScript.className} mb-2 text-center font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          {valimaInvitation.title}
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
          className={`${dancingScript.className} mx-auto max-w-md text-center font-[var(--font-display)] text-lg leading-relaxed whitespace-pre-line text-[var(--muted)] md:text-xl`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          {valimaInvitation.invitationLine}
        </motion.p>

        <motion.div
          className="mx-auto mt-8 max-w-sm space-y-5"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-4 text-left">
            <div aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[rgb(139,35,55)]">
              <svg className="h-full w-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.5" y="5" width="17" height="15" rx="2.2" />
                <path d="M7.5 3.8v3M16.5 3.8v3M3.5 9.2h17" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-[var(--font-display)] text-lg font-semibold text-[rgb(139,35,55)]">
                {valimaInvitation.date}
              </p>
              <p className="text-[var(--muted)]">{valimaInvitation.day}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[rgb(139,35,55)]">
              <svg className="h-full w-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7.6V12L15.2 13.8" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-[var(--font-display)] text-lg font-semibold text-[rgb(139,35,55)]">
                {valimaInvitation.time}
              </p>
              <p className="text-[var(--muted)]">{valimaInvitation.timeLabel}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[rgb(139,35,55)]">
              <svg className="h-full w-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a.9.9 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-[var(--font-display)] text-lg font-semibold text-[rgb(139,35,55)]">
                {valimaInvitation.venue}
              </p>
              <p className="text-[var(--muted)]">{valimaInvitation.location}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-8 max-w-sm"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.52, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <ArchitecturalFlourish />
        </motion.div>

        <motion.a
          className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[rgb(139,35,55)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          href={valimaInvitation.mapLink}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          rel="noopener noreferrer"
          style={{ color: "#ffffff" }}
          target="_blank"
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        >
          View on Google Maps
        </motion.a>
      </div>
    </FadeIn>
  );
}
