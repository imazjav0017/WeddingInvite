import { InvitationExperience } from "@/components/invitation/invitation-experience";
import { ClosingMessageSection } from "@/components/invitation/sections/closing-message-section";
import { CountdownSection } from "@/components/invitation/sections/countdown-section";
import { DressCodeSection } from "@/components/invitation/sections/dress-code-section";
import { GallerySection } from "@/components/invitation/sections/gallery-section";
import { HeroSection } from "@/components/invitation/sections/hero-section";
import { PreWeddingEventsSection } from "@/components/invitation/sections/pre-wedding-events-section";
import { ProgramTimelineSection } from "@/components/invitation/sections/program-timeline-section";
import { ScratchDateSection } from "@/components/invitation/sections/scratch-date-section";
import { TransportationSection } from "@/components/invitation/sections/transportation-section";
import { VenueSection } from "@/components/invitation/sections/venue-section";
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
        <VenueSection invitation={invitation} />
        <DressCodeSection invitation={invitation} />
        <PreWeddingEventsSection invitation={invitation} />
        <TransportationSection invitation={invitation} />
        {invitation.sections.closingMessage ? (
          <ClosingMessageSection invitation={invitation} />
        ) : null}
      </main>
    </InvitationExperience>
  );
}
