/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 700ms ease-out both',
      },
      colors: {
        ink: '#172033',
        mist: '#fff7fb',
        lilac: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          900: '#581c87',
          950: '#3b0764',
        },
        blush: {
          50: '#fff1f7',
          100: '#ffe4f0',
          200: '#fecddf',
          300: '#fda4c8',
          400: '#fb7bb2',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(14px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
