/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
    },
    extend: {
      colors: {
        forest: {
          50: '#EEF6F2',
          100: '#D6EAE0',
          200: '#A9D2C0',
          300: '#74B69B',
          400: '#3E9375',
          500: '#0B6E4F',
          600: '#0A6247',
          700: '#08503A',
          800: '#063D2C',
          900: '#04291D',
        },
        gold: {
          50: '#FBF8F2',
          100: '#F4ECDD',
          200: '#E8D9BB',
          300: '#DBC494',
          400: '#C8A96A',
          500: '#B99450',
          600: '#9A7A3F',
          700: '#7A6032',
        },
        ink: {
          DEFAULT: '#1B1B1B',
          soft: '#4A4A46',
          muted: '#7C7C74',
        },
        canvas: '#FAFAF8',
        parchment: '#F7F5F2',
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Literata"', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(27,27,27,0.06), 0 18px 40px -24px rgba(27,27,27,0.18)',
        lift: '0 8px 20px -6px rgba(27,27,27,0.10), 0 32px 60px -30px rgba(11,110,79,0.35)',
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.35), 0 20px 50px -30px rgba(27,27,27,0.4)',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, index) => [index, String(index / 100)]),
      ),
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        1200: '1200ms',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
