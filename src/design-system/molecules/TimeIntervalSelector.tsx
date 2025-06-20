import React from 'react';
import { cn } from '../utils/cn';
import { Button } from '../atoms/Button';

export interface TimeInterval {
  label: string;
  value: string;
  months?: number;
}

interface TimeIntervalSelectorProps {
  intervals: TimeInterval[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 'sm' | 'lg' | 'xl';
}

export const TimeIntervalSelector: React.FC<TimeIntervalSelectorProps> = ({
  intervals,
  selected,
  onChange,
  className,
  size = 'sm'
}) => {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-neutral-100 rounded-lg', className)}>
      {intervals.map((interval) => (
        <Button
          key={interval.value}
          variant={selected === interval.value ? 'primary' : 'ghost'}
          size={size}
          onClick={() => onChange(interval.value)}
          className={cn(
            'min-w-0 px-2 py-1',
            selected === interval.value 
              ? 'bg-primary-500 text-white shadow-sm' 
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
          )}
        >
          {interval.label}
        </Button>
      ))}
    </div>
  );
};