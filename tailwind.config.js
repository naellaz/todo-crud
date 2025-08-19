/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#789DBC',
        secondary: '#C9E9D2',
        danger: '#FFE3E3',
        lightbg: '#FEF9F2',
      },
    },
  },
  plugins: [],
}
