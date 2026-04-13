/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B7A99',     // soft blue
        secondary: '#65A580',   // soft green
        accent: '#8BA4B0',      // light blue-gray
        light: '#F5F7FA',       // off-white
        dark: '#2C3E50',        // dark slate
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        gentle: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
