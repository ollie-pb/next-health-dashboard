import type { Meta, StoryObj } from '@storybook/react';
import { ScoreCard } from './ScoreCard';

const meta: Meta<typeof ScoreCard> = {
  title: 'Design System/Molecules/ScoreCard',
  component: ScoreCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An enhanced score card component combining atomic elements into a sophisticated health metric display. Features progress visualization, trend indicators, and premium styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title of the health metric',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Score value from 0-100',
    },
    trend: {
      control: { type: 'number' },
      description: 'Percentage change trend',
    },
    status: {
      control: { type: 'select' },
      options: ['optimal', 'good', 'attention', 'concern', 'no-data'],
      description: 'Health status override',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Card size variant',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable click interactions',
    },
    showProgress: {
      control: { type: 'boolean' },
      description: 'Show circular progress indicator',
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
    title: 'Cardiovascular Health',
    value: 85,
    trend: 12.5,
    lastUpdate: '2 hours ago',
    icon: 'heart',
    description: 'Overall cardiovascular system performance and risk assessment',
  },
};

export const HealthStatuses: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ScoreCard
        title="Cardiovascular Health"
        value={92}
        trend={8.3}
        lastUpdate="2 hours ago"
        icon="heart"
        status="optimal"
        description="Excellent heart health metrics across all indicators"
      />
      <ScoreCard
        title="Metabolic Function"
        value={74}
        trend={-2.1}
        lastUpdate="4 hours ago"
        icon="activity"
        status="good"
        description="Good metabolic markers with room for improvement"
      />
      <ScoreCard
        title="Cognitive Performance"
        value={58}
        trend={-5.7}
        lastUpdate="1 day ago"
        icon="brain"
        status="attention"
        description="Cognitive metrics showing decline, needs attention"
      />
      <ScoreCard
        title="Inflammation Markers"
        value={34}
        trend={-12.4}
        lastUpdate="6 hours ago"
        icon="activity"
        status="concern"
        description="High inflammatory markers require immediate action"
      />
      <ScoreCard
        title="Hormone Balance"
        value={0}
        lastUpdate="No recent data"
        icon="pulse"
        status="no-data"
        description="Insufficient data for comprehensive analysis"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Score cards showing different health statuses with automatic color coding.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ScoreCard
        size="sm"
        title="Blood Pressure"
        value={78}
        trend={3.2}
        icon="pulse"
        description="Compact card size"
      />
      <ScoreCard
        size="md"
        title="Cholesterol"
        value={85}
        trend={-1.8}
        icon="heart"
        description="Standard card size"
      />
      <ScoreCard
        size="lg"
        title="Overall Wellness"
        value={91}
        trend={5.4}
        lastUpdate="1 hour ago"
        icon="activity"
        description="Large card with extended information display"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Score cards in different sizes for various layout needs.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ScoreCard
        title="Blood Sugar Control"
        value={67}
        trend={8.9}
        lastUpdate="30 minutes ago"
        icon="pulse"
        interactive
        onClick={() => alert('Navigating to Blood Sugar details...')}
        description="Click to view detailed glucose trends and insights"
      />
      <ScoreCard
        title="Sleep Quality"
        value={82}
        trend={-2.3}
        lastUpdate="8 hours ago"
        icon="brain"
        interactive
        onClick={() => alert('Opening Sleep Analytics...')}
        description="Interactive card showing sleep patterns and recommendations"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive score cards with hover effects and click handlers.',
      },
    },
  },
};

export const WithoutProgress: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ScoreCard
        title="Recent Lab Results"
        value={88}
        trend={4.2}
        lastUpdate="1 day ago"
        icon="activity"
        showProgress={false}
        description="Card without circular progress indicator"
      />
      <ScoreCard
        title="Medication Adherence"
        value={95}
        trend={1.8}
        lastUpdate="12 hours ago"
        icon="check"
        showProgress={false}
        description="Text-focused card layout"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Score cards without progress rings for text-focused layouts.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ScoreCard
        title=""
        value={0}
        loading={true}
      />
      <ScoreCard
        title=""
        value={0}
        loading={true}
        size="lg"
      />
      <ScoreCard
        title=""
        value={0}
        loading={true}
        size="sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton states for score cards.',
      },
    },
  },
};

export const TrendVariations: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ScoreCard
        title="Improving Metric"
        value={76}
        trend={15.3}
        icon="trendingUp"
        description="Strong positive trend"
      />
      <ScoreCard
        title="Declining Metric"
        value={62}
        trend={-8.7}
        icon="trendingDown"
        description="Concerning downward trend"
      />
      <ScoreCard
        title="Stable Metric"
        value={81}
        trend={0.2}
        icon="minus"
        description="Minimal change, stable"
      />
      <ScoreCard
        title="No Trend Data"
        value={69}
        icon="pulse"
        description="No trend information available"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Score cards showing different trend scenarios.',
      },
    },
  },
};

export const HealthDashboard: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Core Health Scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScoreCard
            title="Cardiovascular Health"
            value={92}
            trend={8.3}
            lastUpdate="2 hours ago"
            icon="heart"
            interactive
            description="Comprehensive heart health assessment including blood pressure, cholesterol, and cardiac markers"
          />
          <ScoreCard
            title="Metabolic Function"
            value={74}
            trend={-2.1}
            lastUpdate="4 hours ago"
            icon="activity"
            interactive
            description="Metabolic health indicators including glucose, insulin sensitivity, and lipid metabolism"
          />
          <ScoreCard
            title="Inflammatory Status"
            value={58}
            trend={-5.7}
            lastUpdate="1 day ago"
            icon="pulse"
            interactive
            description="Inflammatory markers and immune system health indicators"
          />
          <ScoreCard
            title="Hormone Balance"
            value={87}
            trend={12.4}
            lastUpdate="6 hours ago"
            icon="brain"
            interactive
            description="Comprehensive hormone panel including thyroid, adrenal, and reproductive hormones"
          />
          <ScoreCard
            title="Nutrient Status"
            value={69}
            trend={3.8}
            lastUpdate="12 hours ago"
            icon="activity"
            interactive
            description="Essential vitamins, minerals, and micronutrient levels"
          />
          <ScoreCard
            title="Toxin Exposure"
            value={45}
            trend={-8.2}
            lastUpdate="1 day ago"
            icon="alertTriangle"
            interactive
            description="Environmental toxin burden and detoxification capacity"
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Recent Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScoreCard
            title="Blood Sugar Control"
            value={82}
            trend={5.2}
            lastUpdate="30 minutes ago"
            icon="pulse"
            size="lg"
            interactive
            description="Latest glucose monitoring data with trend analysis and recommendations"
          />
          <ScoreCard
            title="Sleep Quality Index"
            value={76}
            trend={-1.4}
            lastUpdate="8 hours ago"
            icon="brain"
            size="lg"
            interactive
            description="Sleep tracking metrics including duration, quality, and recovery patterns"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete health dashboard layout showing real-world usage patterns.',
      },
    },
  },
};