import React from 'react';
import type { Component } from '../types';
import { HorizontalProgress } from './HorizontalProgress';
import { getStatusColor, getStatusFromValue, formatTrend, getTrendIcon } from '../utils/healthUtils';

interface ComponentCardProps {
  component: Component;
  onClick?: () => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component, onClick }) => {
  const status = getStatusFromValue(component.value);
  const statusColor = getStatusColor(status);

  // Calculate average trend from biomarkers
  const avgTrend = component.biomarkers.length > 0 
    ? component.biomarkers.reduce((sum, b) => sum + (b.trend || 0), 0) / component.biomarkers.length
    : 0;

  const trendIcon = getTrendIcon(avgTrend);
  const trendFormatted = formatTrend(Math.round(avgTrend));

  const completionIcon = component.completionRate === 1.0 ? '✓' : component.completionRate > 0.5 ? '⚠️' : '!';
  const completionText = `${Math.round(component.completionRate * 100)}% complete`;

  return (
    <div
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      {/* Header with name and trend */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-primary-navy font-display">
            {component.name}
          </h3>
          <span className="text-lg">{completionIcon}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-navy font-mono">
            {component.value}
          </span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <HorizontalProgress
          value={component.value}
          color={statusColor}
          height={8}
        />
      </div>

      {/* Bottom info */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {completionText}
        </span>
        <span 
          className={`font-medium ${
            avgTrend > 0 
              ? 'text-status-optimal' 
              : avgTrend < 0 
                ? 'text-status-concern' 
                : 'text-gray-500'
          }`}
        >
          {trendIcon} {trendFormatted}
        </span>
      </div>
    </div>
  );
};