import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/frontend/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1F3A',
          hover: '#162E52',
          active: '#071527',
          light: '#1E3A5F',
        },
        secondary: {
          DEFAULT: '#10B981',
          hover: '#059669',
          subtle: '#ECFDF5',
          light: '#34D399',
        },
        alert: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          subtle: '#FFFBEB',
          light: '#FBBF24',
        },
        danger: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          subtle: '#FEF2F2',
        },
        background: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F1F5F9',
          elevated: '#FFFFFF',
        },
        text: {
          DEFAULT: '#0B1F3A',
          muted: '#334155',
          subtle: '#64748B',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2E8F0',
          hover: '#CBD5E1',
          focus: '#10B981',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(11, 31, 58, 0.05)',
        md: '0 4px 6px -1px rgba(11, 31, 58, 0.08), 0 2px 4px -2px rgba(11, 31, 58, 0.06)',
        lg: '0 10px 15px -3px rgba(11, 31, 58, 0.1), 0 4px 6px -4px rgba(11, 31, 58, 0.05)',
        radar: '0 0 0 4px rgba(16, 185, 129, 0.25)',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
