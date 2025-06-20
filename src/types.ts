export interface HealthScore {
  id: string;
  name: string;
  value: number; // 0-100
  trend: number; // percentage change
  lastUpdate: string; // relative time string
  status: 'optimal' | 'good' | 'attention' | 'concern' | 'no-data';
  components: Component[];
}

export interface Component {
  id: string;
  name: string;
  value: number; // 0-100
  completionRate: number; // 0-1 (percentage of biomarkers available)
  trend?: number; // percentage change
  biomarkers: Biomarker[];
}

export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  trend?: number; // percentage change
  lastUpdate: string;
  category?: string; // biomarker category
  description?: string; // biomarker description
  dataPoints?: Array<{
    date: string;
    value: number;
  }>;
}

export type HealthScoreStatus = 'optimal' | 'good' | 'attention' | 'concern' | 'no-data';