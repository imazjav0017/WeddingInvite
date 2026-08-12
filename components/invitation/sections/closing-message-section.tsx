import type { InvitationVariant } from "@/lib/types/invitation";
import { Ornament } from "@/components/invitation/ornament";
import { SectionShell } from "@/components/invitation/section-shell";

type ClosingMessageSectionProps = {
  invitation: InvitationVariant;
};

export function ClosingMessageSection({
  invitation,
}: ClosingMessageSectionProps) {
  return (
    <SectionShell className="botanical-wash min-h-[78svh] px-4 py-8 sm:px-7">
      <div className="flex min-h-[66svh] flex-col items-center justify-center text-center">
        <div className="monogram-mark">
          {invitation.couple.partnerOne[0]} &amp; {invitation.couple.partnerTwo[0]}
        </div>
        <Ornament className="mt-8" />
        <p className="mt-7 font-[var(--font-script)] text-3xl text-[var(--gold-deep)]">
          {invitation.weddingSignature.closingTag}
        </p>
        <h2 className="mt-5 font-[var(--font-display)] text-[clamp(3rem,15vw,6rem)] leading-[0.9] tracking-[-0.04em]">
          {invitation.couple.partnerOne}
          <span className="my-2 block text-[0.45em] uppercase tracking-[0.38em] text-[var(--gold-deep)]">
            I &amp; Z
          </span>
          {invitation.couple.partnerTwo}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-8 text-[var(--muted)] sm:text-base">
          {invitation.content.closingMessage}
        </p>
        <p className="mt-5 font-[var(--font-script)] text-2xl text-[var(--gold-deep)]">
          {invitation.content.closingTitle}
        </p>
        <p className="mt-7 text-xs uppercase tracking-[0.28em] text-[var(--gold-deep)]">
          {invitation.content.supportingDateLabel}
        </p>
      </div>
    </SectionShell>
  );
}
