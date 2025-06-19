import React from 'react';
import type { Biomarker } from '../types';

interface LineChartProps {
  biomarkers: Biomarker[];
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ biomarkers, height = 300 }) => {
  if (!biomarkers.length || !biomarkers[0].dataPoints?.length) {
    return (
      <div 
        className="bg-white rounded-lg border border-gray-200 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>No timeline data available</p>
          <p className="text-sm">Data points will appear here once available</p>
        </div>
      </div>
    );
  }

  const primaryBiomarker = biomarkers[0];
  const dataPoints = primaryBiomarker.dataPoints || [];
  
  // Calculate chart dimensions
  const padding = 60;
  const chartWidth = 800 - (padding * 2);
  const chartHeight = height - (padding * 2);
  
  // Get data ranges
  const values = dataPoints.map(d => d.value);
  const minValue = Math.min(...values, primaryBiomarker.referenceRange.min);
  const maxValue = Math.max(...values, primaryBiomarker.referenceRange.max);
  const valueRange = maxValue - minValue;
  
  // Create path for line
  const pathData = dataPoints.map((point, index) => {
    const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Reference range rectangle
  const refRangeTop = padding + chartHeight - ((primaryBiomarker.referenceRange.max - minValue) / valueRange) * chartHeight;
  const refRangeBottom = padding + chartHeight - ((primaryBiomarker.referenceRange.min - minValue) / valueRange) * chartHeight;
  const refRangeHeight = refRangeBottom - refRangeTop;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-primary-navy font-display">
          {primaryBiomarker.name} Timeline
        </h4>
        <p className="text-sm text-gray-500">
          Reference range: {primaryBiomarker.referenceRange.min} - {primaryBiomarker.referenceRange.max} {primaryBiomarker.unit}
        </p>
      </div>
      
      <svg width="800" height={height} className="w-full">
        {/* Reference range background */}
        <rect
          x={padding}
          y={refRangeTop}
          width={chartWidth}
          height={refRangeHeight}
          fill="#28A745"
          fillOpacity="0.1"
          stroke="#28A745"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        
        {/* Reference range labels */}
        <text
          x={padding - 10}
          y={refRangeTop + 5}
          textAnchor="end"
          className="text-xs fill-gray-500"
        >
          {primaryBiomarker.referenceRange.max}
        </text>
        <text
          x={padding - 10}
          y={refRangeBottom + 5}
          textAnchor="end"
          className="text-xs fill-gray-500"
        >
          {primaryBiomarker.referenceRange.min}
        </text>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio) => {
          const y = padding + chartHeight * ratio;
          return (
            <line
              key={ratio}
              x1={padding}
              y1={y}
              x2={padding + chartWidth}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* Data line */}
        <path
          d={pathData}
          fill="none"
          stroke="#4A90E2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((point, index) => {
          const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
          const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
          
          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#4A90E2"
                stroke="white"
                strokeWidth="2"
              />
              {/* Date labels */}
              <text
                x={x}
                y={height - 20}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {new Date(point.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </text>
              {/* Value labels on hover */}
              <text
                x={x}
                y={y - 15}
                textAnchor="middle"
                className="text-xs fill-primary-navy font-medium opacity-0 hover:opacity-100 transition-opacity"
              >
                {point.value}
              </text>
            </g>
          );
        })}

        {/* Current value highlight */}
        {dataPoints.length > 0 && (
          <g>
            {(() => {
              const lastPoint = dataPoints[dataPoints.length - 1];
              const x = padding + chartWidth;
              const y = padding + chartHeight - ((lastPoint.value - minValue) / valueRange) * chartHeight;
              
              return (
                <>
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#4A90E2"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x={x + 15}
                    y={y + 5}
                    className="text-sm fill-primary-navy font-bold"
                  >
                    {lastPoint.value} {primaryBiomarker.unit}
                  </text>
                </>
              );
            })()}
          </g>
        )}
      </svg>
    </div>
  );
};