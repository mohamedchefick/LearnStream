/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'sans-serif'], // Définissez vos polices ici
      },
      colors: {
        primary: '#031C41', // Couleur principale
        secondary: '#F3F4F6', // Couleur secondaire
      },
      spacing: {
        '128': '32rem', // Ajout d'un nouvel espacement
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        primary: "#0056D2",
        secondary: "#FFA600"
      }
    }]
  },

}
