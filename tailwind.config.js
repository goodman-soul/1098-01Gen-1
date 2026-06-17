/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        forest: {
          50: '#F0F5F1',
          100: '#DCE8DE',
          200: '#B5D0BA',
          300: '#8EB896',
          400: '#6BA078',
          500: '#2D5A3D',
          600: '#264D34',
          700: '#1E402B',
          800: '#173322',
          900: '#0F2618',
        },
        olive: {
          100: '#E8EEDB',
          200: '#CFDDB8',
          300: '#B6CC94',
          400: '#9DBB71',
          500: '#6B8E4E',
          600: '#5A7842',
          700: '#496235',
        },
        cream: {
          50: '#FBF9F4',
          100: '#F5F0E6',
          200: '#EBE0CB',
          300: '#E0D0AF',
        },
        earth: {
          400: '#D4875A',
          500: '#C4652C',
          600: '#A35425',
          700: '#82431E',
        },
        sky: {
          300: '#9FC2D6',
          400: '#85B2CC',
          500: '#6BA3C9',
        }
      },
      fontFamily: {
        display: ['"Lora"', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(45, 90, 61, 0.08), 0 2px 4px -2px rgba(45, 90, 61, 0.05)',
        'card-hover': '0 10px 25px -3px rgba(45, 90, 61, 0.15), 0 4px 6px -4px rgba(45, 90, 61, 0.1)',
        pop: '0 20px 40px -10px rgba(45, 90, 61, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
