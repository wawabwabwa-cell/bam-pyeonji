/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      colors: {
        night: {
          950: '#050810',
          900: '#0a0e1a',
          800: '#0f1525',
          700: '#161e35',
          600: '#1e2a47',
        },
        gold: {
          300: '#f4d98e',
          400: '#e8c060',
          500: '#d4a832',
          600: '#b88a1a',
        },
        parchment: {
          100: '#fdf6e3',
          200: '#f5e6c8',
          300: '#e8d0a0',
        },
        ink: {
          400: '#8899bb',
          500: '#6677aa',
          600: '#445588',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'ripple': 'ripple 2s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
