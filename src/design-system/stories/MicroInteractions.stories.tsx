import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AnimatedScoreCard } from '../molecules/AnimatedScoreCard';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';
import { Loading } from '../atoms/Loading';
import { Grid, GridItem } from '../layouts/Grid';
import { Section } from '../layouts/Section';
import { cn } from '../utils/cn';
import { transitions, hoverScale } from '../utils/animations';

const meta: Meta = {
  title: 'Design System/Micro-interactions',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive showcase of micro-interactions, animations, and transitions throughout the design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
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
    description: 'Metabolic health indicators',
  },
  {
    title: 'Inflammation Status',
    value: 38,
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
    description: 'Comprehensive hormone panel',
  },
];

export const AnimatedCards: Story = {
  render: () => (
    <div className="space-y-8">
      <Section
        title="Animated Score Cards"
        description="Cards animate on mount with staggered delays and value counting"
        variant="default"
      >
        <Grid columns={4} gap={6}>
          {healthScores.map((score, index) => (
            <GridItem key={index}>
              <AnimatedScoreCard
                title={score.title}
                value={score.value}
                trend={score.trend}
                lastUpdate={score.lastUpdate}
                icon={score.icon}
                description={score.description}
                staggerIndex={index}
                enablePulse={score.value < 40}
                interactive
              />
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section
        title="Hover & Scale Effects"
        description="Interactive hover states with smooth scaling"
        variant="default"
      >
        <div className="flex flex-wrap gap-4">
          <div className={cn('p-6 bg-white rounded-lg border border-neutral-200', transitions.base, hoverScale.sm, 'hover:shadow-card-hover')}>
            <Typography variant="body-md">Small Scale (1.02)</Typography>
          </div>
          <div className={cn('p-6 bg-white rounded-lg border border-neutral-200', transitions.base, hoverScale.md, 'hover:shadow-card-hover')}>
            <Typography variant="body-md">Medium Scale (1.05)</Typography>
          </div>
          <div className={cn('p-6 bg-white rounded-lg border border-neutral-200', transitions.base, hoverScale.lg, 'hover:shadow-card-hover')}>
            <Typography variant="body-md">Large Scale (1.1)</Typography>
          </div>
        </div>
      </Section>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8">
      <Section
        title="Loading Animations"
        description="Various loading indicators for different contexts"
        variant="card"
      >
        <div className="space-y-6">
          {/* Spinners */}
          <div>
            <Typography variant="heading-sm" className="mb-4">Spinners</Typography>
            <div className="flex items-center gap-6">
              <Loading variant="spinner" size="xs" />
              <Loading variant="spinner" size="sm" />
              <Loading variant="spinner" size="md" />
              <Loading variant="spinner" size="lg" color="primary" />
              <Loading variant="spinner" size="xl" color="primary" />
            </div>
          </div>

          {/* Dots */}
          <div>
            <Typography variant="heading-sm" className="mb-4">Animated Dots</Typography>
            <div className="flex items-center gap-6">
              <Loading variant="dots" size="sm" />
              <Loading variant="dots" size="md" color="primary" />
              <Loading variant="dots" size="lg" color="muted" />
            </div>
          </div>

          {/* Pulse */}
          <div>
            <Typography variant="heading-sm" className="mb-4">Pulse Effect</Typography>
            <div className="flex items-center gap-6">
              <Loading variant="pulse" size="sm" color="primary" />
              <Loading variant="pulse" size="md" color="primary" />
              <Loading variant="pulse" size="lg" color="primary" />
            </div>
          </div>

          {/* Heartbeat */}
          <div>
            <Typography variant="heading-sm" className="mb-4">Health Heartbeat</Typography>
            <div className="flex items-center gap-6">
              <Loading variant="heartbeat" size="md" color="primary" />
              <Loading variant="heartbeat" size="lg" color="primary" />
            </div>
          </div>

          {/* Skeleton */}
          <div>
            <Typography variant="heading-sm" className="mb-4">Skeleton Loading</Typography>
            <div className="space-y-3">
              <Loading variant="skeleton" className="h-4 w-48 rounded" />
              <Loading variant="skeleton" className="h-4 w-36 rounded" />
              <Loading variant="skeleton" className="h-4 w-40 rounded" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  ),
};

export const ButtonInteractions: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClick = () => {
      setLoading(true);
      setSuccess(false);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }, 1500);
    };

    return (
      <div className="space-y-8">
        <Section
          title="Button Micro-interactions"
          description="Enhanced button states with smooth transitions"
          variant="card"
        >
          <div className="space-y-6">
            {/* Hover Effects */}
            <div>
              <Typography variant="heading-sm" className="mb-4">Hover & Active States</Typography>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Style</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            {/* Loading States */}
            <div>
              <Typography variant="heading-sm" className="mb-4">Loading & Success States</Typography>
              <div className="flex items-center gap-4">
                <Button 
                  variant={success ? 'success' : 'primary'}
                  onClick={handleClick}
                  disabled={loading}
                  className={cn(transitions.colors)}
                >
                  {loading ? (
                    <>
                      <Loading variant="spinner" size="sm" color="white" />
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <Icon name="check" size="sm" />
                      Success!
                    </>
                  ) : (
                    'Submit Data'
                  )}
                </Button>
                
                <Button variant="outline" loading>
                  Saving...
                </Button>
              </div>
            </div>

            {/* Icon Animations */}
            <div>
              <Typography variant="heading-sm" className="mb-4">Icon Transitions</Typography>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" className="group">
                  <span className="transition-transform group-hover:translate-x-[-4px]">Download Report</span>
                  <Icon name="download" size="sm" className="transition-transform group-hover:translate-y-[2px]" />
                </Button>
                
                <Button variant="outline" className="group">
                  Next Step
                  <Icon name="arrowRight" size="sm" className="transition-transform group-hover:translate-x-[4px]" />
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  },
};

export const NotificationAnimations: Story = {
  render: () => {
    const [showNotification, setShowNotification] = useState(false);

    return (
      <div className="space-y-8">
        <Section
          title="Notification & Alert Animations"
          description="Smooth entry and exit animations for notifications"
          variant="default"
        >
          <div className="space-y-6">
            <Button 
              variant="primary" 
              onClick={() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
              }}
            >
              Trigger Notification
            </Button>

            {/* Animated Notifications */}
            <div className="relative h-64">
              {/* Success Notification */}
              <div className={cn(
                'absolute top-0 right-0 bg-optimal-50 border border-optimal-200 rounded-lg p-4 shadow-lg transition-all duration-300',
                showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              )}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Icon name="check" color="success" size="lg" className="animate-scale-in" />
                    <div className="absolute inset-0 bg-optimal-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <div>
                    <Typography variant="body-md" weight="medium">Success!</Typography>
                    <Typography variant="body-sm" color="muted">Your health data has been updated</Typography>
                  </div>
                </div>
              </div>

              {/* Alert Cards */}
              <div className="space-y-4 mt-20">
                <div className="bg-attention-50 border border-attention-200 rounded-lg p-4 animate-slide-in-left">
                  <div className="flex items-center gap-3">
                    <Icon name="alertTriangle" color="warning" className="animate-pulse" />
                    <Typography variant="body-sm">Your vitamin D levels need attention</Typography>
                  </div>
                </div>

                <div className="bg-concern-50 border border-concern-200 rounded-lg p-4 animate-slide-in-left" style={{ animationDelay: '150ms' }}>
                  <div className="flex items-center gap-3">
                    <Icon name="alertCircle" color="danger" className="animate-pulse" />
                    <Typography variant="body-sm">Critical: Schedule immediate consultation</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  },
};

export const BadgeAnimations: Story = {
  render: () => (
    <div className="space-y-8">
      <Section
        title="Badge & Indicator Animations"
        description="Animated badges and status indicators"
        variant="card"
      >
        <div className="space-y-6">
          {/* Animated Status Badges */}
          <div>
            <Typography variant="heading-sm" className="mb-4">Live Status Indicators</Typography>
            <div className="flex flex-wrap gap-4">
              <Badge variant="optimal" dot className="relative">
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-optimal-500 rounded-full animate-ping" />
                Live Monitoring
              </Badge>
              
              <Badge variant="attention" dot>
                <span className="animate-pulse">Updates Available</span>
              </Badge>
              
              <Badge variant="concern" dot>
                <span className="animate-pulse">Action Required</span>
              </Badge>
            </div>
          </div>

          {/* Floating Badges */}
          <div>
            <Typography variant="heading-sm" className="mb-4">Floating Elements</Typography>
            <div className="relative h-32">
              <div className="absolute top-0 left-0 animate-float">
                <Badge variant="primary">New</Badge>
              </div>
              <div className="absolute top-0 left-20 animate-float" style={{ animationDelay: '500ms' }}>
                <Badge variant="success">Updated</Badge>
              </div>
              <div className="absolute top-0 left-44 animate-float" style={{ animationDelay: '1000ms' }}>
                <Badge variant="info">Beta</Badge>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  ),
};

export const TransitionShowcase: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
      <div className="space-y-8">
        <Section
          title="Smooth Transitions"
          description="Tab switching and content transitions"
          variant="default"
        >
          {/* Tab Navigation */}
          <div className="border-b border-neutral-200">
            <div className="flex space-x-8">
              {['Overview', 'Details', 'Analytics'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'py-4 px-1 border-b-2 font-medium transition-all duration-300',
                    activeTab === index
                      ? 'text-primary-600 border-primary-500'
                      : 'text-neutral-500 border-transparent hover:text-neutral-700 hover:border-neutral-300'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content with Transitions */}
          <div className="relative h-48 mt-6">
            {['Overview Content', 'Details Content', 'Analytics Content'].map((content, index) => (
              <div
                key={content}
                className={cn(
                  'absolute inset-0 transition-all duration-300',
                  activeTab === index
                    ? 'opacity-100 translate-x-0'
                    : index < activeTab
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                )}
              >
                <div className="p-6 bg-neutral-50 rounded-lg">
                  <Typography variant="heading-sm">{content}</Typography>
                  <Typography variant="body-md" color="muted" className="mt-2">
                    This content smoothly transitions when switching tabs.
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  },
};

export const CompleteHealthDashboard: Story = {
  render: () => (
    <div className="space-y-8">
      <Section
        title="Complete Dashboard with Micro-interactions"
        subtitle="All animations working together in harmony"
        icon="heart"
        variant="default"
      >
        <Grid columns={4} gap={6}>
          {healthScores.map((score, index) => (
            <GridItem key={index}>
              <AnimatedScoreCard
                title={score.title}
                value={score.value}
                trend={score.trend}
                lastUpdate={score.lastUpdate}
                icon={score.icon}
                description={score.description}
                staggerIndex={index}
                enablePulse={score.value < 40}
                interactive
              />
            </GridItem>
          ))}
        </Grid>

        <div className="mt-8 flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg animate-slide-in-up">
          <div className="flex items-center gap-3">
            <Loading variant="pulse" size="sm" color="primary" />
            <Typography variant="body-md" className="text-primary-900">
              Real-time health monitoring active
            </Typography>
          </div>
          <Button variant="primary" size="sm" className="animate-pulse">
            View Live Data
          </Button>
        </div>
      </Section>
    </div>
  ),
};