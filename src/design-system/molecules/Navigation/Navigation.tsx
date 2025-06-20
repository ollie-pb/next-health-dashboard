import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Typography } from '../../atoms/Typography';
import { Icon, type IconName } from '../../atoms/Icon';
import { forwardRef } from 'react';

const navigationVariants = cva(
  'flex items-center',
  {
    variants: {
      variant: {
        breadcrumb: 'flex-wrap gap-1',
        tabs: 'border-b border-neutral-200 bg-white',
        pills: 'p-1 bg-neutral-100 rounded-lg',
        sidebar: 'flex-col space-y-1',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'breadcrumb',
      size: 'md',
    },
  }
);

interface NavigationItem {
  label: string;
  href?: string;
  icon?: IconName;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

interface NavigationProps extends VariantProps<typeof navigationVariants> {
  items: NavigationItem[];
  className?: string;
  onItemClick?: (item: NavigationItem, index: number) => void;
}

const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ items, variant, size, className, onItemClick, ...props }, ref) => {
    const handleItemClick = (item: NavigationItem, index: number) => {
      if (item.disabled) return;
      onItemClick?.(item, index);
      item.onClick?.();
    };

    if (variant === 'breadcrumb') {
      return (
        <nav 
          ref={ref as React.RefObject<HTMLElement>}
          className={cn(navigationVariants({ variant, size }), className)}
          aria-label="Breadcrumb"
          {...props}
        >
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="chevronRight" 
                  size="xs" 
                  color="muted" 
                  className="mx-2" 
                  aria-hidden="true"
                />
              )}
              
              {item.href || item.onClick ? (
                <button
                  onClick={() => handleItemClick(item, index)}
                  disabled={item.disabled}
                  className={cn(
                    'transition-colors rounded px-1 py-0.5 -mx-1 -my-0.5',
                    index === items.length - 1
                      ? 'text-neutral-900 cursor-default'
                      : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50',
                    item.disabled && 'text-neutral-400 cursor-not-allowed hover:bg-transparent'
                  )}
                  aria-current={index === items.length - 1 ? 'page' : undefined}
                >
                  <div className="flex items-center gap-1">
                    {item.icon && (
                      <Icon 
                        name={item.icon} 
                        size="xs" 
                        color={index === items.length - 1 ? 'default' : 'primary'} 
                      />
                    )}
                    <Typography 
                      variant={size === 'sm' ? 'caption' : size === 'lg' ? 'body-lg' : 'body-sm'}
                      className="truncate"
                    >
                      {item.label}
                    </Typography>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  {item.icon && (
                    <Icon 
                      name={item.icon} 
                      size="xs" 
                      color={index === items.length - 1 ? 'default' : 'muted'} 
                    />
                  )}
                  <Typography 
                    variant={size === 'sm' ? 'caption' : size === 'lg' ? 'body-lg' : 'body-sm'}
                    color={index === items.length - 1 ? 'default' : 'muted'}
                    className="truncate"
                  >
                    {item.label}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </nav>
      );
    }

    if (variant === 'tabs') {
      return (
        <nav 
          ref={ref as React.RefObject<HTMLElement>}
          className={cn(navigationVariants({ variant, size }), className)}
          role="tablist"
          {...props}
        >
          <div className="flex space-x-8">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item, index)}
                disabled={item.disabled}
                role="tab"
                aria-selected={item.active}
                className={cn(
                  'relative py-4 px-1 transition-colors font-medium whitespace-nowrap',
                  'border-b-2 border-transparent',
                  'hover:text-neutral-700 hover:border-neutral-300',
                  item.active && 'text-primary-600 border-primary-500',
                  !item.active && 'text-neutral-500',
                  item.disabled && 'text-neutral-300 cursor-not-allowed hover:text-neutral-300 hover:border-transparent'
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && (
                    <Icon name={item.icon} size="sm" color="default" />
                  )}
                  <Typography variant="body-sm" weight="medium">
                    {item.label}
                  </Typography>
                  {item.badge && (
                    <span className="ml-2 bg-neutral-100 text-neutral-600 py-0.5 px-2 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </nav>
      );
    }

    if (variant === 'pills') {
      return (
        <nav 
          ref={ref as React.RefObject<HTMLElement>}
          className={cn(navigationVariants({ variant, size }), className)}
          role="tablist"
          {...props}
        >
          <div className="flex space-x-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item, index)}
                disabled={item.disabled}
                role="tab"
                aria-selected={item.active}
                className={cn(
                  'relative px-3 py-1.5 rounded-md transition-all font-medium whitespace-nowrap',
                  item.active 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50',
                  item.disabled && 'text-neutral-400 cursor-not-allowed hover:bg-transparent hover:text-neutral-400'
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && (
                    <Icon name={item.icon} size="sm" color="default" />
                  )}
                  <Typography variant="body-sm" weight="medium">
                    {item.label}
                  </Typography>
                  {item.badge && (
                    <span className={cn(
                      'ml-1 py-0.5 px-1.5 rounded-full text-xs',
                      item.active 
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-200 text-neutral-600'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </nav>
      );
    }

    if (variant === 'sidebar') {
      return (
        <nav 
          ref={ref as React.RefObject<HTMLElement>}
          className={cn(navigationVariants({ variant, size }), className)}
          {...props}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item, index)}
              disabled={item.disabled}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left',
                item.active 
                  ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                  : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900',
                item.disabled && 'text-neutral-400 cursor-not-allowed hover:bg-transparent hover:text-neutral-400'
              )}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {item.icon && (
                  <Icon name={item.icon} size="sm" color="default" className="shrink-0" />
                )}
                <Typography variant="body-sm" weight="medium" className="truncate">
                  {item.label}
                </Typography>
              </div>
              
              {item.badge && (
                <span className={cn(
                  'ml-2 py-0.5 px-2 rounded-full text-xs font-medium shrink-0',
                  item.active 
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-neutral-100 text-neutral-600'
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      );
    }

    return null;
  }
);

Navigation.displayName = 'Navigation';

export { Navigation, navigationVariants };
export type { NavigationProps, NavigationItem };