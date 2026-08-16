import type { SharedWeddingData } from "@/lib/types/invitation";

export const sharedWeddingData: SharedWeddingData = {
  couple: {
    partnerOne: "Zeba Siddiqui",
    partnerTwo: "Imaz Javeed",
    displayNames: "Zeba & Imaz",
  },
  contact: {
    rsvpLink: "https://wa.me/440000000000",
    contactLabel: "RSVP Contact",
    contactValue: "+44 0000 000000",
  },
  venue: {
    name: "Wedding Lands",
    address: "Turbhe, Navi Mumbai, 400706",
    mapLink: "https://maps.app.goo.gl/Rsikti7bZvozHFmQA",
  },
  transportation: {
    enabled: true,
    title: "Transportation",
    message: "Pickup and drop off services will be available to and from Turbhe railway station only.",
  },
  preWeddingEvents: [
    {
      title: "Haldi",
      date: "11 November 2026, 7.30 PM onwards",
      venue:"Wadar Bhavan, Palm Beach RD, Sector 16, Sanpada, Navi Mumbai, 400705"
    },
     {
      title: "Mehendi",
      date: "12 November 2026, 11 AM onwards ",
    },
  ],
  events: {
    nikah: {
      id: "nikah",
      typeLabel: "Nikah",
      title: "Nikah Ceremony",
      description: "Placeholder Nikah details ready to be refined later.",
      date: "13 November 2026",
      isoDate: "2026-11-13T12:00:00+00:00",
      time: "4:30 PM",
      venue: {
        name: "Nikah Venue Placeholder",
        address: "123 Ceremony Road, London, United Kingdom",
        mapLink: "https://maps.google.com/?q=123+Ceremony+Road+London",
      },
    },
    dinner: {
      id: "dinner",
      typeLabel: "Dinner",
      title: "Dawat-e-Nikah",
      description: "Placeholder dinner details ready to be refined later.",
      date: "13 November 2026",
      isoDate: "2026-11-13T18:30:00+00:00",
      time: "7:30 PM onwards",
      venue: {
        name: "Dinner Venue Placeholder",
        address: "456 Celebration Avenue, London, United Kingdom",
        mapLink: "https://maps.google.com/?q=456+Celebration+Avenue+London",
      },
    },
    valima: {
      id: "valima",
      typeLabel: "Valima",
      title: "Dawat-e-Walima",
      description: "Placeholder Valima details ready to be refined later.",
      date: "16 November 2026",
      isoDate: "2026-11-16T13:00:00+00:00",
      time: "7:30 PM onwards",
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
    title: "Dress Code",
    womenTitle: "Women",
    womenAttire: "Elegant traditional attire in pastel tones",
    menTitle: "Men",
    menAttire: "Traditional attire in pastel tones",
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
    time: "After Asr",
  },
};
