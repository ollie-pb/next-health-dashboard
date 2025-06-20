import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { forwardRef } from 'react';

const badgeVariants = cva(
  // Base styles for all badges
  'inline-flex items-center gap-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Primary variants
        default: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
        
        // Health status variants
        optimal: 'bg-optimal-50 text-optimal-700 border border-optimal-200',
        good: 'bg-green-50 text-green-700 border border-green-200',
        attention: 'bg-attention-50 text-attention-700 border border-attention-200',
        concern: 'bg-concern-50 text-concern-700 border border-concern-200',
        
        // Semantic variants
        success: 'bg-optimal-50 text-optimal-700 border border-optimal-200',
        warning: 'bg-attention-50 text-attention-700 border border-attention-200',
        danger: 'bg-concern-50 text-concern-700 border border-concern-200',
        info: 'bg-blue-50 text-blue-700 border border-blue-200',
        
        // Style variants
        outline: 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50',
        ghost: 'text-neutral-700 hover:bg-neutral-100',
        filled: 'bg-neutral-900 text-white hover:bg-neutral-800',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded-md',
        md: 'px-2.5 py-1 text-sm rounded-md',
        lg: 'px-3 py-1.5 text-sm rounded-lg',
        xl: 'px-4 py-2 text-base rounded-lg',
      },
      dot: {
        true: 'pl-1.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      dot: false,
    },
  }
);

const dotVariants = cva(
  'w-2 h-2 rounded-full shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-neutral-400',
        primary: 'bg-white',
        secondary: 'bg-neutral-600',
        optimal: 'bg-optimal-500',
        good: 'bg-green-500',
        attention: 'bg-attention-500',
        concern: 'bg-concern-500',
        success: 'bg-optimal-500',
        warning: 'bg-attention-500',
        danger: 'bg-concern-500',
        info: 'bg-blue-500',
        outline: 'bg-neutral-500',
        ghost: 'bg-neutral-500',
        filled: 'bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onRemove?: () => void;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant, size, dot, className, children, icon, onRemove, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot }), className)}
        {...props}
      >
        {dot && <div className={cn(dotVariants({ variant }))} />}
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-current"
            aria-label="Remove badge"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export type { BadgeProps };