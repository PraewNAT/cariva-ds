'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvInputOtp } from './CrvInputOtp';

const meta: Meta<typeof CrvInputOtp> = {
  title: 'Form/CrvInputOtp',
  component: CrvInputOtp,
  parameters: {
    docs: {
      description: {
        component:
          'OTP / PIN input — 6 slots by default with label and helper or error text.',
      },
    },
    controls: {
      include: [
        'length',
        'label',
        'labelVisible',
        'helperText',
        'helperTextVisible',
        'error',
        'errorMessage',
        'disabled',
        'defaultValue',
      ],
    },
  },
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 } },
    label: { control: 'text' },
    labelVisible: { control: 'boolean' },
    helperText: { control: 'text' },
    helperTextVisible: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultValue: { control: 'text' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onComplete: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
    className: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  args: {
    length: 6,
    label: 'Label',
    labelVisible: true,
    helperText: 'Please enter the one-time password sent to your phone.',
    helperTextVisible: true,
    error: false,
    errorMessage: 'Your one-time password must be 6 characters.',
    disabled: false,
    defaultValue: '',
  },
};

export default meta;
type Story = StoryObj<typeof CrvInputOtp>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: '123456' },
};

export const Error: Story = {
  args: {
    error: true,
    defaultValue: '12345',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '123456',
  },
};

export const FourDigits: Story = {
  args: { length: 4 },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase grid — default / error / disabled',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 420 }}>
      <CrvInputOtp />
      <CrvInputOtp error defaultValue="12345" />
      <CrvInputOtp disabled defaultValue="123456" />
    </div>
  ),
};
