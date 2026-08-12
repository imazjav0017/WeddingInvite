import type { InvitationVariant } from "@/lib/types/invitation";
import { Ornament } from "@/components/invitation/ornament";
import { SectionHeading } from "@/components/invitation/section-heading";
import { SectionShell } from "@/components/invitation/section-shell";

type CoupleIntroSectionProps = {
  invitation: InvitationVariant;
};

export function CoupleIntroSection({
  invitation,
}: CoupleIntroSectionProps) {
  return (
    <SectionShell className="px-4 py-8 sm:px-7">
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-start">
        <SectionHeading
          eyebrow="The Celebration"
          title={
            <>
              A sacred beginning
              <span className="block font-[var(--font-script)] text-[0.72em] text-[var(--gold-deep)]">
                for {invitation.couple.displayNames}
              </span>
            </>
          }
          body={invitation.content.coupleIntro}
        />

        <div className="invitation-surface px-5 py-6 sm:px-6">
          <p className="invitation-eyebrow">Blessing</p>
          <p className="mt-4 font-[var(--font-display)] text-2xl leading-tight text-[var(--ink)]">
            In sha Allah
          </p>
          <p className="mt-4 text-sm leading-8 text-[var(--muted)]">
            {invitation.content.quote}
          </p>
          <Ornament className="mt-6 justify-start" tone="sage" />
          <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[var(--sage)]">
            {invitation.content.supportingDateLabel}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
