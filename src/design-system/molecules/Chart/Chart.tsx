import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Typography } from '../../atoms/Typography';
import { Badge } from '../../atoms/Badge';
import { Icon, type IconName } from '../../atoms/Icon';
import { forwardRef } from 'react';

const chartVariants = cva(
  'rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/5',
  {
    variants: {
      variant: {
        line: '',
        bar: '',
        area: '',
        trend: '',
      },
      size: {
        sm: 'h-48',
        md: 'h-64',
        lg: 'h-80',
        xl: 'h-96',
      },
    },
    defaultVariants: {
      variant: 'line',
      size: 'md',
    },
  }
);

interface DataPoint {
  label: string;
  value: number;
  timestamp?: string;
  status?: 'optimal' | 'good' | 'attention' | 'concern';
}

interface ChartProps extends VariantProps<typeof chartVariants> {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  unit?: string;
  icon?: IconName;
  trend?: number;
  loading?: boolean;
  error?: string;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  interactive?: boolean;
}

const Chart = forwardRef<HTMLDivElement, ChartProps>(
  ({ 
    title, 
    subtitle, 
    data, 
    unit, 
    icon, 
    trend, 
    variant, 
    size, 
    loading = false, 
    error, 
    className, 
    showGrid = true,
    showLegend = false,
    interactive = true,
    ...props 
  }, ref) => {
    if (loading) {
      return (
        <div ref={ref} className={cn(chartVariants({ variant, size }), className)} {...props}>
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <div className="h-5 bg-neutral-200 rounded w-48"></div>
                <div className="h-3 bg-neutral-200 rounded w-32"></div>
              </div>
              <div className="h-8 bg-neutral-200 rounded w-20"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div ref={ref} className={cn(chartVariants({ variant, size }), className)} {...props}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Icon name="alertCircle" size="xl" color="danger" className="mb-4" />
            <Typography variant="heading-sm" color="danger" className="mb-2">
              Chart Error
            </Typography>
            <Typography variant="body-sm" color="muted">
              {error}
            </Typography>
          </div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div ref={ref} className={cn(chartVariants({ variant, size }), className)} {...props}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {icon && <Icon name={icon} size="sm" color="muted" />}
                <Typography variant="heading-sm" color="muted">{title}</Typography>
              </div>
              {subtitle && (
                <Typography variant="caption" color="muted">{subtitle}</Typography>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <Icon name="barChart" size="xl" color="muted" className="mb-4" />
            <Typography variant="body-sm" color="muted">
              No data available
            </Typography>
          </div>
        </div>
      );
    }

    // Calculate chart dimensions and scaling
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    
    const chartHeight = size === 'sm' ? 120 : size === 'lg' ? 200 : size === 'xl' ? 240 : 160;
    const chartWidth = 100; // percentage
    
    // Generate SVG path for line/area charts
    const generatePath = () => {
      if (data.length < 2) return '';
      
      const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * chartWidth;
        const y = chartHeight - ((point.value - minValue) / range) * chartHeight;
        return `${x},${y}`;
      });
      
      return `M ${points.join(' L ')}`;
    };

    const trendIcon: IconName = trend && trend > 0 ? 'trendingUp' : trend && trend < 0 ? 'trendingDown' : 'minus';
    const trendColor = trend && trend > 0 ? 'success' : trend && trend < 0 ? 'danger' : 'muted';

    return (
      <div ref={ref} className={cn(chartVariants({ variant, size }), className)} {...props}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {icon && <Icon name={icon} size="sm" color="primary" />}
              <Typography variant="heading-sm">{title}</Typography>
            </div>
            {subtitle && (
              <Typography variant="caption" color="muted">{subtitle}</Typography>
            )}
          </div>
          
          {trend !== undefined && (
            <Badge variant={trendColor === 'muted' ? 'secondary' : trendColor} size="sm" icon={<Icon name={trendIcon} size="xs" color="inherit" />}>
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
            </Badge>
          )}
        </div>

        {/* Chart Area */}
        <div className="relative flex-1 min-h-0">
          {variant === 'line' && (
            <svg 
              width="100%" 
              height={chartHeight} 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="overflow-visible"
            >
              {/* Grid lines */}
              {showGrid && (
                <g className="opacity-20">
                  {[0, 25, 50, 75, 100].map(y => (
                    <line 
                      key={y}
                      x1="0" 
                      y1={y * chartHeight / 100} 
                      x2={chartWidth} 
                      y2={y * chartHeight / 100}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-neutral-400"
                    />
                  ))}
                </g>
              )}
              
              {/* Line path */}
              <path
                d={generatePath()}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-500"
              />
              
              {/* Data points */}
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * chartWidth;
                const y = chartHeight - ((point.value - minValue) / range) * chartHeight;
                const statusColor = point.status === 'optimal' ? 'text-optimal-500' :
                                  point.status === 'good' ? 'text-green-500' :
                                  point.status === 'attention' ? 'text-attention-500' :
                                  point.status === 'concern' ? 'text-concern-500' :
                                  'text-primary-500';
                
                return (
                  <g key={index}>
                    {interactive && (
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill="transparent"
                        className="cursor-pointer hover:fill-current hover:text-primary-100"
                      >
                        <title>{`${point.label}: ${point.value}${unit || ''}`}</title>
                      </circle>
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="currentColor"
                      className={statusColor}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {variant === 'bar' && (
            <div className="flex items-end justify-between h-full gap-2">
              {data.map((point, index) => {
                const height = ((point.value - minValue) / range) * 100;
                const statusColor = point.status === 'optimal' ? 'bg-optimal-500' :
                                  point.status === 'good' ? 'bg-green-500' :
                                  point.status === 'attention' ? 'bg-attention-500' :
                                  point.status === 'concern' ? 'bg-concern-500' :
                                  'bg-primary-500';
                
                return (
                  <div 
                    key={index} 
                    className="flex-1 flex flex-col items-center group"
                    title={`${point.label}: ${point.value}${unit || ''}`}
                  >
                    <div 
                      className={cn(
                        'w-full rounded-t transition-all duration-300',
                        statusColor,
                        interactive && 'group-hover:opacity-80 cursor-pointer'
                      )}
                      style={{ height: `${height}%` }}
                    />
                    <Typography 
                      variant="caption" 
                      color="muted" 
                      className="mt-2 text-center truncate text-xs"
                    >
                      {point.label}
                    </Typography>
                  </div>
                );
              })}
            </div>
          )}

          {variant === 'trend' && (
            <div className="space-y-3">
              {data.slice(-5).map((point, index) => {
                const isLatest = index === data.length - 1;
                const prevValue = index > 0 ? data[index - 1].value : point.value;
                const change = point.value - prevValue;
                const changeIcon: IconName = change > 0 ? 'trendingUp' : change < 0 ? 'trendingDown' : 'minus';
                const changeColor = change > 0 ? 'success' : change < 0 ? 'danger' : 'muted';
                
                return (
                  <div 
                    key={index}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border transition-colors',
                      isLatest ? 'border-primary-200 bg-primary-50' : 'border-neutral-200 hover:bg-neutral-50'
                    )}
                  >
                    <div>
                      <Typography variant="body-sm" weight="medium">
                        {point.label}
                      </Typography>
                      {point.timestamp && (
                        <Typography variant="caption" color="muted">
                          {point.timestamp}
                        </Typography>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Typography variant="heading-xs">
                        {point.value}{unit}
                      </Typography>
                      
                      {change !== 0 && (
                        <div className="flex items-center gap-1">
                          <Icon name={changeIcon} size="xs" color={changeColor} />
                          <Typography variant="caption" color={changeColor}>
                            {change > 0 ? '+' : ''}{change.toFixed(1)}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Legend */}
        {showLegend && data.some(d => d.status) && (
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="flex flex-wrap gap-2">
              <Badge variant="optimal" size="sm" dot>Optimal</Badge>
              <Badge variant="good" size="sm" dot>Good</Badge>
              <Badge variant="attention" size="sm" dot>Attention</Badge>
              <Badge variant="concern" size="sm" dot>Concern</Badge>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Chart.displayName = 'Chart';

export { Chart, chartVariants };
export type { ChartProps, DataPoint };