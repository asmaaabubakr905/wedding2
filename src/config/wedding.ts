export const wedding = {
  groom: 'Ibrahem',
  bride: 'Basant',
  coupleDisplay: 'Ibrahem & Basant',
  eventType: 'Engagement',

  date: {
    full: 'Friday, September 11',
    short: '11 · 09 · 2026',
    iso: '2026-09-11T21:00:00',
    day: 'Friday',
    month: 'September',
    dayNumber: 11,
    year: 2026,
  },

  time: '9:00 PM',
  timeLabel: '9:00 PM — Evening Celebration',

  venue: {
    name: 'Rivera Hall',
    city: '',
    country: 'Egypt',
    fullAddress: 'Rivera Hall',
    tagline: 'An evening of promise',
    mapsQuery: 'Rivera+Hall',
    mapsUrl: 'https://maps.google.com/?q=Rivera+Hall',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rivera+Hall',
    embedUrl: 'https://maps.google.com/maps?q=Rivera+Hall&hl=en&z=15&output=embed',
  },

  dressCode: {
    title: 'Formal Elegance',
    description: 'We invite our guests to dress in refined evening attire. Soft blush, dusty rose, and delicate pink accents are warmly welcomed.',
    suggestions: ['Evening Gowns & Suits', 'Blush & Rose Tones', 'Elegant Heels & Loafers'],
  },

  quote: {
    eyebrow: 'A Promise',
    lines: [
      'Tonight is not forever yet.',
      'Tonight is the vow —',
      'to choose each other,',
      'and walk the rest of the way together.',
    ],
    source: 'The Engagement Vow',
  },

  timeline: [
    { title: 'Guest Arrival', description: 'Welcome drinks and soft music as we gather to celebrate.', icon: 'wine' as const },
    { title: 'The Ceremony', description: 'The moment we have been dreaming of — our engagement begins.', icon: 'heart' as const },
    { title: 'Dancing & Celebration', description: 'Music, joy, and memories that will last forever.', icon: 'sparkles' as const },
  ],

  details: [
    { label: 'Date', value: 'Friday, September 11, 2026', icon: 'calendar' as const },
    { label: 'Time', value: '9:00 PM', icon: 'clock' as const },
    { label: 'Venue', value: 'Rivera Hall', icon: 'map' as const },
    { label: 'Occasion', value: 'Engagement', icon: 'pin' as const },
  ],

  gallery: [
    '/gallery-1.jpg',
    '/gallery-2.jpg',
    '/gallery-3.jpg',
    '/gallery-4.jpg',
  ],

  heroImage: '/hero.jpg',
  coupleImage: '/venue.jpg',

  envelope: {
    tagline: 'A celebration of love awaits',
    cardTitle: 'Together, Forever',
    cardBody: 'Two hearts united in love,\none beautiful journey ahead.\nWe would be honored to have you\nshare our engagement with us.',
    backgroundImage: '/opening.jpg',
  },

  rsvp: {
    deadline: 'Please respond by September 1, 2026',
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
