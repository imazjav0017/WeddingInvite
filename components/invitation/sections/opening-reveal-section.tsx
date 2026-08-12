"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { InvitationVariant } from "@/lib/types/invitation";
import { useInvitationExperience } from "@/components/invitation/invitation-experience";

type OpeningRevealSectionProps = {
  invitation: InvitationVariant;
};

export function OpeningRevealSection({
  invitation,
}: OpeningRevealSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { openInvitation } = useInvitationExperience();
  const [phase, setPhase] = useState<"idle" | "opening" | "revealing">("idle");
  const revealTimerRef = useRef<number | null>(null);
  const openTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") {
      return;
    }

    if (prefersReducedMotion) {
      openInvitation();
      return;
    }

    setPhase("opening");

    revealTimerRef.current = window.setTimeout(() => {
      setPhase("revealing");
    }, 950);

    openTimerRef.current = window.setTimeout(() => {
      openInvitation();
    }, 1650);
  };

  return (
    <section className="botanical-wash min-h-screen px-4 py-4 sm:px-7 sm:py-6">
      <div className="relative flex min-h-[calc(100svh-2rem)] items-center justify-center sm:min-h-[calc(100svh-3rem)]">
        <motion.div
          animate={
            phase === "revealing"
              ? { opacity: 0, y: -34, scale: 0.96 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          className="relative w-full max-w-[28rem] perspective-[1600px]"
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={
              phase === "revealing"
                ? { y: 12, scale: 1.02 }
                : { y: 0, scale: 1 }
            }
            className="absolute inset-x-4 bottom-4 top-16 rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,253,248,0.94),rgba(247,239,227,0.96))] px-6 py-8 shadow-[0_22px_60px_rgba(86,64,42,0.14)]"
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={phase === "idle" ? { y: [0, -4, 0] } : { y: 0 }}
              className="absolute inset-x-0 top-0 h-full"
              transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="absolute left-6 right-6 top-5 h-px bg-[var(--gold-border)]" />
              <div className="absolute bottom-5 left-6 right-6 h-px bg-[var(--gold-border)]" />
            </motion.div>

            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <p className="font-[var(--font-script)] text-2xl text-[var(--gold-deep)]">
                Wedding Invitation
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-[clamp(2.8rem,13vw,5rem)] leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
                {invitation.couple.partnerOne}
                <span className="my-1 block text-[clamp(1.9rem,9vw,3rem)] text-[var(--gold-deep)]">
                  &amp;
                </span>
                {invitation.couple.partnerTwo}
              </h2>
              <p className="mt-5 max-w-[15rem] text-xs uppercase tracking-[0.34em] text-[var(--gold-deep)]">
                {invitation.content.invitationLine}
              </p>
            </div>
          </motion.div>

          <div className="relative overflow-hidden rounded-[2.1rem] border border-[var(--gold-border)] bg-[linear-gradient(180deg,rgba(247,239,227,0.98),rgba(230,212,183,0.96))] shadow-[0_30px_80px_rgba(92,69,44,0.16)]">
            <motion.div
              animate={
                phase === "revealing"
                  ? { opacity: 0, scale: 0.92 }
                  : phase === "opening"
                    ? { opacity: [1, 1, 0.88], scale: [1, 1.08, 0.92] }
                    : { opacity: 1, scale: 1 }
              }
              className="absolute left-1/2 top-[54%] z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(125,28,25,0.35)] bg-[radial-gradient(circle_at_30%_30%,#a53b30,#7d1c19_70%)] shadow-[0_12px_24px_rgba(78,20,17,0.28)]"
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.18em] text-[#f3d8b3]">
                I Z
              </div>
            </motion.div>

            <div className="relative h-[34rem] sm:h-[38rem]">
              <motion.div
                animate={
                  phase === "opening"
                    ? { rotateX: -176, y: -20 }
                    : phase === "revealing"
                      ? { rotateX: -180, y: -24 }
                      : { rotateX: 0, y: 0 }
                }
                className="absolute inset-x-0 top-0 z-10 h-[53%] origin-top preserve-3d"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  transformStyle: "preserve-3d",
                }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.92, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6ebdb,#dbc09a)]" />
                <div className="absolute inset-[1px] border-x border-t border-[rgba(183,146,92,0.32)]" />
              </motion.div>

              <div className="absolute inset-0 rounded-[2.1rem] bg-[linear-gradient(180deg,rgba(236,220,194,0.86),rgba(216,192,158,0.96))]" />

              <motion.div
                animate={
                  phase === "opening"
                    ? { y: 36, opacity: 0.95 }
                    : phase === "revealing"
                      ? { y: 74, opacity: 0 }
                      : { y: 0, opacity: 1 }
                }
                className="absolute bottom-0 left-0 right-0 top-[38%] border-t border-[rgba(183,146,92,0.25)] bg-[linear-gradient(180deg,rgba(230,212,183,0.12),rgba(225,203,169,0.82))]"
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.78, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.div
                animate={
                  phase === "opening"
                    ? { y: -64, scale: 1.01 }
                    : phase === "revealing"
                      ? { y: -92, scale: 1.02, opacity: 0 }
                      : { y: 0, scale: 0.98 }
                }
                className="absolute inset-x-5 bottom-6 top-16 rounded-[1.9rem] border border-[var(--gold-border)] bg-[linear-gradient(180deg,rgba(255,252,246,0.96),rgba(248,240,228,0.98))] px-7 py-8 shadow-[0_16px_38px_rgba(86,64,42,0.12)]"
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-full flex-col justify-between text-center">
                  <div>
                    <p className="invitation-eyebrow">
                      {invitation.weddingSignature.blessing}
                    </p>
                    <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--gold-border)] bg-white/70 font-[var(--font-display)] text-xl tracking-[0.18em] text-[var(--gold-deep)] shadow-[0_0_0_10px_rgba(183,146,92,0.08)]">
                      {invitation.couple.partnerOne[0]} &amp;{" "}
                      {invitation.couple.partnerTwo[0]}
                    </div>
                  </div>

                  <div>
                    <p className="font-[var(--font-script)] text-2xl text-[var(--gold-deep)]">
                      {invitation.content.openingTitle}
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.32em] text-[var(--gold-deep)]">
                      {invitation.content.supportingDateLabel}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--gold-border)] bg-[rgba(255,250,242,0.94)] px-7 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--ink)] shadow-[0_12px_28px_rgba(86,64,42,0.08)]"
                      onClick={handleOpen}
                      type="button"
                      whileHover={
                        prefersReducedMotion || phase !== "idle"
                          ? undefined
                          : { scale: 1.015, y: -1 }
                      }
                      whileTap={
                        prefersReducedMotion || phase !== "idle"
                          ? undefined
                          : { scale: 0.985 }
                      }
                    >
                      Tap to Open
                    </motion.button>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                      Break the seal and unveil the invitation
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
