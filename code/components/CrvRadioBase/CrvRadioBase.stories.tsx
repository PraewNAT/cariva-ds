'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvRadioBase } from './CrvRadioBase';

const meta: Meta<typeof CrvRadioBase> = {
  title: 'Form/CrvRadioBase',
  component: CrvRadioBase,
  parameters: {
    docs: {
      description: {
        component:
          '16×16 radio control from Figma crv-radio-base (3848:6592) — white fill, ring, inner dot when checked.',
      },
    },
    controls: { include: ['checked', 'disabled'] },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    checked: false,
    disabled: false,
    'aria-label': 'Radio option',
  },
};

export default meta;
type Story = StoryObj<typeof CrvRadioBase>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display:               'grid',
        gridTemplateColumns:     'repeat(2, auto)',
        gap:                     '12px 32px',
        alignItems:              'center',
        justifyContent:          'start',
      }}
    >
      <span style={{ fontSize: 12, color: '#64748b' }}>unchecked / default</span>
      <CrvRadioBase aria-label="Unchecked default" />

      <span style={{ fontSize: 12, color: '#64748b' }}>checked / default</span>
      <CrvRadioBase checked aria-label="Checked default" />

      <span style={{ fontSize: 12, color: '#64748b' }}>unchecked / disabled</span>
      <CrvRadioBase disabled aria-label="Unchecked disabled" />

      <span style={{ fontSize: 12, color: '#64748b' }}>checked / disabled</span>
      <CrvRadioBase checked disabled aria-label="Checked disabled" />
    </div>
  ),
};
