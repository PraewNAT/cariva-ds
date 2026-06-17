'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvInputOtpBase } from './CrvInputOtpBase';

const meta: Meta<typeof CrvInputOtpBase> = {
  title: 'Form/CrvInputOtpBase',
  component: CrvInputOtpBase,
  parameters: {
    docs: {
      description: {
        component: 'Single OTP slot — 40×40, radius/12, focus ring via CSS.',
      },
    },
    controls: { include: ['value', 'disabled'] },
  },
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    value: '',
    disabled: false,
    'aria-label': 'OTP digit',
  },
};

export default meta;
type Story = StoryObj<typeof CrvInputOtpBase>;

export const Default: Story = {};

export const Filled: Story = {
  args: { value: '1' },
};

export const Disabled: Story = {
  args: { value: '1', disabled: true },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <CrvInputOtpBase aria-label="Empty slot" />
      <CrvInputOtpBase value="1" aria-label="Filled slot" />
      <CrvInputOtpBase value="1" disabled aria-label="Disabled slot" />
    </div>
  ),
};
