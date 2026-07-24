/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#16181C',
          900: '#1B1E23',
          800: '#23262B',
          700: '#2E3238',
          600: '#3B3F46',
        },
        brass: {
          300: '#E4C98A',
          400: '#D6B571',
          500: '#C9A15A',
          600: '#AD8548',
        },
        paper: {
          100: '#F3EFE6',
          200: '#EAE3D3',
        },
        ink: {
          700: '#4A4740',
          500: '#6B675D',
        },
        rust: {
          500: '#B5533C',
          600: '#9A4531',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
