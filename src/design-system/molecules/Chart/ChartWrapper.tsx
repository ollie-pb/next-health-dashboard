import React from 'react';
import { Chart as LegacyChart, type ChartProps as LegacyChartProps } from './Chart';
import { EnhancedLineChart } from './EnhancedLineChart';
import { EnhancedAreaChart } from './EnhancedAreaChart';

export interface ChartWrapperProps extends LegacyChartProps {
  useEnhanced?: boolean;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ 
  useEnhanced = false,
  ...props 
}) => {
  // If enhanced mode is enabled, use the appropriate enhanced chart
  if (useEnhanced && props.data) {
    try {
      // Transform data to match Recharts format
      const transformedData = props.data.map((point) => ({
        ...point,
        name: point.label || 'Unknown'
      }));

    const commonProps = {
      title: props.title,
      subtitle: props.subtitle,
      data: transformedData,
      dataKey: "value",
      height: props.size === 'sm' ? 192 : props.size === 'lg' ? 320 : props.size === 'xl' ? 384 : 256,
      unit: props.unit,
      icon: props.icon,
      trend: props.trend,
      loading: props.loading,
      error: props.error,
      className: props.className,
      showGrid: props.showGrid,
      showLegend: props.showLegend,
    };

      if (props.variant === 'line') {
        return <EnhancedLineChart {...commonProps} color="#3B82F6" />;
      }

      if (props.variant === 'area') {
        return <EnhancedAreaChart {...commonProps} color="#3B82F6" gradientColor="#60A5FA" />;
      }

      // For bar and trend, fall back to legacy for now
    } catch (error) {
      console.error('Enhanced chart error:', error);
      // Fall back to legacy chart on error
    }
  }

  // Otherwise, use the legacy chart
  return <LegacyChart {...props} />;
};