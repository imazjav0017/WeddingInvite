import { SectionHeading } from "@/components/invitation/section-heading";
import { SectionShell } from "@/components/invitation/section-shell";
import type { InvitationVariant } from "@/lib/types/invitation";

type DressCodeSectionProps = {
  invitation: InvitationVariant;
};

export function DressCodeSection({ invitation }: DressCodeSectionProps) {
  return (
    <SectionShell className="px-4 py-8 sm:px-7">
      <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading
          eyebrow="Additional Information"
          title={invitation.events.length > 1 ? "Dress code & guest notes" : "Guest notes"}
          body={invitation.content.rsvpMessage}
        />

        <div className="grid gap-4">
          <div className="invitation-surface px-5 py-6 sm:px-6">
            <p className="invitation-eyebrow">{invitation.dressCode.title}</p>
            <p className="mt-3 font-[var(--font-display)] text-2xl text-[var(--ink)]">
              {invitation.dressCode.attire}
            </p>
            <p className="mt-3 text-sm leading-8 text-[var(--muted)]">
              {invitation.dressCode.note}
            </p>
          </div>
          <div className="invitation-surface px-5 py-6 sm:px-6">
            <p className="invitation-eyebrow">Guest guidance</p>
            <ul className="mt-4 space-y-3 text-sm leading-8 text-[var(--muted)]">
              {invitation.guestNotes.map((note) => (
                <li key={note.title}>
                  <span className="font-medium text-[var(--ink)]">{note.title}:</span>{" "}
                  {note.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
