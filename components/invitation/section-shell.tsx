import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { FadeIn } from "@/components/motion/fade-in";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
};

export function SectionShell({ children, className }: SectionShellProps) {
  return (
    <FadeIn className={cn("invitation-section invitation-frame", className)}>
      {children}
    </FadeIn>
  );
}
