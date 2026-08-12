"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import type { InvitationVariant } from "@/lib/types/invitation";

type CinematicInvitationHeroProps = {
  invitation: InvitationVariant;
  isActive?: boolean;
  className?: string;
  showScrollCue?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function CinematicInvitationHero({
  invitation,
  isActive = true,
  className,
  showScrollCue = false,
}: CinematicInvitationHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseTransition = {
    duration: prefersReducedMotion ? 0.01 : 0.75,
    ease: EASE,
  };

  return (
    <div className={cn("absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.2),rgba(0,0,0,0.1))]" />

      <div className="absolute inset-0 flex items-center justify-center px-6 py-12 text-center sm:px-8">
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          className="mx-auto flex max-w-[32rem] flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: EASE }}
        >
          <motion.div
            animate={
              !isActive
                ? { opacity: 0, scale: prefersReducedMotion ? 1 : 0.88 }
                : prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1 }
            }
            className="mb-5 text-[10px] leading-none text-[rgb(245,230,224)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.45,
              delay: prefersReducedMotion ? 0 : 0.18,
              ease: EASE,
            }}
          >
            {"\u2665"}
          </motion.div>

          <motion.p
            animate={
              !isActive
                ? { opacity: 0, y: prefersReducedMotion ? 0 : 14 }
                : prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
            }
            className="max-w-[18rem] font-[var(--font-script)] text-[24px] leading-[1.25] text-[rgb(245,230,224)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:max-w-[26rem] md:text-[29px]"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.65,
              delay: prefersReducedMotion ? 0.08 : 0.38,
              ease: EASE,
            }}
          >
            We are honored to welcome you to
            <br />
            the Wedding ceremony of..
          </motion.p>

          <motion.div
            animate={!isActive ? { opacity: 0 } : { opacity: 1 }}
            className="mt-5 flex items-center gap-3 text-[rgb(245,230,224)]"
            initial={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.5,
              delay: prefersReducedMotion ? 0.14 : 0.82,
              ease: EASE,
            }}
          >
            <motion.span
              animate={
                !isActive
                  ? { opacity: 0, scaleX: prefersReducedMotion ? 1 : 0 }
                  : prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scaleX: 1 }
              }
              className="h-px w-16 origin-right bg-[rgba(245,230,224,0.45)]"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.45,
                delay: prefersReducedMotion ? 0.14 : 0.9,
                ease: EASE,
              }}
            />
            <motion.span
              animate={
                !isActive
                  ? { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }
                  : prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1 }
              }
              className="text-[10px] leading-none text-[rgb(245,230,224)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.4,
                delay: prefersReducedMotion ? 0.16 : 1.02,
                ease: EASE,
              }}
            >
              {"\u2665"}
            </motion.span>
            <motion.span
              animate={
                !isActive
                  ? { opacity: 0, scaleX: prefersReducedMotion ? 1 : 0 }
                  : prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scaleX: 1 }
              }
              className="h-px w-16 origin-left bg-[rgba(245,230,224,0.45)]"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.45,
                delay: prefersReducedMotion ? 0.14 : 0.9,
                ease: EASE,
              }}
            />
          </motion.div>

          <motion.h1
            animate={
              !isActive
                ? { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
                : prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
            }
            className="mt-7 font-[var(--font-script)] text-6xl leading-none tracking-[0.01em] text-[rgb(245,230,224)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] md:text-9xl"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{
              ...baseTransition,
              delay: prefersReducedMotion ? 0.2 : 1.22,
            }}
          >
            {invitation.couple.partnerOne}
          </motion.h1>

          {invitation.content.heroEyebrow ? (
            <motion.p
              animate={
                !isActive
                  ? { opacity: 0, y: prefersReducedMotion ? 0 : 10 }
                  : prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0 }
              }
              className="mt-2 max-w-[16rem] font-[var(--font-display)] text-base leading-[1.3] tracking-[0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-lg"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.55,
                delay: prefersReducedMotion ? 0.24 : 1.48,
                ease: EASE,
              }}
            >
              {invitation.content.heroEyebrow}
            </motion.p>
          ) : null}

          <motion.div
            animate={{ opacity: isActive ? 1 : 0 }}
            className="mt-4 font-[var(--font-script)] text-3xl leading-none text-[rgba(245,230,224,0.8)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] md:text-4xl"
            initial={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.45,
              delay: prefersReducedMotion ? 0.3 : 1.7,
              ease: EASE,
            }}
          >
            &amp;
          </motion.div>

          <motion.h2
            animate={
              !isActive
                ? { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
                : prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
            }
            className="mt-3 font-[var(--font-script)] text-6xl leading-none tracking-[0.01em] text-[rgb(245,230,224)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] md:text-9xl"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{
              ...baseTransition,
              delay: prefersReducedMotion ? 0.34 : 1.94,
            }}
          >
            {invitation.couple.partnerTwo}
          </motion.h2>

          {invitation.content.invitationLine ? (
            <motion.p
              animate={
                !isActive
                  ? { opacity: 0, y: prefersReducedMotion ? 0 : 10 }
                  : prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0 }
              }
              className="mt-3 max-w-[16rem] font-[var(--font-display)] text-base leading-[1.3] tracking-[0.02em] text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-lg"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.55,
                delay: prefersReducedMotion ? 0.38 : 2.18,
                ease: EASE,
              }}
            >
              {invitation.content.invitationLine}
            </motion.p>
          ) : null}
        </motion.div>
      </div>

      {showScrollCue ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center px-6 sm:bottom-9">
          <div className="flex flex-col items-center gap-2 text-[rgb(245,230,224)]">
            <span className="font-[var(--font-display)] text-[0.7rem] tracking-[0.42em] text-[rgba(245,230,224,0.82)]">
              SCROLL
            </span>
            <motion.span
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: [0.75, 1, 0.75], y: [0, 6, 0] }
              }
              className="text-sm text-[rgba(245,230,224,0.8)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1.8,
                ease: "easeInOut",
                repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
              }}
            >
              ˅
            </motion.span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
