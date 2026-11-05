/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111114',
        surface: '#1A1A1F',
        'surface-hover': '#24242B',
        'primary-orange': '#FF5B35',
        'secondary-orange': '#FF7A24',
        'acid-yellow': '#E8FF5B',
        'lab-purple': '#8B70FF',
        'primary-text': '#F5F2EC',
        'secondary-text': '#A5A3AA',
        'border-lab': '#303036',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -3px rgba(255, 91, 53, 0.45)',
        'glow-orange-lg': '0 10px 40px -5px rgba(255, 91, 53, 0.55)',
        'glow-flask': '0 0 60px 10px rgba(255, 106, 0, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        }
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        shake: 'shake 0.4s ease-in-out',
      }
    },
  },
  plugins: [],
}

