import React, { useState } from 'react';
import type { HealthScore, Component } from '../types';
import { BiomarkerCard } from './BiomarkerCard';
import { LineChart } from './LineChart';
import { Breadcrumb } from './Breadcrumb';
import { HorizontalProgress } from './HorizontalProgress';
import { getStatusColor, getStatusFromValue } from '../utils/healthUtils';

interface BiomarkersViewProps {
  score: HealthScore;
  component: Component;
  onBackToComponents?: () => void;
  onBackToDashboard?: () => void;
}

export const BiomarkersView: React.FC<BiomarkersViewProps> = ({ 
  score, 
  component,
  onBackToComponents,
  onBackToDashboard
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  
  const componentStatus = getStatusFromValue(component.value);
  const componentColor = getStatusColor(componentStatus);

  const breadcrumbItems = [
    { label: 'All Scores', onClick: onBackToDashboard },
    { label: score.name, onClick: onBackToComponents },
    { label: component.name }
  ];

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Header */}
      <header className="bg-primary-navy text-white px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBackToComponents}
            className="text-primary-blue hover:text-white transition-colors duration-200 mb-2 flex items-center gap-2"
          >
            <span>&larr;</span> Back to {score.name}
          </button>
          <h1 className="text-2xl font-bold font-display">
            {component.name}
          </h1>
          <p className="text-primary-blue text-sm mt-1">
            {component.biomarkers.length} biomarkers • {Math.round(component.completionRate * 100)}% complete
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Component Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col tablet:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary-navy mb-3 font-display">
                {component.name}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary-navy font-mono">
                  {component.value}
                </span>
                <span className="text-lg text-gray-500">/100</span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Component Score</span>
                  <span className="text-gray-600">{component.value}%</span>
                </div>
                <HorizontalProgress
                  value={component.value}
                  color={componentColor}
                  height={8}
                />
              </div>
              <p className="text-gray-600">
                {component.biomarkers.filter(b => b.dataPoints && b.dataPoints.length > 0).length} of {component.biomarkers.length} biomarkers have timeline data
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-primary-navy font-display">
            Biomarkers
          </h3>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white text-primary-navy shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'graph'
                  ? 'bg-white text-primary-navy shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Graph View
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'list' ? (
          // List View
          <div className="space-y-4">
            {component.biomarkers.map((biomarker) => (
              <BiomarkerCard
                key={biomarker.id}
                biomarker={biomarker}
              />
            ))}
          </div>
        ) : (
          // Graph View
          <div className="space-y-8">
            {component.biomarkers
              .filter(b => b.dataPoints && b.dataPoints.length > 0)
              .map((biomarker) => (
                <LineChart
                  key={biomarker.id}
                  biomarkers={[biomarker]}
                  height={350}
                />
              ))}
            
            {component.biomarkers.filter(b => b.dataPoints && b.dataPoints.length > 0).length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">📈</div>
                <h4 className="text-xl font-semibold text-primary-navy mb-2">
                  No Timeline Data Available
                </h4>
                <p className="text-gray-500 mb-4">
                  Charts will appear here once we have multiple data points for your biomarkers.
                </p>
                <button className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                  Schedule Next Test
                </button>
              </div>
            )}
          </div>
        )}

        {/* Biomarker Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-primary-navy mb-4 font-display">
            Biomarker Summary
          </h4>
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-optimal">
                {component.biomarkers.filter(b => {
                  return b.value >= b.referenceRange.min && b.value <= b.referenceRange.max;
                }).length}
              </div>
              <div className="text-sm text-gray-500">In Range</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-status-concern">
                {component.biomarkers.filter(b => {
                  return b.value < b.referenceRange.min || b.value > b.referenceRange.max;
                }).length}
              </div>
              <div className="text-sm text-gray-500">Out of Range</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-status-optimal">
                {component.biomarkers.filter(b => (b.trend || 0) > 0).length}
              </div>
              <div className="text-sm text-gray-500">Improving</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-navy">
                {component.biomarkers.filter(b => b.dataPoints && b.dataPoints.length > 0).length}
              </div>
              <div className="text-sm text-gray-500">With Timeline</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};