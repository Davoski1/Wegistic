/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          highlight: '#8F0CD1',
          primary: '#7006B7',
          dark: '#550592',
          subtle: '#F3E8FF',
          accent: '#DDD6FE',
        },
        surface: {
          canvas: '#FFFFFF',
          card: '#F5F5F5',
          border: '#E5E5E5',
        },
        text: {
          primary: '#171717',
          secondary: '#737373',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        wordmark: ['Bebas Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
