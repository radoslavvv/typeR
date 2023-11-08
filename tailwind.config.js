/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        darkBlue: "#151a21",
        blue: "#1b2028",
        lightBlue: "#23a9d5",
        lightGray: "#4b5975",
        customWhite: "#ccccb5",
        customRed: "#a61717",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        logoHover: {
          "0%": { gap: "0.75rem" },
          "75%": { gap: "1.25rem" },
          "100%": { gap: "0.75rem" },
        },
        slideDown: {
          "0%": { transform: "translateY(-250px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(-250px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(250px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(250px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
        logoHover: "logoHover 0.3s ease-in-out forwards",
        slideDown: "slideDown 0.5s ease-in-out forwards",
        slideLeft: "slideLeft 0.5s ease-in-out forwards",
        slideRight: "slideRight 0.5s ease-in-out forwards",
        slideUp: "slideUp 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
