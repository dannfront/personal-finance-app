/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "Beige-500": "#98908B",
        "Beige-100": "#F8F4F0",
        "Grey-900": "#201F24",
        "Grey-500": "#696868",
        "Grey-300": "#B3B3B3",
        "Grey-100": "#F2F2F2",
        "Green": "#277C78",
        "Yellow": "#F2CDAC",
        "Cian": "#82C9D7",
        "Navy": "#626070",
        "Red": "#C94736",
        "Purple": "#826CB0",

      }
    },
  },
  plugins: [],
}