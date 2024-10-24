/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-bounce': {
          '0%': { transform: 'translateX(-100%) scale(0.5)', opacity: '0' },
          '60%': { transform: 'translateX(10%) scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-bounce': 'slide-in-bounce 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}