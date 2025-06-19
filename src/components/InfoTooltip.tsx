import React, { useState } from 'react';

interface InfoTooltipProps {
  title: string;
  description: string;
  whatItMeasures?: string;
  whyItMatters?: string;
  howToImprove?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  title,
  description,
  whatItMeasures,
  whyItMatters,
  howToImprove
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="w-5 h-5 rounded-full bg-gray-300 text-white text-xs flex items-center justify-center hover:bg-primary-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
        aria-label={`Information about ${title}`}
      >
        i
      </button>

      {/* Tooltip */}
      {isVisible && (
        <div className="absolute z-50 w-80 p-4 bg-primary-navy text-white rounded-lg shadow-xl bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-navy"></div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg font-display text-primary-blue">
              {title}
            </h4>
            
            <p className="text-sm text-gray-300">
              {description}
            </p>

            {whatItMeasures && (
              <div>
                <h5 className="font-medium text-sm text-primary-blue mb-1">
                  What it measures:
                </h5>
                <p className="text-sm text-gray-300">
                  {whatItMeasures}
                </p>
              </div>
            )}

            {whyItMatters && (
              <div>
                <h5 className="font-medium text-sm text-primary-blue mb-1">
                  Why it matters:
                </h5>
                <p className="text-sm text-gray-300">
                  {whyItMatters}
                </p>
              </div>
            )}

            {howToImprove && (
              <div>
                <h5 className="font-medium text-sm text-primary-blue mb-1">
                  How to improve:
                </h5>
                <p className="text-sm text-gray-300">
                  {howToImprove}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};