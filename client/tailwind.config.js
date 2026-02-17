/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '4xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e3ee',
          200: '#b3c7dd',
          300: '#8daacb',
          400: '#5c7fa0',
          500: '#2c4f6f',
          600: '#1e3a52',
          700: '#172b3d',
          800: '#0f1f2c',
          900: '#0a141d',
        },
        accent: {
          50: '#fff8eb',
          100: '#ffedc4',
          200: '#ffdb8a',
          300: '#ffc446',
          400: '#ffaa00',
          500: '#e69500',
          600: '#cc8100',
          700: '#996100',
          800: '#664100',
          900: '#332000',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Work Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
