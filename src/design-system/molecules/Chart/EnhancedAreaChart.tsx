import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
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

interface AreaChartProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  dataKey?: string;
  height?: number;
  unit?: string;
  icon?: IconName;
  trend?: number;
  loading?: boolean;
  error?: string;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  color?: string;
  gradientColor?: string;
  fillOpacity?: number;
  referenceValue?: number;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label, unit }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-lg">
      <Typography variant="body-sm" weight="medium" className="mb-1">
        {label}
      </Typography>
      <Typography variant="body-sm" color="primary">
        {payload[0].value}{unit}
      </Typography>
    </div>
  );
};

export const EnhancedAreaChart: React.FC<AreaChartProps> = ({
  title,
  subtitle,
  data,
  dataKey = 'value',
  height = 300,
  unit = '',
  icon,
  trend,
  loading = false,
  error,
  className,
  showGrid = true,
  showLegend = false,
  color = '#3B82F6',
  gradientColor = '#60A5FA',
  fillOpacity = 0.6,
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
          <RechartsAreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={gradientColor} stopOpacity={0.1}/>
              </linearGradient>
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
            
            <Tooltip content={<CustomTooltip unit={unit} />} />
            
            {showLegend && <Legend />}
            
            {referenceValue !== undefined && (
              <ReferenceLine 
                y={referenceValue} 
                stroke="#6B7280" 
                strokeDasharray="5 5"
                label="Target"
                yAxisId="left"
              />
            )}
            
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={fillOpacity}
              fill="url(#colorGradient)"
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              yAxisId="left"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};