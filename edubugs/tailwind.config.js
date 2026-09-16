/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            950: '#060913',
            900: '#0a0f1d',
            850: '#0d1527',
            800: '#111c35',
            700: '#1e293b',
          },
          blue: {
            600: '#1d4ed8',
            500: '#2563eb',
            400: '#3b82f6',
            300: '#60a5fa',
          },
          cyan: {
            500: '#06b6d4',
            400: '#22d3ee',
            300: '#67e8f9',
            200: '#a5f3fc',
          },
          slate: {
            850: '#121a2d',
            750: '#24324f',
          }
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.35)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
