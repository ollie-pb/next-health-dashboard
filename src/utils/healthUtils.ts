import type { HealthScoreStatus } from '../types';

export const getStatusColor = (status: HealthScoreStatus): string => {
  switch (status) {
    case 'optimal':
      return '#28A745'; // Green
    case 'good':
      return '#6CBF84'; // Light green
    case 'attention':
      return '#FFC107'; // Amber
    case 'concern':
      return '#FF6B6B'; // Red
    case 'no-data':
      return '#6C757D'; // Grey
    default:
      return '#6C757D';
  }
};

export const getStatusFromValue = (value: number): HealthScoreStatus => {
  if (value >= 90) return 'optimal';
  if (value >= 70) return 'good';
  if (value >= 50) return 'attention';
  if (value > 0) return 'concern';
  return 'no-data';
};

export const formatTrend = (trend: number): string => {
  const sign = trend > 0 ? '+' : '';
  return `${sign}${trend}%`;
};

export const getTrendIcon = (trend: number): string => {
  if (trend > 0) return '↑';
  if (trend < 0) return '↓';
  return '→';
};