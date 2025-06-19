import React from 'react';

interface LoadingSkeletonProps {
  type: 'score-card' | 'component-card' | 'biomarker-card' | 'chart';
  count?: number;
}

const SkeletonBase: React.FC<{ className?: string; children?: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <div className={`animate-pulse ${className}`}>
    {children}
  </div>
);

const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gray-200 rounded ${className}`} />
);

const ScoreCardSkeleton: React.FC = () => (
  <SkeletonBase className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    {/* Circular progress placeholder */}
    <div className="flex justify-center mb-4">
      <SkeletonBox className="w-24 h-24 rounded-full" />
    </div>
    
    {/* Title */}
    <SkeletonBox className="h-5 w-3/4 mx-auto mb-2" />
    
    {/* Score value */}
    <SkeletonBox className="h-8 w-1/2 mx-auto mb-3" />
    
    {/* Trend */}
    <SkeletonBox className="h-4 w-1/3 mx-auto mb-3" />
    
    {/* Last update */}
    <SkeletonBox className="h-3 w-1/2 mx-auto" />
  </SkeletonBase>
);

const ComponentCardSkeleton: React.FC = () => (
  <SkeletonBase className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <SkeletonBox className="h-5 w-1/2" />
      <SkeletonBox className="h-6 w-12" />
    </div>
    
    {/* Progress bar */}
    <SkeletonBox className="h-2 w-full mb-4" />
    
    {/* Footer */}
    <div className="flex items-center justify-between">
      <SkeletonBox className="h-4 w-1/3" />
      <SkeletonBox className="h-4 w-1/4" />
    </div>
  </SkeletonBase>
);

const BiomarkerCardSkeleton: React.FC = () => (
  <SkeletonBase className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="space-y-2">
        <SkeletonBox className="h-5 w-32" />
        <SkeletonBox className="h-3 w-24" />
      </div>
      <div className="text-right space-y-1">
        <SkeletonBox className="h-6 w-16" />
        <SkeletonBox className="h-3 w-8" />
      </div>
    </div>
    
    {/* Reference range */}
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <SkeletonBox className="h-3 w-8" />
        <SkeletonBox className="h-3 w-20" />
        <SkeletonBox className="h-3 w-8" />
      </div>
      <SkeletonBox className="h-2 w-full" />
    </div>
    
    {/* Trend and sparkline */}
    <div className="flex items-center justify-between">
      <SkeletonBox className="h-4 w-16" />
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonBox key={i} className="w-1 h-6" />
        ))}
      </div>
    </div>
  </SkeletonBase>
);

const ChartSkeleton: React.FC = () => (
  <SkeletonBase className="bg-white rounded-lg border border-gray-200 p-4">
    {/* Header */}
    <div className="mb-4 space-y-2">
      <SkeletonBox className="h-5 w-1/3" />
      <SkeletonBox className="h-3 w-1/2" />
    </div>
    
    {/* Chart area */}
    <SkeletonBox className="h-64 w-full" />
  </SkeletonBase>
);

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type, count = 1 }) => {
  const getSkeletonComponent = () => {
    switch (type) {
      case 'score-card':
        return ScoreCardSkeleton;
      case 'component-card':
        return ComponentCardSkeleton;
      case 'biomarker-card':
        return BiomarkerCardSkeleton;
      case 'chart':
        return ChartSkeleton;
      default:
        return ScoreCardSkeleton;
    }
  };

  const SkeletonComponent = getSkeletonComponent();

  if (count === 1) {
    return <SkeletonComponent />;
  }

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </>
  );
};