"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { cn } from "@/lib/utils/cn";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  wordClassName?: string;
  stagger?: number;
};

export function SplitText({
  text,
  as = "span",
  className,
  wordClassName,
  stagger = 0.06,
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const sharedProps = {
    className: cn("overflow-hidden", className),
    initial: "hidden" as const,
    viewport: { once: true, margin: "-10% 0px -8% 0px" },
    whileInView: "visible" as const,
  };

  const content = (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            className={cn("inline-block", wordClassName)}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.55, delay: index * stagger, ease: [0.22, 1, 0.36, 1] }
            }
            variants={
              prefersReducedMotion
                ? {
                    hidden: { opacity: 1 },
                    visible: { opacity: 1 },
                  }
                : {
                    hidden: { opacity: 0, y: "0.8em" },
                    visible: { opacity: 1, y: "0em" },
                  }
            }
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );

  if (as === "h1") {
    return <motion.h1 {...sharedProps}>{content}</motion.h1>;
  }

  if (as === "h2") {
    return <motion.h2 {...sharedProps}>{content}</motion.h2>;
  }

  if (as === "p") {
    return <motion.p {...sharedProps}>{content}</motion.p>;
  }

  return <motion.span {...sharedProps}>{content}</motion.span>;
}
