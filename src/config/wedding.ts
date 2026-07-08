export const wedding = {
  groom: 'Mahmoud',
  bride: 'Yasmin',
  coupleDisplay: 'Mahmoud & Yasmin',

  date: {
    full: 'Sunday, July 26',
    short: '26 · 07 · 2026',
    iso: '2026-07-26T21:00:00',
    day: 'Sunday',
    month: 'July',
    dayNumber: 26,
    year: 2026,
  },

  time: '9:00 PM',
  timeLabel: '9:00 PM — Evening Celebration',

  venue: {
    name: 'Blue Nile Wedding Hall',
    city: 'Aswan',
    country: 'Egypt',
    fullAddress: 'Blue Nile Wedding Hall, Aswan, Egypt',
    tagline: 'Where the Nile meets timeless elegance',
    mapsQuery: 'Blue+Nile+Wedding+Hall,+Aswan,+Egypt',
    mapsUrl: 'https://maps.google.com/?q=Blue+Nile+Wedding+Hall,+Aswan,+Egypt',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Blue+Nile+Wedding+Hall,+Aswan,+Egypt',
    embedUrl: 'https://maps.google.com/maps?q=Blue+Nile+Wedding+Hall,+Aswan,+Egypt&hl=en&z=15&output=embed',
  },

  dressCode: {
    title: 'Formal Elegance',
    description: 'We invite our guests to dress in refined evening attire. Soft neutrals, champagne tones, and subtle gold accents are warmly welcomed.',
    suggestions: ['Evening Gowns & Suits', 'Champagne & Ivory Tones', 'Elegant Heels & Loafers'],
  },

  quote: {
    text: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾",
    source: 'Quran – Surah Ar-Rum (30:21)',
  },

  timeline: [
    { title: 'Guest Arrival', description: 'Welcome drinks and soft music as we gather to celebrate.', icon: 'wine' as const },
    { title: 'The Ceremony', description: 'The moment we have been dreaming of — our wedding begins.', icon: 'heart' as const },
    { title: 'Dinner & Toasts', description: 'An elegant feast shared with those we love most.', icon: 'utensils' as const },
    { title: 'Dancing & Celebration', description: 'Music, joy, and memories that will last forever.', icon: 'sparkles' as const },
  ],

  details: [
    { label: 'Date', value: 'Sunday, July 26, 2026', icon: 'calendar' as const },
    { label: 'Time', value: '9:00 PM', icon: 'clock' as const },
    { label: 'Venue', value: 'Blue Nile Wedding Hall', icon: 'map' as const },
    { label: 'City', value: 'Aswan, Egypt', icon: 'pin' as const },
  ],

  gallery: [
    '/WhatsApp Image 2026-07-07 at 3.38.02 PM.jpeg',
    '/WhatsApp Image 2026-07-08 at 9.21.10 PM (1).jpeg',
    '/WhatsApp Image 2026-07-08 at 9.21.10 PM.jpeg',
    '/WhatsApp Image 2026-07-07 at 9.29.54 PM.jpeg',
    '/WhatsApp Image 2026-07-07 at 9.34.07 PM.jpeg',
    '/WhatsApp Image 2026-07-07 at 9.35.42 PM.jpeg',
    
  ],

  heroImage: '/ChatGPT Image May 13, 2026, 10_51_34 PM.png',
  coupleImage: '/m&a.jpeg',

  envelope: {
    tagline: 'A celebration of love awaits',
    cardTitle: 'Together, Forever',
    cardBody: 'Two hearts united in love,\none beautiful journey ahead.\nWe would be honored to have you\nshare our wedding day with us.',
    backgroundImage: '/cinematic_bg.jpg',
  },

  rsvp: {
    deadline: 'Please respond by July 15, 2026',
    message: 'Your presence would mean the world to us. Kindly let us know if you will be joining our celebration.',
  },

  footer: {
    message: 'Your love, prayers, and presence are the greatest gifts we could receive. Thank you for being part of our special day.',
    credit: 'Asmaa',
  },

  music: '/perfect.m4a',
};

export function getWeddingCountdown() {
  const target = new Date(wedding.date.iso);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
