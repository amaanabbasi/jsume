/** Colors resolve to CSS variables (see app/globals.css) so light/dark share one palette. */
const token = name => `rgb(var(${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': token('--bg'),
        'surface': token('--surface'),
        'surface-2': token('--surface-2'),
        'line': token('--line'),
        'ink': token('--ink'),
        'muted': token('--muted'),
        'accent': token('--accent'),
        'accent-ink': token('--accent-ink'),
        'accent-text': token('--accent-text'),
        'accent-bright': token('--accent-bright'),
        'glow-cool': token('--glow-cool'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        composer: '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 28px -12px rgb(0 0 0 / 0.12)',
      },
      keyframes: {
        'shimmer': {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
        'caret': {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
          '50%': { transform: 'translate3d(6%, 4%, 0) scale(1.08)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'nudge': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
      },
      animation: {
        'shimmer': 'shimmer 1.6s linear infinite',
        'caret': 'caret 1s step-end infinite',
        'drift': 'drift 18s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'nudge': 'nudge 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
