/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F0E8',
        cream: '#EDE4D6',
        wine: '#3A1520',
        'wine-deep': '#16080C',
        dusty: '#C9A8A8',
        champagne: '#D4C4A0',
        gold: '#C4A574',
        brown: '#4A342C',
        rose: '#A86B73',
        text: '#2C1C18',
        'text-muted': '#7A645C',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        accent: ['Cinzel', 'serif'],
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
      },
    },
  },
  plugins: [],
};
