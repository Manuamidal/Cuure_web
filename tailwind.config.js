module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-600
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-600
          foreground: 'var(--color-secondary-foreground)' // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // amber-500
          foreground: 'var(--color-accent-foreground)' // gray-800
        },
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // gray-800
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // gray-700
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // gray-800
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100
          foreground: 'var(--color-muted-foreground)' // gray-500
        },
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // slate-200
        ring: 'var(--color-ring)', // blue-600
        success: {
          DEFAULT: 'var(--color-success)', // emerald-600
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-600
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)' // white
        }
      },
      fontFamily: {
        heading: ['Lexend', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['IBM Plex Sans', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '6': '6px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '96': '96px',
        '120': '120px'
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '12px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px'
      },
      boxShadow: {
        'elevation-0': 'none',
        'elevation-1': '0 1px 3px rgba(15, 23, 42, 0.08)',
        'elevation-2': '0 2px 6px rgba(15, 23, 42, 0.12)',
        'elevation-3': '0 6px 12px rgba(15, 23, 42, 0.14)',
        'elevation-4': '0 12px 24px rgba(15, 23, 42, 0.16)',
        'elevation-5': '0 20px 40px -8px rgba(15, 23, 42, 0.16)'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.26, 0.64, 1)'
      },
      transitionDuration: {
        'smooth': '250ms'
      },
      zIndex: {
        'base': '0',
        'card': '1',
        'dropdown': '50',
        'navigation': '100',
        'modal': '200',
        'alert': '300'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}