import { wedding } from '../config/wedding';

export const STORY_FRAMES = [
  { src: '/1.jpeg', caption: 'Two souls' },
  { src: '/2.jpeg', caption: 'One evening' },
  { src: '/3.jpeg', caption: 'A glance' },
  { src: '/4.jpeg', caption: 'Held close' },
];

export const MEMORY_WALL = [
  { src: '/5.jpeg', caption: 'The portrait', kind: 'frame' as const, rotate: -3 },
  { src: '/6.jpeg', caption: 'The night they arrived', kind: 'film' as const, rotate: 2 },
  { src: '/1.jpeg', caption: 'The table is set', kind: 'polaroid' as const, rotate: 4 },
  { src: '/2.jpeg', caption: 'A promise in flowers', kind: 'frame' as const, rotate: -2 },
  { src: '/3.jpeg', caption: 'The aisle waits', kind: 'polaroid' as const, rotate: -5 },
  { src: '/7.jpeg', caption: 'Two rings', kind: 'film' as const, rotate: 3 },
  { src: '/kids.jpeg', caption: 'A memory kept', kind: 'polaroid' as const, rotate: 1 },
  { src: '/4.jpeg', caption: 'Soft light', kind: 'frame' as const, rotate: -4 },
  { src: '/6.jpeg', caption: 'Where forever begins', kind: 'film' as const, rotate: 2 },
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
