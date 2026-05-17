import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          base: '#0a0a0a',
          layer1: '#111111',
          layer2: '#1a1a1a',
          layer3: '#222222',
        },
        violet: {
          primary: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.4)',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          muted: '#505050',
        },
        status: {
          amber: '#f59e0b',
          red: '#ef4444',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        mono: ['DM Mono', 'monospace'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        badge: '6px',
      },
      boxShadow: {
        elevated: '0 0 0 1px rgba(0, 229, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.6)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'fade-slide': 'fadeSlide 0.25s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

// Made with Bob
