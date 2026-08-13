export type EventId = "nikah" | "dinner" | "valima";

export type WordingVariant =
  | "full"
  | "valima-only"
  | "ceremony-and-reception"
  | "minimal";

export interface VenueDetails {
  name: string;
  address: string;
  mapLink: string;
}

export interface InvitationEvent {
  id: EventId;
  typeLabel: string;
  title: string;
  description: string;
  date: string;
  isoDate: string;
  time: string;
  venue: VenueDetails;
}

export interface CoupleDetails {
  partnerOne: string;
  partnerTwo: string;
  displayNames: string;
}

export interface ContactDetails {
  rsvpLink: string;
  contactLabel: string;
  contactValue: string;
}

export interface SharedWeddingData {
  couple: CoupleDetails;
  contact: ContactDetails;
  venue: VenueDetails;
  transportation: TransportationDetails;
  events: Record<EventId, InvitationEvent>;
  preWeddingEvents: PreWeddingEvent[];
  gallery: GalleryImage[];
  dressCode: DressCodeDetails;
  guestNotes: GuestNote[];
  weddingSignature: WeddingSignature;
  scratchReveal: ScratchRevealDetails;
}

export interface InvitationSectionFlags {
  openingReveal: boolean;
  scratchReveal: boolean;
  gallery: boolean;
  dressCode: boolean;
  rsvp: boolean;
  closingMessage: boolean;
  backgroundMusic: boolean;
}

export interface InvitationContent {
  invitationLine: string;
  supportingDateLabel: string;
  heroEyebrow: string;
  heroMessage: string;
  invitationMessage: string;
  openingTitle: string;
  openingMessage: string;
  openingPrompt: string;
  coupleIntro: string;
  quote: string;
  closingTitle: string;
  closingMessage: string;
  rsvpTitle: string;
  rsvpMessage: string;
  eventIntroductions: Partial<Record<EventId, string>>;
}

export interface TimelineItem {
  title: string;
  date?: string;
  time?: string;
  description?: string;
}

export interface InvitationVariantBase {
  id: string;
  label: string;
  seoDescription: string;
  events: EventId[];
  preWeddingEvents: PreWeddingEvent[];
  wordingVariant: WordingVariant;
  timeline: TimelineItem[];
  sections?: Partial<InvitationSectionFlags>;
  content: InvitationContent;
}

export interface InvitationVariant extends Omit<InvitationVariantBase, "sections"> {
  sections: InvitationSectionFlags;
  couple: CoupleDetails;
  contact: ContactDetails;
  venue: VenueDetails;
  transportation: TransportationDetails;
  eventMap: Record<EventId, InvitationEvent>;
  preWeddingEvents: PreWeddingEvent[];
  gallery: GalleryImage[];
  dressCode: DressCodeDetails;
  guestNotes: GuestNote[];
  weddingSignature: WeddingSignature;
  scratchReveal: ScratchRevealDetails;
  timeline: TimelineItem[];
}

export interface PreWeddingEvent {
  title: string;
  date?: string;
  time?: string;
  venue?: string;
}

export interface TransportationDetails {
  enabled: boolean;
  title: string;
  message: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  label: string;
  tone: "sage" | "gold" | "ivory";
}

export interface DressCodeDetails {
  title: string;
  womenTitle: string;
  womenAttire: string;
  menTitle: string;
  menAttire: string;
}

export interface GuestNote {
  title: string;
  description: string;
}

export interface WeddingSignature {
  monogram: string;
  blessing: string;
  closingTag: string;
}

export interface ScratchRevealDetails {
  isoDate: string;
  dayNumber: string;
  daySuffix: string;
  month: string;
  year: string;
  weekday: string;
  time: string;
}
