import { sharedWeddingData } from "@/lib/data/wedding";
import type {
  InvitationSectionFlags,
  InvitationVariant,
  InvitationVariantBase,
  TimelineItem,
} from "@/lib/types/invitation";

const defaultSections: InvitationSectionFlags = {
  openingReveal: true,
  hero: true,
  invitationMessage: true,
  scratchReveal: true,
  gallery: true,
  countdown: true,
  programTimeline: true,
  venue: true,
  dressCode: true,
  preWeddingEvents: true,
  transportation: true,
  valimaInvitation: true,
  rsvp: true,
  closingMessage: true,
  backgroundMusic: true,
};

const baseVariant = (
  config: InvitationVariantBase,
): InvitationVariant => ({
  ...config,
  couple: sharedWeddingData.couple,
  contact: sharedWeddingData.contact,
  venue: sharedWeddingData.venue,
  transportation: sharedWeddingData.transportation,
  eventMap: sharedWeddingData.events,
  preWeddingEvents: config.preWeddingEvents ?? sharedWeddingData.preWeddingEvents,
  gallery: sharedWeddingData.gallery,
  dressCode: sharedWeddingData.dressCode,
  guestNotes: sharedWeddingData.guestNotes,
  weddingSignature: sharedWeddingData.weddingSignature,
  scratchReveal: sharedWeddingData.scratchReveal,
  sections: {
    ...defaultSections,
    ...config.sections,
  },
});

const timelineFromEvents = (...items: TimelineItem[]) => items;

export const invitationVariants: InvitationVariant[] = [
  baseVariant({
    id: "1",
    label: "Full Celebration",
    seoDescription: "Nikah, dinner, and valima invitation for Imaz and Zeba.",
    events: ["nikah", "dinner", "valima"],
    preWeddingEvents: sharedWeddingData.preWeddingEvents,
    valimaInvitation: {
      enabled: true,
      title: "Valima Reception",
      invitationLine: "We warmly invite you to join us for\nour Valima Reception.",
      date: "16 November 2026",
      day: "Monday",
      time: "1:00 PM",
      timeLabel: "Onwards",
      mapLink: "https://maps.app.goo.gl/279UJXWXYtF98GXP7",
      venue: "Taj Wellington Mews",
      location: "Tharamani, Chennai",
    },
    timeline: timelineFromEvents(
      {
        title: sharedWeddingData.events.nikah.title,
        date: sharedWeddingData.events.nikah.date,
        time: sharedWeddingData.events.nikah.time,
        description: "Your gracious presence is requested as the blessed ceremony begins.",
      },
      {
        title: sharedWeddingData.events.dinner.title,
        date: sharedWeddingData.events.dinner.date,
        time: sharedWeddingData.events.dinner.time,
        description: "An evening of warm company, family blessings, and shared celebration.",
      },
      {
        title: sharedWeddingData.events.valima.title,
        date: sharedWeddingData.events.valima.date,
        time: sharedWeddingData.events.valima.time,
        description: "We gather again to continue the celebration with gratitude and joy.",
      },
    ),
    wordingVariant: "full",
    sections: {
      scratchReveal: true,
      gallery: true,
      dressCode: true,
      rsvp: true,
    },
    content: {
      invitationLine: "Request the pleasure of your presence",
      supportingDateLabel: "Celebrations begin on Friday, 13 November 2026",
      heroEyebrow: "Together with their families",
      heroMessage:
        "Invite you to share in their wedding celebrations and blessings across each cherished gathering.",
      invitationMessage:
        "We are honored to welcome you to the Wedding ceremony of Imaz & Zeba as they begin their journey together in faith and love,\nwe thank you for being part of this blessed occasion \u2764",
      openingTitle: "You are warmly invited",
      openingMessage:
        "A beautifully shared moment begins here. Open this invitation and join us in honoring a sacred union.",
      openingPrompt: "Enter invitation",
      coupleIntro:
        "With grateful hearts and in the light of faith, Imaz and Zeba invite you to witness the beginning of their new life together and celebrate the joy that follows.",
      quote:
        "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them.",
      closingTitle: "We look forward to celebrating with you",
      closingMessage:
        "Thank you for surrounding Imaz and Zeba with your prayers, love, and presence on these treasured days.",
      rsvpTitle: "Kindly respond",
      rsvpMessage:
        "Please confirm your attendance for the events included in your invitation so we may prepare for your presence with care.",
      eventIntroductions: {
        nikah:
          "Join us for the Nikah ceremony as the wedding celebrations begin.",
        dinner:
          "Celebrate the evening with dinner, warm company, and family blessings.",
        valima:
          "Gather with us again for the Valima reception and continued festivities.",
      },
    },
  }),
  baseVariant({
    id: "2",
    label: "Nikkah and Valima Only",
    seoDescription: "Valima-only invitation variant for Imaz and Zeba.",
    events: ["nikah", "dinner", "valima"],
    preWeddingEvents: [],
    valimaInvitation: {
      enabled: true,
      title: "Valima Reception",
      invitationLine: "We warmly invite you to join us for\nour Valima Reception.",
      date: "16 November 2026",
      day: "Monday",
      time: "1:00 PM",
      timeLabel: "Onwards",
      mapLink: "https://maps.app.goo.gl/279UJXWXYtF98GXP7",
      venue: sharedWeddingData.venue.name,
      location: sharedWeddingData.venue.address,
    },
   timeline: timelineFromEvents(
      {
        title: sharedWeddingData.events.nikah.title,
        date: sharedWeddingData.events.nikah.date,
        time: sharedWeddingData.events.nikah.time,
        description: "Your gracious presence is requested as the blessed ceremony begins.",
      },
      {
        title: sharedWeddingData.events.dinner.title,
        date: sharedWeddingData.events.dinner.date,
        time: sharedWeddingData.events.dinner.time,
        description: "An evening of warm company, family blessings, and shared celebration.",
      },
      {
        title: sharedWeddingData.events.valima.title,
        date: sharedWeddingData.events.valima.date,
        time: sharedWeddingData.events.valima.time,
        description: "We gather again to continue the celebration with gratitude and joy.",
      },
    ),
    wordingVariant: "valima-only",
    sections: {
      scratchReveal: true,
      gallery: true,
      dressCode: true,
    },
    content: {
      invitationLine: "Joyfully invite you to the Valima reception",
      supportingDateLabel: "Monday, 16 November 2026",
      heroEyebrow: "Reception Invitation",
      heroMessage:
        "A refined invitation focused on one graceful reception in honor of Imaz and Zeba.",
      invitationMessage:
        "We are honored to welcome you to the Wedding ceremony of Imaz & Zeba as they begin their journey together in faith and love,\nwe thank you for being part of this blessed occasion \u2764",
      openingTitle: "Bismillah",
      openingMessage:
        "Please join us for a joyful Valima reception honoring Imaz and Zeba.",
      openingPrompt: "Open invitation",
      coupleIntro:
        "Your invitation has been thoughtfully prepared for the Valima celebration, allowing the page to focus elegantly on the event you are invited to attend.",
      quote:
        "May this celebration be filled with warmth, gratitude, and the company of those we hold dear.",
      closingTitle: "Your presence will mean a great deal",
      closingMessage:
        "We would be delighted to celebrate the Valima with you and your family.",
      rsvpTitle: "Please confirm your attendance",
      rsvpMessage:
        "Kindly let us know if you will be joining the Valima reception so we may welcome you well.",
      eventIntroductions: {
        valima:
          "You are invited to the Valima reception for an evening of celebration and dua.",
      },
    },
  }),
  baseVariant({
    id: "3",
    label: "Nikah and haldi Only",
    seoDescription:
      "Nikah and Valima invitation variant with alternative wording for Imaz and Zeba.",
    events: ["nikah","dinner"],
    preWeddingEvents: sharedWeddingData.preWeddingEvents,
    valimaInvitation: {
      enabled: false,
      title: "Valima Reception",
      invitationLine: "We warmly invite you to join us for\nour Valima Reception.",
      date: "16 November 2026",
      day: "Monday",
      time: "1:00 PM",
      timeLabel: "Onwards",
      mapLink: "https://maps.app.goo.gl/279UJXWXYtF98GXP7",
      venue: sharedWeddingData.venue.name,
      location: sharedWeddingData.venue.address,
    },
    timeline: timelineFromEvents(
      {
        title: sharedWeddingData.events.nikah.title,
        date: sharedWeddingData.events.nikah.date,
        time: sharedWeddingData.events.nikah.time,
        description: "The blessed beginning of the wedding celebrations.",
      },
     {
        title: sharedWeddingData.events.dinner.title,
        date: sharedWeddingData.events.dinner.date,
        time: sharedWeddingData.events.dinner.time,
        description: "An evening of warm company, family blessings, and shared celebration.",
      },
    ),
    wordingVariant: "ceremony-and-reception",
    sections: {
      scratchReveal: true,
      gallery: true,
      dressCode: true
    },
    content: {
      invitationLine: "Invite you to witness and celebrate their union",
      supportingDateLabel: "From Nikah to Valima, November 2026",
      heroEyebrow: "Celebrate with us",
      heroMessage:
        "A carefully tailored invitation presenting the Nikah and Valima in one graceful experience.",
      invitationMessage:
        "We are honored to welcome you to the Wedding ceremony of Imaz & Zeba as they begin their journey together in faith and love,\nwe thank you for being part of this blessed occasion \u2764",
      openingTitle: "With gratitude to Allah",
      openingMessage:
        "We invite you to witness our Nikah and celebrate our Valima.",
      openingPrompt: "View invitation",
      coupleIntro:
        "This invitation carries alternate wording while preserving the same architecture, allowing the design to remain polished across different guest journeys.",
      quote:
        "Two celebrations, one blessed beginning, and a shared prayer for a beautiful life ahead.",
      closingTitle: "Please keep us in your prayers",
      closingMessage:
        "We are grateful for your love, duas, and presence in these celebrations.",
      rsvpTitle: "We would be honored by your reply",
      rsvpMessage:
        "Please respond for the events shown below so arrangements may be made with care and clarity.",
      eventIntroductions: {
        nikah:
          "The Nikah ceremony marks the beginning of this blessed new journey.",
        valima:
          "The Valima continues the celebration with loved ones gathered in joy.",
      },
    },
  }),
  baseVariant({
    id: "4",
    label: "Minimal Starter",
    seoDescription:
      "Minimal invitation variant reserved for future customization scenarios.",
    events: ["valima"],
    preWeddingEvents: sharedWeddingData.preWeddingEvents,
    valimaInvitation: {
      enabled: false,
      title: "Valima Reception",
      invitationLine: "We warmly invite you to join us for\nour Valima Reception.",
      date: "16 November 2026",
      day: "Monday",
      time: "1:00 PM",
      timeLabel: "Onwards",
      mapLink: "https://maps.app.goo.gl/279UJXWXYtF98GXP7",
      venue: sharedWeddingData.venue.name,
      location: sharedWeddingData.venue.address,
    },
    timeline: timelineFromEvents({
      title: sharedWeddingData.events.valima.title,
      date: sharedWeddingData.events.valima.date,
      time: sharedWeddingData.events.valima.time,
    }),
    wordingVariant: "minimal",
    sections: {
      openingReveal: false,
      scratchReveal: false,
      gallery: true,
      dressCode: false,
      backgroundMusic: false,
    },
    content: {
      invitationLine: "A reserved invitation prepared for you",
      supportingDateLabel: "Monday, 16 November 2026",
      heroEyebrow: "Foundation Variant",
      heroMessage:
        "A simplified invitation path that still carries the same calm, premium visual language.",
      invitationMessage:
        "We are honored to welcome you to the Wedding ceremony of Imaz & Zeba as they begin their journey together in faith and love,\nwe thank you for being part of this blessed occasion \u2764",
      openingTitle: "",
      openingMessage: "",
      openingPrompt: "",
      coupleIntro:
        "This lean configuration demonstrates how the design gracefully adapts when fewer sections are enabled for a given guest.",
      quote:
        "Designed to stay elegant even when the invitation flow is intentionally minimal.",
      closingTitle: "See you soon",
      closingMessage:
        "Additional wording, sections, and event combinations can be layered onto this structure later.",
      rsvpTitle: "A gentle response request",
      rsvpMessage:
        "Even in a reduced variant, the RSVP experience remains styled to match the invitation.",
      eventIntroductions: {
        valima:
          "This starter event card is driven entirely from the centralized config and shared event data.",
      },
    },
  }),
   baseVariant({
    id: "5",
    label: "Nikah Only",
    seoDescription:
      "Nikah and Valima invitation variant with alternative wording for Imaz and Zeba.",
    events: ["nikah","dinner"],
    preWeddingEvents: [],
    valimaInvitation: {
      enabled: false,
      title: "Valima Reception",
      invitationLine: "We warmly invite you to join us for\nour Valima Reception.",
      date: "16 November 2026",
      day: "Monday",
      time: "1:00 PM",
      timeLabel: "Onwards",
      mapLink: "https://maps.app.goo.gl/279UJXWXYtF98GXP7",
      venue: sharedWeddingData.venue.name,
      location: sharedWeddingData.venue.address,
    },
    timeline: timelineFromEvents(
      {
        title: sharedWeddingData.events.nikah.title,
        date: sharedWeddingData.events.nikah.date,
        time: sharedWeddingData.events.nikah.time,
        description: "The blessed beginning of the wedding celebrations.",
      },
     {
        title: sharedWeddingData.events.dinner.title,
        date: sharedWeddingData.events.dinner.date,
        time: sharedWeddingData.events.dinner.time,
        description: "An evening of warm company, family blessings, and shared celebration.",
      },
    ),
    wordingVariant: "ceremony-and-reception",
    sections: {
      scratchReveal: true,
      gallery: true,
      dressCode: true
    },
    content: {
      invitationLine: "Invite you to witness and celebrate their union",
      supportingDateLabel: "From Nikah to Valima, November 2026",
      heroEyebrow: "Celebrate with us",
      heroMessage:
        "A carefully tailored invitation presenting the Nikah and Valima in one graceful experience.",
      invitationMessage:
        "We are honored to welcome you to the Wedding ceremony of Imaz & Zeba as they begin their journey together in faith and love,\nwe thank you for being part of this blessed occasion \u2764",
      openingTitle: "With gratitude to Allah",
      openingMessage:
        "We invite you to witness our Nikah and celebrate our Valima.",
      openingPrompt: "View invitation",
      coupleIntro:
        "This invitation carries alternate wording while preserving the same architecture, allowing the design to remain polished across different guest journeys.",
      quote:
        "Two celebrations, one blessed beginning, and a shared prayer for a beautiful life ahead.",
      closingTitle: "Please keep us in your prayers",
      closingMessage:
        "We are grateful for your love, duas, and presence in these celebrations.",
      rsvpTitle: "We would be honored by your reply",
      rsvpMessage:
        "Please respond for the events shown below so arrangements may be made with care and clarity.",
      eventIntroductions: {
        nikah:
          "The Nikah ceremony marks the beginning of this blessed new journey.",
        valima:
          "The Valima continues the celebration with loved ones gathered in joy.",
      },
    },
  }),
];

export function getInvitationVariant(id: string) {
  return invitationVariants.find((variant) => variant.id === id);
}
