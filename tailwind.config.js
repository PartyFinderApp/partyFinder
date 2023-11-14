/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["AppFont", "sans-serif"],
        custom2: ["AppFontBold", "sans-serif"],
      },
      fontSize: {
        lg: "35px",
        btn:"16px",
        xl: "22px",
        md:"16px",
        sm:"14px",
      },
      colors: {
        primary: "#000000",
        grayborder:"#CFCFCF",
        purple:"#7C3AED",
        tgray:"#A0A0A0",
      },
    },
  },
  plugins: [],
}

// title : 35px
// paragraph : 22px
