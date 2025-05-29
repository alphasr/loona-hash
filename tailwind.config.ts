/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'modal-enter': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'rainbow-text': {
          '0%': { color: '#ff0000' },
          '14%': { color: '#ff7f00' },
          '28%': { color: '#ffff00' },
          '42%': { color: '#00ff00' },
          '57%': { color: '#0000ff' },
          '71%': { color: '#4b0082' },
          '85%': { color: '#9400d3' },
          '100%': { color: '#ff0000' },
        },
        'rainbow-text-reverse': {
          '0%': { color: '#ff0000' },
          '14%': { color: '#9400d3' },
          '28%': { color: '#4b0082' },
          '42%': { color: '#0000ff' },
          '57%': { color: '#00ff00' },
          '71%': { color: '#ffff00' },
          '85%': { color: '#ff7f00' },
          '100%': { color: '#ff0000' },
        },
        'rainbow-bg': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'border-glow': {
          '0%, 100%': {
            'border-color': '#ff00ff',
            'box-shadow': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
          },
          '50%': {
            'border-color': '#00ffff',
            'box-shadow': '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
          },
        },
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'float-confetti': {
          '0%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-1000px) rotate(720deg)',
            opacity: '0',
          },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'modal-enter': 'modal-enter 0.3s ease-out forwards',
        'rainbow-text': 'rainbow-text 6s linear infinite',
        'rainbow-text-reverse': 'rainbow-text-reverse 6s linear infinite',
        'rainbow-bg': 'rainbow-bg 8s linear infinite',
        'border-glow': 'border-glow 3s linear infinite',
        'bounce-slow': 'bounce-slow 2s infinite',
        'float-confetti': 'float-confetti linear',
        'spin-slow': 'spin-slow 3s linear infinite',
        'spin-reverse': 'spin-reverse 3s linear infinite',
      },
    },
  },
  plugins: [],
};
