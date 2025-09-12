/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montserratSans: ["Montserrat", "sans-serif"],
        montserratMono: ["Montserrat Subrayada", "sans-serif"],
        montserratAlternates: ["Montserrat Alternates", "sans-serif"],
      },
      colors: {
        primary_1: "#C0E0FF",
        primary_2: "#198CFF",
        primary_3: "#0063C7",
        primary_4: "#003D7A",
        secondary_1: "#24FEC1",
        secondary_2: "#00D6E1",
        secondary_3: "#00C4FF",
        secondary_4: "#8F98FF",
        neutral_1: "#424B5A",
        neutral_2: "#B5BDC7",
        neutral_3: "#939393",
        neutral_4: "#EDEDED",
        neutral_light: "#CECECE",
        neutral_dark: "#2D2D2D",
        neutral_danger: "#F33060",
        success: "#0CE07A",
        error: "#FF0000",
        warning: "#FFD211",
        black: "#000000",
        white: "#FFFFFF",
        background: "#B5BDC7",

        background_color_light: rgba(224, 242, 254, 0.9),
        background_color_green: rgba(31, 244, 173, 0.2),
        background_color_blue_light: rgba(28, 140, 252, 0.2),
        background_color_blue: rgba(2, 132, 199, 0.9),
      },
    },
  },
  plugins: [],
};
