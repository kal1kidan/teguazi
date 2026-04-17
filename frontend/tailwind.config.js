/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          500: '#5D4037', // Brown 700
          600: '#4E342E', // Brown 800
          700: '#3E2723', // Brown 900
        },
        gold: {
          400: '#BCAAA4', // Brown 200
          500: '#8D6E63', // Brown 400
          600: '#795548', // Brown 500
        },
        terra: {
          400: '#A1887F', // Brown 300
          500: '#6D4C41', // Brown 600
        },
        earth: {
          100: '#EFEBE9', // Brown 50
          900: '#1E120D', // Very dark brown
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
