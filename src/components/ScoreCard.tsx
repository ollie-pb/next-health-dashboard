import React from 'react';
import type { HealthScore } from '../types';
import { CircularProgress } from './CircularProgress';
import { getStatusColor, formatTrend, getTrendIcon } from '../utils/healthUtils';

interface ScoreCardProps {
  score: HealthScore;
  onClick?: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, onClick }) => {
  const statusColor = getStatusColor(score.status);
  const trendIcon = getTrendIcon(score.trend);
  const trendFormatted = formatTrend(score.trend);
  
  // Calculate completion rate for partial data indicator
  const totalPossibleComponents = score.components.length || 1;
  const completedComponents = score.components.filter(c => c.completionRate > 0.5).length;
  const overallCompletionRate = completedComponents / totalPossibleComponents;
  
  const hasData = score.status !== 'no-data' && score.value > 0;

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-1 border border-gray-100"
      onClick={onClick}
    >
      {/* Circular Progress */}
      <div className="flex justify-center mb-4">
        {hasData ? (
          <CircularProgress
            value={score.value}
            color={statusColor}
            size={100}
            strokeWidth={6}
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full border-8 border-gray-200 flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
        )}
      </div>

      {/* Score Name */}
      <h3 className="text-lg font-semibold text-primary-navy text-center mb-2 font-display">
        {score.name}
      </h3>

      {/* Score Value */}
      <div className="text-center mb-3">
        {hasData ? (
          <>
            <span className="text-2xl font-bold text-primary-navy font-mono">
              {score.value}
            </span>
            <span className="text-sm text-gray-500 ml-1">/100</span>
          </>
        ) : (
          <span className="text-xl font-medium text-gray-400">
            No Data
          </span>
        )}
      </div>

      {/* Trend or Data Status */}
      <div className="flex items-center justify-center mb-3">
        {hasData ? (
          <span 
            className={`text-sm font-medium ${
              score.trend > 0 
                ? 'text-status-optimal' 
                : score.trend < 0 
                  ? 'text-status-concern' 
                  : 'text-gray-500'
            }`}
          >
            {trendIcon} {trendFormatted}
          </span>
        ) : (
          <span className="text-sm text-gray-400">
            Schedule assessment
          </span>
        )}
      </div>

      {/* Partial Data Indicator */}
      {hasData && score.components.length > 0 && overallCompletionRate < 1.0 && (
        <div className="text-center mb-2">
          <span className="text-xs text-status-attention bg-status-attention bg-opacity-10 px-2 py-1 rounded">
            {Math.round(overallCompletionRate * 100)}% complete
          </span>
        </div>
      )}

      {/* Last Update */}
      <div className="text-center">
        <span className="text-xs text-gray-400">
          Last update: {score.lastUpdate}
        </span>
      </div>
    </div>
  );
};