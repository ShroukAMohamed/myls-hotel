/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scans HTML and TypeScript files
    "./projects/**/*.{html,ts}", // If using Angular workspaces
    "./apps/**/*.{html,ts}",
    "./libs/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

