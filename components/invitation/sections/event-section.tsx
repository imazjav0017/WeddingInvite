import type {
  InvitationEvent,
  InvitationVariant,
} from "@/lib/types/invitation";
import { InvitationButton } from "@/components/invitation/invitation-button";
import { SectionHeading } from "@/components/invitation/section-heading";
import { SectionShell } from "@/components/invitation/section-shell";
import { FadeIn } from "@/components/motion/fade-in";
import { getEventDay, getEventMonthDay } from "@/lib/utils/date";

type EventSectionProps = {
  event: InvitationEvent;
  invitation: InvitationVariant;
  index: number;
};

export function EventSection({
  event,
  invitation,
  index,
}: EventSectionProps) {
  return (
    <SectionShell className="px-4 py-8 sm:px-7">
      <div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <FadeIn className="invitation-surface botanical-wash px-5 py-6 text-center sm:px-6">
          <p className="invitation-eyebrow">Event {index + 1}</p>
          <p className="mt-5 font-[var(--font-display)] text-5xl leading-none text-[var(--gold-deep)]">
            {getEventMonthDay(event.isoDate).split(" ")[0]}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.34em] text-[var(--gold-deep)]">
            {getEventMonthDay(event.isoDate).split(" ")[1]}
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-[var(--gold-border)]" />
          <p className="mt-5 text-base font-medium text-[var(--ink)]">
            {getEventDay(event.isoDate)}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">{event.time}</p>
        </FadeIn>

        <div>
          <SectionHeading
            eyebrow={event.typeLabel}
            title={event.title}
            body={invitation.content.eventIntroductions[event.id] ?? event.description}
          />

          <div className="mt-6 grid gap-4">
            <FadeIn className="invitation-surface px-5 py-5 sm:px-6" delay={0.08}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="invitation-eyebrow">When</p>
                  <p className="mt-3 font-[var(--font-display)] text-2xl text-[var(--ink)]">
                    {event.date}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {getEventDay(event.isoDate)} | {event.time}
                  </p>
                </div>
                <div>
                  <p className="invitation-eyebrow">Venue</p>
                  <p className="mt-3 font-[var(--font-display)] text-2xl text-[var(--ink)]">
                    {event.venue.name}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {event.venue.address}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn className="invitation-surface px-5 py-5 sm:px-6" delay={0.14}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-lg">
                  <p className="invitation-eyebrow">Directions</p>
                  <p className="mt-3 text-sm leading-8 text-[var(--muted)]">
                    A map link is included for ease of travel. We recommend
                    allowing extra time for arrival before the event begins.
                  </p>
                </div>
                <InvitationButton href={event.venue.mapLink}>
                  View Map
                </InvitationButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
