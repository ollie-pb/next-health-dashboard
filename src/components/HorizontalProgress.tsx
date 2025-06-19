import React from 'react';

interface HorizontalProgressProps {
  value: number; // 0-100
  color: string;
  height?: number;
  className?: string;
}

export const HorizontalProgress: React.FC<HorizontalProgressProps> = ({
  value,
  color,
  height = 8,
  className = ''
}) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          backgroundColor: color,
          height: `${height}px`
        }}
      />
    </div>
  );
};