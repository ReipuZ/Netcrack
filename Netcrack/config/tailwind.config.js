/* Tema Tailwind: emas dan hitam */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070605',
          900: '#0d0b08',
          800: '#14110b',
          700: '#1d1910',
          600: '#2a2417',
        },
        gold: {
          50: '#fff9e6',
          100: '#fdefbd',
          200: '#f8de85',
          300: '#f0c94f',
          400: '#e3b32b',
          500: '#d4af37',
          600: '#b58a1c',
          700: '#8f6a14',
          800: '#6b4f10',
          900: '#4a370c',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 10px 40px -10px rgba(212,175,55,.45)',
        glass: '0 8px 32px rgba(0,0,0,.45)',
      },
    },
  },
};
