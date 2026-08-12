import { RsvpInteraction } from "@/components/invitation/rsvp-interaction";
import { SectionHeading } from "@/components/invitation/section-heading";
import { SectionShell } from "@/components/invitation/section-shell";
import type { InvitationVariant } from "@/lib/types/invitation";

type RsvpSectionProps = {
  invitation: InvitationVariant;
};

export function RsvpSection({ invitation }: RsvpSectionProps) {
  return (
    <SectionShell className="botanical-wash px-4 py-8 sm:px-7">
      <SectionHeading
        align="center"
        eyebrow="RSVP"
        title={invitation.content.rsvpTitle}
        body={invitation.content.rsvpMessage}
      />

      <div className="mt-8 grid gap-4">
        <div className="invitation-surface px-5 py-6 sm:px-6">
          <p className="invitation-eyebrow">Invited events</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {invitation.events.map((eventId) => (
              <span
                key={eventId}
                className="rounded-full border border-[var(--gold-border)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--gold-deep)]"
              >
                {invitation.eventMap[eventId].typeLabel}
              </span>
            ))}
          </div>
        </div>

        <RsvpInteraction invitation={invitation} />
      </div>
    </SectionShell>
  );
}
