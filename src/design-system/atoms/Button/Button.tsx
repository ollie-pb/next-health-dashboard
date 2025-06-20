import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Button variants using class-variance-authority for sophisticated styling
const buttonVariants = cva(
  // Base styles - Next Health aesthetic
  [
    'inline-flex items-center justify-center gap-2',
    'font-primary font-medium',
    'rounded-lg',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
          'active:bg-primary-700',
          'shadow-sm hover:shadow-md',
        ],
        secondary: [
          'bg-neutral-100 text-neutral-900',
          'hover:bg-neutral-200',
          'active:bg-neutral-300',
          'border border-neutral-300',
        ],
        outline: [
          'border border-primary-500 text-primary-500',
          'hover:bg-primary-50',
          'active:bg-primary-100',
        ],
        ghost: [
          'text-neutral-700',
          'hover:bg-neutral-100',
          'active:bg-neutral-200',
        ],
        success: [
          'bg-optimal-500 text-white',
          'hover:bg-optimal-600',
          'active:bg-optimal-700',
          'shadow-sm hover:shadow-md',
        ],
        warning: [
          'bg-attention-500 text-white',
          'hover:bg-attention-600',
          'active:bg-attention-700',
          'shadow-sm hover:shadow-md',
        ],
        danger: [
          'bg-concern-500 text-white',
          'hover:bg-concern-600',
          'active:bg-concern-700',
          'shadow-sm hover:shadow-md',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        base: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            stroke="currentColor"
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
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };