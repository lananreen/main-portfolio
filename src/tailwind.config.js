/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          about: "#080808",
          skills: "#080808",
          projects: "#080808",
          certifications: "#080808",
          accent: "#FFFFFF",
          yellow: "#F1E19A",
        },
      },
      borderRadius: {
        tab: "1rem",
      },
    },
  },
  plugins: [],
};