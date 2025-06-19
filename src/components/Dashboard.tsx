import React from 'react';
import type { HealthScore } from '../types';
import { ScoreCard } from './ScoreCard';

interface DashboardProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ scores, onScoreClick }) => {
  return (
    <div className="min-h-screen bg-primary-light">
      {/* Header */}
      <header className="bg-primary-navy text-white px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold font-display">
            Personal Health Dashboard
          </h1>
          <p className="text-primary-blue text-sm mt-1">
            Track your comprehensive health metrics
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 tablet:gap-6">
          {scores.map((score) => (
            <ScoreCard
              key={score.id}
              score={score}
              onClick={() => onScoreClick?.(score)}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-primary-navy mb-4 font-display">
            Health Overview
          </h2>
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-optimal">
                {scores.filter(s => s.status === 'optimal').length}
              </div>
              <div className="text-sm text-gray-500">Optimal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-status-good">
                {scores.filter(s => s.status === 'good').length}
              </div>
              <div className="text-sm text-gray-500">Good</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-status-attention">
                {scores.filter(s => s.status === 'attention').length}
              </div>
              <div className="text-sm text-gray-500">Attention</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-status-concern">
                {scores.filter(s => s.status === 'concern').length}
              </div>
              <div className="text-sm text-gray-500">Concern</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};