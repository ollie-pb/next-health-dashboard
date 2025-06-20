import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Typography } from '../../atoms/Typography';
import { Badge } from '../../atoms/Badge';
import { Icon, type IconName } from '../../atoms/Icon';
import { forwardRef } from 'react';

const scoreCardVariants = cva(
  // Base styles - premium card with subtle elevation
  'relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/5 hover:border-neutral-300',
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      status: {
        optimal: 'border-l-4 border-l-optimal-500 bg-gradient-to-br from-optimal-50/30 to-transparent',
        good: 'border-l-4 border-l-green-500 bg-gradient-to-br from-green-50/30 to-transparent',
        attention: 'border-l-4 border-l-attention-500 bg-gradient-to-br from-attention-50/30 to-transparent',
        concern: 'border-l-4 border-l-concern-500 bg-gradient-to-br from-concern-50/30 to-transparent',
        'no-data': 'border-l-4 border-l-neutral-300 bg-gradient-to-br from-neutral-50/30 to-transparent',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'optimal',
      interactive: false,
    },
  }
);

const progressRingVariants = cva(
  'relative flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface ScoreCardProps extends VariantProps<typeof scoreCardVariants> {
  title: string;
  value: number; // 0-100
  trend?: number; // percentage change
  lastUpdate?: string;
  icon?: IconName;
  description?: string;
  onClick?: () => void;
  className?: string;
  showProgress?: boolean;
  loading?: boolean;
}

const ScoreCard = forwardRef<HTMLDivElement, ScoreCardProps>(
  ({ 
    title, 
    value, 
    trend, 
    lastUpdate, 
    icon, 
    description, 
    size, 
    status, 
    interactive, 
    onClick, 
    className, 
    showProgress = true,
    loading = false,
    ...props 
  }, ref) => {
    // Calculate status based on value if not provided
    const calculatedStatus = status || (
      value >= 80 ? 'optimal' :
      value >= 60 ? 'good' :
      value >= 40 ? 'attention' :
      value > 0 ? 'concern' : 'no-data'
    );

    // Progress ring calculations
    const radius = size === 'sm' ? 24 : size === 'lg' ? 36 : 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    // Status colors for progress ring
    const statusColors = {
      optimal: 'stroke-optimal-500',
      good: 'stroke-green-500',
      attention: 'stroke-attention-500',
      concern: 'stroke-concern-500',
      'no-data': 'stroke-neutral-300',
    };

    const trendIcon: IconName = trend && trend > 0 ? 'trendingUp' : trend && trend < 0 ? 'trendingDown' : 'minus';
    const trendColor = trend && trend > 0 ? 'success' : trend && trend < 0 ? 'danger' : 'muted';

    if (loading) {
      return (
        <div 
          ref={ref}
          className={cn(scoreCardVariants({ size, status: 'no-data', interactive: false }), className)}
          {...props}
        >
          <div className="animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              {showProgress && <div className="w-20 h-20 bg-neutral-200 rounded-full"></div>}
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
              <div className="h-3 bg-neutral-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(scoreCardVariants({ size, status: calculatedStatus, interactive }), className)}
        onClick={interactive ? onClick : undefined}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {icon && (
                <Icon 
                  name={icon} 
                  size="sm" 
                  color={calculatedStatus === 'no-data' ? 'muted' : 'primary'} 
                />
              )}
              <Typography 
                variant="heading-xs" 
                className="truncate"
                color={calculatedStatus === 'no-data' ? 'muted' : 'default'}
              >
                {title}
              </Typography>
            </div>
            {description && (
              <Typography variant="caption" color="muted" className="line-clamp-2">
                {description}
              </Typography>
            )}
          </div>

          {/* Progress Ring */}
          {showProgress && (
            <div className={cn(progressRingVariants({ size }))}>
              <svg className="transform -rotate-90 w-full h-full">
                {/* Background circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  className="text-neutral-200"
                />
                {/* Progress circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={cn(
                    statusColors[calculatedStatus],
                    'transition-all duration-700 ease-out'
                  )}
                />
              </svg>
              
              {/* Center value */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Typography 
                  variant="heading-sm" 
                  color={calculatedStatus === 'no-data' ? 'muted' : 'default'}
                  className="font-semibold"
                >
                  {calculatedStatus === 'no-data' ? '--' : Math.round(value)}
                </Typography>
              </div>
            </div>
          )}
        </div>

        {/* Metrics Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <Badge 
              variant={calculatedStatus === 'no-data' ? 'secondary' : calculatedStatus} 
              size="sm" 
              dot
            >
              {calculatedStatus === 'no-data' ? 'No Data' : 
               calculatedStatus === 'optimal' ? 'Optimal' :
               calculatedStatus === 'good' ? 'Good' :
               calculatedStatus === 'attention' ? 'Attention' :
               'Concern'}
            </Badge>

            {/* Trend */}
            {trend !== undefined && calculatedStatus !== 'no-data' && (
              <div className="flex items-center gap-1">
                <Icon name={trendIcon} size="xs" color={trendColor} />
                <Typography variant="caption" color={trendColor}>
                  {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                </Typography>
              </div>
            )}
          </div>

          {/* Interactive indicator */}
          {interactive && (
            <Icon name="chevronRight" size="sm" color="muted" />
          )}
        </div>

        {/* Last Update */}
        {lastUpdate && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <Typography variant="caption" color="subtle">
              Updated {lastUpdate}
            </Typography>
          </div>
        )}

        {/* Subtle background pattern for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-neutral-50/20 pointer-events-none" />
      </div>
    );
  }
);

ScoreCard.displayName = 'ScoreCard';

export { ScoreCard, scoreCardVariants };
export type { ScoreCardProps };