import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Design System/Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A sophisticated typography system combining Montserrat and Libre Baskerville fonts, designed to match Next Health\'s premium aesthetic with comprehensive variant support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'display-xl', 'display-lg', 'display-md', 'display-sm',
        'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs',
        'body-lg', 'body-md', 'body-sm', 'body-xs',
        'label-lg', 'label-md', 'label-sm',
        'caption', 'overline'
      ],
      description: 'Typography variant defining size, weight, and font family',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'subtle', 'primary', 'success', 'warning', 'danger', 'white'],
      description: 'Text color variant',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
    as: {
      control: { type: 'text' },
      description: 'HTML element or component to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is the default body text using Montserrat font with optimal readability.',
  },
};

export const DisplayHierarchy: Story = {
  render: () => (
    <div className="space-y-6">
      <Typography variant="display-xl">Display XL - Premium Heading</Typography>
      <Typography variant="display-lg">Display Large - Hero Section</Typography>
      <Typography variant="display-md">Display Medium - Page Title</Typography>
      <Typography variant="display-sm">Display Small - Section Header</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Display typography uses Libre Baskerville serif font for elegant, attention-grabbing headings.',
      },
    },
  },
};

export const HeadingHierarchy: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="heading-xl">Heading XL - Main Section</Typography>
      <Typography variant="heading-lg">Heading Large - Subsection</Typography>
      <Typography variant="heading-md">Heading Medium - Component Title</Typography>
      <Typography variant="heading-sm">Heading Small - Card Header</Typography>
      <Typography variant="heading-xs">Heading XS - Detail Header</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Heading typography uses Montserrat sans-serif for clear, modern hierarchy.',
      },
    },
  },
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="body-lg">
        Large body text provides excellent readability for important content and detailed explanations. 
        Perfect for introductory paragraphs and key information.
      </Typography>
      <Typography variant="body-md">
        Medium body text is the standard for most content. It offers the optimal balance between 
        readability and information density for dashboard interfaces.
      </Typography>
      <Typography variant="body-sm">
        Small body text works well for supporting information, captions, and secondary content 
        that doesn't require primary attention.
      </Typography>
      <Typography variant="body-xs">
        Extra small body text is ideal for footnotes, fine print, and metadata that needs to be 
        present but not prominent.
      </Typography>
    </div>
  ),
};

export const LabelsAndUI: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Typography variant="label-lg" className="mb-2">Section Label</Typography>
        <Typography variant="body-md">Content following a large label</Typography>
      </div>
      <div>
        <Typography variant="label-md" className="mb-2">Form Field Label</Typography>
        <Typography variant="body-sm">Content with medium label</Typography>
      </div>
      <div>
        <Typography variant="label-sm" className="mb-1">Compact Label</Typography>
        <Typography variant="body-xs">Content with small label</Typography>
      </div>
    </div>
  ),
};

export const UtilityText: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Typography variant="overline">Data Source</Typography>
        <Typography variant="body-md">Primary content with overline label</Typography>
      </div>
      <div>
        <Typography variant="body-md">Main content with additional context</Typography>
        <Typography variant="caption">Supporting caption text providing extra detail</Typography>
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <Typography color="default">Default text color (neutral-900)</Typography>
      <Typography color="muted">Muted text color (neutral-600)</Typography>
      <Typography color="subtle">Subtle text color (neutral-500)</Typography>
      <Typography color="primary">Primary brand color</Typography>
      <Typography color="success">Success state color</Typography>
      <Typography color="warning">Warning state color</Typography>
      <Typography color="danger">Danger state color</Typography>
      <div className="bg-neutral-900 p-4 rounded">
        <Typography color="white">White text on dark background</Typography>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography align="left">Left aligned text (default)</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify" className="max-w-lg">
        Justified text spreads content evenly across the full width, creating clean edges on both sides. 
        This works best with longer content that can fill multiple lines effectively.
      </Typography>
    </div>
  ),
};

export const WeightOverrides: Story = {
  render: () => (
    <div className="space-y-3">
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="heading-lg" as="h1">H1 with heading-lg styling</Typography>
      <Typography variant="body-md" as="div">Div with body styling</Typography>
      <Typography variant="label-md" as="span">Span with label styling</Typography>
      <Typography variant="caption" as="figcaption">Figcaption with caption styling</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `as` prop to render different HTML elements while maintaining visual styling.',
      },
    },
  },
};

export const HealthDashboardExample: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <Typography variant="display-md" color="primary">
        Your Health Overview
      </Typography>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Typography variant="heading-sm">Cardiovascular Health</Typography>
          <Typography variant="body-md" color="muted">
            Your cardiovascular metrics show excellent progress with consistent improvement 
            over the past three months.
          </Typography>
          <Typography variant="caption">Last updated 2 hours ago</Typography>
        </div>
        
        <div className="space-y-3">
          <Typography variant="heading-sm">Metabolic Function</Typography>
          <Typography variant="body-md" color="muted">
            Metabolic indicators are within optimal ranges, supporting sustained energy 
            and wellness goals.
          </Typography>
          <Typography variant="caption">Last updated 2 hours ago</Typography>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <Typography variant="overline">Quick Actions</Typography>
        <div className="mt-2 space-y-2">
          <Typography variant="label-md">Schedule Assessment</Typography>
          <Typography variant="label-md">View Detailed Report</Typography>
          <Typography variant="label-md">Contact Health Coach</Typography>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing how typography components work together in a health dashboard context.',
      },
    },
  },
};