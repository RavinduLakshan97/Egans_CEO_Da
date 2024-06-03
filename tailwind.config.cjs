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
    },
  },
  plugins: [],
});
