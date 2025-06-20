import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { Icon, type IconName } from '../../atoms/Icon';
import { forwardRef, type ReactNode, type ElementType } from 'react';

const sectionVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        card: 'bg-white rounded-xl border border-neutral-200 shadow-sm',
        elevated: 'bg-white rounded-xl border border-neutral-200 shadow-lg shadow-neutral-900/5',
        bordered: 'border border-neutral-200 rounded-lg',
        outlined: 'border-2 border-dashed border-neutral-300 rounded-lg',
        ghost: '',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
        none: 'p-0',
      },
      spacing: {
        tight: 'space-y-4',
        normal: 'space-y-6',
        relaxed: 'space-y-8',
        loose: 'space-y-12',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      spacing: 'normal',
    },
  }
);

const sectionHeaderVariants = cva(
  'flex items-start justify-between',
  {
    variants: {
      alignment: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
      },
      spacing: {
        tight: 'mb-4',
        normal: 'mb-6',
        relaxed: 'mb-8',
        none: 'mb-0',
      },
    },
    defaultVariants: {
      alignment: 'start',
      spacing: 'normal',
    },
  }
);

interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: ReactNode;
  
  // Header props
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: IconName;
  headerAlignment?: VariantProps<typeof sectionHeaderVariants>['alignment'];
  headerSpacing?: VariantProps<typeof sectionHeaderVariants>['spacing'];
  
  // Actions
  action?: ReactNode;
  actionText?: string;
  onActionClick?: () => void;
  
  className?: string;
  as?: ElementType;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    children,
    variant,
    size,
    spacing,
    
    // Header props
    title,
    subtitle,
    description,
    icon,
    headerAlignment,
    headerSpacing,
    
    // Actions
    action,
    actionText,
    onActionClick,
    
    className,
    as: Component = 'section',
    ...props 
  }, ref) => {
    const hasHeader = title || subtitle || description || icon || action || actionText;

    return (
      <Component
        ref={ref as any}
        className={cn(sectionVariants({ variant, size, spacing }), className)}
        {...props}
      >
        {hasHeader && (
          <header 
            className={cn(
              sectionHeaderVariants({ 
                alignment: headerAlignment, 
                spacing: headerSpacing 
              })
            )}
          >
            <div className="min-w-0 flex-1">
              {/* Title Row */}
              {(title || icon) && (
                <div className="flex items-center gap-3 mb-1">
                  {icon && (
                    <Icon name={icon} size="lg" color="primary" />
                  )}
                  {title && (
                    <Typography variant="heading-lg" className="truncate">
                      {title}
                    </Typography>
                  )}
                </div>
              )}
              
              {/* Subtitle */}
              {subtitle && (
                <Typography 
                  variant="heading-sm" 
                  color="muted" 
                  className="mb-2"
                >
                  {subtitle}
                </Typography>
              )}
              
              {/* Description */}
              {description && (
                <Typography variant="body-sm" color="muted">
                  {description}
                </Typography>
              )}
            </div>
            
            {/* Actions */}
            {(action || actionText) && (
              <div className="ml-4 flex-shrink-0">
                {action || (
                  actionText && onActionClick && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={onActionClick}
                    >
                      {actionText}
                    </Button>
                  )
                )}
              </div>
            )}
          </header>
        )}
        
        {/* Content */}
        <div className={spacing !== 'none' ? 'space-y-inherit' : ''}>
          {children}
        </div>
      </Component>
    );
  }
);

Section.displayName = 'Section';

export { Section, sectionVariants };
export type { SectionProps };