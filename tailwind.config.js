/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        secondary: "#04363F",
        primary: "#e63946",
        primary: "#e63946",
        grey: "#717171",
        dark: "#1b1f29",
        black: "#484848",
        white: "#ffffff",
        successlight: "#ECFDF3",
        success: "#067647",
        danger: "#B42318",
        dangerlight: "#FECDCA",
        warning: "#B42318",
        warninglight: "#FEF6EE",
      },
      screens: {
        sm :'576px',
        md: '768px',
        lg: '991px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
