/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#FF9000",
      white: "#FFFFFF",
      black: "#050505",
      grey: "#151515",
      gray: "#0A0A0A",
      lightblack: "#252525",
    },
    screens: {
      'xsbelow': { max: '460px' },
      'smbelow': { max: '576px' },
      'mdbelow': { max: '768px' },
      xs: '460px',
      sm :'576px',
      md: '768px',
      lg: '991px',
      xl: '1280px',
      xxl: '1440px',
      xxxl: '1720px',
    }
  },
  plugins: [],
}

