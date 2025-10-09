/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peacock-blue': '#005F73',
        'charcoal': '#333333',
        'saffron': '#FCA311',
        'sakura': '#FFC9DD',
        'bamboo': '#2A9D8F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
