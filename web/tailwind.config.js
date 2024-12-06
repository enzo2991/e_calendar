/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'screentab': "url('/screen.png')",
      },
      fontFamily: {
        christmas: ['"Mountains of Christmas"', 'cursive'],
      },
    },
  },
  plugins: [],
}

