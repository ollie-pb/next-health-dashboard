// Next Health Design System - Typography Tokens
// Based on Next Health's sophisticated typography hierarchy

export const typography = {
  // Font Families - Next Health Brand
  fontFamily: {
    primary: '"Montserrat", system-ui, -apple-system, sans-serif',
    secondary: '"Libre Baskerville", Georgia, Times, serif', 
    mono: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
    system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  // Font Weights - Montserrat Range
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Font Sizes - Sophisticated Scale
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Typography Utility Classes
export const typographyClasses = {
  // Display Typography - Large headings
  display: {
    '2xl': {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['7xl'][0],
      lineHeight: typography.fontSize['7xl'][1].lineHeight,
      fontWeight: typography.fontWeight.bold,
      letterSpacing: typography.letterSpacing.tight,
    },
    xl: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['6xl'][0],
      lineHeight: typography.fontSize['6xl'][1].lineHeight,
      fontWeight: typography.fontWeight.bold,
      letterSpacing: typography.letterSpacing.tight,
    },
    lg: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['5xl'][0],
      lineHeight: typography.fontSize['5xl'][1].lineHeight,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.tight,
    },
  },

  // Headings
  heading: {
    h1: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['4xl'][0],
      lineHeight: typography.fontSize['4xl'][1].lineHeight,
      fontWeight: typography.fontWeight.bold,
      letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['3xl'][0],
      lineHeight: typography.fontSize['3xl'][1].lineHeight,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['2xl'][0],
      lineHeight: typography.fontSize['2xl'][1].lineHeight,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.normal,
    },
    h4: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize.xl[0],
      lineHeight: typography.fontSize.xl[1].lineHeight,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.normal,
    },
    h5: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize.lg[0],
      lineHeight: typography.fontSize.lg[1].lineHeight,
      fontWeight: typography.fontWeight.medium,
      letterSpacing: typography.letterSpacing.normal,
    },
    h6: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize.base[0],
      lineHeight: typography.fontSize.base[1].lineHeight,
      fontWeight: typography.fontWeight.medium,
      letterSpacing: typography.letterSpacing.normal,
    },
  },

  // Body Text
  body: {
    lg: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize.lg[0],
      lineHeight: typography.fontSize.lg[1].lineHeight,
      fontWeight: typography.fontWeight.regular,
      letterSpacing: typography.letterSpacing.normal,
    },
    base: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize.base[0],
      lineHeight: typography.fontSize.base[1].lineHeight,
      fontWeight: typography.fontWeight.regular,
      letterSpacing: typography.letterSpacing.normal,
    },
    sm: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize.sm[0],
      lineHeight: typography.fontSize.sm[1].lineHeight,
      fontWeight: typography.fontWeight.regular,
      letterSpacing: typography.letterSpacing.normal,
    },
  },

  // Accent Typography - Libre Baskerville
  accent: {
    lg: {
      fontFamily: typography.fontFamily.secondary,
      fontSize: typography.fontSize.lg[0],
      lineHeight: typography.fontSize.lg[1].lineHeight,
      fontWeight: typography.fontWeight.regular,
      letterSpacing: typography.letterSpacing.normal,
    },
    base: {
      fontFamily: typography.fontFamily.secondary,
      fontSize: typography.fontSize.base[0],
      lineHeight: typography.fontSize.base[1].lineHeight,
      fontWeight: typography.fontWeight.regular,
      letterSpacing: typography.letterSpacing.normal,
    },
  },

  // Captions and Labels
  caption: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.sm[0],
    lineHeight: typography.fontSize.sm[1].lineHeight,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase' as const,
  },

  // Data/Numeric Typography
  data: {
    lg: {
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize.lg[0],
      lineHeight: typography.fontSize.lg[1].lineHeight,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.normal,
    },
    base: {
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize.base[0],
      lineHeight: typography.fontSize.base[1].lineHeight,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.normal,
    },
    sm: {
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize.sm[0],
      lineHeight: typography.fontSize.sm[1].lineHeight,
      fontWeight: typography.fontWeight.medium,
      letterSpacing: typography.letterSpacing.normal,
    },
  },
} as const;

export type TypographyToken = keyof typeof typography;
export type TypographyClass = keyof typeof typographyClasses;