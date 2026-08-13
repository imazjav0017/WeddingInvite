import { GalleryCarousel } from "@/components/invitation/gallery-carousel";
import { DecorativeDivider } from "@/components/invitation/decorative-divider";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant } from "@/lib/types/invitation";

type GallerySectionProps = {
  invitation: InvitationVariant;
};

export function GallerySection({ invitation }: GallerySectionProps) {
  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <DecorativeDivider
        className="mx-auto py-6 text-[rgb(153,96,110)]"
        leftLineClassName="bg-[linear-gradient(to_right,transparent,rgba(153,96,110,0.3))]"
        rightLineClassName="bg-[linear-gradient(to_left,transparent,rgba(153,96,110,0.3))]"
      />
      <GalleryCarousel couple={invitation.couple} gallery={invitation.gallery} />
    </FadeIn>
  );
}
