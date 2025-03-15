import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Make Montserrat the default sans font
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        
        // Or create a specific class for Montserrat
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
} satisfies Config