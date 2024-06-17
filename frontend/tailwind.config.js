/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'preto-trila': '#000000',
        'vermelho-trilha': '#3D5C5A',
        'branco-trilha': '#ffffff'
      },
    },
  },
  plugins: [],
}
