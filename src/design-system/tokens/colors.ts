// Next Health Design System - Color Tokens
// Sophisticated color palette inspired by Next Health's brand aesthetic

export const colors = {
  // Primary Brand Colors - Sophisticated Blues
  primary: {
    50: '#f0f4f8',
    100: '#d9e6f2', 
    200: '#b8d0e8',
    300: '#91b4db',
    400: '#6b94cc',
    500: '#4a74b8',   // Primary brand blue
    600: '#3d5a94',
    700: '#314570',
    800: '#25324c',
    900: '#1a1f28',
  },

  // Sophisticated Neutral Scale - Next Health inspired
  neutral: {
    50: '#fafbfc',
    100: '#f4f6f8',
    200: '#e8ecf0',
    300: '#d0d8e0',
    400: '#a8b8c8',
    500: '#7d8ba0',
    600: '#5a6578',
    700: '#3f4954',
    800: '#2b3138',
    900: '#1a1d21',
  },

  // Health Status Colors - Premium Aesthetic
  health: {
    optimal: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#10b981',   // Primary optimal
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    good: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#59c96a',   // Primary good
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    attention: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',   // Primary attention
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
      500: '#ef4444',   // Primary concern
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    critical: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#dc2626',   // Primary critical
      600: '#b91c1c',
      700: '#991b1b',
      800: '#7f1d1d',
      900: '#6b1919',
    },
  },

  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Background Colors
  background: {
    primary: '#fafbfc',      // Main app background
    secondary: '#f4f6f8',    // Secondary surfaces
    tertiary: '#e8ecf0',     // Subtle backgrounds
    inverse: '#1a1d21',      // Dark backgrounds
  },

  // Text Colors
  text: {
    primary: '#1a1d21',      // Primary text
    secondary: '#3f4954',    // Secondary text
    tertiary: '#7d8ba0',     // Muted text
    inverse: '#fafbfc',      // Text on dark backgrounds
    accent: '#4a74b8',       // Accent text
  },

  // Border Colors
  border: {
    subtle: '#e8ecf0',       // Subtle borders
    default: '#d0d8e0',      // Default borders
    strong: '#a8b8c8',       // Prominent borders
    accent: '#4a74b8',       // Accent borders
  },
} as const;

// Color utility functions
export const getHealthColor = (score: number): string => {
  if (score >= 90) return colors.health.optimal[500];
  if (score >= 70) return colors.health.good[500];
  if (score >= 50) return colors.health.attention[500];
  if (score > 0) return colors.health.concern[500];
  return colors.neutral[400];
};

export const getHealthColorWithOpacity = (score: number, opacity: number): string => {
  const color = getHealthColor(score);
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export type ColorToken = keyof typeof colors;