/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary neon accent — cyan/teal for structure & UI
        neon: {
          cyan: '#00d9ff',
          teal: '#00b4d8',
        },
        // Secondary accent — amber for warnings & emphasis
        neon_amber: {
          DEFAULT: '#fbbf24',
          dim: '#b45309',
        },
        // Dark background palette
        dna: {
          bg: '#0a1220',
          card: '#0f1a2e',
          surface: '#142442',
          border: '#1e3358',
        },
        // Archetype palette
        archetype: {
          architect: '#3b82f6',
          maverick: '#ef4444',
          zen: '#10b981',
          sleeper: '#8b5cf6',
          explorer: '#f59e0b',
          firefighter: '#f97316',
        },
        // Emotional drivers
        driver: {
          guardian: '#06b6d4',
          freedom: '#a855f7',
          legacy: '#eab308',
        },
        // Phase accents
        phase: {
          identity: '#00d9ff',
          diagnostic: '#fbbf24',
          core: '#10b981',
          mission: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.1)',
        'neon-cyan-lg': '0 0 30px rgba(0, 217, 255, 0.4), 0 0 80px rgba(0, 217, 255, 0.2)',
        'neon-amber': '0 0 20px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 191, 36, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dna-grid': `linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.4), 0 0 40px rgba(0, 217, 255, 0.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
