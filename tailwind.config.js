/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FDF8F3',
        cream: '#F5EDE0',
        beige: '#E8DCC8',
        blush: '#F0D8DC',
        'blush-soft': '#FAF0F2',
        champagne: '#C9A84C',
        'champagne-light': '#E8D5A3',
        gold: '#B8954A',
        text: '#3D3428',
        'text-muted': '#7A6F63',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        accent: ['Cinzel', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
      },
      boxShadow: {
        luxury: '0 20px 60px rgba(61, 52, 40, 0.1), 0 8px 24px rgba(201, 168, 76, 0.1)',
        warm: '0 12px 40px rgba(61, 52, 40, 0.08)',
      },
    },
  },
  plugins: [],
};
