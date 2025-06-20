import type { Meta, StoryObj } from '@storybook/react';
import { Icon, iconPaths, type IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Design System/Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive icon system optimized for health and wellness applications. Features health-specific icons with consistent styling and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(iconPaths),
      description: 'Icon name from the available icon set',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size of the icon',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'subtle', 'primary', 'success', 'warning', 'danger', 'white', 'inherit'],
      description: 'Color variant of the icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'heart',
    size: 'md',
    color: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" size="xs" />
      <Icon name="heart" size="sm" />
      <Icon name="heart" size="md" />
      <Icon name="heart" size="lg" />
      <Icon name="heart" size="xl" />
      <Icon name="heart" size="2xl" />
      <Icon name="heart" size="3xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available icon sizes from extra-small (12px) to 3xl (48px).',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="activity" color="default" size="lg" />
      <Icon name="activity" color="muted" size="lg" />
      <Icon name="activity" color="subtle" size="lg" />
      <Icon name="activity" color="primary" size="lg" />
      <Icon name="activity" color="success" size="lg" />
      <Icon name="activity" color="warning" size="lg" />
      <Icon name="activity" color="danger" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color variants matching the design system palette.',
      },
    },
  },
};

export const HealthIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-4">
      {(['heart', 'activity', 'pulse', 'brain', 'blood'] as IconName[]).map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-2">
          <Icon name={iconName} size="xl" color="primary" />
          <span className="text-xs text-neutral-600 capitalize">{iconName}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Health and wellness specific icons designed for medical dashboards.',
      },
    },
  },
};

export const NavigationIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-4">
      {(['chevronRight', 'chevronLeft', 'chevronDown', 'chevronUp', 'arrowRight', 'arrowLeft'] as IconName[]).map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-2">
          <Icon name={iconName} size="lg" />
          <span className="text-xs text-neutral-600 text-center">{iconName.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation icons for directional controls and interface movement.',
      },
    },
  },
};

export const ActionIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-4">
      {(['plus', 'minus', 'check', 'x', 'edit', 'trash'] as IconName[]).map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-2">
          <Icon 
            name={iconName} 
            size="lg" 
            color={iconName === 'check' ? 'success' : iconName === 'trash' ? 'danger' : 'default'} 
          />
          <span className="text-xs text-neutral-600 capitalize">{iconName}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Action icons for user interactions and form controls.',
      },
    },
  },
};

export const StatusIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 p-4">
      {(['info', 'alertTriangle', 'alertCircle', 'check'] as IconName[]).map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-2">
          <Icon 
            name={iconName} 
            size="lg" 
            color={
              iconName === 'check' ? 'success' : 
              iconName === 'alertTriangle' ? 'warning' : 
              iconName === 'alertCircle' ? 'danger' : 
              'primary'
            } 
          />
          <span className="text-xs text-neutral-600 text-center">{iconName.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status and notification icons with semantic colors.',
      },
    },
  },
};

export const DataIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 p-4">
      {(['trendingUp', 'trendingDown', 'barChart', 'pieChart'] as IconName[]).map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-2">
          <Icon 
            name={iconName} 
            size="lg" 
            color={iconName === 'trendingUp' ? 'success' : iconName === 'trendingDown' ? 'danger' : 'primary'} 
          />
          <span className="text-xs text-neutral-600 text-center">{iconName.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Data visualization and analytics icons.',
      },
    },
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-4 p-4 max-w-4xl">
      {(Object.keys(iconPaths) as IconName[]).map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-2 p-2 hover:bg-neutral-50 rounded">
          <Icon name={iconName} size="lg" />
          <span className="text-xs text-neutral-600 text-center leading-tight">
            {iconName.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete icon library showing all available icons.',
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon name="heart" color="danger" />
        <span>Cardiovascular Health</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="activity" color="success" />
        <span>Activity Level</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="brain" color="primary" />
        <span>Cognitive Function</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="trendingUp" color="success" />
        <span>Improving Trends</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons combined with text for interface elements.',
      },
    },
  },
};

export const InButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
        <Icon name="plus" size="sm" color="inherit" />
        Add Biomarker
      </button>
      <button className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-md hover:bg-neutral-50">
        <Icon name="download" size="sm" />
        Export Data
      </button>
      <button className="inline-flex items-center gap-2 px-4 py-2 text-danger-500 hover:bg-danger-50 rounded-md">
        <Icon name="trash" size="sm" color="inherit" />
        Delete
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons integrated into button components.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon name="info" color="primary" aria-label="Information" />
        <span>Icon with aria-label for screen readers</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="alertTriangle" color="warning" />
        <span>Decorative icon (aria-hidden by default)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including aria-label support.',
      },
    },
  },
};