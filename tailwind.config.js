/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      skew: {
        '20': '40deg',
        '-20': '-20deg',
      },
      backgroundImage: {
        'gradient': "url('/gradient.svg')",
      },
      animation: {
        show: 'show 5s linear infinite',
      },
      keyframes: {
        'show': {
          '0%': { marginTop: '-540px' },      // Start above the first item
          '4%': { marginTop: '-432px' },      // Move to show the first item
          '20%': { marginTop: '-432px' },     // Hold on the first item
          '24%': { marginTop: '-324px' },     // Move to show the second item
          '40%': { marginTop: '-324px' },     // Hold on the second item
          '44%': { marginTop: '-216px' },     // Move to show the third item
          '60%': { marginTop: '-216px' },     // Hold on the third item
          '64%': { marginTop: '-108px' },     // Move to show the fourth item
          '80%': { marginTop: '-108px' },     // Hold on the fourth item
          '84%': { marginTop: '0px' },        // Move to show the fifth item
          '100%': { marginTop: '0px' },       // Hold on the fifth item
        },
      }
    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms")
  ],
};
