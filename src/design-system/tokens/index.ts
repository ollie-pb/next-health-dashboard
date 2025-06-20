// Next Health Design System - Design Tokens
// Complete token system for sophisticated, brand-aligned components

export { colors, getHealthColor, getHealthColorWithOpacity, type ColorToken } from './colors';
export { typography, typographyClasses, type TypographyToken, type TypographyClass } from './typography';
export { 
  spacing, 
  componentSpacing, 
  borderRadius, 
  shadows, 
  zIndex, 
  timing, 
  breakpoints,
  type SpacingToken,
  type ShadowToken,
  type RadiusToken
} from './spacing';

// Import all tokens for theme object
import { colors } from './colors';
import { typography } from './typography';
import { spacing, componentSpacing, borderRadius, shadows, zIndex, timing, breakpoints } from './spacing';

// Design system theme object
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  zIndex,
  timing,
  breakpoints,
  componentSpacing,
} as const;

// CSS Custom Properties generator for runtime theming
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};
  
  // Color variables
  Object.entries(colors.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });
  
  Object.entries(colors.neutral).forEach(([key, value]) => {
    cssVars[`--color-neutral-${key}`] = value;
  });
  
  Object.entries(colors.health.optimal).forEach(([key, value]) => {
    cssVars[`--color-optimal-${key}`] = value;
  });
  
  Object.entries(colors.health.good).forEach(([key, value]) => {
    cssVars[`--color-good-${key}`] = value;
  });
  
  Object.entries(colors.health.attention).forEach(([key, value]) => {
    cssVars[`--color-attention-${key}`] = value;
  });
  
  Object.entries(colors.health.concern).forEach(([key, value]) => {
    cssVars[`--color-concern-${key}`] = value;
  });
  
  // Spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  // Shadow variables
  Object.entries(shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });
  
  return cssVars;
};