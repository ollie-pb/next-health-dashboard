import React, { useState } from 'react';
import { format, subMonths, subYears, startOfDay, endOfDay } from 'date-fns';
import { cn } from '../utils/cn';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';

export interface TimeInterval {
  label: string;
  value: string;
  months?: number;
  startDate?: Date;
  endDate?: Date;
  isCustom?: boolean;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
  label?: string;
}

interface EnhancedTimeIntervalSelectorProps {
  intervals: TimeInterval[];
  selected: string;
  onChange: (value: string, dateRange?: DateRange) => void;
  className?: string;
  size?: 'sm' | 'lg' | 'xl';
  allowCustomRange?: boolean;
  maxDate?: Date;
  minDate?: Date;
  customRangeLabel?: string;
  onCustomRangeChange?: (range: DateRange) => void;
  showDateRange?: boolean;
}

export const EnhancedTimeIntervalSelector: React.FC<EnhancedTimeIntervalSelectorProps> = ({
  intervals,
  selected,
  onChange,
  className,
  size = 'sm',
  allowCustomRange = false,
  maxDate = new Date(),
  minDate = subYears(new Date(), 5),
  customRangeLabel = 'Custom',
  onCustomRangeChange,
  showDateRange = false
}) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');
  const [isValidRange, setIsValidRange] = useState(false);

  // Calculate date range for current selection
  const getCurrentDateRange = (intervalValue: string): DateRange | null => {
    const interval = intervals.find(i => i.value === intervalValue);
    if (!interval) return null;

    if (interval.isCustom && interval.startDate && interval.endDate) {
      return {
        startDate: interval.startDate,
        endDate: interval.endDate,
        label: interval.label
      };
    }

    if (interval.months) {
      const endDate = maxDate;
      const startDate = subMonths(endDate, interval.months);
      return {
        startDate,
        endDate,
        label: interval.label
      };
    }

    return null;
  };

  // Get current date range for display
  const currentDateRange = getCurrentDateRange(selected);

  // Validate custom date range
  const validateCustomRange = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    return startDate <= endDate && 
           startDate >= minDate && 
           endDate <= maxDate;
  };

  // Handle custom date input change
  const handleCustomDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setCustomStart(value);
      setIsValidRange(validateCustomRange(value, customEnd));
    } else {
      setCustomEnd(value);
      setIsValidRange(validateCustomRange(customStart, value));
    }
  };

  // Apply custom date range
  const applyCustomRange = () => {
    if (!isValidRange) return;
    
    const startDate = startOfDay(new Date(customStart));
    const endDate = endOfDay(new Date(customEnd));
    
    const dateRange: DateRange = {
      startDate,
      endDate,
      label: `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
    };
    
    onCustomRangeChange?.(dateRange);
    onChange('custom', dateRange);
    setShowCustomPicker(false);
  };

  // Handle interval selection
  const handleIntervalChange = (intervalValue: string) => {
    if (intervalValue === 'custom') {
      setShowCustomPicker(true);
      return;
    }
    
    const dateRange = getCurrentDateRange(intervalValue);
    onChange(intervalValue, dateRange || undefined);
    setShowCustomPicker(false);
  };

  return (
    <div className={cn('relative', className)}>
      <div className="flex flex-col gap-2">
        {/* Interval Selector */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
          {intervals.map((interval) => (
            <Button
              key={interval.value}
              variant={selected === interval.value ? 'primary' : 'ghost'}
              size={size}
              onClick={() => handleIntervalChange(interval.value)}
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
          
          {allowCustomRange && (
            <Button
              variant={selected === 'custom' ? 'primary' : 'ghost'}
              size={size}
              onClick={() => handleIntervalChange('custom')}
              className={cn(
                'min-w-0 px-2 py-1 flex items-center gap-1',
                selected === 'custom' 
                  ? 'bg-primary-500 text-white shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              )}
            >
              <Icon name="calendar" size="xs" />
              {customRangeLabel}
            </Button>
          )}
        </div>

        {/* Date Range Display */}
        {showDateRange && currentDateRange && (
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Icon name="calendar" size="xs" />
            <Typography variant="caption" color="muted">
              {format(currentDateRange.startDate, 'MMM d, yyyy')} - {format(currentDateRange.endDate, 'MMM d, yyyy')}
            </Typography>
          </div>
        )}
      </div>

      {/* Custom Date Range Picker */}
      {showCustomPicker && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 min-w-80">
          <div className="flex items-center justify-between mb-3">
            <Typography variant="heading-xs">Select Date Range</Typography>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCustomPicker(false)}
              className="p-1"
            >
              <Icon name="x" size="sm" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Typography variant="caption" color="muted" className="mb-1 block">
                  Start Date
                </Typography>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => handleCustomDateChange('start', e.target.value)}
                  min={format(minDate, 'yyyy-MM-dd')}
                  max={format(maxDate, 'yyyy-MM-dd')}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <Typography variant="caption" color="muted" className="mb-1 block">
                  End Date
                </Typography>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => handleCustomDateChange('end', e.target.value)}
                  min={customStart || format(minDate, 'yyyy-MM-dd')}
                  max={format(maxDate, 'yyyy-MM-dd')}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {!isValidRange && (customStart || customEnd) && (
              <Typography variant="caption" color="danger" className="flex items-center gap-1">
                <Icon name="alertCircle" size="xs" />
                Please select a valid date range
              </Typography>
            )}
            
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCustomPicker(false);
                  setCustomStart('');
                  setCustomEnd('');
                  setIsValidRange(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={applyCustomRange}
                disabled={!isValidRange}
              >
                Apply Range
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Utility function to generate common time intervals
export const getDefaultTimeIntervals = (): TimeInterval[] => [
  { label: '1M', value: '1m', months: 1 },
  { label: '3M', value: '3m', months: 3 },
  { label: '6M', value: '6m', months: 6 },
  { label: '12M', value: '12m', months: 12 },
  { label: '18M', value: '18m', months: 18 },
  { label: '3Y', value: '3y', months: 36 },
  { label: 'All', value: 'all', months: undefined },
];

// Utility function to format date range for display
export const formatDateRange = (range: DateRange): string => {
  if (range.label) return range.label;
  
  const start = format(range.startDate, 'MMM d, yyyy');
  const end = format(range.endDate, 'MMM d, yyyy');
  
  return `${start} - ${end}`;
};

// Utility function to calculate data points for a given time interval
export const getDataPointsForInterval = (interval: TimeInterval, maxDate: Date = new Date()): Date[] => {
  const points: Date[] = [];
  
  if (!interval.months) {
    // For 'All' or unlimited intervals, return reasonable sample points
    const startDate = subYears(maxDate, 2);
    const monthsToShow = 24;
    
    for (let i = 0; i <= monthsToShow; i++) {
      points.push(subMonths(startDate, monthsToShow - i));
    }
    
    return points;
  }
  
  const startDate = subMonths(maxDate, interval.months);
  const totalPoints = Math.min(interval.months, 50); // Limit to 50 points max
  const intervalSize = interval.months / totalPoints;
  
  for (let i = 0; i <= totalPoints; i++) {
    points.push(subMonths(startDate, (totalPoints - i) * intervalSize));
  }
  
  return points;
};