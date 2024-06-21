/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideup: "slideup 1s ease-in-out",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        slideup: {
          from: {
            opacity: 0,
            transform: "translateY(25%)",
          },
          to: {
            opacity: 1,
            transform: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
