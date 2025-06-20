import type { Meta, StoryObj } from '@storybook/react';
import { Navigation, type NavigationItem } from './Navigation';

// Sample navigation data
const dashboardBreadcrumbs: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { label: 'Health Scores', href: '/scores', icon: 'heart' },
  { label: 'Cardiovascular', href: '/scores/cardiovascular', icon: 'activity' },
  { label: 'Blood Pressure', icon: 'pulse' },
];

const healthTabs: NavigationItem[] = [
  { label: 'Overview', active: true, icon: 'heart', badge: '12' },
  { label: 'Biomarkers', href: '/biomarkers', icon: 'activity', badge: '75' },
  { label: 'Trends', href: '/trends', icon: 'trendingUp' },
  { label: 'Reports', href: '/reports', icon: 'barChart', badge: '3' },
  { label: 'Settings', href: '/settings', icon: 'settings', disabled: true },
];

const viewTabs: NavigationItem[] = [
  { label: 'List View', active: true, icon: 'menu' },
  { label: 'Chart View', href: '/chart', icon: 'barChart' },
  { label: 'Calendar', href: '/calendar', icon: 'calendar' },
];

const sidebarItems: NavigationItem[] = [
  { label: 'Health Scores', active: true, icon: 'heart', badge: '12' },
  { label: 'Biomarkers', href: '/biomarkers', icon: 'activity', badge: '75' },
  { label: 'Lab Results', href: '/labs', icon: 'pulse', badge: '8' },
  { label: 'Trends & Analytics', href: '/trends', icon: 'trendingUp' },
  { label: 'Health Goals', href: '/goals', icon: 'check' },
  { label: 'Appointments', href: '/appointments', icon: 'calendar', badge: '2' },
  { label: 'Reports', href: '/reports', icon: 'barChart' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
];

const meta: Meta<typeof Navigation> = {
  title: 'Design System/Molecules/Navigation',
  component: Navigation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile navigation component supporting breadcrumbs, tabs, pills, and sidebar layouts. Perfect for health dashboard navigation patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['breadcrumb', 'tabs', 'pills', 'sidebar'],
      description: 'Navigation style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Navigation size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'breadcrumb',
    items: dashboardBreadcrumbs,
  },
};

export const Breadcrumbs: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Simple Breadcrumb</h3>
        <Navigation
          variant="breadcrumb"
          items={[
            { label: 'Dashboard', onClick: () => console.log('Dashboard') },
            { label: 'Health Scores', onClick: () => console.log('Health Scores') },
            { label: 'Cardiovascular' },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">With Icons</h3>
        <Navigation
          variant="breadcrumb"
          items={dashboardBreadcrumbs}
          onItemClick={(item, index) => console.log('Clicked:', item.label, 'at index:', index)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Deep Navigation</h3>
        <Navigation
          variant="breadcrumb"
          items={[
            { label: 'Dashboard', href: '/', icon: 'home' },
            { label: 'Health Scores', href: '/scores', icon: 'heart' },
            { label: 'Cardiovascular', href: '/scores/cardiovascular', icon: 'activity' },
            { label: 'Components', href: '/scores/cardiovascular/components', icon: 'pulse' },
            { label: 'Blood Pressure', href: '/scores/cardiovascular/components/bp', icon: 'heart' },
            { label: 'Systolic Readings' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb navigation for hierarchical health data navigation.',
      },
    },
  },
};

export const Tabs: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-3">Health Dashboard Tabs</h3>
        <Navigation
          variant="tabs"
          items={healthTabs}
          onItemClick={(item) => console.log('Tab clicked:', item.label)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Simple Tabs</h3>
        <Navigation
          variant="tabs"
          items={[
            { label: 'Current Results', active: true },
            { label: 'Historical Data' },
            { label: 'Trends' },
            { label: 'Comparisons' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation for switching between different views or sections.',
      },
    },
  },
};

export const Pills: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-3">View Switcher</h3>
        <Navigation
          variant="pills"
          items={viewTabs}
          onItemClick={(item) => console.log('View changed:', item.label)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Filter Pills</h3>
        <Navigation
          variant="pills"
          items={[
            { label: 'All Biomarkers', active: true, badge: '75' },
            { label: 'Optimal', badge: '45' },
            { label: 'Attention', badge: '20' },
            { label: 'Concern', badge: '10' },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Time Range</h3>
        <Navigation
          variant="pills"
          items={[
            { label: '7 Days' },
            { label: '30 Days', active: true },
            { label: '3 Months' },
            { label: '1 Year' },
            { label: 'All Time' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pill-style navigation for compact option selection.',
      },
    },
  },
};

export const Sidebar: Story = {
  render: () => (
    <div className="max-w-sm">
      <h3 className="text-lg font-medium mb-3">Health Dashboard Sidebar</h3>
      <Navigation
        variant="sidebar"
        items={sidebarItems}
        onItemClick={(item) => console.log('Sidebar item:', item.label)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar navigation for main app navigation.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-3">Small Size</h3>
        <Navigation
          variant="breadcrumb"
          size="sm"
          items={dashboardBreadcrumbs}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Medium Size (Default)</h3>
        <Navigation
          variant="breadcrumb"
          size="md"
          items={dashboardBreadcrumbs}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Large Size</h3>
        <Navigation
          variant="breadcrumb"
          size="lg"
          items={dashboardBreadcrumbs}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation components in different sizes.',
      },
    },
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-3">With Disabled Items</h3>
        <Navigation
          variant="tabs"
          items={[
            { label: 'Available', active: true },
            { label: 'Processing', disabled: true },
            { label: 'Coming Soon', disabled: true },
            { label: 'Settings' },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Sidebar with Badges</h3>
        <div className="max-w-sm">
          <Navigation
            variant="sidebar"
            items={[
              { label: 'Overview', active: true, icon: 'home' },
              { label: 'Alerts', icon: 'alertTriangle', badge: '3' },
              { label: 'Pending Tests', icon: 'clock', badge: '5' },
              { label: 'Completed', icon: 'check', badge: '12' },
              { label: 'Archived', icon: 'archive', disabled: true },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation with interactive states like disabled items and notification badges.',
      },
    },
  },
};

export const HealthWorkflow: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-3">Assessment Flow</h3>
        <Navigation
          variant="breadcrumb"
          items={[
            { label: 'Health Assessment', icon: 'heart' },
            { label: 'Cardiovascular', icon: 'activity' },
            { label: 'Blood Pressure Analysis', icon: 'pulse' },
            { label: 'Detailed Results' },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Report Sections</h3>
        <Navigation
          variant="tabs"
          items={[
            { label: 'Executive Summary', active: true, icon: 'barChart' },
            { label: 'Detailed Metrics', icon: 'activity', badge: '12' },
            { label: 'Trends Analysis', icon: 'trendingUp' },
            { label: 'Recommendations', icon: 'check', badge: '8' },
            { label: 'Action Plan', icon: 'calendar' },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Biomarker Filters</h3>
        <Navigation
          variant="pills"
          items={[
            { label: 'All Results', active: true, badge: '75' },
            { label: 'Cardiovascular', badge: '12' },
            { label: 'Metabolic', badge: '18' },
            { label: 'Hormonal', badge: '15' },
            { label: 'Nutritional', badge: '22' },
            { label: 'Inflammatory', badge: '8' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world health dashboard navigation patterns and workflows.',
      },
    },
  },
};