/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#7DA0FA',
        'custom-red':'#CFE1B9',
        'custom-green':'#F2E9E4',
        'custom-yellow':'#CFDBD5',
        'custom-purple':'#cdb4db',
      },
      keyframes: {
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-20%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-20%)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.5s ease-in-out forwards',
        'slide-up': 'slide-up 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
});
