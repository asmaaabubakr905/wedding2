import { wedding } from '../config/wedding';

export const STORY_FRAMES = [
  { src: '/hero.jpg', caption: 'Two souls' },
  { src: '/opening.jpg', caption: 'One evening' },
  { src: '/WhatsApp Image 2026-07-07 at 3.38.02 PM.jpeg', caption: 'A glance' },
  { src: '/WhatsApp Image 2026-07-07 at 9.29.54 PM.jpeg', caption: 'Held close' },
];

export const MEMORY_WALL = [
  { src: '/hero.jpg', caption: 'The portrait', kind: 'frame' as const, rotate: -3 },
  { src: '/opening.jpg', caption: 'The night they arrived', kind: 'film' as const, rotate: 2 },
  { src: '/gallery-1.jpg', caption: 'The table is set', kind: 'polaroid' as const, rotate: 4 },
  { src: '/gallery-2.jpg', caption: 'A promise in flowers', kind: 'frame' as const, rotate: -2 },
  { src: '/gallery-3.jpg', caption: 'The aisle waits', kind: 'polaroid' as const, rotate: -5 },
  { src: '/gallery-4.jpg', caption: 'Two rings', kind: 'film' as const, rotate: 3 },
  { src: '/WhatsApp Image 2026-07-08 at 9.21.10 PM.jpeg', caption: 'A memory kept', kind: 'polaroid' as const, rotate: 1 },
  { src: '/WhatsApp Image 2026-07-08 at 9.21.10 PM (1).jpeg', caption: 'Soft light', kind: 'frame' as const, rotate: -4 },
  { src: '/venue.jpg', caption: 'Where forever begins', kind: 'film' as const, rotate: 2 },
];

export const SECRET_NOTES = [
  {
    author: 'From the Families',
    text: 'With hearts full of joy, we celebrate the union of two beloved souls. May your love be as eternal as the stars and as deep as the ocean.',
  },
  {
    author: 'To Our Dearest Friends',
    text: 'Your presence on this special day means the world to us. Thank you for being part of our love story.',
  },
  {
    author: 'A Wish for the Couple',
    text: 'May every day be filled with laughter, every moment with tenderness, and every year with growing love.',
  },
];

export const JOURNEY = [
  { title: 'THE ARRIVAL', line: 'Guests arrive.' },
  { title: 'THE CEREMONY', line: 'The engagement begins.' },
  { title: 'THE DANCE', line: 'Let the night begin.' },
];

export const CHAPTERS = [
  { id: 0, roman: 'I', title: 'THE STORY' },
  { id: 1, roman: 'II', title: 'THE PROMISE' },
  { id: 2, roman: 'III', title: 'THE DAY' },
  { id: 3, roman: 'IV', title: 'THE CELEBRATION' },
  { id: 4, roman: 'V', title: 'FOREVER' },
];

export { wedding };
