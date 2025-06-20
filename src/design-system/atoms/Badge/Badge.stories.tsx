import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Icon } from '../Icon';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile badge component for status indicators, labels, and tags. Supports health-specific variants and includes interactive features like removal.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default', 'primary', 'secondary',
        'optimal', 'good', 'attention', 'concern',
        'success', 'warning', 'danger', 'info',
        'outline', 'ghost', 'filled'
      ],
      description: 'Visual style variant of the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the badge',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Show status dot indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="filled">Filled</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic badge variants for general use.',
      },
    },
  },
};

export const HealthStatus: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="optimal">Optimal</Badge>
      <Badge variant="good">Good</Badge>
      <Badge variant="attention">Needs Attention</Badge>
      <Badge variant="concern">Concern</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Health-specific status badges with semantic colors.',
      },
    },
  },
};

export const Semantic: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic badges for general status communication.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">Extra Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available badge sizes from small to extra large.',
      },
    },
  },
};

export const WithDots: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="optimal" dot>Optimal Range</Badge>
      <Badge variant="good" dot>Good Progress</Badge>
      <Badge variant="attention" dot>Needs Review</Badge>
      <Badge variant="concern" dot>Critical Alert</Badge>
      <Badge variant="primary" dot>Active</Badge>
      <Badge variant="secondary" dot>Pending</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with status dots for enhanced visual indication.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="optimal" icon={<Icon name="check" size="xs" color="inherit" />}>
        Complete
      </Badge>
      <Badge variant="attention" icon={<Icon name="alertTriangle" size="xs" color="inherit" />}>
        Warning
      </Badge>
      <Badge variant="concern" icon={<Icon name="alertCircle" size="xs" color="inherit" />}>
        Error
      </Badge>
      <Badge variant="info" icon={<Icon name="info" size="xs" color="inherit" />}>
        Information
      </Badge>
      <Badge variant="primary" icon={<Icon name="heart" size="xs" color="inherit" />}>
        Health Score
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges enhanced with icons for better context.',
      },
    },
  },
};

export const Removable: Story = {
  render: () => {
    const handleRemove = (label: string) => {
      console.log(`Removing ${label} badge`);
    };

    return (
      <div className="flex flex-wrap gap-3">
        <Badge variant="primary" onRemove={() => handleRemove('Filter')}>
          Blood Pressure
        </Badge>
        <Badge variant="secondary" onRemove={() => handleRemove('Tag')}>
          Last 30 Days
        </Badge>
        <Badge variant="outline" onRemove={() => handleRemove('Category')}>
          Cardiovascular
        </Badge>
        <Badge variant="optimal" onRemove={() => handleRemove('Status')}>
          Trending Up
        </Badge>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges with remove functionality for filters and tags.',
      },
    },
  },
};

export const HealthMetrics: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700">Biomarker Status</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="optimal" dot size="sm">Cholesterol</Badge>
          <Badge variant="good" dot size="sm">Blood Sugar</Badge>
          <Badge variant="attention" dot size="sm">Blood Pressure</Badge>
          <Badge variant="concern" dot size="sm">Inflammation</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700">Test Results</h3>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="optimal" 
            icon={<Icon name="check" size="xs" color="inherit" />}
            size="sm"
          >
            Complete Blood Count
          </Badge>
          <Badge 
            variant="optimal" 
            icon={<Icon name="check" size="xs" color="inherit" />}
            size="sm"
          >
            Lipid Panel
          </Badge>
          <Badge 
            variant="attention" 
            icon={<Icon name="clock" size="xs" color="inherit" />}
            size="sm"
          >
            Thyroid Function
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world health dashboard examples showing badge usage.',
      },
    },
  },
};

export const ComponentStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700">Data Availability</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="optimal">75 Components Available</Badge>
          <Badge variant="attention">15 Components Partial</Badge>
          <Badge variant="secondary">5 Components Missing</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700">Update Status</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" dot>Recently Updated</Badge>
          <Badge variant="warning" dot>Update Available</Badge>
          <Badge variant="info" dot>Scheduled</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700">Active Filters</h3>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="outline" 
            onRemove={() => console.log('Remove filter')}
          >
            Last 3 Months
          </Badge>
          <Badge 
            variant="outline" 
            onRemove={() => console.log('Remove filter')}
          >
            Cardiovascular
          </Badge>
          <Badge 
            variant="outline" 
            onRemove={() => console.log('Remove filter')}
          >
            Trending Down
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Component state indicators and filter management.',
      },
    },
  },
};

export const TrendIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700">Score Trends</h3>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="optimal" 
            icon={<Icon name="trendingUp" size="xs" color="inherit" />}
            size="sm"
          >
            +15% Improvement
          </Badge>
          <Badge 
            variant="good" 
            icon={<Icon name="trendingUp" size="xs" color="inherit" />}
            size="sm"
          >
            +8% Progress
          </Badge>
          <Badge 
            variant="secondary" 
            icon={<Icon name="minus" size="xs" color="inherit" />}
            size="sm"
          >
            No Change
          </Badge>
          <Badge 
            variant="concern" 
            icon={<Icon name="trendingDown" size="xs" color="inherit" />}
            size="sm"
          >
            -5% Decline
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trend indicators for health metrics and scores.',
      },
    },
  },
};