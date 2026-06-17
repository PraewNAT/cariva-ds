'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvToast } from './CrvToast';
import type { CrvToastSeverity, CrvToastVariant } from './CrvToast.types';

const VARIANTS: CrvToastVariant[] = ['primary', 'secondary'];
const SEVERITIES: CrvToastSeverity[] = ['error', 'info', 'success', 'warning'];

const meta: Meta<typeof CrvToast> = {
  title: 'Feedback/CrvToast',
  component: CrvToast,
  parameters: {
    docs: {
      description: {
        component:
          'Toast banner for feedback messages. Maps to Figma crv-alert-standard node 4165:5387.',
      },
    },
    controls: {
      include: ['variant', 'severity', 'showAction', 'children'],
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS },
    severity: { control: 'inline-radio', options: SEVERITIES },
    showAction: { control: 'boolean' },
    children: { control: 'text' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
    onClose: { table: { disable: true } },
    actionIcon: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    severity: 'error',
    showAction: true,
    children: 'Something went wrong. Please try again.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrvToast>;

export const Playground: Story = {};

export const Primary: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {SEVERITIES.map((severity) => (
        <CrvToast key={severity} variant="primary" severity={severity}>
          {`${severity.charAt(0).toUpperCase()}${severity.slice(1)} toast message`}
        </CrvToast>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Secondary: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {SEVERITIES.map((severity) => (
        <CrvToast key={severity} variant="secondary" severity={severity}>
          {`${severity.charAt(0).toUpperCase()}${severity.slice(1)} toast message`}
        </CrvToast>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const WithoutAction: Story = {
  args: {
    showAction: false,
    severity: 'info',
    variant: 'secondary',
    children: 'Read-only toast without a dismiss action.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: 12 }}>
          <strong style={{ textTransform: 'capitalize' }}>{variant}</strong>
          {SEVERITIES.map((severity) => (
            <CrvToast key={`${variant}-${severity}`} variant={variant} severity={severity}>
              {`${severity} — ${variant}`}
            </CrvToast>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
