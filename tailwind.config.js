/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F7ECE8",
          100: "#EFDAD2",
          200: "#DDB1A1",
          300: "#CD8C74",
          400: "#BC6343",
          500: "#8F4C33",
          600: "#713C28",
          700: "#562E1F",
          800: "#381E14",
          900: "#1E100B",
          950: "#0F0805",
        },
        tertiary: {
          50: "#F4F1E6",
          100: "#E9E4CE",
          200: "#D3C99C",
          300: "#BDAE6B",
          400: "#9B8B45",
          500: "#695E2F",
          600: "#554C26",
          700: "#3F391C",
          800: "#2A2613",
          900: "#151309",
          950: "#0B0A05",
        },
      },
    },
  },
  plugins: [],
};
