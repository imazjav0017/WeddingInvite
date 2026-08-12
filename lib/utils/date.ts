import type { InvitationVariant } from "@/lib/types/invitation";

export function getCountdownTarget(invitation: InvitationVariant) {
  const [firstEventId] = invitation.events;
  return invitation.eventMap[firstEventId];
}

export function getEventDay(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

export function getEventMonthDay(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

export function getCountdownUnits(
  targetIsoDate: string,
  referenceTime = Date.now(),
) {
  const difference = new Date(targetIsoDate).getTime() - referenceTime;
  const totalSeconds = Math.max(0, Math.floor(difference / 1000));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}
