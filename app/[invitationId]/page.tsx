import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvitationPage } from "@/components/invitation/invitation-page";
import { getInvitationVariant, invitationVariants } from "@/lib/config/invitations";

type InvitationPageProps = {
  params: Promise<{
    invitationId: string;
  }>;
};

export function generateStaticParams() {
  return invitationVariants.map((variant) => ({
    invitationId: variant.id,
  }));
}

export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const { invitationId } = await params;
  const variant = getInvitationVariant(invitationId);

  if (!variant) {
    return {
      title: "Invitation not found",
    };
  }

  return {
    title: `${variant.couple.displayNames} | Invitation ${variant.id}`,
    description: variant.seoDescription,
  };
}

export default async function InvitationVariantPage({
  params,
}: InvitationPageProps) {
  const { invitationId } = await params;
  const variant = getInvitationVariant(invitationId);

  if (!variant) {
    notFound();
  }

  return <InvitationPage invitation={variant} />;
}
