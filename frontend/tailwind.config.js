module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#0f172a',
        accent: '#6366f1',
        'accent-light': '#818cf8',
        surface: '#1e293b',
        muted: '#94a3b8',
      }
    },
  },
  plugins: [],
}
