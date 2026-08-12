import { InvitationExperience } from "@/components/invitation/invitation-experience";
import { ClosingMessageSection } from "@/components/invitation/sections/closing-message-section";
import { CountdownSection } from "@/components/invitation/sections/countdown-section";
import { CoupleIntroSection } from "@/components/invitation/sections/couple-intro-section";
import { DressCodeSection } from "@/components/invitation/sections/dress-code-section";
import { EventSection } from "@/components/invitation/sections/event-section";
import { GallerySection } from "@/components/invitation/sections/gallery-section";
import { HeroSection } from "@/components/invitation/sections/hero-section";
import { ProgramTimelineSection } from "@/components/invitation/sections/program-timeline-section";
import { RsvpSection } from "@/components/invitation/sections/rsvp-section";
import { ScratchDateSection } from "@/components/invitation/sections/scratch-date-section";
import type { InvitationVariant } from "@/lib/types/invitation";

type InvitationPageProps = {
  invitation: InvitationVariant;
};

export function InvitationPage({ invitation }: InvitationPageProps) {
  return (
    <InvitationExperience invitation={invitation}>
      <main className="page-spread mx-auto flex min-h-screen flex-col gap-4 px-0 py-3 sm:gap-5 sm:py-5">
        <div className="page-shell hidden h-6 sm:block" />

        <HeroSection invitation={invitation} />
        {invitation.sections.scratchReveal ? (
          <ScratchDateSection invitation={invitation} />
        ) : null}
        {invitation.sections.gallery ? <GallerySection invitation={invitation} /> : null}
        <CountdownSection invitation={invitation} />
        <ProgramTimelineSection invitation={invitation} />
        <CoupleIntroSection invitation={invitation} />

        {invitation.events.map((eventId, index) => {
          const event = invitation.eventMap[eventId];

          return (
            <EventSection
              key={event.id}
              event={event}
              invitation={invitation}
              index={index}
            />
          );
        })}
        {invitation.sections.dressCode ? (
          <DressCodeSection invitation={invitation} />
        ) : null}
        {invitation.sections.rsvp ? <RsvpSection invitation={invitation} /> : null}
        {invitation.sections.closingMessage ? (
          <ClosingMessageSection invitation={invitation} />
        ) : null}
      </main>
    </InvitationExperience>
  );
}
