import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem } from './Grid';
import { ScoreCard } from '../../molecules/ScoreCard';
import { Chart } from '../../molecules/Chart/Chart';
import { Typography } from '../../atoms/Typography';

// Sample data
const healthScores = [
  { title: 'Cardiovascular', value: 92, trend: 8.3, icon: 'heart' as const },
  { title: 'Metabolic', value: 74, trend: -2.1, icon: 'activity' as const },
  { title: 'Inflammation', value: 58, trend: -5.7, icon: 'pulse' as const },
  { title: 'Hormones', value: 87, trend: 12.4, icon: 'brain' as const },
  { title: 'Nutrition', value: 69, trend: 3.8, icon: 'activity' as const },
  { title: 'Toxins', value: 45, trend: -8.2, icon: 'alertTriangle' as const },
];

const chartData = [
  { label: 'Jan', value: 128, status: 'attention' as const },
  { label: 'Feb', value: 125, status: 'good' as const },
  { label: 'Mar', value: 122, status: 'good' as const },
  { label: 'Apr', value: 118, status: 'optimal' as const },
  { label: 'May', value: 115, status: 'optimal' as const },
  { label: 'Jun', value: 117, status: 'optimal' as const },
];

const meta: Meta<typeof Grid> = {
  title: 'Design System/Layouts/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive grid system for organizing dashboard content. Supports auto-fit columns, flexible spacing, and responsive breakpoints.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'auto', 'auto-sm', 'auto-lg'],
      description: 'Number of columns or auto-fit behavior',
    },
    gap: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Gap between grid items',
    },
    rows: {
      control: { type: 'select' },
      options: ['auto', 'equal', 'masonry'],
      description: 'Row behavior',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: 'auto',
    gap: 6,
  },
  render: (args) => (
    <Grid {...args}>
      {healthScores.slice(0, 4).map((score, index) => (
        <GridItem key={index}>
          <ScoreCard
            title={score.title}
            value={score.value}
            trend={score.trend}
            icon={score.icon}
          />
        </GridItem>
      ))}
    </Grid>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography variant="heading-sm" className="mb-4">
          2 Columns (1 on mobile, 2 on tablet+)
        </Typography>
        <Grid columns={2} gap={6}>
          {healthScores.slice(0, 4).map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <Typography variant="heading-sm" className="mb-4">
          3 Columns (1 mobile, 2 tablet, 3 desktop)
        </Typography>
        <Grid columns={3} gap={6}>
          {healthScores.map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <Typography variant="heading-sm" className="mb-4">
          4 Columns (responsive breakpoints)
        </Typography>
        <Grid columns={4} gap={4}>
          {[...healthScores, ...healthScores.slice(0, 2)].map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                size="sm"
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid layouts that adapt to different screen sizes.',
      },
    },
  },
};

export const AutoFitColumns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography variant="heading-sm" className="mb-4">
          Auto-fit (280px minimum)
        </Typography>
        <Grid columns="auto" gap={6}>
          {healthScores.map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <Typography variant="heading-sm" className="mb-4">
          Auto-fit Small (240px minimum)
        </Typography>
        <Grid columns="auto-sm" gap={4}>
          {healthScores.map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                size="sm"
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <Typography variant="heading-sm" className="mb-4">
          Auto-fit Large (320px minimum)
        </Typography>
        <Grid columns="auto-lg" gap={8}>
          {healthScores.slice(0, 4).map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                size="lg"
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Auto-fit grids that automatically determine the number of columns based on available space.',
      },
    },
  },
};

export const GridSpanning: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography variant="heading-sm" className="mb-4">
          Column Spanning
        </Typography>
        <Grid columns={4} gap={6}>
          <GridItem span={2}>
            <Chart
              title="Primary Metric"
              data={chartData}
              variant="line"
              size="md"
            />
          </GridItem>
          <GridItem>
            <ScoreCard
              title="Score 1"
              value={92}
              trend={8.3}
              icon="heart"
            />
          </GridItem>
          <GridItem>
            <ScoreCard
              title="Score 2"
              value={74}
              trend={-2.1}
              icon="activity"
            />
          </GridItem>
          <GridItem span="full">
            <Chart
              title="Full Width Chart"
              data={chartData}
              variant="bar"
              size="md"
            />
          </GridItem>
          <GridItem>
            <ScoreCard title="Score 3" value={58} icon="pulse" />
          </GridItem>
          <GridItem span={3}>
            <div className="bg-neutral-100 rounded-lg p-6 text-center">
              <Typography variant="body-lg" color="muted">
                Content spanning 3 columns
              </Typography>
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid items that span multiple columns for flexible layouts.',
      },
    },
  },
};

export const GapVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography variant="heading-sm" className="mb-4">
          No Gap
        </Typography>
        <Grid columns={4} gap={0}>
          {healthScores.slice(0, 4).map((score, index) => (
            <GridItem key={index}>
              <div className="border border-neutral-200 p-4">
                <Typography variant="body-sm" className="text-center">
                  {score.title}
                </Typography>
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <Typography variant="heading-sm" className="mb-4">
          Small Gap (16px)
        </Typography>
        <Grid columns={3} gap={4}>
          {healthScores.slice(0, 3).map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                size="sm"
                title={score.title}
                value={score.value}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <Typography variant="heading-sm" className="mb-4">
          Large Gap (48px)
        </Typography>
        <Grid columns={2} gap={12}>
          {healthScores.slice(0, 2).map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different gap sizes between grid items.',
      },
    },
  },
};

export const HealthDashboardLayout: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <Grid columns={3} gap={6}>
        <GridItem span={2}>
          <Chart
            title="Health Score Trends"
            subtitle="Your overall wellness progression"
            data={chartData}
            variant="line"
            size="lg"
            trend={12.5}
            icon="trendingUp"
            showGrid
          />
        </GridItem>
        <GridItem>
          <ScoreCard
            title="Overall Health"
            value={89}
            trend={5.2}
            lastUpdate="2 hours ago"
            icon="heart"
            size="lg"
            description="Comprehensive wellness score"
          />
        </GridItem>
      </Grid>

      {/* Core Metrics */}
      <Grid columns="auto" gap={6}>
        {healthScores.map((score, index) => (
          <GridItem key={index}>
            <ScoreCard
              title={score.title}
              value={score.value}
              trend={score.trend}
              icon={score.icon}
              interactive
            />
          </GridItem>
        ))}
      </Grid>

      {/* Analytics Section */}
      <Grid columns={2} gap={8}>
        <GridItem>
          <Chart
            title="Biomarker Status"
            data={[
              { label: 'Vitamin D', value: 85, status: 'optimal' },
              { label: 'B12', value: 72, status: 'good' },
              { label: 'Iron', value: 58, status: 'attention' },
              { label: 'Omega-3', value: 45, status: 'concern' },
            ]}
            variant="bar"
            showLegend
          />
        </GridItem>
        <GridItem>
          <Chart
            title="Recent Readings"
            data={[
              { label: 'Mon', value: 118, timestamp: '8:00 AM' },
              { label: 'Tue', value: 122, timestamp: '10:30 AM' },
              { label: 'Wed', value: 125, timestamp: '1:00 PM' },
              { label: 'Thu', value: 120, timestamp: '4:00 PM' },
              { label: 'Fri', value: 116, timestamp: '8:00 PM' },
            ]}
            variant="trend"
            unit=" mmHg"
          />
        </GridItem>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete health dashboard layout using the grid system.',
      },
    },
  },
};