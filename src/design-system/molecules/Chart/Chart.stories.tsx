import type { Meta, StoryObj } from '@storybook/react';
import { Chart, type DataPoint } from './Chart';

// Sample data for different scenarios
const bloodPressureData: DataPoint[] = [
  { label: 'Jan', value: 128, status: 'attention', timestamp: '2024-01-15' },
  { label: 'Feb', value: 125, status: 'good', timestamp: '2024-02-15' },
  { label: 'Mar', value: 122, status: 'good', timestamp: '2024-03-15' },
  { label: 'Apr', value: 118, status: 'optimal', timestamp: '2024-04-15' },
  { label: 'May', value: 115, status: 'optimal', timestamp: '2024-05-15' },
  { label: 'Jun', value: 117, status: 'optimal', timestamp: '2024-06-15' },
];

const cholesterolData: DataPoint[] = [
  { label: 'Q1', value: 240, status: 'concern' },
  { label: 'Q2', value: 220, status: 'attention' },
  { label: 'Q3', value: 195, status: 'good' },
  { label: 'Q4', value: 180, status: 'optimal' },
];

const glucoseData: DataPoint[] = [
  { label: 'Week 1', value: 145, status: 'attention', timestamp: '2024-06-03' },
  { label: 'Week 2', value: 142, status: 'attention', timestamp: '2024-06-10' },
  { label: 'Week 3', value: 138, status: 'good', timestamp: '2024-06-17' },
  { label: 'Week 4', value: 135, status: 'good', timestamp: '2024-06-24' },
  { label: 'Week 5', value: 132, status: 'optimal', timestamp: '2024-07-01' },
];

const recentReadings: DataPoint[] = [
  { label: 'Morning Reading', value: 118, timestamp: '8:00 AM' },
  { label: 'Post-Exercise', value: 122, timestamp: '10:30 AM' },
  { label: 'Lunch Reading', value: 125, timestamp: '1:00 PM' },
  { label: 'Afternoon', value: 120, timestamp: '4:00 PM' },
  { label: 'Evening', value: 116, timestamp: '8:00 PM' },
];

const meta: Meta<typeof Chart> = {
  title: 'Design System/Molecules/Chart',
  component: Chart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile chart component for health data visualization. Supports line charts, bar charts, and trend displays with status-coded data points.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['line', 'bar', 'area', 'trend'],
      description: 'Chart visualization type',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Chart size variant',
    },
    showGrid: {
      control: { type: 'boolean' },
      description: 'Show grid lines',
    },
    showLegend: {
      control: { type: 'boolean' },
      description: 'Show status legend',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable hover interactions',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading skeleton',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Blood Pressure Trends',
    subtitle: 'Systolic pressure over time',
    data: bloodPressureData,
    unit: ' mmHg',
    icon: 'heart',
    trend: -10.2,
    variant: 'line',
    size: 'md',
  },
};

export const LineCharts: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Chart
        title="Blood Pressure Progress"
        subtitle="6-month improvement trend"
        data={bloodPressureData}
        unit=" mmHg"
        icon="heart"
        trend={-10.2}
        variant="line"
        showLegend
      />
      <Chart
        title="Glucose Monitoring"
        subtitle="Weekly average readings"
        data={glucoseData}
        unit=" mg/dL"
        icon="activity"
        trend={-8.9}
        variant="line"
        showGrid
        showLegend
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Line charts showing health metric trends over time with status indicators.',
      },
    },
  },
};

export const BarCharts: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Chart
        title="Cholesterol Quarterly Results"
        subtitle="Total cholesterol levels"
        data={cholesterolData}
        unit=" mg/dL"
        icon="pulse"
        trend={-25.0}
        variant="bar"
        showLegend
      />
      <Chart
        title="Biomarker Status"
        subtitle="Current health indicators"
        data={[
          { label: 'Vitamin D', value: 45, status: 'optimal' },
          { label: 'B12', value: 32, status: 'good' },
          { label: 'Iron', value: 28, status: 'attention' },
          { label: 'Magnesium', value: 15, status: 'concern' },
        ]}
        unit=" ng/mL"
        icon="activity"
        variant="bar"
        showLegend
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bar charts for categorical health data comparison.',
      },
    },
  },
};

export const TrendDisplay: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Chart
        title="Recent Blood Pressure"
        subtitle="Today's readings"
        data={recentReadings}
        unit=" mmHg"
        icon="heart"
        variant="trend"
        size="lg"
      />
      <Chart
        title="Weekly Lab Results"
        subtitle="Latest biomarker changes"
        data={[
          { label: 'Hemoglobin A1C', value: 5.8, timestamp: 'Mon 9:00 AM' },
          { label: 'LDL Cholesterol', value: 95, timestamp: 'Tue 2:00 PM' },
          { label: 'HDL Cholesterol', value: 65, timestamp: 'Wed 10:00 AM' },
          { label: 'Triglycerides', value: 120, timestamp: 'Thu 1:00 PM' },
        ]}
        unit=""
        icon="activity"
        variant="trend"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trend display format for recent readings and changes.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Chart
        title="Small Chart"
        data={bloodPressureData.slice(0, 4)}
        unit=" mmHg"
        variant="line"
        size="sm"
      />
      <Chart
        title="Medium Chart"
        data={bloodPressureData}
        unit=" mmHg"
        variant="line"
        size="md"
      />
      <Chart
        title="Large Chart"
        subtitle="Extended view with more detail"
        data={bloodPressureData}
        unit=" mmHg"
        icon="heart"
        trend={-10.2}
        variant="line"
        size="lg"
        showGrid
        showLegend
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chart components in different sizes for various layout needs.',
      },
    },
  },
};

export const EmptyStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Chart
        title="No Data Available"
        subtitle="Waiting for first readings"
        data={[]}
        icon="pulse"
        variant="line"
      />
      <Chart
        title="Loading Chart"
        data={[]}
        loading={true}
        variant="bar"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty states and loading skeletons for charts.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Failed to Load Data',
    data: [],
    error: 'Unable to connect to health monitoring service. Please try again later.',
    variant: 'line',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state when chart data fails to load.',
      },
    },
  },
};

export const HealthDashboard: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Health Metrics Overview</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Chart
            title="Blood Pressure Trends"
            subtitle="6-month improvement journey"
            data={bloodPressureData}
            unit=" mmHg"
            icon="heart"
            trend={-10.2}
            variant="line"
            size="lg"
            showLegend
          />
          <Chart
            title="Biomarker Comparison"
            subtitle="Current status vs. optimal ranges"
            data={[
              { label: 'Vitamin D', value: 85, status: 'optimal' },
              { label: 'B12', value: 72, status: 'good' },
              { label: 'Iron', value: 58, status: 'attention' },
              { label: 'Omega-3', value: 45, status: 'concern' },
              { label: 'Magnesium', value: 91, status: 'optimal' },
            ]}
            unit="%"
            icon="activity"
            variant="bar"
            size="lg"
            showLegend
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Recent Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            title="Today's Blood Pressure"
            subtitle="Multiple readings throughout the day"
            data={recentReadings}
            unit=" mmHg"
            icon="heart"
            variant="trend"
            size="md"
          />
          <Chart
            title="Glucose Control"
            subtitle="Weekly progress tracking"
            data={glucoseData}
            unit=" mg/dL"
            icon="pulse"
            trend={-8.9}
            variant="line"
            size="md"
            showGrid
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete health dashboard with multiple chart types and real-world data.',
      },
    },
  },
};