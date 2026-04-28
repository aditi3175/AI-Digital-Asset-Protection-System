/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 700ms ease-out both',
      },
      colors: {
        ink: '#e4e4e8',
        mist: '#0a0a0f',
        coal: {
          50: '#f4f4f6',
          100: '#e0e0e6',
          200: '#c0c0cc',
          300: '#9090a0',
          400: '#65657a',
          500: '#46465a',
          600: '#35354a',
          700: '#252535',
          800: '#1a1a26',
          900: '#111118',
          950: '#09090e',
        },
        tea: {
          50: '#f0faf0',
          100: '#dbf2db',
          200: '#b8e6b8',
          300: '#8ad48a',
          400: '#62c062',
          500: '#3ea83e',
          600: '#2f8a2f',
          700: '#276d27',
          800: '#235723',
          900: '#1f481f',
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
