import React from 'react';
import type { Biomarker } from '../types';
import { formatTrend, getTrendIcon } from '../utils/healthUtils';
import { InfoTooltip } from './InfoTooltip';
import { biomarkerEducationData } from '../data/biomarkerEducation';

interface BiomarkerCardProps {
  biomarker: Biomarker;
}

export const BiomarkerCard: React.FC<BiomarkerCardProps> = ({ biomarker }) => {
  const trendIcon = getTrendIcon(biomarker.trend);
  const trendFormatted = formatTrend(biomarker.trend);

  // Calculate position within reference range (0-1)
  const rangeSize = biomarker.referenceRange.max - biomarker.referenceRange.min;
  const position = rangeSize > 0 
    ? Math.max(0, Math.min(1, (biomarker.value - biomarker.referenceRange.min) / rangeSize))
    : 0.5;

  // Determine if value is within normal range
  const isInRange = biomarker.value >= biomarker.referenceRange.min && 
                   biomarker.value <= biomarker.referenceRange.max;

  // Mini sparkline (simplified representation)
  const sparklineData = biomarker.dataPoints?.slice(-5) || [];
  const hasSparkline = sparklineData.length > 1;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold text-primary-navy font-display">
              {biomarker.name}
            </h4>
            {biomarkerEducationData[biomarker.id] && (
              <InfoTooltip
                title={biomarkerEducationData[biomarker.id].title}
                description={biomarkerEducationData[biomarker.id].description}
                whatItMeasures={biomarkerEducationData[biomarker.id].whatItMeasures}
                whyItMatters={biomarkerEducationData[biomarker.id].whyItMatters}
                howToImprove={biomarkerEducationData[biomarker.id].howToImprove}
              />
            )}
          </div>
          <p className="text-sm text-gray-500">
            Last updated: {biomarker.lastUpdate}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-navy font-mono">
            {biomarker.value}
          </div>
          <div className="text-sm text-gray-500">
            {biomarker.unit}
          </div>
        </div>
      </div>

      {/* Reference Range Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>{biomarker.referenceRange.min}</span>
          <span className={`font-medium ${isInRange ? 'text-status-optimal' : 'text-status-concern'}`}>
            {isInRange ? 'Normal Range' : 'Outside Range'}
          </span>
          <span>{biomarker.referenceRange.max}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Reference range (optimal zone) */}
          <div className="absolute h-2 bg-status-optimal bg-opacity-20 rounded-full w-full" />
          
          {/* Current value marker */}
          <div
            className={`absolute h-4 w-4 rounded-full border-2 border-white shadow-md transform -translate-y-1 ${
              isInRange ? 'bg-status-optimal' : 'bg-status-concern'
            }`}
            style={{
              left: `calc(${position * 100}% - 8px)`
            }}
          />
        </div>
      </div>

      {/* Trend and Sparkline */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span 
            className={`text-sm font-medium ${
              biomarker.trend > 0 
                ? 'text-status-optimal' 
                : biomarker.trend < 0 
                  ? 'text-status-concern' 
                  : 'text-gray-500'
            }`}
          >
            {trendIcon} {trendFormatted}
          </span>
          <span className="text-xs text-gray-400">
            from last test
          </span>
        </div>

        {/* Mini Sparkline */}
        {hasSparkline && (
          <div className="flex items-end gap-1 h-8">
            {sparklineData.map((point, index) => {
              const maxValue = Math.max(...sparklineData.map(p => p.value));
              const minValue = Math.min(...sparklineData.map(p => p.value));
              const range = maxValue - minValue || 1;
              const height = range > 0 ? ((point.value - minValue) / range) * 24 + 4 : 14;
              
              return (
                <div
                  key={index}
                  className="w-1 bg-primary-blue rounded-sm"
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};