/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, typography,],
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "corporate", 
      "retro",
      "cupcake",
      "luxury"
    ],
  },
}

