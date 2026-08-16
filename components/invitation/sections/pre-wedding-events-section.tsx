"use client";

import { DecorativeDivider } from "@/components/invitation/decorative-divider";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant, PreWeddingEvent } from "@/lib/types/invitation";
import { motion, useReducedMotion } from "motion/react";
import { dancingScript } from "@/lib/fonts";

type PreWeddingEventsSectionProps = {
  invitation: InvitationVariant;
};

function formatEventMeta(event: PreWeddingEvent) {
  if (event.date && event.time) {
    return `${event.date}, ${event.time}`;
  }

  return event.date ?? event.time ?? "";
}

export function PreWeddingEventsSection({
  invitation,
}: PreWeddingEventsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const events = invitation.preWeddingEvents;

  if (events.length === 0) {
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
            <path d="M5 13.5V7.8c0-.58.47-1.05 1.05-1.05h3.6L12 3.8l2.35 2.95h3.6c.58 0 1.05.47 1.05 1.05v5.7" />
            <path d="M5 13.5c0 3.31 3.13 6 7 6s7-2.69 7-6" />
            <path d="M8.5 11.2 7 13.5l2 1.05" />
            <path d="M15.5 11.2 17 13.5l-2 1.05" />
            <path d="M12 8.2v6.3" />
          </svg>
        </motion.div>

        <motion.h3
          className={`${dancingScript.className} mb-2 text-center font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          Pre-Wedding Events
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

      <div className="mx-auto max-w-md">
        {events.map((event, index) => {
          const meta = formatEventMeta(event);

          return (
            <motion.div
              className="py-4 text-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              key={`${event.title}-${index}`}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.48,
                delay: prefersReducedMotion ? 0 : 0.08 + index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <h4 className="whitespace-pre-wrap break-words font-[var(--font-display)] text-lg font-semibold leading-tight text-[rgb(139,35,55)]">
                {event.title}
              </h4>
              {meta ? (
                <p className="mt-1 text-sm text-[var(--ink)]">{meta}</p>
              ) : null}
              {event.venue ? (
                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-[var(--muted)]">
                  {event.venue}
                </p>
              ) : null}
              
            </motion.div>
          );
        })}
         <motion.div
              className="py-4 text-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.48,
                delay: prefersReducedMotion ? 0 : 0.08 + 3 * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            >
            <h4 className={`${dancingScript.className} whitespace-pre-wrap break-words font-[var(--font-display)] text-lg font-semibold leading-tight text-[rgb(139,35,55)]`}>
                Insha 'Allah
              </h4>
            </motion.div>
      </div>
    </FadeIn>
  );
}
