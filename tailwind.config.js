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
            dark: '#1F2937',      // Deep slate/charcoal (Zinc 800)
            medium: '#374151',    // Slate gray (Zinc 700)
            gold: '#E13731',      // Crimson Red (from logo)
            goldhover: '#C02C26', // Darker red for hover states
            light: '#F8FAFC',     // Clean cool gray
            border: '#E2E8F0',    // Slate border
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
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }

    },
  },
  plugins: [],
}
