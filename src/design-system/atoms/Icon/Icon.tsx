import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { forwardRef } from 'react';

const iconVariants = cva(
  // Base styles for consistent icon rendering
  'inline-flex items-center justify-center shrink-0',
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4', 
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
        '2xl': 'w-10 h-10',
        '3xl': 'w-12 h-12',
      },
      color: {
        default: 'text-neutral-700',
        muted: 'text-neutral-500',
        subtle: 'text-neutral-400',
        primary: 'text-primary-500',
        success: 'text-optimal-500',
        warning: 'text-attention-500',
        danger: 'text-concern-500',
        white: 'text-white',
        inherit: 'text-inherit',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'default',
    },
  }
);

// Health and wellness icon collection using SVG paths
const iconPaths = {
  // Health metrics
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
  pulse: 'M3 12h4l3-9 4 9h7',
  brain: 'M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5zM9 6h6v2H9V6zm0 4h6v2H9v-2zm0 4h6v2H9v-2z',
  blood: 'M12 2l3.09 6.26L22 9l-5 4.86L18.18 22 12 18.77 5.82 22 7 13.86 2 9l6.91-.74L12 2z',
  
  // Navigation and UI
  chevronRight: 'M9 18l6-6-6-6',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronDown: 'M6 9l6 6 6-6',
  chevronUp: 'M18 15l-6-6-6 6',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
  
  // Actions
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  trash: 'M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  
  // Information
  info: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM11 7h2v2h-2zM11 11h2v6h-2z',
  alertTriangle: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01',
  alertCircle: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM12 6v6M12 16h.01',
  
  // Data and analytics
  trendingUp: 'M23 6l-9.5 9.5-5-5L1 18',
  trendingDown: 'M23 18l-9.5-9.5-5 5L1 6',
  barChart: 'M18 20V10M12 20V4M6 20v-6',
  pieChart: 'M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z',
  
  // Settings and controls
  settings: 'M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z',
  menu: 'M3 12h18M3 6h18M3 18h18',
  more: 'M12 12h.01M12 6h.01M12 18h.01',
  
  // Status indicators
  clock: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM12 6v6l4 2',
  calendar: 'M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 8h14v11H5z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 4 4 4 4 0 0 0-4-4z',
  
  // Loading and feedback
  loader: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
  refresh: 'M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15',
  
  // External and sharing
  externalLink: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  
  // Additional navigation icons
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  archive: 'M21 8v13H3V8M1 3h22v5H1zM10 12l2 2 2-2',
} as const;

export type IconName = keyof typeof iconPaths;

interface IconProps extends VariantProps<typeof iconVariants> {
  name: IconName;
  className?: string;
  'aria-label'?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, color, className, 'aria-label': ariaLabel, ...props }, ref) => {
    const path = iconPaths[name];
    
    if (!path) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }

    return (
      <svg
        ref={ref}
        className={cn(iconVariants({ size, color }), className)}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        {...props}
      >
        <path d={path} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon, iconVariants, iconPaths };
export type { IconProps };