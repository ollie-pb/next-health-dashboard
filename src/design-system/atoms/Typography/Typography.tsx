import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { forwardRef, type ElementType, type ComponentPropsWithoutRef } from 'react';

const typographyVariants = cva(
  // Base styles - Next Health typography foundation
  'text-neutral-900 leading-relaxed tracking-normal',
  {
    variants: {
      variant: {
        // Display typography - Libre Baskerville for elegance
        'display-xl': 'font-serif text-5xl font-normal leading-tight tracking-tight lg:text-6xl',
        'display-lg': 'font-serif text-4xl font-normal leading-tight tracking-tight lg:text-5xl',
        'display-md': 'font-serif text-3xl font-normal leading-tight tracking-tight lg:text-4xl',
        'display-sm': 'font-serif text-2xl font-normal leading-tight tracking-tight lg:text-3xl',
        
        // Headings - Montserrat for modern clarity
        'heading-xl': 'font-sans text-3xl font-semibold leading-tight tracking-tight lg:text-4xl',
        'heading-lg': 'font-sans text-2xl font-semibold leading-tight tracking-tight lg:text-3xl',
        'heading-md': 'font-sans text-xl font-semibold leading-tight tracking-tight lg:text-2xl',
        'heading-sm': 'font-sans text-lg font-semibold leading-tight tracking-tight',
        'heading-xs': 'font-sans text-base font-semibold leading-tight tracking-tight',
        
        // Body text - Montserrat for readability
        'body-lg': 'font-sans text-lg font-normal leading-relaxed',
        'body-md': 'font-sans text-base font-normal leading-relaxed',
        'body-sm': 'font-sans text-sm font-normal leading-relaxed',
        'body-xs': 'font-sans text-xs font-normal leading-relaxed',
        
        // Labels and UI text
        'label-lg': 'font-sans text-sm font-medium leading-tight tracking-wide uppercase',
        'label-md': 'font-sans text-xs font-medium leading-tight tracking-wide uppercase',
        'label-sm': 'font-sans text-xs font-medium leading-tight tracking-wider uppercase',
        
        // Caption and meta text
        'caption': 'font-sans text-xs font-normal leading-tight text-neutral-600',
        'overline': 'font-sans text-xs font-medium leading-tight tracking-widest uppercase text-neutral-500',
      },
      color: {
        default: 'text-neutral-900',
        muted: 'text-neutral-600',
        subtle: 'text-neutral-500',
        primary: 'text-primary-500',
        success: 'text-optimal-500',
        warning: 'text-attention-500',
        danger: 'text-concern-500',
        white: 'text-white',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'body-md',
      color: 'default',
      align: 'left',
    },
  }
);

// Map variants to default HTML elements
const variantElementMap = {
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h1',
  'display-sm': 'h2',
  'heading-xl': 'h1',
  'heading-lg': 'h2',
  'heading-md': 'h3',
  'heading-sm': 'h4',
  'heading-xs': 'h5',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'label-lg': 'label',
  'label-md': 'label',
  'label-sm': 'label',
  'caption': 'span',
  'overline': 'span',
} as const;

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
}

const Typography = forwardRef<
  HTMLElement,
  TypographyProps & ComponentPropsWithoutRef<'p'>
>(({ variant = 'body-md', color, align, weight, as, className, children, ...props }, ref) => {
  const Component = as || (variant ? variantElementMap[variant] : undefined) || 'p';
  
  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ variant, color, align, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
export type { TypographyProps };