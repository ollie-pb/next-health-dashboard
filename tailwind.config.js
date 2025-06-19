/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#1B3A5F',
          blue: '#4A90E2',
          white: '#FFFFFF',
          light: '#F5F7FA',
        },
        status: {
          optimal: '#28A745',
          good: '#6CBF84',
          attention: '#FFC107',
          concern: '#FF6B6B',
          neutral: '#6C757D',
          pending: '#E9ECEF',
        },
        semantic: {
          error: '#DC3545',
          success: '#28A745',
          warning: '#FFC107',
          info: '#17A2B8',
        },
      },
      fontFamily: {
        display: ['Helvetica Neue', '-apple-system', 'sans-serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'monospace'],
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1440px',
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
      },
    },
  },
  plugins: [],
}