import { GalleryCarousel } from "@/components/invitation/gallery-carousel";
import { FadeIn } from "@/components/motion/fade-in";
import type { InvitationVariant } from "@/lib/types/invitation";

type GallerySectionProps = {
  invitation: InvitationVariant;
};

export function GallerySection({ invitation }: GallerySectionProps) {
  return (
    <FadeIn className="relative overflow-hidden px-6 py-16 md:py-20">
      <div className="mx-auto flex items-center justify-center gap-3 py-6">
        <span className="h-px w-16 bg-[linear-gradient(to_right,transparent,rgba(153,96,110,0.3))]" />
        <span aria-hidden="true" className="text-[10px] text-[rgba(153,96,110,0.5)]">
          ♥
        </span>
        <span className="h-px w-16 bg-[linear-gradient(to_left,transparent,rgba(153,96,110,0.3))]" />
      </div>
      <GalleryCarousel couple={invitation.couple} gallery={invitation.gallery} />
    </FadeIn>
  );
}
