// Next Health Design System - Animation Utilities
// Smooth micro-interactions and transitions for premium UX

// Animation timing functions matching Next Health's premium feel
export const easings = {
  // Smooth and natural easing curves
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
  smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
  smoothInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Bouncy and playful for delightful interactions
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  bounceIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  bounceOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Snappy for immediate feedback
  snap: 'cubic-bezier(0.77, 0, 0.175, 1)',
  
  // Linear for progress indicators
  linear: 'linear',
} as const;

// Animation durations for consistent timing
export const durations = {
  instant: '0ms',
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
} as const;

// Keyframe animations
export const keyframes = {
  // Fade animations
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,
  
  // Scale animations
  scaleIn: `
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `,
  scaleOut: `
    @keyframes scaleOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.95); opacity: 0; }
    }
  `,
  
  // Slide animations
  slideInUp: `
    @keyframes slideInUp {
      from { transform: translateY(10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideInDown: `
    @keyframes slideInDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideInLeft: `
    @keyframes slideInLeft {
      from { transform: translateX(-10px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(10px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  
  // Pulse animation for health indicators
  pulse: `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
    }
  `,
  
  // Shimmer for loading states
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,
  
  // Progress ring animation
  progressRing: `
    @keyframes progressRing {
      from { stroke-dashoffset: var(--circumference); }
      to { stroke-dashoffset: var(--offset); }
    }
  `,
  
  // Heartbeat for health scores
  heartbeat: `
    @keyframes heartbeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.1); }
      28% { transform: scale(1); }
      42% { transform: scale(1.1); }
      70% { transform: scale(1); }
    }
  `,
  
  // Float animation for tooltips
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  `,
  
  // Rotate for loading spinners
  rotate: `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
};

// CSS classes for common animations
export const animationClasses = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  
  // Slide animations
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  
  // Special effects
  pulse: 'animate-pulse',
  heartbeat: 'animate-heartbeat',
  float: 'animate-float',
  shimmer: 'animate-shimmer',
  rotate: 'animate-rotate',
  
  // Transition utilities
  transitionAll: 'transition-all',
  transitionColors: 'transition-colors',
  transitionOpacity: 'transition-opacity',
  transitionTransform: 'transition-transform',
  transitionShadow: 'transition-shadow',
} as const;

// Hover scale effects
export const hoverScale = {
  sm: 'hover:scale-[1.02] active:scale-[0.98]',
  md: 'hover:scale-[1.05] active:scale-[0.95]',
  lg: 'hover:scale-[1.1] active:scale-[0.9]',
} as const;

// Focus ring styles
export const focusRing = {
  default: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  inset: 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
  subtle: 'focus:outline-none focus:ring-1 focus:ring-primary-500/50',
} as const;

// Loading skeleton animation
export const skeleton = {
  base: 'relative overflow-hidden bg-neutral-200',
  shimmer: 'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent after:animate-shimmer',
} as const;

// Transition presets
export const transitions = {
  fast: `transition-all duration-150 ${easings.smooth}`,
  base: `transition-all duration-300 ${easings.smooth}`,
  slow: `transition-all duration-500 ${easings.smooth}`,
  bounce: `transition-all duration-700 ${easings.bounce}`,
  
  // Specific property transitions
  colors: `transition-colors duration-300 ${easings.smooth}`,
  opacity: `transition-opacity duration-300 ${easings.smooth}`,
  transform: `transition-transform duration-300 ${easings.smooth}`,
  shadow: `transition-shadow duration-300 ${easings.smooth}`,
} as const;

// Stagger delay utilities for list animations
export const staggerDelay = (index: number, baseDelay: number = 50) => ({
  style: {
    animationDelay: `${index * baseDelay}ms`,
  },
});

// Generate CSS for animations
export const generateAnimationCSS = () => {
  return Object.values(keyframes).join('\n');
};