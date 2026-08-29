/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Avionics / schematic palette, cool graphite-navy ground,
        // amber = attention / signature accent, teal = verified / healthy,
        // red = fault, used sparingly and only for genuine fault states.
        ink: {
          950: '#0B0F14',
          900: '#0F151C',
          800: '#121821',
          700: '#182130',
          600: '#26313D',
          500: '#3A4856',
        },
        paper: {
          100: '#E7EDF3',
          300: '#C4CFDA',
          500: '#92A1B0',
        },
        amber: {
          400: '#F5BE5E',
          500: '#F2A93B',
          600: '#D98E22',
        },
        teal: {
          400: '#4BCDBB',
          500: '#2FB8A6',
          600: '#1F8F80',
        },
        fault: {
          400: '#EB7161',
          500: '#E2543D',
          600: '#B93F2C',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(231,237,243,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,237,243,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
};
