/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#3B82F6', // blue-500
        'primary-50': '#EFF6FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-200': '#BFDBFE', // blue-200
        'primary-300': '#93C5FD', // blue-300
        'primary-400': '#60A5FA', // blue-400
        'primary-500': '#3B82F6', // blue-500
        'primary-600': '#2563EB', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-800': '#1E40AF', // blue-800
        'primary-900': '#1E3A8A', // blue-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#8B5CF6', // violet-500
        'secondary-50': '#F5F3FF', // violet-50
        'secondary-100': '#EDE9FE', // violet-100
        'secondary-200': '#DDD6FE', // violet-200
        'secondary-300': '#C4B5FD', // violet-300
        'secondary-400': '#A78BFA', // violet-400
        'secondary-500': '#8B5CF6', // violet-500
        'secondary-600': '#7C3AED', // violet-600
        'secondary-700': '#6D28D9', // violet-700
        'secondary-800': '#5B21B6', // violet-800
        'secondary-900': '#4C1D95', // violet-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#10B981', // emerald-500
        'accent-50': '#ECFDF5', // emerald-50
        'accent-100': '#D1FAE5', // emerald-100
        'accent-200': '#A7F3D0', // emerald-200
        'accent-300': '#6EE7B7', // emerald-300
        'accent-400': '#34D399', // emerald-400
        'accent-500': '#10B981', // emerald-500
        'accent-600': '#059669', // emerald-600
        'accent-700': '#047857', // emerald-700
        'accent-800': '#065F46', // emerald-800
        'accent-900': '#064E3B', // emerald-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#000000', // black
        'background-secondary': '#0A0A0A', // gray-950
        'surface': '#111111', // gray-900
        'surface-secondary': '#1F1F1F', // gray-800
        'surface-tertiary': '#2A2A2A', // gray-700

        // Text Colors
        'text-primary': '#FFFFFF', // white
        'text-secondary': '#9CA3AF', // gray-400
        'text-tertiary': '#6B7280', // gray-500
        'text-muted': '#4B5563', // gray-600

        // Status Colors
        'success': '#059669', // emerald-600
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-foreground': '#FFFFFF', // white

        'warning': '#D97706', // amber-600
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-foreground': '#FFFFFF', // white

        'error': '#DC2626', // red-600
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': 'rgba(255, 255, 255, 0.1)', // white with opacity
        'border-secondary': 'rgba(255, 255, 255, 0.05)', // white with opacity
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }], // 10px
        'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      boxShadow: {
        'neumorphic': '0 2px 8px rgba(255, 255, 255, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.3)',
        'glassmorphic': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-out': 'fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-up': 'slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-down': 'slideInDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-left': 'slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-out': 'scaleOut 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'ease-out-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-cubic': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-in-out-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}