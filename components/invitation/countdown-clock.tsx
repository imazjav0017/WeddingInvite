"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { getCountdownUnits } from "@/lib/utils/date";

type CountdownClockProps = {
  targetIsoDate: string;
};

const unitLabels = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

const initialUnits = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function CountdownClock({ targetIsoDate }: CountdownClockProps) {
  const prefersReducedMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState(initialUnits);

  useEffect(() => {
    const syncCountdown = () => {
      setTimeLeft(getCountdownUnits(targetIsoDate));
    };

    const initialTimer = window.setTimeout(syncCountdown, 0);
    const timer = window.setInterval(() => {
      syncCountdown();
    }, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, [targetIsoDate]);

  return (
    <div className="grid grid-cols-4 justify-center gap-2.5 md:gap-8">
      {unitLabels.map(({ key, label }) => {
        const value = String(timeLeft[key]).padStart(2, "0");

        return (
          <div key={label} className="min-w-0 text-center">
            <div className="mb-2 rounded-lg border border-[rgba(139,35,55,0.2)] bg-[rgba(139,35,55,0.1)] px-2.5 py-3 backdrop-blur-sm sm:px-3.5 md:px-6 md:py-4">
              <div
                className="relative h-[1.1em] min-w-[2ch] overflow-hidden font-[var(--font-display)] text-[1.85rem] font-bold leading-none text-[var(--ink)] md:text-5xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
              <AnimatePresence mode="popLayout">
                <motion.span
                  className="absolute inset-0"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  key={value}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
                >
                  {value}
                </motion.span>
              </AnimatePresence>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[rgba(39,27,22,0.62)] md:text-sm">
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
