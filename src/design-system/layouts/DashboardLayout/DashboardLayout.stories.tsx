import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { Grid, GridItem } from '../Grid';
import { Section } from '../Section';
import { ScoreCard } from '../../molecules/ScoreCard';
import { Chart } from '../../molecules/Chart/Chart';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';
import { useState } from 'react';

// Sample data
const sidebarItems = [
  { label: 'Overview', active: true, icon: 'heart' as const, href: '/overview' },
  { label: 'Health Scores', icon: 'activity' as const, badge: '12', href: '/scores' },
  { label: 'Biomarkers', icon: 'pulse' as const, badge: '75', href: '/biomarkers' },
  { label: 'Lab Results', icon: 'barChart' as const, badge: '8', href: '/labs' },
  { label: 'Trends & Analytics', icon: 'trendingUp' as const, href: '/trends' },
  { label: 'Health Goals', icon: 'check' as const, href: '/goals' },
  { label: 'Appointments', icon: 'calendar' as const, badge: '2', href: '/appointments' },
  { label: 'Reports', icon: 'pieChart' as const, href: '/reports' },
  { label: 'Settings', icon: 'settings' as const, href: '/settings' },
];

const breadcrumbs = [
  { label: 'Dashboard', href: '/dashboard', icon: 'home' as const },
  { label: 'Health Scores', href: '/scores', icon: 'heart' as const },
  { label: 'Cardiovascular Health' },
];

const healthScores = [
  {
    title: 'Cardiovascular Health',
    value: 92,
    trend: 8.3,
    lastUpdate: '2 hours ago',
    icon: 'heart' as const,
    description: 'Overall cardiovascular system performance',
  },
  {
    title: 'Metabolic Function',
    value: 74,
    trend: -2.1,
    lastUpdate: '4 hours ago',
    icon: 'activity' as const,
    description: 'Metabolic health indicators and glucose control',
  },
  {
    title: 'Inflammation Status',
    value: 58,
    trend: -5.7,
    lastUpdate: '1 day ago',
    icon: 'pulse' as const,
    description: 'Inflammatory markers and immune response',
  },
  {
    title: 'Hormone Balance',
    value: 87,
    trend: 12.4,
    lastUpdate: '6 hours ago',
    icon: 'brain' as const,
    description: 'Comprehensive hormone panel analysis',
  },
];

const chartData = [
  { label: 'Jan', value: 128, status: 'attention' as const },
  { label: 'Feb', value: 125, status: 'good' as const },
  { label: 'Mar', value: 122, status: 'good' as const },
  { label: 'Apr', value: 118, status: 'optimal' as const },
  { label: 'May', value: 115, status: 'optimal' as const },
  { label: 'Jun', value: 117, status: 'optimal' as const },
];

const meta: Meta<typeof DashboardLayout> = {
  title: 'Design System/Layouts/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive dashboard layout component with sidebar navigation, header, and responsive content areas. Perfect for health dashboard applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'fullscreen', 'compact'],
      description: 'Layout variant',
    },
    sidebar: {
      control: { type: 'select' },
      options: ['none', 'left', 'right'],
      description: 'Sidebar position',
    },
    headerVariant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'minimal'],
      description: 'Header style variant',
    },
    contentPadding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Content area padding',
    },
    contentMaxWidth: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Content max width constraint',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    return (
      <DashboardLayout
        title="Health Dashboard"
        subtitle="Your comprehensive wellness overview"
        headerIcon="heart"
        breadcrumbs={breadcrumbs}
        sidebarItems={sidebarItems}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        headerActions={
          <div className="flex items-center gap-3">
            <Badge variant="success" size="sm">
              All Systems Optimal
            </Badge>
            <Button variant="primary" size="sm">
              Schedule Assessment
            </Button>
          </div>
        }
      >
        <div className="space-y-8">
          {/* Health Scores Section */}
          <Section
            title="Core Health Scores"
            description="Your primary health indicators and overall wellness metrics"
            icon="heart"
            variant="default"
            actionText="View All Scores"
            onActionClick={() => console.log('View all scores')}
          >
            <Grid columns={4} gap={6}>
              {healthScores.map((score, index) => (
                <GridItem key={index}>
                  <ScoreCard
                    title={score.title}
                    value={score.value}
                    trend={score.trend}
                    lastUpdate={score.lastUpdate}
                    icon={score.icon}
                    description={score.description}
                    interactive
                  />
                </GridItem>
              ))}
            </Grid>
          </Section>

          {/* Charts Section */}
          <Section
            title="Trend Analysis"
            description="Detailed progression tracking and historical insights"
            icon="trendingUp"
            variant="default"
          >
            <Grid columns={2} gap={6}>
              <GridItem>
                <Chart
                  title="Blood Pressure Progress"
                  subtitle="6-month improvement trend"
                  data={chartData}
                  unit=" mmHg"
                  icon="heart"
                  trend={-10.2}
                  variant="line"
                  showLegend
                />
              </GridItem>
              <GridItem>
                <Chart
                  title="Biomarker Status"
                  subtitle="Current health indicators"
                  data={[
                    { label: 'Vitamin D', value: 85, status: 'optimal' },
                    { label: 'B12', value: 72, status: 'good' },
                    { label: 'Iron', value: 58, status: 'attention' },
                    { label: 'Omega-3', value: 45, status: 'concern' },
                  ]}
                  unit="%"
                  icon="activity"
                  variant="bar"
                  showLegend
                />
              </GridItem>
            </Grid>
          </Section>

          {/* Recent Activity */}
          <Section
            title="Recent Activity"
            subtitle="Latest updates and notifications"
            variant="card"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-optimal-50 border border-optimal-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="check" color="success" />
                  <div>
                    <p className="font-medium text-optimal-900">Lab Results Available</p>
                    <p className="text-sm text-optimal-700">Your latest blood panel shows excellent progress</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Results</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-attention-50 border border-attention-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="calendar" color="warning" />
                  <div>
                    <p className="font-medium text-attention-900">Upcoming Appointment</p>
                    <p className="text-sm text-attention-700">Health consultation scheduled for tomorrow at 2:00 PM</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Reschedule</Button>
              </div>
            </div>
          </Section>
        </div>
      </DashboardLayout>
    );
  },
};

export const CompactLayout: Story = {
  render: () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    return (
      <DashboardLayout
        variant="compact"
        title="Health Metrics"
        headerVariant="compact"
        sidebarItems={sidebarItems.slice(0, 5)}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        contentPadding="sm"
        headerActions={
          <Button variant="primary" size="sm">
            <Icon name="plus" size="sm" />
            Add Metric
          </Button>
        }
      >
        <Grid columns={3} gap={4}>
          {healthScores.slice(0, 3).map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                size="sm"
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
                interactive
              />
            </GridItem>
          ))}
        </Grid>
      </DashboardLayout>
    );
  },
};

export const NoSidebar: Story = {
  render: () => (
    <DashboardLayout
      sidebar="none"
      title="Health Report"
      subtitle="Comprehensive wellness analysis"
      headerIcon="barChart"
      breadcrumbs={breadcrumbs}
      contentMaxWidth="md"
      headerActions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export PDF
          </Button>
          <Button variant="primary" size="sm">
            Share Report
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        <Section
          title="Executive Summary"
          variant="card"
          description="Your overall health status and key recommendations"
        >
          <div className="grid grid-cols-2 gap-6">
            <ScoreCard
              title="Overall Health Score"
              value={89}
              trend={5.2}
              size="lg"
              interactive
            />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="optimal" dot>Excellent Progress</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="attention" dot>3 Areas for Improvement</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success" dot>Goals on Track</Badge>
              </div>
            </div>
          </div>
        </Section>

        <Section
          title="Detailed Analysis"
          variant="default"
        >
          <Chart
            title="Health Score Trends"
            subtitle="12-month progression overview"
            data={chartData}
            variant="line"
            size="lg"
            showGrid
            showLegend
          />
        </Section>
      </div>
    </DashboardLayout>
  ),
};

export const RightSidebar: Story = {
  render: () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    return (
      <DashboardLayout
        sidebar="right"
        title="Analytics Dashboard"
        sidebarItems={[
          { label: 'Quick Actions', icon: 'menu' as const },
          { label: 'Schedule Test', icon: 'calendar' as const },
          { label: 'Contact Doctor', icon: 'user' as const },
          { label: 'Export Data', icon: 'download' as const },
          { label: 'Share Results', icon: 'externalLink' as const },
        ]}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      >
        <Section title="Main Content Area">
          <Grid columns={2} gap={6}>
            <GridItem span="full">
              <Chart
                title="Primary Health Metrics"
                data={chartData}
                variant="line"
                size="lg"
              />
            </GridItem>
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
        </Section>
      </DashboardLayout>
    );
  },
};

export const FullScreenMode: Story = {
  render: () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    return (
      <DashboardLayout
        variant="fullscreen"
        title="Health Analytics"
        headerVariant="minimal"
        sidebarItems={sidebarItems}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        contentPadding="lg"
        contentMaxWidth="full"
      >
        <Grid columns={6} gap={6}>
          <GridItem span={2}>
            <ScoreCard
              title="Overall Health"
              value={89}
              trend={5.2}
              size="lg"
            />
          </GridItem>
          <GridItem span={4}>
            <Chart
              title="Health Trends"
              data={chartData}
              variant="line"
              size="lg"
            />
          </GridItem>
          {healthScores.map((score, index) => (
            <GridItem key={index}>
              <ScoreCard
                title={score.title}
                value={score.value}
                trend={score.trend}
                icon={score.icon}
                size="sm"
              />
            </GridItem>
          ))}
        </Grid>
      </DashboardLayout>
    );
  },
};