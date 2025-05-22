/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      animation: {
        'scroll': 'scroll 60s linear infinite',
        'scroll-slow': 'scrollSlow 80s linear infinite',
        'scroll-medium': 'scroll 40s linear infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-200px * 6 - 16px * 6))' },
        },
        scrollSlow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-200px * 6 - 16px * 6))' },
        },
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
} 