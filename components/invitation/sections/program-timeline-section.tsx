"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant, TimelineItem } from "@/lib/types/invitation";

type ProgramTimelineSectionProps = {
  invitation: InvitationVariant;
};

function formatMeta(item: TimelineItem) {
  if (item.date && item.time) {
    return `${item.date}, ${item.time}`;
  }

  return item.date ?? item.time ?? "";
}

export function ProgramTimelineSection({
  invitation,
}: ProgramTimelineSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const items = invitation.timeline;

  if (items.length === 0) {
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
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 7.6V12L15.1 13.8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </svg>
        </motion.div>

        <motion.h3
          className="mb-2 font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          Program Timeline
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
      </div>

      <div className="mx-auto mt-8 max-w-md">
        {items.map((item, index) => {
          const meta = formatMeta(item);
          const isLast = index === items.length - 1;

          return (
            <motion.div
              className={isLast ? "flex gap-4" : "mb-6 flex gap-4"}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              key={`${item.title}-${index}`}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.48,
                delay: prefersReducedMotion ? 0 : 0.06 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <div className="flex flex-col items-center pt-1.5">
                <span className="h-3 w-3 rounded-full bg-[rgb(139,35,55)] shadow-[0_0_14px_rgba(183,146,92,0.22)]" />
                {!isLast ? (
                  <span className="mt-1 w-px flex-1 bg-[rgba(139,35,55,0.3)]" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 pb-0.5 text-left">
                <h4 className="font-[var(--font-display)] text-lg font-semibold leading-tight text-[rgb(139,35,55)]">
                  {item.title}
                </h4>
                {meta ? (
                  <p className="mt-1 text-sm text-[var(--ink)]">{meta}</p>
                ) : null}
                {item.description ? (
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </FadeIn>
  );
}
