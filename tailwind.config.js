module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#24292F'
      }
    },
  },
  plugins: ["@tailwindcss/forms"],
}
