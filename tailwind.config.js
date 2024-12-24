/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  
      colors: {
        'harvest': {
          primary: '#218225',    // Deep Forest Green
          secondary: '#2ACC32',     // Light Green
          extralight: '#E2EFE3',    // Extra Light Green
          offwhite: '#FFFFFF',      // Off White
          lightgray: '#EEEEEE',     // Light Gray
          darkblack: '#191819'      // Black
        },
      },
    },
  },
  plugins: [],
}

