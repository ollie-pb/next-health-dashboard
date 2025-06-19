import React from 'react';
import type { HealthScore, Component } from '../types';
import { ComponentCard } from './ComponentCard';
import { CircularProgress } from './CircularProgress';
import { Breadcrumb } from './Breadcrumb';
import { EmptyState } from './EmptyState';
import { getStatusColor, formatTrend, getTrendIcon } from '../utils/healthUtils';

interface ComponentsViewProps {
  score: HealthScore;
  onComponentClick?: (component: Component) => void;
  onBackToDashboard?: () => void;
}

export const ComponentsView: React.FC<ComponentsViewProps> = ({ 
  score, 
  onComponentClick,
  onBackToDashboard
}) => {
  const statusColor = getStatusColor(score.status);
  const trendIcon = getTrendIcon(score.trend);
  const trendFormatted = formatTrend(score.trend);

  const breadcrumbItems = [
    { label: 'All Scores', onClick: onBackToDashboard },
    { label: score.name }
  ];

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Header */}
      <header className="bg-primary-navy text-white px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBackToDashboard}
            className="text-primary-blue hover:text-white transition-colors duration-200 mb-2 flex items-center gap-2"
          >
            <span>&larr;</span> Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold font-display">
            {score.name} Score
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Score Summary */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col tablet:flex-row items-center gap-8">
            {/* Circular Progress */}
            <div className="flex-shrink-0">
              <CircularProgress
                value={score.value}
                color={statusColor}
                size={160}
                strokeWidth={12}
              />
            </div>

            {/* Score Details */}
            <div className="flex-1 text-center tablet:text-left">
              <h2 className="text-3xl font-bold text-primary-navy mb-2 font-display">
                {score.name}
              </h2>
              <div className="flex items-center justify-center tablet:justify-start gap-4 mb-4">
                <span className="text-4xl font-bold text-primary-navy font-mono">
                  {score.value}
                </span>
                <span className="text-lg text-gray-500">/100</span>
                <span 
                  className={`text-lg font-medium ${
                    score.trend > 0 
                      ? 'text-status-optimal' 
                      : score.trend < 0 
                        ? 'text-status-concern' 
                        : 'text-gray-500'
                  }`}
                >
                  {trendIcon} {trendFormatted}
                </span>
              </div>
              <p className="text-gray-600">
                Based on {score.components.length} components • Last updated {score.lastUpdate}
              </p>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary-navy font-display mb-4">
            Components
          </h3>
          
          {score.components.length > 0 ? (
            // Sort components by completion rate and value
            score.components
              .sort((a, b) => {
                // First by completion rate (descending), then by value (descending)
                if (a.completionRate !== b.completionRate) {
                  return b.completionRate - a.completionRate;
                }
                return b.value - a.value;
              })
              .map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onClick={() => onComponentClick?.(component)}
                />
              ))
          ) : (
            // Empty state for no components
            <EmptyState
              icon="🔬"
              title="No Data Available Yet"
              description={`We haven't collected any ${score.name.toLowerCase()} data yet. Schedule your first assessment to start tracking this important health metric.`}
              actionText="Schedule Assessment"
              onAction={() => {
                // TODO: Implement scheduling functionality
                console.log('Schedule assessment clicked');
              }}
              size="large"
            />
          )}
        </div>

        {/* Component Summary */}
        {score.components.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-primary-navy mb-4 font-display">
              Component Summary
            </h4>
            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-optimal">
                  {score.components.filter(c => c.completionRate === 1.0).length}
                </div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-status-attention">
                  {score.components.filter(c => c.completionRate < 1.0 && c.completionRate > 0.5).length}
                </div>
                <div className="text-sm text-gray-500">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-status-concern">
                  {score.components.filter(c => c.completionRate <= 0.5).length}
                </div>
                <div className="text-sm text-gray-500">Limited</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-navy">
                  {score.components.reduce((sum, c) => sum + c.biomarkers.length, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Biomarkers</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};