"use client";

import { motion, useReducedMotion } from "motion/react";

type BackgroundMusicControlProps = {
  enabled: boolean;
  isPlaying: boolean;
  isAudioAvailable: boolean;
  toggleMusic: () => void;
};

export function BackgroundMusicControl({
  enabled,
  isPlaying,
  isAudioAvailable,
  toggleMusic,
}: BackgroundMusicControlProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!enabled) {
    return null;
  }

  const label = !isAudioAvailable
    ? "Audio unavailable"
    : isPlaying
      ? "Pause music"
      : "Play music";

  return (
    <motion.button
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0, scale: isPlaying ? 1 : 0.98 }
      }
      aria-label={label}
      className="fixed bottom-4 right-4 z-30 flex items-center gap-3 rounded-full border border-[var(--gold-border)] bg-[rgba(255,250,242,0.94)] px-4 py-3 text-[var(--gold-deep)] shadow-[0_14px_34px_rgba(86,64,42,0.14)] backdrop-blur md:bottom-6 md:right-6"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      onClick={toggleMusic}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      type="button"
      whileHover={
        prefersReducedMotion || !isAudioAvailable ? undefined : { scale: 1.02, y: -1 }
      }
      whileTap={prefersReducedMotion || !isAudioAvailable ? undefined : { scale: 0.98 }}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.22em] ${
          isAudioAvailable
            ? "border-[var(--gold-border)] bg-white/70"
            : "border-[var(--border)] bg-white/45 text-[var(--muted)]"
        }`}
      >
        {isAudioAvailable ? (isPlaying ? "On" : "Off") : "NA"}
      </span>
      <span className="text-[10px] uppercase tracking-[0.28em]">
        {label}
      </span>
    </motion.button>
  );
}
