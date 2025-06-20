import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated button component matching Next Health\'s design aesthetic. Built with Montserrat typography and premium color palette.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'success', 'warning', 'danger'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg', 'xl', 'icon'],
      description: 'Size of the button',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button should take full width',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading spinner',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Schedule Assessment',
    variant: 'primary',
    size: 'base',
  },
};

export const Secondary: Story = {
  args: {
    children: 'View Details',
    variant: 'secondary',
    size: 'base',
  },
};

export const Outline: Story = {
  args: {
    children: 'Learn More',
    variant: 'outline',
    size: 'base',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Cancel',
    variant: 'ghost',
    size: 'base',
  },
};

export const Success: Story = {
  args: {
    children: 'Mark Complete',
    variant: 'success',
    size: 'base',
  },
};

export const Warning: Story = {
  args: {
    children: 'Needs Attention',
    variant: 'warning',
    size: 'base',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete Data',
    variant: 'danger',
    size: 'base',
  },
};

export const Loading: Story = {
  args: {
    children: 'Processing...',
    variant: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    variant: 'primary',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="base">Base</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'Schedule Your Next Assessment',
    variant: 'primary',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};