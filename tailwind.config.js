/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.025em',
      },
      lineHeight: {
        '48': '48px',
        '30': '30px',
        '28': '28px',
        '24': '24px',
      },
    },
  },
  plugins: [],
}