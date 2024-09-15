/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        signature: ['"Great Vibes"', 'cursive']
      }
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true
    })
  ],
}
