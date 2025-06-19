import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📊',
  title,
  description,
  actionText,
  onAction,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: {
      container: 'p-6',
      icon: 'text-3xl',
      title: 'text-lg',
      description: 'text-sm',
      button: 'px-4 py-2 text-sm'
    },
    medium: {
      container: 'p-8',
      icon: 'text-5xl',
      title: 'text-xl',
      description: 'text-base',
      button: 'px-6 py-3 text-base'
    },
    large: {
      container: 'p-12',
      icon: 'text-6xl',
      title: 'text-2xl',
      description: 'text-lg',
      button: 'px-8 py-4 text-lg'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 text-center ${classes.container}`}>
      {/* Icon */}
      <div className={`${classes.icon} mb-4`}>
        {icon}
      </div>
      
      {/* Title */}
      <h3 className={`font-semibold text-primary-navy mb-2 font-display ${classes.title}`}>
        {title}
      </h3>
      
      {/* Description */}
      <p className={`text-gray-500 mb-6 max-w-md mx-auto ${classes.description}`}>
        {description}
      </p>
      
      {/* Action Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className={`bg-primary-blue text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium ${classes.button}`}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};