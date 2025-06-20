import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Typography } from '../../atoms/Typography';
import { Icon, type IconName } from '../../atoms/Icon';
import { Navigation, type NavigationItem } from '../../molecules/Navigation';
import { forwardRef, type ReactNode } from 'react';

const dashboardLayoutVariants = cva(
  'min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100',
  {
    variants: {
      variant: {
        default: '',
        fullscreen: 'h-screen overflow-hidden',
        compact: '',
      },
      sidebar: {
        none: '',
        left: 'lg:pl-64',
        right: 'lg:pr-64',
      },
    },
    defaultVariants: {
      variant: 'default',
      sidebar: 'left',
    },
  }
);

const sidebarVariants = cva(
  'fixed top-0 z-40 h-full w-64 transform bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out',
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
      state: {
        open: 'translate-x-0',
        closed: '-translate-x-full',
      },
    },
    defaultVariants: {
      position: 'left',
      state: 'open',
    },
  }
);

const headerVariants = cva(
  'sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200',
  {
    variants: {
      variant: {
        default: 'px-4 py-4 sm:px-6 lg:px-8',
        compact: 'px-4 py-3 sm:px-6 lg:px-8',
        minimal: 'px-4 py-2 sm:px-6 lg:px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const mainContentVariants = cva(
  'flex-1',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-4 sm:p-6 lg:p-8',
        lg: 'p-6 sm:p-8 lg:p-12',
      },
      maxWidth: {
        none: '',
        sm: 'max-w-3xl mx-auto',
        md: 'max-w-5xl mx-auto',
        lg: 'max-w-7xl mx-auto',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      padding: 'md',
      maxWidth: 'lg',
    },
  }
);

interface DashboardLayoutProps extends VariantProps<typeof dashboardLayoutVariants> {
  children: ReactNode;
  
  // Header props
  title?: string;
  subtitle?: string;
  headerIcon?: IconName;
  breadcrumbs?: NavigationItem[];
  headerActions?: ReactNode;
  headerVariant?: VariantProps<typeof headerVariants>['variant'];
  
  // Sidebar props
  sidebarItems?: NavigationItem[];
  sidebarHeader?: ReactNode;
  sidebarFooter?: ReactNode;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  
  // Content props
  contentPadding?: VariantProps<typeof mainContentVariants>['padding'];
  contentMaxWidth?: VariantProps<typeof mainContentVariants>['maxWidth'];
  
  className?: string;
}

const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  ({ 
    children,
    variant,
    sidebar: sidebarPosition,
    
    // Header props
    title,
    subtitle,
    headerIcon,
    breadcrumbs,
    headerActions,
    headerVariant = 'default',
    
    // Sidebar props
    sidebarItems,
    sidebarHeader,
    sidebarFooter,
    sidebarOpen = true,
    onSidebarToggle,
    
    // Content props
    contentPadding,
    contentMaxWidth,
    
    className,
    ...props 
  }, ref) => {
    const showSidebar = sidebarPosition !== 'none' && sidebarItems && sidebarItems.length > 0;

    return (
      <div 
        ref={ref}
        className={cn(
          dashboardLayoutVariants({ 
            variant, 
            sidebar: showSidebar ? sidebarPosition : 'none' 
          }), 
          className
        )}
        {...props}
      >
        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile backdrop */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 z-30 bg-neutral-900/50 lg:hidden"
                onClick={onSidebarToggle}
                aria-hidden="true"
              />
            )}
            
            {/* Sidebar */}
            <aside
              className={cn(
                sidebarVariants({ 
                  position: sidebarPosition,
                  state: sidebarOpen ? 'open' : 'closed'
                }),
                'lg:translate-x-0' // Always show on desktop
              )}
            >
              <div className="flex h-full flex-col">
                {/* Sidebar Header */}
                {sidebarHeader && (
                  <div className="shrink-0 border-b border-neutral-200 p-6">
                    {sidebarHeader}
                  </div>
                )}
                
                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-6">
                  <Navigation 
                    variant="sidebar" 
                    items={sidebarItems}
                  />
                </nav>
                
                {/* Sidebar Footer */}
                {sidebarFooter && (
                  <div className="shrink-0 border-t border-neutral-200 p-6">
                    {sidebarFooter}
                  </div>
                )}
              </div>
            </aside>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          {(title || breadcrumbs || headerActions) && (
            <header className={cn(headerVariants({ variant: headerVariant }))}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Mobile menu button */}
                  {showSidebar && (
                    <button
                      onClick={onSidebarToggle}
                      className="lg:hidden p-2 -ml-2 rounded-md hover:bg-neutral-100 transition-colors"
                      aria-label="Toggle sidebar"
                    >
                      <Icon name="menu" size="md" />
                    </button>
                  )}
                  
                  <div className="min-w-0 flex-1">
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                      <div className="mb-2">
                        <Navigation 
                          variant="breadcrumb" 
                          size="sm" 
                          items={breadcrumbs}
                        />
                      </div>
                    )}
                    
                    {/* Title */}
                    {title && (
                      <div className="flex items-center gap-3">
                        {headerIcon && (
                          <Icon name={headerIcon} size="lg" color="primary" />
                        )}
                        <div>
                          <Typography variant="heading-lg" className="truncate">
                            {title}
                          </Typography>
                          {subtitle && (
                            <Typography variant="body-sm" color="muted" className="mt-1">
                              {subtitle}
                            </Typography>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Header Actions */}
                {headerActions && (
                  <div className="ml-4 flex items-center gap-3">
                    {headerActions}
                  </div>
                )}
              </div>
            </header>
          )}

          {/* Main Content */}
          <main 
            className={cn(
              mainContentVariants({ 
                padding: contentPadding, 
                maxWidth: contentMaxWidth 
              })
            )}
          >
            {children}
          </main>
        </div>
      </div>
    );
  }
);

DashboardLayout.displayName = 'DashboardLayout';

export { DashboardLayout, dashboardLayoutVariants };
export type { DashboardLayoutProps };