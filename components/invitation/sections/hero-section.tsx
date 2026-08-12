import type { InvitationVariant } from "@/lib/types/invitation";
import { FadeIn } from "@/components/motion/fade-in";

type HeroSectionProps = {
  invitation: InvitationVariant;
};

export function HeroSection({ invitation }: HeroSectionProps) {
  return (
    <FadeIn
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden px-6 py-24 md:py-32"
      distance={40}
      duration={0.7}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgb(40,46,57)_0%,rgb(40,46,57)_18%,rgb(142,137,144)_55%,rgb(245,229,232)_100%)]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-20 bg-[linear-gradient(to_right,transparent,rgb(201,138,152))]" />
          <span className="text-[14px] leading-none text-[rgb(201,138,152)]">
            {"\u2665"}
          </span>
          <span className="h-px w-20 bg-[linear-gradient(to_left,transparent,rgb(201,138,152))]" />
        </div>

        <p className="whitespace-pre-wrap break-words font-[var(--font-script)] text-2xl leading-relaxed italic text-[rgb(251,230,234)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] md:text-3xl">
          {invitation.content.invitationMessage}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-20 bg-[linear-gradient(to_right,transparent,rgb(201,138,152))]" />
          <span className="text-[14px] leading-none text-[rgb(201,138,152)]">
            {"\u2665"}
          </span>
          <span className="h-px w-20 bg-[linear-gradient(to_left,transparent,rgb(201,138,152))]" />
        </div>
      </div>
    </FadeIn>
  );
}
