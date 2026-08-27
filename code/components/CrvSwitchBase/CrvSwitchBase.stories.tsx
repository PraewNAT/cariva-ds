'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CrvSwitchBase } from './CrvSwitchBase';
import type { CrvSwitchBaseProps } from './CrvSwitchBase.types';

function InteractiveSwitch(props: CrvSwitchBaseProps) {
  const [checked, setChecked] = useState(props.checked ?? props.defaultChecked ?? false);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <CrvSwitchBase
      {...props}
      checked={checked}
      onChange={(_, value) => setChecked(value)}
    />
  );
}

const meta: Meta<typeof CrvSwitchBase> = {
  title: 'Form/CrvSwitchBase',
  component: CrvSwitchBase,
  parameters: {
    docs: {
      description: {
        component:
          'Toggle control from Figma crv-switch-base (3875:1752) — medium 44×24, small 36×20. Click to toggle in stories.',
      },
    },
    controls: { include: ['checked', 'disabled', 'size'] },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'medium',
    inputProps: { 'aria-label': 'Toggle setting' },
  },
  render: (args) => <InteractiveSwitch {...args} />,
};

export default meta;
type Story = StoryObj<typeof CrvSwitchBase>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const SmallUnchecked: Story = {
  args: { size: 'small' },
};

export const SmallChecked: Story = {
  args: { size: 'small', checked: true },
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '12px 32px' }}>
      <span style={{ fontSize: 12, color: '#64748b' }}>medium / unchecked</span>
      <CrvSwitchBase inputProps={{ 'aria-label': 'Medium unchecked' }} />

      <span style={{ fontSize: 12, color: '#64748b' }}>medium / checked</span>
      <CrvSwitchBase defaultChecked inputProps={{ 'aria-label': 'Medium checked' }} />

      <span style={{ fontSize: 12, color: '#64748b' }}>small / unchecked</span>
      <CrvSwitchBase size="small" inputProps={{ 'aria-label': 'Small unchecked' }} />

      <span style={{ fontSize: 12, color: '#64748b' }}>small / checked</span>
      <CrvSwitchBase defaultChecked size="small" inputProps={{ 'aria-label': 'Small checked' }} />

      <span style={{ fontSize: 12, color: '#64748b' }}>disabled / unchecked</span>
      <CrvSwitchBase disabled inputProps={{ 'aria-label': 'Disabled unchecked' }} />

      <span style={{ fontSize: 12, color: '#64748b' }}>disabled / checked</span>
      <CrvSwitchBase defaultChecked disabled inputProps={{ 'aria-label': 'Disabled checked' }} />
    </div>
  ),
};
