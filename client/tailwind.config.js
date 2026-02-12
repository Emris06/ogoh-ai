/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e17',
          panel: '#111827',
          border: '#1e293b',
          accent: '#00f0ff',
          green: '#00ff88',
          red: '#ff2d55',
          amber: '#ffaa00',
          muted: '#64748b',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'alert-flash': 'alertFlash 0.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        alertFlash: {
          '0%, 100%': { backgroundColor: 'rgba(255, 45, 85, 0.0)' },
          '50%': { backgroundColor: 'rgba(255, 45, 85, 0.15)' },
        },
      },
    },
  },
  plugins: [],
};
