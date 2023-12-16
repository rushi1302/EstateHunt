/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {

      header: '#adf7d1',
      headerOne: '#ffe9e3',
      headerTwo: '#c4c1e0',
      headerThree: '#7c73e6',
      error: '#f70776',
      red: '#ff0000'
    },
    plugins: [],
  }
}