import React from 'react';
import { cn } from '../../utils/cn';

export interface LogoProps {
  variant?: 'full' | 'icon-navy' | 'icon-white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-12',
  xl: 'h-16',
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className,
}) => {
  const baseClasses = cn(
    'inline-block',
    sizeClasses[size],
    className
  );

  if (variant === 'icon-navy') {
    return (
      <img
        src="/assets/logos/next-health-icon-navy.webp"
        alt="Next Health"
        className={baseClasses}
      />
    );
  }

  if (variant === 'icon-white') {
    return (
      <img
        src="/assets/logos/next-health-icon-white.webp"
        alt="Next Health"
        className={baseClasses}
      />
    );
  }

  // Full logo (SVG)
  return (
    <img
      src="/assets/logos/next-health-logo.svg"
      alt="Next Health"
      className={baseClasses}
    />
  );
};