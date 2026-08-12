"use client";

import { startTransition, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { EventId, InvitationVariant } from "@/lib/types/invitation";
import { InvitationButton } from "@/components/invitation/invitation-button";

type RsvpInteractionProps = {
  invitation: InvitationVariant;
};

export function RsvpInteraction({ invitation }: RsvpInteractionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedEvents, setSelectedEvents] = useState<EventId[]>(invitation.events);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleEvent = (eventId: EventId) => {
    startTransition(() => {
      setSelectedEvents((current) =>
        current.includes(eventId)
          ? current.filter((item) => item !== eventId)
          : [...current, eventId],
      );
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
      <div className="invitation-surface px-5 py-6 sm:px-6">
        <p className="invitation-eyebrow">Response details</p>
        <div className="mt-5 grid gap-4">
          <label className="rounded-[1.2rem] border border-[var(--border)] bg-white/65 px-4 py-4 transition focus-within:border-[var(--gold-border)] focus-within:bg-white/80">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--gold-deep)]">
              Guest Name
            </span>
            <input
              className="mt-2 w-full bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Enter your name"
              value={guestName}
            />
          </label>

          <label className="rounded-[1.2rem] border border-[var(--border)] bg-white/65 px-4 py-4 transition focus-within:border-[var(--gold-border)] focus-within:bg-white/80">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--gold-deep)]">
              Number of Guests
            </span>
            <select
              className="mt-2 w-full appearance-none bg-transparent text-sm text-[var(--ink)] outline-none"
              onChange={(event) => setGuestCount(event.target.value)}
              value={guestCount}
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </label>

          <label className="rounded-[1.2rem] border border-[var(--border)] bg-white/65 px-4 py-4 transition focus-within:border-[var(--gold-border)] focus-within:bg-white/80">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--gold-deep)]">
              Message
            </span>
            <textarea
              className="mt-2 min-h-24 w-full resize-none bg-transparent text-sm leading-7 text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Add a dua or short note"
              value={message}
            />
          </label>
        </div>
      </div>

      <div className="invitation-surface flex flex-col justify-between px-5 py-6 sm:px-6">
        <div>
          <p className="invitation-eyebrow">Attending events</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {invitation.events.map((eventId) => {
              const selected = selectedEvents.includes(eventId);

              return (
                <motion.button
                  aria-pressed={selected}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
                    selected
                      ? "border-[var(--gold-border)] bg-[var(--gold-soft)] text-[var(--gold-deep)]"
                      : "border-[var(--border)] bg-white/55 text-[var(--muted)]"
                  }`}
                  key={eventId}
                  onClick={() => toggleEvent(eventId)}
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  {invitation.eventMap[eventId].typeLabel}
                </motion.button>
              );
            })}
          </div>

          <p className="mt-5 text-sm leading-8 text-[var(--muted)]">
            Reply directly to {invitation.contact.contactValue}, or use the
            styled WhatsApp action below.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <InvitationButton className="w-full" href={invitation.contact.rsvpLink}>
            RSVP via WhatsApp
          </InvitationButton>
          <InvitationButton
            className="w-full"
            onClick={handleSubmit}
            variant="ghost"
          >
            {isSubmitting ? "Sending..." : isSubmitted ? "Received" : "Preview Reply"}
          </InvitationButton>
          <p className="text-center text-xs uppercase tracking-[0.22em] text-[var(--gold-deep)]">
            {selectedEvents.length} event{selectedEvents.length === 1 ? "" : "s"} selected
          </p>
        </div>
      </div>
    </div>
  );
}
