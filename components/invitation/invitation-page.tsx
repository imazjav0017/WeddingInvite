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
import type { ReactNode } from "react";
import type { InvitationVariant } from "@/lib/types/invitation";

type InvitationPageProps = {
  invitation: InvitationVariant;
};

type AlternatingSection = {
  key: string;
  node: ReactNode;
};

export function InvitationPage({ invitation }: InvitationPageProps) {
  const trailingSections: AlternatingSection[] = [];

  if (invitation.sections.scratchReveal) {
    trailingSections.push({
      key: "scratch-reveal",
      node: <ScratchDateSection invitation={invitation} />,
    });
  }

  if (invitation.sections.gallery) {
    trailingSections.push({
      key: "gallery",
      node: <GallerySection invitation={invitation} />,
    });
  }

  trailingSections.push(
    {
      key: "countdown",
      node: <CountdownSection invitation={invitation} />,
    },
    {
      key: "program-timeline",
      node: <ProgramTimelineSection invitation={invitation} />,
    },
    {
      key: "venue",
      node: <VenueSection invitation={invitation} />,
    },
    {
      key: "dress-code",
      node: <DressCodeSection invitation={invitation} />,
    },
    {
      key: "pre-wedding-events",
      node: <PreWeddingEventsSection invitation={invitation} />,
    },
    {
      key: "transportation",
      node: <TransportationSection invitation={invitation} />,
    },
  );

  if (invitation.sections.closingMessage) {
    trailingSections.push({
      key: "closing",
      node: <ClosingMessageSection invitation={invitation} />,
    });
  }

  return (
    <InvitationExperience invitation={invitation}>
      <main className="page-spread mx-auto flex min-h-screen flex-col px-0 py-0">
        <div className="page-shell hidden h-6 sm:block" />

        <HeroSection invitation={invitation} />
        {trailingSections.map((section, index) => (
          <div
            className={`relative left-1/2 right-1/2 w-screen -translate-x-1/2 ${
              index % 2 === 0
                ? "bg-[var(--section-light)]"
                : "bg-[var(--section-blush)]"
            }`}
            key={section.key}
          >
            {section.node}
          </div>
        ))}
      </main>
    </InvitationExperience>
  );
}
