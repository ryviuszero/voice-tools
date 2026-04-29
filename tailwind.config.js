/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  safelist: [
    // Dynamic color classes used in category/[cat].astro, workflows/[slug].astro, index.astro
    { pattern: /^(text|bg|border)-(creator|gamedev|voiceai)-(50|100|200|500|600|700)$/ },
    { pattern: /^(text|border)-neon-(creator|gamedev|voiceai)$/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        // System font stack — no web font downloads per spec
        sans: [
          'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"',
          '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      colors: {
        // 🎬 Creators — warm orange
        creator: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        // 🎮 Game Devs — green
        gamedev: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        // 🤖 Voice AI Builders — indigo/purple
        voiceai: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        // Neon variants for dark mode
        neon: {
          creator: '#fb923c',
          gamedev:  '#4ade80',
          voiceai:  '#818cf8',
        },
      },
      keyframes: {
        waveBar: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        fadeSlideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'gradient-bg':   'gradientShift 8s ease infinite',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
        'fade-slide-up': 'fadeSlideUp 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
