// Next Health Brand Colors
// Extracted from https://www.next-health.com

export const nextHealthColors = {
  // Primary Brand Colors
  navy: {
    50: '#f0f4ff',
    100: '#e0e9ff',
    200: '#c7d6ff',
    300: '#a5b8ff',
    400: '#8394ff',
    500: '#6366f1', // Primary brand navy
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  
  // Next Health Brand Navy (darker, more medical)
  brand: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155', // Primary Next Health Navy
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Health Status Colors (keeping existing health semantics)
  optimal: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  good: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  attention: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  concern: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Neutral colors aligned with Next Health aesthetic
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // White and transparency
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Primary color mappings for easy reference
export const nextHealthBrandColors = {
  primary: nextHealthColors.brand[700], // Next Health Navy
  primaryLight: nextHealthColors.brand[100],
  primaryDark: nextHealthColors.brand[900],
  
  // Health semantics
  optimal: nextHealthColors.optimal[600],
  good: nextHealthColors.good[500],
  attention: nextHealthColors.attention[500],
  concern: nextHealthColors.concern[500],
  
  // UI semantics
  background: nextHealthColors.white,
  foreground: nextHealthColors.brand[900],
  muted: nextHealthColors.neutral[500],
  accent: nextHealthColors.brand[600],
} as const;

export type NextHealthColor = keyof typeof nextHealthColors;
export type NextHealthBrandColor = keyof typeof nextHealthBrandColors;