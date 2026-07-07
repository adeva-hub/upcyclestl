/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // White Patent — highlights, borders, text on dark
        cream: {
          50:  '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#EBEBEB',
          400: '#D6D6D6',
        },
        // Deep Crimson — primary accent ramp
        brick: {
          50:  '#FFF0F0',
          100: '#FFD6D6',
          200: '#FFA8A8',
          300: '#FF6B6B',
          400: '#E83535',
          500: '#C0151A',  // core deep crimson
          600: '#9E0F14',
          700: '#7A0A0E',
          800: '#560608',
          900: '#330204',
        },
        // Dark Noir neutrals — surfaces, text, borders
        stone: {
          50:  '#F5F5F5',
          100: '#E8E8E8',
          200: '#C8C8C8',
          300: '#A0A0A0',
          400: '#737373',
          500: '#525252',
          600: '#3D3D3D',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0D0D0D',  // Dark Noir base
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultrawide: '0.35em',
      },
      lineHeight: {
        editorial: '1.15',
      },
    },
  },
  plugins: [],
};
