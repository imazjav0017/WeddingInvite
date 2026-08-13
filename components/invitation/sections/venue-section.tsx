"use client";

import { DecorativeDivider } from "@/components/invitation/decorative-divider";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant } from "@/lib/types/invitation";
import { motion, useReducedMotion } from "motion/react";

type VenueSectionProps = {
  invitation: InvitationVariant;
};

export function VenueSection({ invitation }: VenueSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const venue = invitation.venue;

  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <div className="mx-auto max-w-md text-center">
        <motion.div
          aria-hidden="true"
          className="mx-auto mb-4 h-7 w-7 text-[rgb(139,35,55)]"
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
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a.9.9 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </motion.div>

        <motion.h3
          className="mb-2 text-center font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          Venue
        </motion.h3>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.92 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.06 }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
        >
          <DecorativeDivider className="my-6 text-[rgb(139,35,55)]" />
        </motion.div>

        <motion.div
          className="mb-8 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <p className="mb-2 font-[var(--font-display)] text-xl font-semibold text-[rgb(139,35,55)]">
            {venue.name}
          </p>
          <p className="text-[var(--muted)]">{venue.address}</p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-sm text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <svg
            aria-hidden="true"
            className="mb-4 w-full text-[rgb(139,35,55)] opacity-20"
            fill="none"
            viewBox="0 0 800 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              fill="none"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              width="600"
              x="100"
              y="250"
            />
            <path
              d="M350 250 V160 Q350 80 400 60 Q450 80 450 160 V250"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="400" cy="55" fill="none" r="4" stroke="currentColor" strokeWidth="1.5" />
            <rect
              fill="none"
              height="70"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              width="200"
              x="150"
              y="180"
            />
            <path
              d="M200 180 V140 Q200 110 250 100 Q300 110 300 140 V180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="250" cy="96" fill="none" r="3" stroke="currentColor" strokeWidth="1.5" />
            <rect
              fill="none"
              height="70"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              width="200"
              x="450"
              y="180"
            />
            <path
              d="M500 180 V140 Q500 110 550 100 Q600 110 600 140 V180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="550" cy="96" fill="none" r="3" stroke="currentColor" strokeWidth="1.5" />
            <rect fill="none" height="100" stroke="currentColor" strokeWidth="1.5" width="20" x="130" y="150" />
            <path d="M125 150 L140 120 L155 150" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect fill="none" height="100" stroke="currentColor" strokeWidth="1.5" width="20" x="650" y="150" />
            <path d="M645 150 L660 120 L675 150" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect
              fill="none"
              height="30"
              rx="10"
              stroke="currentColor"
              strokeWidth="1"
              width="20"
              x="375"
              y="180"
            />
            <rect
              fill="none"
              height="30"
              rx="10"
              stroke="currentColor"
              strokeWidth="1"
              width="20"
              x="405"
              y="180"
            />
            <path d="M180 250 V220 Q180 200 210 200 Q240 200 240 220 V250" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M270 250 V220 Q270 200 300 200 Q330 200 330 220 V250" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M470 250 V220 Q470 200 500 200 Q530 200 530 220 V250" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M560 250 V220 Q560 200 590 200 Q620 200 620 220 V250" fill="none" stroke="currentColor" strokeWidth="1" />
            <path
              d="M375 250 V210 Q375 185 400 180 Q425 185 425 210 V250"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="150" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="200" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="250" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="300" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="350" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="400" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="450" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="500" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="550" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="600" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
            <circle cx="650" cy="265" fill="currentColor" opacity="0.4" r="1.5" />
          </svg>
        </motion.div>

        <motion.a
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[rgb(139,35,55)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          href={venue.mapLink}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          rel="noopener noreferrer"
          style={{ color: "#ffffff" }}
          target="_blank"
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
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
