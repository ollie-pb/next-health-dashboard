import type { HealthScore } from '../types';

export const sampleHealthScores: HealthScore[] = [
  {
    id: 'nutrition',
    name: 'Nutrition',
    value: 85,
    trend: 7,
    lastUpdate: '2 days ago',
    status: 'good',
    components: [
      {
        id: 'whole-foods',
        name: 'Whole Foods',
        value: 92,
        completionRate: 1.0,
        biomarkers: [
          {
            id: 'processed-food-ratio',
            name: 'Processed Food Ratio',
            value: 15,
            unit: '%',
            referenceRange: { min: 0, max: 20 },
            trend: -5,
            lastUpdate: '2 days ago',
            dataPoints: [
              { date: '2025-05-20', value: 20 },
              { date: '2025-05-27', value: 18 },
              { date: '2025-06-03', value: 16 },
              { date: '2025-06-10', value: 15 },
              { date: '2025-06-17', value: 15 }
            ]
          }
        ]
      },
      {
        id: 'pattern-timing',
        name: 'Pattern & Timing',
        value: 88,
        completionRate: 0.9,
        biomarkers: [
          {
            id: 'eating-window',
            name: 'Eating Window',
            value: 10,
            unit: 'hours',
            referenceRange: { min: 8, max: 12 },
            trend: 0,
            lastUpdate: '1 day ago',
            dataPoints: [
              { date: '2025-06-13', value: 11 },
              { date: '2025-06-14', value: 10 },
              { date: '2025-06-15', value: 10 },
              { date: '2025-06-16', value: 9 },
              { date: '2025-06-17', value: 10 }
            ]
          }
        ]
      },
      {
        id: 'micronutrients',
        name: 'Micronutrients',
        value: 76,
        completionRate: 0.75,
        biomarkers: [
          {
            id: 'vitamin-d',
            name: 'Vitamin D',
            value: 45,
            unit: 'ng/mL',
            referenceRange: { min: 30, max: 80 },
            trend: 12,
            lastUpdate: '1 week ago',
            dataPoints: [
              { date: '2025-03-15', value: 28 },
              { date: '2025-04-15', value: 35 },
              { date: '2025-05-15', value: 42 },
              { date: '2025-06-15', value: 45 }
            ]
          },
          {
            id: 'b12',
            name: 'Vitamin B12',
            value: 680,
            unit: 'pg/mL',
            referenceRange: { min: 200, max: 900 },
            trend: 8,
            lastUpdate: '1 week ago',
            dataPoints: [
              { date: '2025-03-15', value: 590 },
              { date: '2025-04-15', value: 620 },
              { date: '2025-05-15', value: 650 },
              { date: '2025-06-15', value: 680 }
            ]
          }
        ]
      },
      {
        id: 'glycemic-control',
        name: 'Glycemic Control',
        value: 78,
        completionRate: 0.8,
        biomarkers: [
          {
            id: 'glucose-fasting',
            name: 'Glucose (Fasting)',
            value: 95,
            unit: 'mg/dL',
            referenceRange: { min: 70, max: 100 },
            trend: -3,
            lastUpdate: '5 days ago',
            dataPoints: [
              { date: '2025-04-15', value: 102 },
              { date: '2025-05-01', value: 98 },
              { date: '2025-05-15', value: 97 },
              { date: '2025-06-01', value: 96 },
              { date: '2025-06-14', value: 95 }
            ]
          },
          {
            id: 'hba1c',
            name: 'HbA1c',
            value: 5.2,
            unit: '%',
            referenceRange: { min: 4.0, max: 5.6 },
            trend: -4,
            lastUpdate: '2 weeks ago',
            dataPoints: [
              { date: '2025-03-01', value: 5.6 },
              { date: '2025-04-01', value: 5.4 },
              { date: '2025-05-01', value: 5.3 },
              { date: '2025-06-01', value: 5.2 }
            ]
          },
          {
            id: 'triglycerides',
            name: 'Triglycerides',
            value: 85,
            unit: 'mg/dL',
            referenceRange: { min: 0, max: 150 },
            trend: -8,
            lastUpdate: '1 week ago',
            dataPoints: [
              { date: '2025-03-15', value: 105 },
              { date: '2025-04-15', value: 95 },
              { date: '2025-05-15', value: 88 },
              { date: '2025-06-15', value: 85 }
            ]
          }
        ]
      },
      {
        id: 'metabolic-health',
        name: 'Metabolic Health',
        value: 82,
        completionRate: 0.85,
        biomarkers: [
          {
            id: 'insulin-fasting',
            name: 'Insulin (Fasting)',
            value: 8.5,
            unit: 'μU/mL',
            referenceRange: { min: 2.6, max: 24.9 },
            trend: -12,
            lastUpdate: '1 week ago',
            dataPoints: [
              { date: '2025-03-15', value: 12.1 },
              { date: '2025-04-15', value: 10.2 },
              { date: '2025-05-15', value: 9.1 },
              { date: '2025-06-15', value: 8.5 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'brain-health',
    name: 'Brain Health',
    value: 0,
    trend: 0,
    lastUpdate: 'Never',
    status: 'no-data',
    components: []
  },
  {
    id: 'immune-health',
    name: 'Immune Health',
    value: 76,
    trend: -2,
    lastUpdate: '3 days ago',
    status: 'good',
    components: []
  },
  {
    id: 'hormone-health',
    name: 'Hormone Health',
    value: 68,
    trend: 15,
    lastUpdate: '1 week ago',
    status: 'attention',
    components: []
  },
  {
    id: 'gut-health',
    name: 'Gut Health',
    value: 82,
    trend: 8,
    lastUpdate: '4 days ago',
    status: 'good',
    components: []
  },
  {
    id: 'detoxification',
    name: 'Detoxification',
    value: 79,
    trend: 3,
    lastUpdate: '2 days ago',
    status: 'good',
    components: []
  },
  {
    id: 'stress-emotional',
    name: 'Stress & Emotional',
    value: 65,
    trend: -8,
    lastUpdate: '1 day ago',
    status: 'attention',
    components: []
  },
  {
    id: 'longevity',
    name: 'Longevity',
    value: 88,
    trend: 5,
    lastUpdate: '1 week ago',
    status: 'good',
    components: []
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics',
    value: 73,
    trend: 2,
    lastUpdate: '3 days ago',
    status: 'good',
    components: []
  },
  {
    id: 'heart-health',
    name: 'Heart Health',
    value: 91,
    trend: 4,
    lastUpdate: '5 days ago',
    status: 'optimal',
    components: []
  },
  {
    id: 'movement',
    name: 'Movement',
    value: 58,
    trend: -12,
    lastUpdate: '12 hours ago',
    status: 'attention',
    components: []
  },
  {
    id: 'sleep',
    name: 'Sleep',
    value: 45,
    trend: -18,
    lastUpdate: '12 hours ago',
    status: 'concern',
    components: []
  }
];