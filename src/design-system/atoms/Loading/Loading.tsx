import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { forwardRef } from 'react';

const loadingVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        spinner: '',
        dots: 'space-x-1',
        pulse: '',
        skeleton: 'relative overflow-hidden bg-neutral-200',
        heartbeat: '',
      },
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
      color: {
        default: '',
        primary: '',
        white: '',
        muted: '',
      },
    },
    defaultVariants: {
      variant: 'spinner',
      size: 'md',
      color: 'default',
    },
  }
);

// Size mappings for different variants
const sizeMap = {
  spinner: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  },
  dots: {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  },
  pulse: {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  },
};

// Color mappings
const colorMap = {
  default: 'text-neutral-600',
  primary: 'text-primary-500',
  white: 'text-white',
  muted: 'text-neutral-400',
};

interface LoadingProps extends VariantProps<typeof loadingVariants> {
  className?: string;
  label?: string;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ variant = 'spinner', size = 'md', color = 'default', className, label, ...props }, ref) => {
    if (variant === 'spinner') {
      return (
        <div 
          ref={ref}
          className={cn(loadingVariants({ variant, size, color }), className)}
          role="status"
          aria-label={label || 'Loading'}
          {...props}
        >
          <svg 
            className={cn(
              'animate-rotate',
              size && sizeMap.spinner[size as keyof typeof sizeMap.spinner],
              color && colorMap[color as keyof typeof colorMap]
            )}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="sr-only">{label || 'Loading...'}</span>
        </div>
      );
    }

    if (variant === 'dots') {
      return (
        <div 
          ref={ref}
          className={cn(loadingVariants({ variant, size, color }), className)}
          role="status"
          aria-label={label || 'Loading'}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full animate-pulse',
                size && sizeMap.dots[size as keyof typeof sizeMap.dots],
                color && colorMap[color as keyof typeof colorMap],
                'bg-current'
              )}
              style={{
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
          <span className="sr-only">{label || 'Loading...'}</span>
        </div>
      );
    }

    if (variant === 'pulse') {
      return (
        <div 
          ref={ref}
          className={cn(loadingVariants({ variant, size, color }), className)}
          role="status"
          aria-label={label || 'Loading'}
          {...props}
        >
          <div className="relative inline-flex">
            <div 
              className={cn(
                'rounded-full animate-ping absolute inset-0',
                size && sizeMap.pulse[size as keyof typeof sizeMap.pulse],
                color && colorMap[color as keyof typeof colorMap],
                'bg-current opacity-75'
              )} 
            />
            <div 
              className={cn(
                'rounded-full relative',
                size && sizeMap.pulse[size as keyof typeof sizeMap.pulse],
                color && colorMap[color as keyof typeof colorMap],
                'bg-current'
              )} 
            />
          </div>
          <span className="sr-only">{label || 'Loading...'}</span>
        </div>
      );
    }

    if (variant === 'skeleton') {
      return (
        <div 
          ref={ref}
          className={cn(
            loadingVariants({ variant, size, color }),
            'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent after:animate-shimmer',
            className
          )}
          role="status"
          aria-label={label || 'Loading content'}
          {...props}
        >
          <span className="sr-only">{label || 'Loading content...'}</span>
        </div>
      );
    }

    if (variant === 'heartbeat') {
      return (
        <div 
          ref={ref}
          className={cn(loadingVariants({ variant, size, color }), className)}
          role="status"
          aria-label={label || 'Loading'}
          {...props}
        >
          <svg 
            className={cn(
              'animate-heartbeat',
              size && sizeMap.pulse[size as keyof typeof sizeMap.pulse],
              color && colorMap[color as keyof typeof colorMap]
            )}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="sr-only">{label || 'Loading...'}</span>
        </div>
      );
    }

    return null;
  }
);

Loading.displayName = 'Loading';

export { Loading, loadingVariants };
export type { LoadingProps };