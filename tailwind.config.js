/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
   extend: {
        backgroundImage: {
          'banner' : "url('/phim-ma-viet-nam-vong-nhi.jpg.webp')",
        }
      },
  },
  plugins: [],
};
