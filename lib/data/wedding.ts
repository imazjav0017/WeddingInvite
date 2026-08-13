import type { SharedWeddingData } from "@/lib/types/invitation";

export const sharedWeddingData: SharedWeddingData = {
  couple: {
    partnerOne: "Imaz",
    partnerTwo: "Zeba",
    displayNames: "Imaz & Zeba",
  },
  contact: {
    rsvpLink: "https://wa.me/440000000000",
    contactLabel: "RSVP Contact",
    contactValue: "+44 0000 000000",
  },
  venue: {
    name: "Wedding Lands",
    address: "Turbhe, Navi Mumbai",
    mapLink: "https://maps.app.goo.gl/Rsikti7bZvozHFmQA",
  },
  events: {
    nikah: {
      id: "nikah",
      typeLabel: "Nikah",
      title: "Nikah Ceremony",
      description: "Placeholder Nikah details ready to be refined later.",
      date: "13 November 2026",
      isoDate: "2026-11-13T12:00:00+00:00",
      time: "2:00 PM",
      venue: {
        name: "Nikah Venue Placeholder",
        address: "123 Ceremony Road, London, United Kingdom",
        mapLink: "https://maps.google.com/?q=123+Ceremony+Road+London",
      },
    },
    dinner: {
      id: "dinner",
      typeLabel: "Dinner",
      title: "Wedding Dinner",
      description: "Placeholder dinner details ready to be refined later.",
      date: "13 November 2026",
      isoDate: "2026-11-13T18:30:00+00:00",
      time: "6:30 PM",
      venue: {
        name: "Dinner Venue Placeholder",
        address: "456 Celebration Avenue, London, United Kingdom",
        mapLink: "https://maps.google.com/?q=456+Celebration+Avenue+London",
      },
    },
    valima: {
      id: "valima",
      typeLabel: "Valima",
      title: "Valima Reception",
      description: "Placeholder Valima details ready to be refined later.",
      date: "16 November 2026",
      isoDate: "2026-11-16T13:00:00+00:00",
      time: "1:00 PM",
      venue: {
        name: "Valima Venue Placeholder",
        address: "789 Reception Street, London, United Kingdom",
        mapLink: "https://maps.google.com/?q=789+Reception+Street+London",
      },
    },
  },
  gallery: [
    {
      id: "portrait",
      src: "/images/gallery/portrait-study.svg",
      alt: "Placeholder portrait composition for Imaz and Zeba",
      label: "Portrait Study",
      tone: "ivory",
    },
    {
      id: "floral",
      src: "/images/gallery/botanical-detail.svg",
      alt: "Placeholder botanical composition for the wedding gallery",
      label: "Botanical Detail",
      tone: "sage",
    },
    {
      id: "celebration",
      src: "/images/gallery/celebration-glow.svg",
      alt: "Placeholder celebration composition for the wedding gallery",
      label: "Celebration Glow",
      tone: "gold",
    },
  ],
  dressCode: {
    title: "Dress Code & Notes",
    attire: "Festive formal attire in elegant tones is warmly encouraged.",
    note:
      "Modest silhouettes, tailored eastern or western formalwear, and soft celebratory colors will suit the evening beautifully.",
  },
  guestNotes: [
    {
      title: "With Love",
      description:
        "Please arrive a little before each event begins so the ceremonies can start on time.",
    },
    {
      title: "Family Celebration",
      description:
        "Your invited events are shown below, and the RSVP section reflects only those celebrations.",
    },
  ],
  weddingSignature: {
    monogram: "I & Z",
    blessing: "In the name of Allah, the Most Merciful, the Most Compassionate",
    closingTag: "With duas and gratitude",
  },
  scratchReveal: {
    isoDate: "2026-11-13T17:00:00+00:00",
    dayNumber: "13",
    daySuffix: "th",
    month: "NOVEMBER",
    year: "2026",
    weekday: "Friday",
    time: "5 PM",
  },
};
