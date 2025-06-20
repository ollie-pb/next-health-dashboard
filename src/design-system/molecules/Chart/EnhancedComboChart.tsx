import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Typography } from '../../atoms/Typography';
import { Badge } from '../../atoms/Badge';
import { Icon, type IconName } from '../../atoms/Icon';
import { cn } from '../../utils/cn';

interface ComboChartSeries {
  dataKey: string;
  name: string;
  type: 'line' | 'area' | 'bar';
  color: string;
  yAxisId?: 'left' | 'right';
}

interface ComboChartProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    [key: string]: any;
  }>;
  series: ComboChartSeries[];
  height?: number;
  unit?: string;
  secondaryUnit?: string;
  icon?: IconName;
  trend?: number;
  loading?: boolean;
  error?: string;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  referenceValue?: number;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label, unit, secondaryUnit }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-lg">
      <Typography variant="body-sm" weight="medium" className="mb-2">
        {label}
      </Typography>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 mb-1">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <Typography variant="caption" color="muted">
            {entry.name}:
          </Typography>
          <Typography variant="caption" weight="medium">
            {entry.value}{entry.yAxisId === 'right' ? secondaryUnit : unit}
          </Typography>
        </div>
      ))}
    </div>
  );
};

const CustomLegend: React.FC<any> = ({ payload }) => {
  if (!payload) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <Typography variant="caption" color="muted">
            {entry.value}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export const EnhancedComboChart: React.FC<ComboChartProps> = ({
  title,
  subtitle,
  data,
  series,
  height = 350,
  unit = '',
  secondaryUnit = '',
  icon,
  trend,
  loading = false,
  error,
  className,
  showGrid = true,
  showLegend = true,
  referenceValue,
}) => {
  if (loading) {
    return (
      <div className={cn('bg-white rounded-xl border border-neutral-200 p-6', className)}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <div className="h-5 bg-neutral-200 rounded w-48"></div>
              <div className="h-3 bg-neutral-200 rounded w-32"></div>
            </div>
            <div className="h-8 bg-neutral-200 rounded w-20"></div>
          </div>
          <div className="h-64 bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('bg-white rounded-xl border border-neutral-200 p-6', className)}>
        <div className="flex flex-col items-center justify-center h-64 text-center">
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
      <div className={cn('bg-white rounded-xl border border-neutral-200 p-6', className)}>
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
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Icon name="barChart" size="xl" color="muted" className="mb-4" />
          <Typography variant="body-sm" color="muted">
            No data available
          </Typography>
        </div>
      </div>
    );
  }

  const trendIcon: IconName = trend && trend > 0 ? 'trendingUp' : trend && trend < 0 ? 'trendingDown' : 'minus';
  const trendColor = trend && trend > 0 ? 'success' : trend && trend < 0 ? 'danger' : 'muted';
  const hasRightAxis = series.some(s => s.yAxisId === 'right');

  return (
    <div className={cn('bg-white rounded-xl border border-neutral-200 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/5', className)}>
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
          <Badge 
            variant={trendColor === 'muted' ? 'secondary' : trendColor} 
            size="sm" 
            icon={<Icon name={trendIcon} size="xs" color="inherit" />}
          >
            {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
          </Badge>
        )}
      </div>

      {/* Chart Area */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: hasRightAxis ? 5 : 20, left: 5, bottom: 5 }}
          >
            <defs>
              {series.filter(s => s.type === 'area').map((s, index) => (
                <linearGradient key={index} id={`gradient-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={s.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            )}
            
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
              stroke="#6B7280"
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12 }}
              stroke="#6B7280"
            />
            {hasRightAxis && (
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
            )}
            
            <Tooltip content={<CustomTooltip unit={unit} secondaryUnit={secondaryUnit} />} />
            
            {showLegend && <Legend content={<CustomLegend />} />}
            
            {referenceValue !== undefined && (
              <ReferenceLine 
                y={referenceValue} 
                stroke="#6B7280" 
                strokeDasharray="5 5"
                label="Target"
                yAxisId="left"
              />
            )}
            
            {series.map((s) => {
              const commonProps = {
                key: s.dataKey,
                dataKey: s.dataKey,
                name: s.name,
                yAxisId: s.yAxisId || 'left',
              };

              if (s.type === 'bar') {
                return <Bar {...commonProps} fill={s.color} />;
              }

              if (s.type === 'area') {
                return (
                  <Area 
                    {...commonProps}
                    type="monotone"
                    stroke={s.color}
                    strokeWidth={2}
                    fillOpacity={0.6}
                    fill={`url(#gradient-${s.dataKey})`}
                  />
                );
              }

              // Default to line
              return (
                <Line
                  {...commonProps}
                  type="monotone"
                  stroke={s.color}
                  strokeWidth={2}
                  dot={{ fill: s.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};