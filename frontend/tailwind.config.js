/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderBeam: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)'},
        },
        statusGlitch: {
          '0%, 100%': { filter: 'brightness(1)', transform: 'translate(0, 0)'},
          '20%': { filter: 'brightness(1.35)', transform: 'translate(1px, 0)'},
          '40%': { filter: 'brightness(1.2)', transform: 'translate(-1px, 0)'},
          '60%': { filter: 'brightness(1.3)', transform: 'translate(0, 1px)'},
          '80%': {filter: 'brightness(1.15)', transform: 'translate(0, 1px)' }
        },
        scanSweep: {
          '0%': { transform: 'translateY(-120%)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(120%)', opacity: '0' }
        }
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out',
        'border-beam': 'borderBeam 8s linear infinite',
        'slow-spin': 'slowSpin 4s linear infinite',
        'status-glitch': 'statusGlitch 0.35s ease-out',
        'scan-sweep': 'scanSweep 3.5s ease-in-out infinite'
      },
    },
  },
  plugins: [],
};
