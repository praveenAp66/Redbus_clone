module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      lineHeight: {
        '32': '32px', // Add custom line height of 32px
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        customBg: '#F60808', // Define custom color with a name
      },
     
    },
  },
  plugins: [],
};
