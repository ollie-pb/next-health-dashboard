import React from 'react';
import { Typography } from '../design-system/atoms/Typography';
import { Icon } from '../design-system/atoms/Icon';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 border border-red-200 rounded-lg">
          <Icon name="alertCircle" size="xl" color="danger" className="mb-4" />
          <Typography variant="heading-sm" color="danger" className="mb-2">
            Something went wrong
          </Typography>
          <Typography variant="body-sm" color="muted" className="text-center">
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}