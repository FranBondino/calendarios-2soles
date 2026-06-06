/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Logo 03 - Prestige Slate & Gold Style
          prestige: {
            dark: '#524E48',      // Deep warm slate/charcoal
            medium: '#62594E',    // Primary warm bronze/taupe
            gold: '#C5A880',      // Gold/champagne accent
            goldhover: '#B5966E', // Darker gold for hover states
            light: '#F7F6F4',     // Ultra-light luxury gray/white
            border: '#E3E0DB',    // Elegant soft border
          },
          // Logo 04 - Crimson Sunset Style
          crimson: {
            red: '#E13731',       // High-energy vibrant red
            darkred: '#A5302F',   // Deeper burgundy shade
            bg: '#0F0F10',        // Deep black-gray charcoal background
            card: '#1B1B1D',      // Slightly lighter charcoal for cards
            border: '#2A2A2E',    // Dark mode subtle borders
            hover: '#F24E48',     // Brighter red for hover states
          }
        }
      },
      fontFamily: {
        serif: ['Marcellus', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
