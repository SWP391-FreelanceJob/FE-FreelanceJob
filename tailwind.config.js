module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      "winter",
      "cmyk",
      "light",
      "corporate",
      {
        fvn: {
          primary: "#899dff",

          secondary: "#2d90ce",

          accent: "#37cdbe",

          neutral: "#374151",

          "base-100": "#FFFFFF",

          info: "#3B79ED",

          success: "#3ADFBE",

          warning: "#CC9214",

          error: "#EB608F",
        },
      },
    ],
  },
};
