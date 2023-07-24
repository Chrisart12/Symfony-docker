/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}